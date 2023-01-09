import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

// https://github.com/Quramy/prisma-fabbrica
// initialize({ prisma });

// const userData: Prisma.UserCreateInput[] = [
//   {
//     name: 'Alice',
//     email: 'alice@prisma.io',
//     posts: {
//       create: [
//         {
//           title: 'Join the Prisma Slack',
//           content: 'https://slack.prisma.io',
//           published: true,
//         },
//       ],
//     },
//   },
//   {
//     name: 'Nilu',
//     email: 'nilu@prisma.io',
//     posts: {
//       create: [
//         {
//           title: 'Follow Prisma on Twitter',
//           content: 'https://www.twitter.com/prisma',
//           published: true,
//         },
//       ],
//     },
//   },
//   {
//     name: 'Mahmoud',
//     email: 'mahmoud@prisma.io',
//     posts: {
//       create: [
//         {
//           title: 'Ask a question about Prisma on GitHub',
//           content: 'https://www.github.com/prisma/prisma/discussions',
//           published: true,
//         },
//         {
//           title: 'Prisma on YouTube',
//           content: 'https://pris.ly/youtube',
//         },
//       ],
//     },
//   },
// ];

const enrollmentStatusData: Prisma.EnrollmentStatusCreateInput[] = [
  {
    id: 1,
    status: '在籍中',
  },
  {
    id: 2,
    status: '休会中',
  },
  {
    id: 3,
    status: '退会済み',
  },
];

const taskStatusData: Prisma.TaskStatusCreateInput[] = [
  {
    id: 1,
    status: '未着手',
  },
  {
    id: 2,
    status: 'レビュー待ち',
  },
  {
    id: 3,
    status: '完了',
  },
];

const teamData: Prisma.TeamCreateInput[] = [
  {
    id: '1',
    teamName: '1',
  },
  {
    id: '2',
    teamName: '2',
  },
];

const pairData: Prisma.PairCreateInput[] = [
  {
    id: '1',
    pairName: 'a',
  },
  {
    id: '2',
    pairName: 'b',
  },
  {
    id: '3',
    pairName: 'c',
  },
  {
    id: '4',
    pairName: 'd',
  },
];

const taskData: Prisma.TaskCreateInput[] = [
  {
    id: '1',
    taskName: 'タスク1',
  },
  {
    id: '2',
    taskName: 'タスク2',
  },
  {
    id: '3',
    taskName: 'タスク3',
  },
];

async function main() {
  console.log(`Start seeding ...`);
  // for (const u of userData) {
  //   const user = await prisma.user.create({
  //     data: u,
  //   });
  //   console.log(`Created user with id: ${user.id}`);
  // }

  for (const d of enrollmentStatusData) {
    const data = await prisma.enrollmentStatus.create({
      data: d,
    });
  }

  for (const d of taskStatusData) {
    const data = await prisma.taskStatus.create({
      data: d,
    });
  }

  for (const d of taskData) {
    const data = await prisma.task.create({
      data: d,
    });
  }

  for (const d of teamData) {
    const data = await prisma.team.create({
      data: d,
    });
  }

  for (const d of pairData) {
    const data = await prisma.pair.create({
      data: d,
    });
  }

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
