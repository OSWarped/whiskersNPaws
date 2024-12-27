import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Ensure Prisma is set up properly
import jwt from 'jsonwebtoken'; // Ensure jsonwebtoken is installed

export async function GET(request: Request) {
  try {
    // Extract Authorization header
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json(
        { message: 'Unauthorized. Missing Authorization header.' },
        { status: 401 }
      );
    }

    // Extract the token from the header
    const token = authHeader.split('Bearer ')[1];
    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized. Invalid Authorization header format.' },
        { status: 401 }
      );
    }

    // Access JWT_SECRET from the environment variables
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      console.error('JWT_SECRET is not defined in the environment variables.');
      return NextResponse.json(
        { message: 'Internal server error.' },
        { status: 500 }
      );
    }

    // Verify and decode the JWT
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, JWT_SECRET) as { id: number; email: string };
    } catch (error) {
      console.error('Error verifying token:', error);
      return NextResponse.json(
        { message: 'Unauthorized. Invalid or expired token.' },
        { status: 401 }
      );
    }

    // Extract user ID from the decoded token
    const userId = decodedToken.id;
    if (!userId) {
      return NextResponse.json(
        { message: 'Unauthorized. User ID not found in token.' },
        { status: 401 }
      );
    }

    // Fetch pets associated with the user
    const pets = await prisma.pet.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        type: true,
        breed: true,
        specialNeeds: true,
      },
    });

    return NextResponse.json(pets);
  } catch (error) {
    console.error('Error fetching pets:', error);
    return NextResponse.json(
      { message: 'Internal server error.' },
      { status: 500 }
    );
  }
}
