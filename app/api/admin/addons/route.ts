import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET: Fetch all add-ons
export async function GET() {
  try {
    const addons = await prisma.addOn.findMany({
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(addons);
  } catch (error) {
    console.error('[GET] /api/admin/addons:', error);
    return NextResponse.json({ message: 'Failed to fetch add-ons' }, { status: 500 });
  }
}

// POST: Create a new add-on
export async function POST(req: NextRequest) {
  try {
    const { name, description, price } = await req.json();

    if (!name || !description || typeof price !== 'number') {
      return NextResponse.json({ message: 'Invalid add-on data' }, { status: 400 });
    }

    const newAddOn = await prisma.addOn.create({
      data: { name, description, price },
    });

    return NextResponse.json(newAddOn, { status: 201 });
  } catch (error) {
    console.error('[POST] /api/admin/addons:', error);
    return NextResponse.json({ message: 'Failed to create add-on' }, { status: 500 });
  }
}
