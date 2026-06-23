import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';

const sanitizeCustomQuestions = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];
  return Array.from(
    new Set(
      value
        .map((entry) => (typeof entry === 'string' ? entry.trim() : ''))
        .filter(Boolean),
    ),
  );
};

export async function GET() {
  return NextResponse.json(await prisma.job.findMany({ orderBy: { createdAt: 'desc' } }));
}

export async function POST(req: Request) {
  const data = await req.json();
  const customQuestions = sanitizeCustomQuestions(data.customQuestions);

  return NextResponse.json(
    await prisma.job.create({
      data: {
        ...data,
        customQuestions,
      },
    }),
  );
}
