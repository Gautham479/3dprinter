const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.count();
  const orders = await prisma.order.count();
  const contacts = await prisma.contact.count();
  const colors = await prisma.filamentColor.count();
  
  console.log({ products, orders, contacts, colors });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
