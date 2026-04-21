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

export async function POST(request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();
    const { name, hex, material } = body;

    if (!name || !hex || !material) {
      return NextResponse.json({ error: 'Name, hex, and material are required.' }, { status: 400 });
    }

    const created = await prisma.filamentColor.create({
      data: { name, hex, material },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Error creating color:", error);
    return NextResponse.json({ error: 'Failed to create color: ' + (error.message || error.toString()) }, { status: 500 });
  }
}
