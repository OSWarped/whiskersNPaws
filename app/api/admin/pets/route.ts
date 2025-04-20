import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  id: number;
  email: string;
}

export async function GET(request: NextRequest) {
  const token = request.headers.get('authorization')?.split(' ')[1];

  if (!token || !process.env.JWT_SECRET) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

    // Check if user is an admin
    const adminUser = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { isAdmin: true },
    });

    if (!adminUser?.isAdmin) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    // Fetch pets and their owners
    const pets = await prisma.pet.findMany({
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: { name: 'asc' },
    });

    return NextResponse.json(pets);
  } catch (err) {
    console.error('Error fetching pets:', err);
    return NextResponse.json({ message: 'Error fetching pets' }, { status: 500 });
  }
}
