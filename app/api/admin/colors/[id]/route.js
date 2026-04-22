import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdminAuthenticated } from '@/lib/adminAuth';

async function requireAdmin() {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

export async function DELETE(request, { params }) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;
    console.log("Attempting to delete color with ID:", id);
    await prisma.filamentColor.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting color:", error);
    return NextResponse.json({ error: 'Failed to delete color: ' + (error.message || error.toString()) }, { status: 500 });
  }
}
