import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      orderId,
      customerName,
      customerPhone,
      customerEmail,
      address,
      city,
      zipCode,
      location,
      items,
      subtotal,
      deliveryFee,
      total,
      paymentMethod,
      deliveryInstructions,
    } = body;

    // Get email credentials from environment (use existing Gmail config)
    const emailUser = process.env.GMAIL_EMAIL;
    const emailPass = process.env.GMAIL_APP_PASSWORD;
    const businessEmail = process.env.GMAIL_EMAIL; // Send orders to same email

    if (!emailUser || !emailPass) {
      console.error('Missing email credentials', {
        GMAIL_EMAIL: !!emailUser,
        GMAIL_APP_PASSWORD: !!emailPass,
      });
      return NextResponse.json(
        { success: false, error: 'Missing email configuration' },
        { status: 500 }
      );
    }

    // Create transporter (works with Gmail, Outlook, etc.)
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Change to 'outlook' or other if needed
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    // Format items as HTML table
    const itemsHtml = items
      .map((item: any) => `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}${item.spicyLevel ? ` (Spicy: ${item.spicyLevel})` : ''}</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">Rs.${item.price * item.quantity}</td>
        </tr>
      `)
      .join('');

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(to right, #d97706, #ea580c); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #fff; padding: 20px; border: 1px solid #ddd; border-top: none; }
          .section { margin-bottom: 20px; }
          .section-title { font-weight: bold; color: #d97706; margin-bottom: 10px; border-bottom: 2px solid #d97706; padding-bottom: 5px; }
          table { width: 100%; border-collapse: collapse; }
          th { background: #f8f8f8; padding: 10px; text-align: left; }
          .total-row { font-weight: bold; font-size: 18px; color: #d97706; }
          .footer { text-align: center; padding: 15px; background: #f8f8f8; border-radius: 0 0 8px 8px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">🍝 New Order Received!</h1>
            <p style="margin: 5px 0 0 0;">The Saucy Pan</p>
          </div>
          
          <div class="content">
            <div class="section">
              <div class="section-title">Order Details</div>
              <p><strong>Order ID:</strong> ${orderId}</p>
              <p><strong>Payment:</strong> ${paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}</p>
            </div>

            <div class="section">
              <div class="section-title">Customer Information</div>
              <p><strong>Name:</strong> ${customerName}</p>
              <p><strong>Phone:</strong> <a href="tel:${customerPhone}">${customerPhone}</a></p>
              <p><strong>Email:</strong> <a href="mailto:${customerEmail}">${customerEmail}</a></p>
              <p><strong>Address:</strong> ${address}, ${city} ${zipCode}</p>
              <p><strong>Location:</strong> ${location || 'Not specified'}</p>
              ${deliveryInstructions ? `<p><strong>Instructions:</strong> ${deliveryInstructions}</p>` : ''}
            </div>

            <div class="section">
              <div class="section-title">Items Ordered</div>
              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th style="text-align: center;">Qty</th>
                    <th style="text-align: right;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>
            </div>

            <div class="section" style="background: #f8f8f8; padding: 15px; border-radius: 8px;">
              <table>
                <tr>
                  <td>Subtotal:</td>
                  <td style="text-align: right;">Rs.${subtotal}</td>
                </tr>
                <tr>
                  <td>Delivery Fee:</td>
                  <td style="text-align: right;">Rs.${deliveryFee}</td>
                </tr>
                <tr class="total-row">
                  <td style="padding-top: 10px;">Total:</td>
                  <td style="text-align: right; padding-top: 10px;">Rs.${total}</td>
                </tr>
              </table>
            </div>
          </div>

          <div class="footer">
            <p style="margin: 0; color: #666;">Order received at ${new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' })}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email to business
    const info = await transporter.sendMail({
      from: `"The Saucy Pan Orders" <${emailUser}>`,
      to: businessEmail,
      subject: `🍝 New Order #${orderId} - Rs.${total}`,
      html: emailHtml,
    });

    console.log(`✅ Order email sent! Message ID: ${info.messageId}`);

    return NextResponse.json(
      { success: true, message: 'Order notification sent via email', messageId: info.messageId },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('❌ Email notification error:', {
      message: error?.message || String(error),
      stack: error?.stack,
    });
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to send email notification' },
      { status: 500 }
    );
  }
}
