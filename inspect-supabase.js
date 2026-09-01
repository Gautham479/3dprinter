require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Connecting to Supabase...');
  try {
    // 1. Raw count and list of columns in Product table
    const columns = await prisma.$queryRawUnsafe(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'Product';
    `);
    console.log('\n--- PRODUCT TABLE COLUMNS ---');
    console.log(columns);

    // 2. Count total product rows in database via raw SQL
    const rawCountRes = await prisma.$queryRawUnsafe(`SELECT COUNT(*) FROM "Product";`);
    console.log('\n--- TOTAL RAW PRODUCT COUNT IN SUPABASE ---');
    console.log(rawCountRes);

    // 3. Fetch all product IDs and Names via raw SQL
    const products = await prisma.$queryRawUnsafe(`SELECT id, slug, name, price, "inStock", "isFeatured" FROM "Product" ORDER BY "createdAt" ASC;`);
    console.log(`\n--- ALL ${products.length} PRODUCTS IN SUPABASE ---`);
    console.log(products);

  } catch (err) {
    console.error('Error querying Supabase:', err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
