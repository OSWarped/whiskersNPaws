import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Adjust the path as needed

export async function POST(request: NextRequest) {
  try {
    const { userId, name, type, breed, specialNeeds } = await request.json();

    if (!userId || !name || !type) {
      return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
    }

    const newPet = await prisma.pet.create({
      data: {
        userId,
        name,
        type,
        breed: breed || null,
        specialNeeds: specialNeeds || null,
      },
    });

    return NextResponse.json(newPet, { status: 201 });
  } catch (error) {
    console.error('Error adding pet:', error);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  }
}
