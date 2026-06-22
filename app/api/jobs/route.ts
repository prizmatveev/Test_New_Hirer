import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getJobsFallback } from '@/lib/job-fallback';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  let jobs = [];

  try {
    jobs = await prisma.job.findMany({
      where: { isOpen: true },
      orderBy: { createdAt: 'desc' },
    });
  } catch {
    jobs = getJobsFallback();
  }

  return NextResponse.json(jobs, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    },
  });
}
