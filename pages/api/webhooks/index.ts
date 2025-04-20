// pages/api/webhooks/index.ts

import { buffer } from 'micro';
import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import prisma from '@/lib/prisma';
import { Pet } from '@prisma/client';

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // apiVersion is optional unless you want strict typing
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const sig = req.headers['stripe-signature'] as string;
  const rawBody = await buffer(req);

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: unknown) {
    console.error('❌ Webhook verification failed:', err);
    return res.status(400).send(`Webhook Error: ${err}`);
  }

  console.log('✅ Stripe Webhook received:', event.type);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    console.log('💰 Session ID:', session.id);
    const pendingId = session.metadata?.pendingReservationId;

    if (!pendingId) {
      console.warn('⚠️ Missing pendingReservationId in metadata');
      return res.status(400).json({ error: 'Missing pendingReservationId' });
    }

    try {
      const pending = await prisma.pendingReservation.findUnique({
        where: { id: parseInt(pendingId) },
      });
    
      if (!pending) {
        console.error('❌ No pending reservation found for ID:', pendingId);
        return res.status(404).json({ error: 'Pending reservation not found' });
      }
    
      const userId = pending.userId;
      const bookings = JSON.parse(pending.bookings);
    
      for (const booking of bookings) {
        await prisma.reservation.create({
          data: {
            startDate: new Date(booking.startDate),
            endDate: new Date(booking.startDate),
            totalPrice: booking.totalCost,
            status: 'Paid',
            user: {
              connect: { id: userId },
            },
            pets: {
              connect: booking.pets.map((p: Pet) => ({ id: p.id })),
            },
            details: {
              create: [
                {
                  serviceId: booking.service,
                  price: booking.totalCost,
                  quantity: 1,
                  addOnId: booking.addOns.length > 0 ? booking.addOns[0] : null,
                },
              ],
            },
          },
        });
      }
    
      // ✅ Delete the pending reservation after successful creation
      await prisma.pendingReservation.delete({
        where: { id: pending.id },
      });
    
      console.log('✅ Reservation(s) created and pending entry deleted!');
    } catch (err: unknown) {
      console.error('❌ Failed to create reservation(s):', err);
      return res.status(500).json({ error: 'Failed to process reservation' });
    }
    

  return res.status(200).json({ received: true });
}
}
