const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany();
  fs.writeFileSync('products.txt', products.map(p => p.name).join('\n'));
}

main().finally(() => prisma.$disconnect());
