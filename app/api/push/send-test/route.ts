import { NextRequest, NextResponse } from 'next/server';
import webPush from 'web-push';
import { promises as fs } from 'fs';
import path from 'path';

const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY || 'BKT14c4lbywJXA5HLebK3qQRB6fjuxDZdr3wBSIUeq_OLlZE_nHxEiYdJNhXfmv0rLArLmTJH5bBO_3LP12vMD8';
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || 'pdeCMS9xAQwcgFK-nsux07FbQQXrnjGBPOsOYqQjcuM';
const VAPID_EMAIL = process.env.VAPID_EMAIL || 'thesaucypan.tsp@gmail.com';

webPush.setVapidDetails(
  `mailto:${VAPID_EMAIL}`,
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
);

const SUBSCRIPTIONS_FILE = path.join('/tmp', 'push-subscriptions.json');

export async function POST(request: NextRequest) {
  try {
    console.log('📤 Test notification endpoint called');
    
    // Check if file exists
    try {
      await fs.access(SUBSCRIPTIONS_FILE);
    } catch {
      return NextResponse.json({
        success: false,
        error: 'No subscriptions file found. /tmp is ephemeral - you may need to resubscribe.',
      }, { status: 404 });
    }
    
    const fileContent = await fs.readFile(SUBSCRIPTIONS_FILE, 'utf-8');
    const subscriptions = JSON.parse(fileContent);
    
    console.log(`Found ${subscriptions.length} subscription(s)`);
    
    if (subscriptions.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'No subscriptions found',
      }, { status: 404 });
    }

    const payload = {
      title: '🧪 Test Notification',
      body: 'This is a test push notification from The Saucy Pan!',
      icon: '/icon-192.png',
      data: { test: true },
    };

    console.log('Sending test notification to', subscriptions.length, 'device(s)...');

    const results = await Promise.allSettled(
      subscriptions.map((subscription: any) =>
        webPush.sendNotification(subscription, JSON.stringify(payload))
      )
    );

    const sent = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;
    
    const errors = results
      .filter(r => r.status === 'rejected')
      .map((r: any) => r.reason?.message || 'Unknown error');

    console.log(`✅ Test results: ${sent} sent, ${failed} failed`);

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
