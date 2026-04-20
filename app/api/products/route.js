import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeOutOfStock = searchParams.get('includeOutOfStock') === '1';
    const featuredOnly = searchParams.get('featured') === '1';

    let whereClause = {};
    if (!includeOutOfStock) whereClause.inStock = true;
    if (featuredOnly) whereClause.isFeatured = true;

    const products = await prisma.product.findMany({
      where: whereClause,
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json(products);
  } catch (error) {
    const details = error instanceof Error ? error.message : 'Unknown database error';
    return NextResponse.json({ error: `Failed to load products. ${details}` }, { status: 500 });
  }
}
