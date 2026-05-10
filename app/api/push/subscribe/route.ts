import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

// Create connection pool
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Initialize table on first run
async function ensureTableExists() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS push_subscriptions (
        id SERIAL PRIMARY KEY,
        endpoint TEXT UNIQUE NOT NULL,
        keys JSONB NOT NULL,
        expiration_time BIGINT,
        is_admin BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  } catch (error) {
    console.error('Error creating table:', error);
  } finally {
    client.release();
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
    
    const client = await pool.connect();
    try {
      await client.query(`
        INSERT INTO push_subscriptions (endpoint, keys, expiration_time, is_admin)
        VALUES ($1, $2, $3, TRUE)
        ON CONFLICT (endpoint) 
        DO UPDATE SET 
          keys = $2,
          expiration_time = $3,
          created_at = CURRENT_TIMESTAMP
      `, [subscription.endpoint, JSON.stringify(subscription.keys), subscription.expirationTime || null]);
      
      console.log('Subscription saved to Postgres!');
    } finally {
      client.release();
    }

    return NextResponse.json({ success: true, message: 'Subscribed successfully!' });
  } catch (error) {
    console.error('Error saving subscription:', error);
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
    
    const client = await pool.connect();
    try {
      await client.query('DELETE FROM push_subscriptions WHERE endpoint = $1', [endpoint]);
      console.log('Subscription removed from Postgres');
    } finally {
      client.release();
    }

    return NextResponse.json({ success: true, message: 'Unsubscribed successfully!' });
  } catch (error) {
    console.error('Error removing subscription:', error);
    return NextResponse.json(
      { error: 'Failed to remove subscription: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
