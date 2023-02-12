import { PrismaClient } from '@prisma/client';
import { enrollmentStatusSeedCreate } from './enrollmentStatus';
import { pairSeedCreate } from './pair';
import { taskStatusDataCreate } from './taskStatus';
import { teamSeedCreate } from './team';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  await enrollmentStatusSeedCreate();
  await taskStatusDataCreate();
  await pairSeedCreate();
  await teamSeedCreate();

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
