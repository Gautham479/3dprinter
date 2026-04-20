const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Clearing existing colors...");
  await prisma.filamentColor.deleteMany();

  const colors = [
    // PETG
    { name: 'Black', hex: '#111111', material: 'PETG' },
    { name: 'Grey', hex: '#6b7280', material: 'PETG' },
    // ABS
    { name: 'Black', hex: '#111111', material: 'ABS' },
    // TPU
    { name: 'Black', hex: '#111111', material: 'TPU' },
    // PLA
    { name: 'Black', hex: '#111111', material: 'PLA' },
    { name: 'Grey', hex: '#6b7280', material: 'PLA' },
    { name: 'White', hex: '#ffffff', material: 'PLA' },
    { name: 'Brown', hex: '#8b4513', material: 'PLA' },
    { name: 'Cream', hex: '#fffdd0', material: 'PLA' },
  ];

  console.log("Adding new default colors...");
  for (const color of colors) {
    await prisma.filamentColor.create({
      data: color
    });
    console.log(`Added ${color.name} for ${color.material}`);
  }

  console.log("All colors seeded successfully!");
}

main()
  .catch(e => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
