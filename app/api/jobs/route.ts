import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const jobSelect = {
  id: true,
  title: true,
  category: true,
  description: true,
  location: true,
  salary: true,
  experience: true,
  employmentType: true,
  skills: true,
  openings: true,
  isOpen: true,
  createdAt: true,
} as const;

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: 'desc' },
    select: jobSelect,
  });

  return NextResponse.json(jobs, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    },
  });
}
