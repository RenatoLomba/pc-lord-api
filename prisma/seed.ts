import { PrismaClient } from '@prisma/client';
import { roles } from './seeds/roles.seed';

const prisma = new PrismaClient();

async function main() {
  for (const role of roles) {
    await prisma.role.create({ data: role });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
