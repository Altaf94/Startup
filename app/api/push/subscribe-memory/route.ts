import { NextRequest, NextResponse } from 'next/server';

// Store single subscription in environment variable (Vercel only allows ~4KB)
export async function POST(request: NextRequest) {
  try {
    const subscription = await request.json();
    
    console.log('Received subscription:', subscription?.endpoint?.substring(0, 50));
    
    // For quick testing: Store in runtime memory (lost on restart)
    // In production, use a database
    global.adminPushSubscription = subscription;
    
    return NextResponse.json({ 
      success: true, 
      message: 'Subscription saved in memory (will reset on serverless restart)' 
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  global.adminPushSubscription = null;
  return NextResponse.json({ success: true });
}

// Declare global type
declare global {
  var adminPushSubscription: any;
}
