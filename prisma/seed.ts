import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.adminNotes.deleteMany();
  await prisma.application.deleteMany();
  await prisma.job.deleteMany();

  await prisma.job.createMany({
    data: [
      {
        title: 'Full Stack Developer',
        category: 'Web Development',
        description: 'Build and ship modern web experiences for our local marketplace.',
        location: 'Jabalpur, India',
        salary: '₹25,000 - ₹40,000',
        experience: '2+ years experience building React/Next.js or similar applications.',
        employmentType: 'Full Time',
        skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
        openings: 1,
        customQuestions: [],
        isOpen: true,
      },
      {
        title: 'Mobile App Engineer',
        category: 'App Development',
        description: 'Deliver a polished mobile app experience across Android and iOS.',
        location: 'Remote / Hybrid',
        salary: '₹22,000 - ₹38,000',
        experience: 'Experience building React Native or Flutter applications.',
        employmentType: 'Full Time',
        skills: ['React Native', 'APIs', 'UI animations', 'Mobile performance'],
        openings: 1,
        customQuestions: [],
        isOpen: true,
      },
      {
        title: 'Graphic Designer',
        category: 'Graphics Design',
        description: 'Design fresh brand assets, landing pages, and product visuals.',
        location: 'Jabalpur, India',
        salary: '₹18,000 - ₹30,000',
        experience: 'Portfolio showing UI and marketing design work.',
        employmentType: 'Part Time',
        skills: ['Figma', 'Illustrator', 'Brand design', 'Layout'],
        openings: 1,
        customQuestions: [],
        isOpen: true,
      },
    ],
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
}).finally(() => prisma.$disconnect());
