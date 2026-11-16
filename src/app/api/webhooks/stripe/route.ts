import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { sendTicketConfirmationEmail } from '@/lib/email';
import { supabaseAdmin } from '@/lib/supabase/server';
import { EVENTS } from '@/data/seed';

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: 'Missing webhook signature or secret' }, { status: 400 });
  }

  let event: any;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error('Stripe webhook signature verification failed:', err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle Idempotency: checkout.session.completed
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const metadata = session.metadata || {};

    const {
      orderNumber,
      eventId,
      tierId,
      quantity,
      customerName,
      customerPhone,
      orderType,
    } = metadata;

    const targetEvent = EVENTS.find((e) => e.id === eventId);
    const targetTier = targetEvent?.ticketTiers.find((t) => t.id === tierId);

    console.log(`[Stripe Webhook] Đơn hàng #${orderNumber} đã thanh toán thành công!`);

    // 1. Update Database (if configured)
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      await supabaseAdmin.from('orders').upsert({
        order_number: orderNumber,
        order_type: orderType || 'ticket',
        total_amount_cents: session.amount_total,
        currency: session.currency?.toUpperCase() || 'VND',
        status: 'paid',
        customer_name: customerName,
        customer_email: session.customer_email || session.customer_details?.email,
        customer_phone: customerPhone,
        payment_intent_id: session.payment_intent,
      });

      // Atomically increment sold count on ticket tier
      if (tierId) {
        await supabaseAdmin.rpc('increment_ticket_sold', {
          tier_id: tierId,
          qty: parseInt(quantity, 10) || 1,
        });
      }
    }

    // 2. Dispatch Confirmation Email via Resend
    if (session.customer_email || session.customer_details?.email) {
      await sendTicketConfirmationEmail({
        email: session.customer_email || session.customer_details?.email,
        customerName: customerName || 'Quý khách',
        eventTitle: targetEvent?.title || 'Sự kiện ANVI Living',
        tierName: targetTier?.name || 'Vé Tiêu Chuẩn',
        quantity: parseInt(quantity, 10) || 1,
        orderNumber: orderNumber || 'WL-ORDER',
        eventDate: targetEvent
          ? new Date(targetEvent.startDate).toLocaleDateString('vi-VN')
          : '2026',
        location: targetEvent ? `${targetEvent.locationName}, ${targetEvent.city}` : 'Việt Nam',
      });
    }
  }

  return NextResponse.json({ received: true });
}
