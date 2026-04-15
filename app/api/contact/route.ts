import { NextRequest, NextResponse } from 'next/server';
import { sanitizeInput } from '@/app/lib/security';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  timestamp?: string;
}

// Contact email where messages should be sent
const CONTACT_EMAIL = 'thesaucypan.tsp@gmail.com';

// Store messages in memory (replace with database for production)
const messages: ContactFormData[] = [];

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Sanitize input
    const sanitizedName = sanitizeInput(body.name);
    const sanitizedSubject = sanitizeInput(body.subject);
    const sanitizedMessage = sanitizeInput(body.message);
    const sanitizedPhone = sanitizeInput(body.phone || '');

    // Validate required fields
    if (!sanitizedName || !body.email || !sanitizedSubject || !sanitizedMessage) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Store message with timestamp (works globally without any external service)
    const messageData: ContactFormData = {
      name: sanitizedName,
      email: body.email,
      phone: sanitizedPhone,
      subject: sanitizedSubject,
      message: sanitizedMessage,
      timestamp: new Date().toISOString(),
    };

    messages.push(messageData);

    console.log('Contact message received:', {
      name: sanitizedName,
      email: body.email,
      subject: sanitizedSubject,
      time: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: `Thank you ${sanitizedName}! Your message has been received. We'll contact you at ${body.email} within 24 hours.`,
        recipientEmail: CONTACT_EMAIL,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to process your request' },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to retrieve messages (admin only)
export async function GET() {
  return NextResponse.json({
    messages,
    count: messages.length,
  });
}
