import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Adjust path as needed

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params; // Await the promise to resolve params
    const userIdNum = parseInt(userId, 10);

    if (isNaN(userIdNum)) {
      return NextResponse.json({ message: 'Invalid user ID.' }, { status: 400 });
    }

    const reservations = await prisma.reservation.findMany({
      where: { userId: userIdNum },
      select: {
        id: true,
        startDate: true,
        endDate: true,
        totalPrice: true,
        status: true,
        details: true,
        user: {
          select: {
            pets: {
              select: {
                name: true,
                type: true,
                breed: true,
                specialNeeds: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(reservations, { status: 200 });
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  }
}
