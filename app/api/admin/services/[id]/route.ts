import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;
  const { name, description, basePricePerDay } = await req.json();

  if (!name || !description || typeof basePricePerDay !== 'number') {
    return NextResponse.json({ message: 'Invalid data' }, { status: 400 });
  }

  try {
    const updatedService = await prisma.service.update({
      where: { id },
      data: { name, description, basePricePerDay },
    });

    return NextResponse.json(updatedService);
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json({ message: 'Update failed' }, { status: 500 });
  }
}
