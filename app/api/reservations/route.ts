
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  id: number;
  email: string;
  iat: number;
  exp: number;
}

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

    const { bookings }: { bookings: { date: string; totalCost: number; service: number; addOns: number[]; pets: number[] }[] } = await request.json();

    if (!bookings || !Array.isArray(bookings) || bookings.length === 0) {
      return NextResponse.json(
        { message: 'No bookings provided or invalid format.' },
        { status: 400 }
      );
    }

    // Fetch addOns from the database to use for price calculation
    const availableAddOns = await prisma.addOn.findMany();

    const createdReservations = await Promise.all(
      bookings.map(async (booking) => {
        if (!booking.date || !booking.totalCost || !booking.service) {
          throw new Error('Invalid booking data');
        }

        // Create the reservation
        const reservation = await prisma.reservation.create({
          data: {
            userId,
            totalPrice: booking.totalCost,
            startDate: new Date(booking.date),
            endDate: new Date(booking.date), // Assuming single-day reservations
            pets: {
              connect: booking.pets.map((id) => ({ id })),
            },
            status: 'Confirmed',
          },
        });

        // Create reservation details (service + add-ons)
        const detailsData = [
          {
            reservationId: reservation.id,
            serviceId: booking.service,
            price: booking.totalCost, // Include the base service price
          },
          ...booking.addOns.map((addOnId) => ({
            reservationId: reservation.id,
            addOnId,
            price: availableAddOns.find((a) => a.id === addOnId)?.price || 0,
          })),
        ];

        await prisma.reservationDetail.createMany({
          data: detailsData,
        });

        return reservation;
      })
    );

    return NextResponse.json(createdReservations, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof SyntaxError) {
      console.error('Error creating reservations:', error.message);
      return NextResponse.json(
        { message: 'Invalid JSON payload.' },
        { status: 400 }
      );
    } else if (error instanceof Error) {
      console.error('Error creating reservations:', error.message);
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    } else {
      console.error('Unexpected error:', error);
      return NextResponse.json(
        { message: 'Internal server error.' },
        { status: 500 }
      );
    }
  }
  
}
