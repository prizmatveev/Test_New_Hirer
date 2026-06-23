import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const job = await prisma.job.findFirst({
    where: {
      id: params.id,
      isOpen: true,
      openings: { gt: 0 },
    },
  });
  if (!job) {
    return NextResponse.json({ error: 'Job not found or no longer accepting applications' }, { status: 404 });
  }
  return NextResponse.json(job);
}
