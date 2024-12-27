import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  id: number;
  email: string;
  iat: number; // Issued at
  exp: number; // Expiration time
}

// GET handler
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const resolvedParams = await params;
    const userId = parseInt(resolvedParams.userId, 10);

    if (isNaN(userId)) {
      return NextResponse.json({ message: 'Invalid user ID.' }, { status: 400 });
    }

    const reservations = await prisma.reservation.findMany({
      where: { userId },
      include: { details: true }, // Fetch related details
    });

    return NextResponse.json(reservations, { status: 200 });
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return NextResponse.json({ error: 'Failed to fetch reservations' }, { status: 500 });
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

    const { bookings } = await request.json();

    if (!bookings || bookings.length === 0) {
      return NextResponse.json(
        { message: 'No bookings provided.' },
        { status: 400 }
      );
    }

    // Create reservations for each booking
    const createdReservations = await Promise.all(
      bookings.map((booking: { totalCost: number; start: string; end?: string; petIds?: number[] }) =>
        prisma.reservation.create({
          data: {
            userId: Number(userId),
            totalPrice: booking.totalCost,
            startDate: new Date(booking.start),
            endDate: new Date(booking.end || booking.start),
            pets: {
              connect: booking.petIds?.map((id) => ({ id })), // Connect pets
            },
            status: 'Confirmed',
          },
        })
      )
    );

    return NextResponse.json(createdReservations, { status: 201 });
  } catch (error) {
    console.error('Error creating reservations:', error);
    return NextResponse.json(
      { message: 'Internal server error.' },
      { status: 500 }
    );
  }
}
