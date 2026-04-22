import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Execute raw SQL to create the table
    const result = await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "FilamentColor" (
          "id" TEXT NOT NULL,
          "name" TEXT NOT NULL,
          "hex" TEXT NOT NULL,
          "material" TEXT NOT NULL,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL,
          CONSTRAINT "FilamentColor_pkey" PRIMARY KEY ("id")
      );
    `);
    
    return NextResponse.json({ success: true, result });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
