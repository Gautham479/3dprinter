import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/adminAuth';

const prisma = new PrismaClient();

export async function PATCH(req, { params }) {
  try {
    const authed = await isAdminAuthenticated();
    if (!authed) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { orderId } = params;
    const body = await req.json();
    const { status } = body;

    if (!orderId || !status) {
      return NextResponse.json({ error: 'Order ID and status are required' }, { status: 400 });
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status }
    });

    return NextResponse.json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error("Admin Order Update Error:", error);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
