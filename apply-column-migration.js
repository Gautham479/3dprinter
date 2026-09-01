require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Running non-destructive migration on Supabase PostgreSQL...');
  try {
    const res1 = await prisma.$executeRawUnsafe(`
      ALTER TABLE "Product" 
      ADD COLUMN IF NOT EXISTS "discountPercentage" INTEGER NOT NULL DEFAULT 0;
    `);
    console.log('1. discountPercentage column check/add result:', res1);

    const res2 = await prisma.$executeRawUnsafe(`
      ALTER TABLE "Product" 
      ADD COLUMN IF NOT EXISTS "isDiscountEnabled" BOOLEAN NOT NULL DEFAULT true;
    `);
    console.log('2. isDiscountEnabled column check/add result:', res2);

    console.log('\n✅ Non-destructive column addition successful!');
  } catch (err) {
    console.error('Migration error:', err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
