import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: number } >}) {
  const { id } = await params;
 // const id = parseInt(params.id);
  const { name, description, price } = await req.json();

  if (!name || !description || typeof price !== 'number') {
    return NextResponse.json({ message: 'Invalid data' }, { status: 400 });
  }

  try {
    const updatedAddOn = await prisma.addOn.update({
      where: { id },
      data: { name, description, price },
    });

    return NextResponse.json(updatedAddOn);
  } catch (error) {
    console.error('Error updating add-on:', error);
    return NextResponse.json({ message: 'Update failed' }, { status: 500 });
  }
}
