import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  id: number;
  email: string;
  iat: number; // Issued at
  exp: number; // Expiration time
}

export async function GET(request: NextRequest) {
  try {
    const tokenCookie = request.cookies.get('authToken');
    if (!tokenCookie || !tokenCookie.value) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const token = tokenCookie.value;
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
