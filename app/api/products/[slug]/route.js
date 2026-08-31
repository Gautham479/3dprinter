import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(_, { params }) {
  const { slug } = await params;
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({
      ...product,
      discount_percentage: product.discountPercentage ?? 0,
      is_discount_enabled: product.isDiscountEnabled ?? true,
    });
  } catch (error) {
    const details = error instanceof Error ? error.message : 'Unknown database error';
    return NextResponse.json({ error: `Failed to load product. ${details}` }, { status: 500 });
  }
}
