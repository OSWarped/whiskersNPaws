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
    let token: string | undefined = request.cookies.get('authToken')?.value;

    // Fallback to localStorage token if not found in cookies
    if (!token) {
      const storedToken = request.headers.get('x-access-token'); // Pass the token manually if needed
      token = storedToken || undefined; // Ensure token is string or undefined
    }

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

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
