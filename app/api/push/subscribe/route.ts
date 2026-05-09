import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const SUBSCRIPTIONS_FILE = path.join(process.cwd(), 'data', 'push-subscriptions.json');

// Ensure data directory and file exist
async function ensureFileExists() {
  try {
    await fs.access(SUBSCRIPTIONS_FILE);
  } catch {
    const dataDir = path.dirname(SUBSCRIPTIONS_FILE);
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(SUBSCRIPTIONS_FILE, JSON.stringify([]));
  }
}

export async function POST(request: NextRequest) {
  try {
    const subscription = await request.json();
    
    if (!subscription || !subscription.endpoint) {
      return NextResponse.json(
        { error: 'Invalid subscription object' },
        { status: 400 }
      );
    }

    await ensureFileExists();
    
    // Read existing subscriptions
    const fileContent = await fs.readFile(SUBSCRIPTIONS_FILE, 'utf-8');
    const subscriptions = JSON.parse(fileContent);
    
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
    }

    return NextResponse.json({ success: true, message: 'Subscribed successfully!' });
  } catch (error) {
    console.error('Error saving subscription:', error);
    return NextResponse.json(
      { error: 'Failed to save subscription' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { endpoint } = await request.json();
    
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

    return NextResponse.json({ success: true, message: 'Unsubscribed successfully!' });
  } catch (error) {
    console.error('Error removing subscription:', error);
    return NextResponse.json(
      { error: 'Failed to remove subscription' },
      { status: 500 }
    );
  }
}
