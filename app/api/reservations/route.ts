
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  id: number;
  email: string;
  iat: number;
  exp: number;
}

type Pet = {
  id: number;
  name: string;
  type: string;
  breed?: string;
  specialNeeds?: string;
};


// GET handler
export async function GET(request: NextRequest) {
  try {
    // Extract token from headers
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.split('Bearer ')[1];

    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized. Missing token.' },
        { status: 401 }
      );
    }

    // Verify the token and extract user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    const userId = decoded.id;

    if (!userId) {
      return NextResponse.json(
        { message: 'Unauthorized. Invalid token.' },
        { status: 401 }
      );
    }

    // Fetch reservations for the user
    const reservations = await prisma.reservation.findMany({
      where: { userId },
      include: {
        details: true,
        pets: true, // Include related pets
      },
    });

    return NextResponse.json(reservations, { status: 200 });
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reservations' },
      { status: 500 }
    );
  }
}

// POST handler
// POST handler
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.split('Bearer ')[1];

    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized. Missing token.' },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    const userId = decoded.id;

    if (!userId) {
      return NextResponse.json(
        { message: 'Unauthorized. Invalid token.' },
        { status: 401 }
      );
    }

    const { bookings }: { bookings: { startDate: string; totalCost: number; service: number; addOns: number[]; pets: Pet[] }[] } = await request.json();

    if (!bookings || !Array.isArray(bookings) || bookings.length === 0) {
      return NextResponse.json(
        { message: 'No bookings provided or invalid format.' },
        { status: 400 }
      );
    }

    const availableAddOns = await prisma.addOn.findMany();

    const createdReservations = await Promise.all(
      bookings.map(async (booking) => {
        if (!booking.startDate || !booking.totalCost || !booking.service) {
          throw new Error('Invalid booking data');
        }

        const petIds = booking.pets.map((pet) => pet.id);

        const reservation = await prisma.reservation.create({
          data: {
            userId,
            totalPrice: booking.totalCost,
            startDate: new Date(booking.startDate),
            endDate: new Date(booking.startDate),
            pets: {
              connect: petIds.map((id) => ({ id })),
            },
            status: 'Confirmed',
          },
        });

        const detailsData = [
          {
            reservationId: reservation.id,
            serviceId: booking.service,
            price: booking.totalCost,
          },
          ...booking.addOns.map((addOnId) => ({
            reservationId: reservation.id,
            addOnId,
            price: availableAddOns.find((a) => a.id === addOnId)?.price || 0,
          })),
        ];

        await prisma.reservationDetail.createMany({
          data: detailsData.map((detail) => ({
            reservationId: detail.reservationId,
            serviceId: 'serviceId' in detail ? detail.serviceId : undefined,
            addOnId: 'addOnId' in detail ? detail.addOnId : undefined,
            price: detail.price,
          })),
        });

        return reservation;
      })
    );

    return NextResponse.json(createdReservations, { status: 201 });
  } catch (error: unknown) {
    console.error('Error creating reservations:', error);
    const message = error instanceof Error ? error.message : 'Internal server error.';
    return NextResponse.json({ message }, { status: 500 });
  }
}
