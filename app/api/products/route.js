import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeOutOfStock = searchParams.get('includeOutOfStock') === '1';
    const featuredOnly = searchParams.get('featured') === '1';
    const categoryFilter = searchParams.get('category');

    let whereClause = {};
    if (!includeOutOfStock) whereClause.inStock = true;
    if (featuredOnly) whereClause.isFeatured = true;

    // Tag-based category filtering: match if tags array contains the category
    // Falls back to checking the legacy 'type' field for old products with no tags
    if (categoryFilter) {
      whereClause.OR = [
        { tags: { has: categoryFilter } },
        { AND: [{ tags: { isEmpty: true } }, { type: { equals: categoryFilter, mode: 'insensitive' } }] },
      ];
    }

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
