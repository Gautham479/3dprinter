import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const colors = await prisma.filamentColor.findMany({
      orderBy: { createdAt: 'asc' },
    });
    return NextResponse.json(colors);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load colors.' }, { status: 500 });
  }
}
