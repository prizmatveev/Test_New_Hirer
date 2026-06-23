import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';

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

export async function GET() {
  return NextResponse.json(await prisma.job.findMany({ orderBy: { createdAt: 'desc' }, select: jobSelect }));
}

export async function POST(req: Request) {
  const data = await req.json();
  const { customQuestions: _customQuestions, ...jobData } = data;

  return NextResponse.json(
    await prisma.job.create({
      data: jobData,
      select: jobSelect,
    }),
  );
}
