import { NextResponse } from 'next/server';
import { ticketCheckoutSchema } from '@/lib/validations';
import { stripe } from '@/lib/stripe';
import { EVENTS } from '@/data/seed';
import { supabaseAdmin } from '@/lib/supabase/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = ticketCheckoutSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: validated.error.issues[0]?.message || 'Dữ liệu không hợp lệ' },
        { status: 400 }
      );
    }

    const { eventId, tierId, quantity, customerName, customerEmail, customerPhone } = validated.data;

    // Find Event and Tier
    const event = EVENTS.find((e) => e.id === eventId);
    if (!event) {
      return NextResponse.json({ error: 'Không tìm thấy sự kiện' }, { status: 404 });
    }

    const tier = event.ticketTiers.find((t) => t.id === tierId);
    if (!tier) {
      return NextResponse.json({ error: 'Không tìm thấy hạng vé' }, { status: 404 });
    }

    const orderNumber = `WL-${Date.now().toString().slice(-6)}`;
    const totalAmount = tier.price * quantity;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // If Stripe secret key is configured, create real Stripe Checkout Session
    if (process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY !== 'sk_test_placeholder') {
      const session = await stripe.checkout.sessions.create({
        customer_email: customerEmail,
        line_items: [
          {
            price_data: {
              currency: 'vnd',
              product_data: {
                name: `${event.title} - ${tier.name}`,
                description: `${quantity} vé tham dự sự kiện tại ${event.locationName}, ${event.city}`,
                images: [event.image],
              },
              unit_amount: tier.price,
            },
            quantity,
          },
        ],
        mode: 'payment',
        success_url: `${appUrl}/events/${event.slug}?booking_success=true&order=${orderNumber}`,
        cancel_url: `${appUrl}/events/${event.slug}?booking_cancel=true`,
        metadata: {
          orderNumber,
          eventId,
          tierId,
          quantity: quantity.toString(),
          customerName,
          customerPhone: customerPhone || '',
          orderType: 'ticket',
        },
      });

      return NextResponse.json({
        checkoutUrl: session.url,
        orderNumber,
      });
    }

    // In Mock Mode (or when keys are not set yet)
    return NextResponse.json({
      success: true,
      mock: true,
      orderNumber,
      message: `Đơn hàng #${orderNumber} đã được khởi tạo thành công ở chế độ thử nghiệm.`,
    });
  } catch (err: any) {
    console.error('Checkout error:', err);
    return NextResponse.json({ error: 'Không thể khởi tạo thanh toán.' }, { status: 500 });
  }
}
