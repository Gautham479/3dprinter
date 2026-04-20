import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    console.log("Clearing existing colors...");
    await prisma.filamentColor.deleteMany();

    const colors = [
      // PETG
      { name: 'Black', hex: '#111111', material: 'PETG' },
      { name: 'Grey', hex: '#6b7280', material: 'PETG' },
      // ABS
      { name: 'Black', hex: '#111111', material: 'ABS' },
      // TPU
      { name: 'Black', hex: '#111111', material: 'TPU' },
      // PLA
      { name: 'Black', hex: '#111111', material: 'PLA' },
      { name: 'Grey', hex: '#6b7280', material: 'PLA' },
      { name: 'White', hex: '#ffffff', material: 'PLA' },
      { name: 'Brown', hex: '#8b4513', material: 'PLA' },
      { name: 'Cream', hex: '#fffdd0', material: 'PLA' },
    ];

    console.log("Adding new default colors...");
    for (const color of colors) {
      await prisma.filamentColor.create({
        data: color
      });
    }

    return NextResponse.json({ success: true, message: "Colors seeded successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
