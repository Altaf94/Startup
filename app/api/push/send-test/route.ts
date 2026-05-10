import { NextRequest, NextResponse } from 'next/server';
import webPush from 'web-push';
import { Pool } from 'pg';

const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY || 'BKT14c4lbywJXA5HLebK3qQRB6fjuxDZdr3wBSIUeq_OLlZE_nHxEiYdJNhXfmv0rLArLmTJH5bBO_3LP12vMD8';
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || 'pdeCMS9xAQwcgFK-nsux07FbQQXrnjGBPOsOYqQjcuM';
const VAPID_EMAIL = process.env.VAPID_EMAIL || 'thesaucypan.tsp@gmail.com';

webPush.setVapidDetails(
  `mailto:${VAPID_EMAIL}`,
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
);

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export async function POST(request: NextRequest) {
  try {
    console.log('Test notification endpoint called');
    
    const client = await pool.connect();
    let rows;
    try {
      const result = await client.query(
        'SELECT endpoint, keys, expiration_time FROM push_subscriptions WHERE is_admin = TRUE'
      );
      rows = result.rows;
    } finally {
      client.release();
    }

    console.log(`Found ${rows.length} subscription(s) in Postgres`);
    
    if (rows.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'No subscriptions found in database',
      }, { status: 404 });
    }

    const payload = {
      title: 'Test Notification',
      body: 'This is a test push notification from The Saucy Pan!',
      icon: '/icon-192.png',
      data: { test: true },
    };

    console.log('Sending test notification to', rows.length, 'device(s)...');

    const results = await Promise.allSettled(
      rows.map((row: any) => {
        const subscription = {
          endpoint: row.endpoint,
          keys: typeof row.keys === 'string' ? JSON.parse(row.keys) : row.keys,
          expirationTime: row.expiration_time
        };
        return webPush.sendNotification(subscription, JSON.stringify(payload));
      })
    );

    const sent = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;
    
    const errors = results
      .filter(r => r.status === 'rejected')
      .map((r: any) => r.reason?.message || 'Unknown error');

    console.log(`Test results: ${sent} sent, ${failed} failed`);

    return NextResponse.json({
      success: sent > 0,
      sent,
      failed,
      errors: failed > 0 ? errors : undefined,
      message: `Sent ${sent} notification(s), ${failed} failed`,
    });
  } catch (error) {
    console.error('Test notification error:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
