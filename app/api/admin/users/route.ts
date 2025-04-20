// app/api/admin/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number; email: string };

  const adminUser = await prisma.user.findUnique({
    where: { id: decoded.id },
    select: { isAdmin: true },
  });

  if (!adminUser?.isAdmin) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      isAdmin: true,
    },
  });

  return NextResponse.json(users);
}
