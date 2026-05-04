const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany();
  console.log(products.length, 'products found');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
