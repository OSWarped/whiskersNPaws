import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  id: number;
  email: string;
  iat: number;
  exp: number;
}

export async function GET(request: NextRequest) {
  try {
    // ✅ Use Authorization header first
    const authHeader = request.headers.get('authorization');
    let token: string | undefined;

    if (authHeader?.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else {
      // ✅ Only fallback to cookie if no header
      token = request.cookies.get('authToken')?.value;
    }

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized - No token found' }, { status: 401 });
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
    return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
  }
}
