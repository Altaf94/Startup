import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Use /tmp on Vercel serverless (ephemeral but works for testing)
// For production, you should use a database
const SUBSCRIPTIONS_FILE = path.join('/tmp', 'push-subscriptions.json');

// Ensure file exists
async function ensureFileExists() {
  try {
    await fs.access(SUBSCRIPTIONS_FILE);
  } catch {
    await fs.writeFile(SUBSCRIPTIONS_FILE, JSON.stringify([]));
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

    await ensureFileExists();
    
    // Read existing subscriptions
    const fileContent = await fs.readFile(SUBSCRIPTIONS_FILE, 'utf-8');
    const subscriptions = JSON.parse(fileContent);
    
    console.log('Current subscriptions count:', subscriptions.length);
    
    // Check if this subscription already exists
    const exists = subscriptions.some(
      (sub: any) => sub.endpoint === subscription.endpoint
    );
    
    if (!exists) {
      // Add timestamp and admin flag
      subscriptions.push({
        ...subscription,
        createdAt: new Date().toISOString(),
        isAdmin: true,
      });
      
      await fs.writeFile(SUBSCRIPTIONS_FILE, JSON.stringify(subscriptions, null, 2));
      console.log('✅ New subscription saved! Total:', subscriptions.length);
    } else {
      console.log('Subscription already exists');
    }

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

    await ensureFileExists();
    
    const fileContent = await fs.readFile(SUBSCRIPTIONS_FILE, 'utf-8');
    const subscriptions = JSON.parse(fileContent);
    
    // Remove subscription with matching endpoint
    const filtered = subscriptions.filter((sub: any) => sub.endpoint !== endpoint);
    
    await fs.writeFile(SUBSCRIPTIONS_FILE, JSON.stringify(filtered, null, 2));
    
    console.log('✅ Subscription removed. Remaining:', filtered.length);

    return NextResponse.json({ success: true, message: 'Unsubscribed successfully!' });
  } catch (error) {
    console.error('❌ Error removing subscription:', error);
    return NextResponse.json(
      { error: 'Failed to remove subscription: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
