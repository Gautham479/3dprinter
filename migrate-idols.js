/**
 * Migration script: merge "Idols" tag into "Action Figures"
 * - Finds all products tagged with "Idols"
 * - Replaces "Idols" with "Action Figures" (adds if not already present)
 * - Also updates the type field if it was "Idols"
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    // Find all products that have "Idols" in their tags or type
    const idolProducts = await prisma.product.findMany({
      where: {
        OR: [
          { tags: { has: 'Idols' } },
          { type: 'Idols' },
        ],
      },
    });

    console.log(`Found ${idolProducts.length} product(s) with "Idols" tag/type:\n`);
    idolProducts.forEach(p => console.log(` - ${p.name} | tags: [${p.tags.join(', ')}] | type: ${p.type}`));

    if (idolProducts.length === 0) {
      console.log('\nNo products to migrate.');
      return;
    }

    let updated = 0;
    for (const product of idolProducts) {
      // Build new tags: replace "Idols" with "Action Figures" (avoid duplicates)
      const newTags = product.tags
        .filter(t => t !== 'Idols')
        .concat(product.tags.includes('Action Figures') ? [] : ['Action Figures']);

      // If type was "Idols", set it to "Action Figures"
      const newType = product.type === 'Idols' ? 'Action Figures' : product.type;

      await prisma.product.update({
        where: { id: product.id },
        data: { tags: newTags, type: newType },
      });

      console.log(`\n✅ Updated: "${product.name}"`);
      console.log(`   tags: [${product.tags.join(', ')}] → [${newTags.join(', ')}]`);
      console.log(`   type: ${product.type} → ${newType}`);
      updated++;
    }

    console.log(`\n✅ Migration complete. ${updated} product(s) updated.`);
  } catch (e) {
    console.error('Migration failed:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
