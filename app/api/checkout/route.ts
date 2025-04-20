// app/api/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

interface BookingDetail {
  id: number;
  reservationId: number;
  serviceId: number;
  addOnId: number | null;
  price: number;
  quantity: number;
}

interface Pet {
  id: number;
  name: string;
  type: string;
  breed?: string;
  specialNeeds?: string;
}

interface Booking {
  startDate: string;
  service: number;
  addOns: number[];
  pets: Pet[];
  totalCost: number;
  details: BookingDetail[];
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // apiVersion is optional – Stripe uses your account's default
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { bookings } = body;

    if (!bookings || bookings.length === 0) {
      return NextResponse.json({ message: 'No bookings provided' }, { status: 400 });
    }

    // Flatten bookings into line items
    const line_items = bookings.flatMap((booking: Booking) => {
      const serviceDetail = booking.details.find(
        (d: BookingDetail) => d.serviceId === booking.service
      );
    
      if (!serviceDetail) {
        throw new Error(`Missing service detail for service ID ${booking.service}`);
      }

      const serviceLine = {
        price_data: {
          currency: 'usd',
          product_data: { name: `Service - ${booking.service}` },
          unit_amount: Math.round(serviceDetail.price * 100),
        },
        quantity: 1,
      };
    

      const addOnLines = booking.details
    .filter((d: BookingDetail) => d.addOnId !== null)
    .map((addOn: BookingDetail) => ({
      price_data: {
        currency: 'usd',
        product_data: { name: `Add-On` },
        unit_amount: Math.round(addOn.price * 100),
      },
      quantity: 1,
    }));

      return [serviceLine, ...addOnLines];
    });

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items,
      success_url: `${request.nextUrl.origin}/checkout/success`,
      cancel_url: `${request.nextUrl.origin}/checkout/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Stripe session error:', error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      console.error('Stripe session error (non-standard):', error);
      return NextResponse.json({ message: 'An unknown error occurred.' }, { status: 500 });
    }
  }
}
