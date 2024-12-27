import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const addons = await prisma.addOn.findMany();
    return NextResponse.json(addons);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch add-ons' }, { status: 500 });
  }
}
