import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';

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

    // Format items list
    const itemsList = items
      .map((item: any) => 
        `• ${item.name}${item.spicyLevel ? ' (Spicy: ' + item.spicyLevel + ')' : ''} x${item.quantity} - Rs.${item.price * item.quantity}`
      )
      .join('\n');

    const orderMessage = `*New Order from The Saucy Pan*

*Order ID:* ${orderId}

*Customer Details:*
Name: ${customerName}
Phone: ${customerPhone}
Email: ${customerEmail}
Address: ${address}, ${city} ${zipCode}
Location: ${location || 'Not specified'}

*Items Ordered:*
${itemsList}

*Subtotal:* Rs.${subtotal}
*Delivery Fee:* Rs.${deliveryFee}
*Total:* Rs.${total}

*Payment Method:* ${paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
${deliveryInstructions ? `*Special Instructions:* ${deliveryInstructions}` : ''}`;

    // Get Twilio credentials from environment
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioWhatsApp = process.env.TWILIO_WHATSAPP_NUMBER;
    const businessWhatsApp = process.env.BUSINESS_WHATSAPP_NUMBER;

    if (!accountSid || !authToken || !twilioWhatsApp || !businessWhatsApp) {
      console.error('Missing Twilio credentials');
      return NextResponse.json(
        { success: false, error: 'Missing Twilio configuration' },
        { status: 500 }
      );
    }

    // Create Twilio client
    const client = twilio(accountSid, authToken);

    // Send WhatsApp message
    const message = await client.messages.create({
      from: `whatsapp:${twilioWhatsApp}`,
      to: `whatsapp:${businessWhatsApp}`,
      body: orderMessage,
    });

    console.log(`✅ WhatsApp message sent! SID: ${message.sid}`);

    return NextResponse.json(
      { success: true, message: 'Order notification sent to WhatsApp', messageSid: message.sid },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('❌ WhatsApp notification error:', error.message);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to send notification' },
      { status: 500 }
    );
  }
}
