import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  id: number;
  email: string;
}

export async function GET(request: NextRequest, contextPromise:{ params: Promise<{ id: number }> }) {
  const token = getTokenFromHeader(request);
  if (!token) return unauthorized();

  const decoded = verifyToken(token);
  if (!decoded) return unauthorized();

  const adminUser = await prisma.user.findUnique({
    where: { id: decoded.id },
    select: { isAdmin: true },
  });

  if (!adminUser?.isAdmin) return forbidden();

  //const { params } = await contextPromise;
  const {id} = await contextPromise.params;

  const user = await prisma.user.findUnique({
    where: { id: id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      isAdmin: true,
      isActive: true,
    },
  });

  if (!user) return notFound();

  return NextResponse.json(user);
}

export async function PUT(request: NextRequest, context: { params: Promise<{ id: number }> }) {
  const token = getTokenFromHeader(request);
  if (!token) return unauthorized();

  const decoded = verifyToken(token);
  if (!decoded) return unauthorized();

  const adminUser = await prisma.user.findUnique({
    where: { id: decoded.id },
    select: { isAdmin: true },
  });

  if (!adminUser?.isAdmin) return forbidden();

  const { id } = await context.params;
  const body = await request.json();

  const updatedUser = await prisma.user.update({
    where: { id: id },
    data: {
      isAdmin: body.isAdmin,
      isActive: body.isActive,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      isAdmin: true,
      isActive: true,
    },
  });

  return NextResponse.json(updatedUser);
}

// ——— Helper functions ———
function getTokenFromHeader(req: NextRequest): string | null {
  const header = req.headers.get('authorization');
  if (header && header.startsWith('Bearer ')) {
    return header.split(' ')[1];
  }
  return null;
}

function verifyToken(token: string): DecodedToken | null {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
}

function unauthorized() {
  return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
}

function forbidden() {
  return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
}

function notFound() {
  return NextResponse.json({ message: 'User not found' }, { status: 404 });
}
