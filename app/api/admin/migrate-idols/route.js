import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdminAuthenticated } from '@/lib/adminAuth';

/**
 * One-time migration: merge all "Idols" tagged products into "Action Figures"
 * Call via GET /api/admin/migrate-idols (admin auth required)
 */
export async function GET() {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Find all products tagged as Idols (in tags array or legacy type field)
    const idolProducts = await prisma.product.findMany({
      where: {
        OR: [
          { tags: { has: 'Idols' } },
          { type: 'Idols' },
        ],
      },
    });

    if (idolProducts.length === 0) {
      return NextResponse.json({ message: 'No Idols products found. Nothing to migrate.', updated: 0 });
    }

    const results = [];

    for (const product of idolProducts) {
      // Replace "Idols" tag with "Action Figures" (avoid duplicates)
      const newTags = [
        ...product.tags.filter(t => t !== 'Idols'),
        ...(product.tags.includes('Action Figures') ? [] : ['Action Figures']),
      ];

      const newType = product.type === 'Idols' ? 'Action Figures' : product.type;

      await prisma.product.update({
        where: { id: product.id },
        data: { tags: newTags, type: newType },
      });

      results.push({
        name: product.name,
        oldTags: product.tags,
        newTags,
        oldType: product.type,
        newType,
      });
    }

    return NextResponse.json({
      message: `Successfully migrated ${results.length} product(s) from Idols → Action Figures`,
      updated: results.length,
      results,
    });
  } catch (error) {
    const details = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: `Migration failed: ${details}` }, { status: 500 });
  }
}
