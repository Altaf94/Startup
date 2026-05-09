import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const SUBSCRIPTIONS_FILE = path.join('/tmp', 'push-subscriptions.json');

export async function GET(request: NextRequest) {
  try {
    // Check if file exists
    try {
      await fs.access(SUBSCRIPTIONS_FILE);
      const fileContent = await fs.readFile(SUBSCRIPTIONS_FILE, 'utf-8');
      const subscriptions = JSON.parse(fileContent);
      
      return NextResponse.json({
        success: true,
        fileExists: true,
        subscriptionsCount: subscriptions.length,
        subscriptions: subscriptions.map((sub: any) => ({
          endpoint: sub.endpoint.substring(0, 60) + '...',
          createdAt: sub.createdAt,
          isAdmin: sub.isAdmin,
        })),
      });
    } catch {
      return NextResponse.json({
        success: true,
        fileExists: false,
        subscriptionsCount: 0,
        message: '/tmp is ephemeral - file does not exist on this serverless instance',
      });
    }
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
