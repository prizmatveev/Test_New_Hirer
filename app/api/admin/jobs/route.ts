import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';

function sanitizeCustomQuestions(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.map((question) => String(question).trim()).filter(Boolean);
}

export async function GET() {
  return NextResponse.json(await prisma.job.findMany({ orderBy: { createdAt: 'desc' } }));
}

export async function POST(req: Request) {
  const data = await req.json();
  const customQuestions = sanitizeCustomQuestions(data.customQuestions);
  const openings = Math.max(0, Number(data.openings ?? 1));

  const createData: Prisma.JobCreateInput = {
    title: data.title,
    category: data.category,
    description: data.description,
    location: data.location,
    salary: data.salary,
    experience: data.experience,
    employmentType: data.employmentType,
    skills: Array.isArray(data.skills) ? data.skills.map(String) : [],
    customQuestions,
    openings,
    isOpen: data.isOpen ?? true,
  };

  return NextResponse.json(await prisma.job.create({ data: createData }));
}
