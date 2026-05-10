import { NextRequest, NextResponse } from 'next/server';
import * as OneSignal from '@onesignal/node-onesignal';
import webPush from 'web-push';
import { createPool } from '@vercel/postgres';

export const runtime = 'nodejs';

// Use pooled connection for serverless
const pool = createPool({
  connectionString: process.env.POSTGRES_URL_POOLED || process.env.POSTGRES_URL,
});

// Web Push VAPID configuration
const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY || 'BKT14c4lbywJXA5HLebK3qQRB6fjuxDZdr3wBSIUeq_OLlZE_nHxEiYdJNhXfmv0rLArLmTJH5bBO_3LP12vMD8';
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || 'pdeCMS9xAQwcgFK-nsux07FbQQXrnjGBPOsOYqQjcuM';
const VAPID_EMAIL = process.env.VAPID_EMAIL || 'thesaucypan.tsp@gmail.com';

webPush.setVapidDetails(
  `mailto:${VAPID_EMAIL}`,
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
);

// Send notification using pool.web-push (direct method with Postgres storage)
async function sendDirectPushNotifications(payload: any) {
  try {
    console.log('🔍 Fetching subscriptions from Postgres...');
    
    const { rows } = await sql`
      SELECT endpoint, keys, expiration_time 
      FROM push_subscriptions 
      WHERE is_admin = TRUE
    `;
    
    console.log(`📋 Found ${rows.length} subscription(s) in Postgres`);
    
    if (rows.length === 0) {
      console.log('No direct push subscriptions found');
      return { sent: 0, failed: 0 };
    }

    console.log('📤 Sending push notifications to', rows.length, 'device(s)...');
    
    const results = await Promise.allSettled(
      rows.map((row: any, index: number) => {
        const subscription = {
          endpoint: row.endpoint,
          keys: row.keys,
          expirationTime: row.expiration_time
        };
        console.log(`  Sending to device ${index + 1}:`, subscription.endpoint.substring(0, 50) + '...');
        return webPush.sendNotification(subscription, JSON.stringify(payload));
      })
    );

    const sent = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;
    
    // Log failed ones
    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        console.error(`❌ Failed to send to device ${index + 1}:`, result.reason);
      }
    });

    console.log(`✅ Direct push results: ${sent} sent, ${failed} failed`);
    return { sent, failed };
  } catch (error) {
    console.error('❌ Direct push error:', error);
    return { sent: 0, failed: 0 };
  }
}

// OneSignal configuration (fallback)
const getOneSignalClient = () => {
  const appId = process.env.ONESIGNAL_APP_ID;
  const apiKey = process.env.ONESIGNAL_REST_API_KEY;

  if (!appId || !apiKey) {
    throw new Error('Missing OneSignal configuration');
  }

  const configuration = OneSignal.createConfiguration({
    restApiKey: apiKey,
  });

  return { client: new OneSignal.DefaultApi(configuration), appId };
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      orderId,
      customerName,
      customerPhone,
      total,
      items,
      paymentMethod,
    } = body;

    // Create notification content
    const itemCount = items?.length || 0;
    const itemsText = itemCount === 1 ? '1 item' : `${itemCount} items`;
    
    const payload = {
      title: `🍝 New Order #${orderId}`,
      body: `${customerName} ordered ${itemsText} - Rs.${total} (${paymentMethod === 'cod' ? 'COD' : 'Online'})`,
      icon: '/icon-192.png',
      data: {
        orderId,
        customerName,
        customerPhone,
        total,
        type: 'new_order',
      },
    };

    // Try direct push first (bypasses OneSignal SDK)
    const directResult = await sendDirectPushNotifications(payload);
    
    if (directResult.sent > 0) {
      console.log(`✅ Direct push notification sent to ${directResult.sent} device(s)`);
      return NextResponse.json(
        { 
          success: true, 
          message: 'Push notification sent via direct method', 
          method: 'direct',
          sent: directResult.sent,
        },
        { status: 200 }
      );
    }

    // Fallback to OneSignal if no direct subscriptions
    console.log('No direct subscriptions, trying OneSignal...');
    
    const appId = process.env.ONESIGNAL_APP_ID;
    const apiKey = process.env.ONESIGNAL_REST_API_KEY;

    if (!appId || !apiKey) {
      console.error('No push method available (no direct subs and no OneSignal config)');
      return NextResponse.json(
        { success: false, error: 'No push notification method available' },
        { status: 500 }
      );
    }

    const { client } = getOneSignalClient();

    const notification = new OneSignal.Notification();
    notification.app_id = appId;
    
    // ONLY send to users tagged as "admin" (not all subscribers)
    notification.included_segments = undefined;
    notification.filters = [
      { field: 'tag', key: 'role', relation: '=', value: 'admin' }
    ];
    
    // Notification content
    notification.headings = { en: payload.title };
    notification.contents = { en: payload.body };
    notification.data = payload.data;
    
    // Web push specific settings
    notification.web_url = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://thesaucypan.vercel.app'}/admin/orders`;
    notification.chrome_web_icon = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://thesaucypan.vercel.app'}/images/logo.png`;

    const response = await client.createNotification(notification);

    console.log(`✅ OneSignal notification sent! ID: ${response.id}`);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Push notification sent via OneSignal', 
        method: 'onesignal',
        notificationId: response.id,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('❌ Push notification error:', {
      message: error?.message || String(error),
      stack: error?.stack,
    });
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to send push notification' },
      { status: 500 }
    );
  }
}
