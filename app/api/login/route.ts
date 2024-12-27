import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Adjust path as needed
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
    }

    // Find the user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ message: 'Invalid email or password.' }, { status: 401 });
    }

    // Verify the password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ message: 'Invalid email or password.' }, { status: 401 });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    // Set the token in cookies
    const response = NextResponse.json({ message: 'Login successful.', token }); // Include the token in the response
    response.cookies.set('authToken', token, { httpOnly: true, secure: true, path: '/' });

    return response;
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  }
}
