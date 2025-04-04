import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Adjust the path as needed
import bcrypt from 'bcrypt';
import { signJwt } from '@/lib/jwt';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const {
      firstName,
      lastName,
      email,
      password,
      addressLine1,
      addressLine2,
      city,
      state,
      zip,
      phone,
    } = await request.json();

    // Validate input
    if (!firstName || !lastName || !email || !password || !addressLine1 || !city || !state || !zip) {
      return NextResponse.json(
        { message: 'All required fields must be provided.' },
        { status: 400 }
      );
    }

    // Check if the email is already registered
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json(
        { message: 'Email is already registered.' },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phone: phone || null,
        addressLine1,
        addressLine2: addressLine2 || null,
        city,
        state,
        zip,
      },
    });

    // ✅ Generate a token
    const token = signJwt({ id: newUser.id, email: newUser.email });

    // ✅ Return success response with token
    return NextResponse.json(
      {
        message: 'User registered successfully!',
        user: { id: newUser.id, email: newUser.email },
        token,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json(
      { message: 'Internal server error.' },
      { status: 500 }
    );
  }
}
