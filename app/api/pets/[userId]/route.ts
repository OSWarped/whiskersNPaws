import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params; // Await the promise to resolve the params
    const userIdNum = parseInt(userId, 10);

    if (isNaN(userIdNum)) {
      return NextResponse.json({ message: 'Invalid user ID.' }, { status: 400 });
    }

    const pets = await prisma.pet.findMany({
      where: { userId: userIdNum },
      select: {
        id: true,
        name: true,
        type: true,
        breed: true,
        specialNeeds: true,
      },
    });

    return NextResponse.json(pets, { status: 200 });
  } catch (error) {
    console.error('Error fetching pets:', error);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  }
}
