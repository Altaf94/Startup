import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
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

// Gmail transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Store messages in memory as fallback
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

    // Store message
    messages.push({
      name: sanitizedName,
      email: body.email,
      phone: sanitizedPhone,
      subject: sanitizedSubject,
      message: sanitizedMessage,
      timestamp: new Date().toISOString(),
    });

    // Send email via Gmail if credentials are available
    if (process.env.GMAIL_EMAIL && process.env.GMAIL_APP_PASSWORD) {
      try {
        await transporter.sendMail({
          from: process.env.GMAIL_EMAIL,
          to: CONTACT_EMAIL,
          replyTo: body.email,
          subject: `New Contact from ${sanitizedName}: ${sanitizedSubject}`,
          html: `
            <h2>New Contact Message</h2>
            <p><strong>Name:</strong> ${sanitizedName}</p>
            <p><strong>Email:</strong> ${body.email}</p>
            <p><strong>Phone:</strong> ${sanitizedPhone || 'Not provided'}</p>
            <p><strong>Subject:</strong> ${sanitizedSubject}</p>
            <p><strong>Message:</strong></p>
            <p>${sanitizedMessage.replace(/\n/g, '<br>')}</p>
          `,
        });
        console.log('Email sent to', CONTACT_EMAIL);
      } catch (emailError) {
        console.error('Email send failed:', emailError);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: `Thank you ${sanitizedName}! Your message has been received. We'll contact you at ${body.email} within 24 hours.`,
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
