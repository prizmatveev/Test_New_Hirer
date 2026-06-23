import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const jobs = await prisma.job.findMany({
    where: {
      isOpen: true,
      openings: { gt: 0 },
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(jobs, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    },
  });
}
