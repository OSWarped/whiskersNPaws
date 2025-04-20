import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET: Fetch all services
export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(services);
  } catch (error) {
    console.error('[GET] /api/admin/services:', error);
    return NextResponse.json({ message: 'Failed to fetch services' }, { status: 500 });
  }
}

// POST: Create a new service
export async function POST(req: NextRequest) {
  try {
    const { name, description, basePricePerDay } = await req.json();

    if (!name || !description || typeof basePricePerDay !== 'number') {
      return NextResponse.json({ message: 'Invalid service data' }, { status: 400 });
    }

    const newService = await prisma.service.create({
      data: { name, description, basePricePerDay },
    });

    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    console.error('[POST] /api/admin/services:', error);
    return NextResponse.json({ message: 'Failed to create service' }, { status: 500 });
  }
}
