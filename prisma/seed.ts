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

const participantData: Prisma.ParticipantCreateInput[] = [
  {
    id: '1',
    lastName: '山田',
    firstName: '太郎',
    ParticipantOnEnrollmentStatus: {
      create: {
        enrollmentStatusId: 1,
      },
    },
    ParticipantMailAddress: {
      create: {
        mailAddress: 'hoge@gmail.com',
      },
    },
  },
  {
    id: '2',
    lastName: '山田2',
    firstName: '太郎2',
    ParticipantOnEnrollmentStatus: {
      create: {
        enrollmentStatusId: 2,
      },
    },
    ParticipantMailAddress: {
      create: {
        mailAddress: 'hoge2@gmail.com',
      },
    },
  },
];

const taskData: Prisma.TaskCreateInput[] = [
  {
    id: '1',
    taskName: 'タスク1',
    ParticipantOnTask: {
      create: {
        participantId: '1',
        taskStatusId: 1,
      },
    },
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

  for (const d of participantData) {
    const data = await prisma.participant.create({
      data: d,
    });
  }

  for (const d of taskData) {
    const data = await prisma.task.create({
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
