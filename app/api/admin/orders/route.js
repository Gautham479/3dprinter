import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/adminAuth';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const authed = await isAdminAuthenticated();
    if (!authed) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        items: true
      }
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Admin Orders Fetch Error:", error);
    return NextResponse.json({ error: 'Failed to fetch orders', details: error.message }, { status: 500 });
  }
}
