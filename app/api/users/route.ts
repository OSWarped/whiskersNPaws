import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      zip,
      latitude,
      longitude,
      password,
    } = data;

    // Validation: Ensure all required fields are provided
    if (!firstName || !lastName || !email || !password || !addressLine1 || !city || !state || !zip) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'A user with this email already exists' },
        { status: 409 }
      );
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        addressLine1,
        addressLine2,
        city,
        state,
        zip,
        latitude,
        longitude,
        password: hashedPassword,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    // Handle the 'unknown' type of the error
    if (error instanceof Error) {
      console.error('Error creating user:', error.message);
      return NextResponse.json(
        { error: 'Failed to create user', details: error.message },
        { status: 500 }
      );
    }

    // Fallback for non-Error types (unexpected cases)
    console.error('Unknown error occurred during user creation:', error);
    return NextResponse.json(
      { error: 'Failed to create user due to an unknown error' },
      { status: 500 }
    );
  }
}
