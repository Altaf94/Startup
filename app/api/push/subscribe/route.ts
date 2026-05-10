import { NextRequest, NextResponse } from 'next/server';
import { createPool } from '@vercel/postgres';

// Use pooled connection for serverless
const pool = createPool({
  connectionString: process.env.POSTGRES_URL_POOLED || process.env.POSTGRES_URL,
});

// Initialize table on first run
async function ensureTableExists() {
  try {
    await pool.sql`
      CREATE TABLE IF NOT EXISTS push_subscriptions (
        id SERIAL PRIMARY KEY,
        endpoint TEXT UNIQUE NOT NULL,
        keys JSONB NOT NULL,
        expiration_time BIGINT,
        is_admin BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
  } catch (error) {
    console.error('Error creating table:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const subscription = await request.json();
    
    console.log('Received subscription request:', { endpoint: subscription?.endpoint });
    
    if (!subscription || !subscription.endpoint) {
      console.error('Invalid subscription object:', subscription);
      return NextResponse.json(
        { error: 'Invalid subscription object' },
        { status: 400 }
      );
    }

    await ensureTableExists();
    
    // Insert or update subscription
    await pool.sql`
      INSERT INTO push_subscriptions (endpoint, keys, expiration_time, is_admin)
      VALUES (${subscription.endpoint}, ${JSON.stringify(subscription.keys)}, ${subscription.expirationTime || null}, TRUE)
      ON CONFLICT (endpoint) 
      DO UPDATE SET 
        keys = ${JSON.stringify(subscription.keys)},
        expiration_time = ${subscription.expirationTime || null},
        created_at = CURRENT_TIMESTAMP
    `;
    
    console.log('✅ Subscription saved to Postgres!');

    return NextResponse.json({ success: true, message: 'Subscribed successfully!' });
  } catch (error) {
    console.error('❌ Error saving subscription:', error);
    return NextResponse.json(
      { error: 'Failed to save subscription: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { endpoint } = await request.json();
    
    console.log('Unsubscribe request for:', endpoint);
    
    if (!endpoint) {
      return NextResponse.json(
        { error: 'Endpoint required' },
        { status: 400 }
      );
    }

    await ensureTableExists();
    
    await pool.sql`
      DELETE FROM push_subscriptions 
      WHERE endpoint = ${endpoint}
    `;
    
    console.log('✅ Subscription removed from Postgres');

    return NextResponse.json({ success: true, message: 'Unsubscribed successfully!' });
  } catch (error) {
    console.error('❌ Error removing subscription:', error);
    return NextResponse.json(
      { error: 'Failed to remove subscription: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
