import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { sanitizeInput } from '@/app/lib/security';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

// Contact email where messages should be sent
const CONTACT_EMAIL = 'thesaucypan.tsp@gmail.com';

// Initialize Nodemailer transporter for Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

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

    // Validate Gmail configuration
    if (!process.env.GMAIL_EMAIL || !process.env.GMAIL_APP_PASSWORD) {
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Send email via Gmail
    try {
      const mailOptions = {
        from: process.env.GMAIL_EMAIL,
        to: CONTACT_EMAIL,
        replyTo: body.email,
        subject: `New Contact from ${sanitizedName}: ${sanitizedSubject}`,
        html: `
          <h1>New Contact Message</h1>
          <p><strong>Name:</strong> ${sanitizedName}</p>
          <p><strong>Email:</strong> ${body.email}</p>
          <p><strong>Phone:</strong> ${sanitizedPhone || 'Not provided'}</p>
          <p><strong>Subject:</strong> ${sanitizedSubject}</p>
          <p><strong>Message:</strong></p>
          <p>${sanitizedMessage.replace(/\n/g, '<br>')}</p>
        `,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.response);
    } catch (emailError) {
      console.error('Gmail/Nodemailer error:', emailError);
      throw emailError;
    }

    return NextResponse.json(
      {
        success: true,
        message: `Your message has been received. We will contact you soon at ${body.email}.`,
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
