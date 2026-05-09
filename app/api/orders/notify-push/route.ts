import { NextRequest, NextResponse } from 'next/server';
import * as OneSignal from '@onesignal/node-onesignal';

export const runtime = 'nodejs';

// OneSignal configuration
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

    const appId = process.env.ONESIGNAL_APP_ID;
    const apiKey = process.env.ONESIGNAL_REST_API_KEY;

    if (!appId || !apiKey) {
      console.error('Missing OneSignal credentials', {
        ONESIGNAL_APP_ID: !!appId,
        ONESIGNAL_REST_API_KEY: !!apiKey,
      });
      return NextResponse.json(
        { success: false, error: 'Missing OneSignal configuration' },
        { status: 500 }
      );
    }

    const { client } = getOneSignalClient();

    // Create notification content
    const itemCount = items?.length || 0;
    const itemsText = itemCount === 1 ? '1 item' : `${itemCount} items`;

    const notification = new OneSignal.Notification();
    notification.app_id = appId;
    
    // ONLY send to users tagged as "admin" (not all subscribers)
    notification.included_segments = undefined;
    notification.filters = [
      { field: 'tag', key: 'role', relation: '=', value: 'admin' }
    ];
    
    // Notification content
    notification.headings = { en: `🍝 New Order #${orderId}` };
    notification.contents = { 
      en: `${customerName} ordered ${itemsText} - Rs.${total} (${paymentMethod === 'cod' ? 'COD' : 'Online'})` 
    };
    
    // Additional data for the notification
    notification.data = {
      orderId,
      customerName,
      customerPhone,
      total,
      type: 'new_order',
    };
    
    // Web push specific settings
    notification.web_url = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://thesaucypan.vercel.app'}/admin/orders`;
    
    // Chrome requires an icon
    notification.chrome_web_icon = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://thesaucypan.vercel.app'}/images/logo.png`;

    const response = await client.createNotification(notification);

    console.log(`✅ OneSignal notification sent! ID: ${response.id}`);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Push notification sent', 
        notificationId: response.id,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('❌ OneSignal notification error:', {
      message: error?.message || String(error),
      stack: error?.stack,
    });
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to send push notification' },
      { status: 500 }
    );
  }
}
