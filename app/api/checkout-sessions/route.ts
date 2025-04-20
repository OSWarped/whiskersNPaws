import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import prisma from '@/lib/prisma';

interface Booking {
  service: string;
  addOns: number[];
  totalCost: number;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // apiVersion optional
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { bookings, userId } = body;

    console.log('📦 Received checkout request:', { userId, bookings });

    if (!userId || !bookings || !Array.isArray(bookings)) {
      return NextResponse.json({ error: 'Missing or invalid userId/bookings' }, { status: 400 });
    }

    // Step 1: Save pending reservation WITHOUT token first
    const pending = await prisma.pendingReservation.create({
      data: {
        userId: Number(userId),
        bookings: JSON.stringify(bookings),
        token: 'temp', // Will update later
        data: {},       // optional structured field
      },
    });

    // Step 2: Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: bookings.map((booking: Booking) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Pet Sitting - Service ${booking.service}`,
            description: `Includes ${booking.addOns.length} add-on(s)`,
          },
          unit_amount: Math.round(booking.totalCost * 100),
        },
        quantity: 1,
      })),
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?canceled=true`,
      metadata: {
        pendingReservationId: pending.id.toString(),
      },
    });

    // Step 3: Update token with session.id
    await prisma.pendingReservation.update({
      where: { id: pending.id },
      data: { token: session.id },
    });

    console.log('✅ Stripe session created:', session.id);
    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    console.error('❌ Stripe session creation error:', err);
    return NextResponse.json({ error: 'Unable to create Stripe session' }, { status: 500 });
  }
}
