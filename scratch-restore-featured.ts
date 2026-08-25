import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function main() {
  // Restore all categories to be featured so they show up in Featured Categories
  const res = await db.category.updateMany({ data: { isFeatured: true } });
  console.log(`Restored ${res.count} categories to isFeatured: true`);
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
