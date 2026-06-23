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
  customQuestions: true,
  openings: true,
  isOpen: true,
  createdAt: true,
} as const;

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json();
  const updated = await prisma.job.update({ where: { id: params.id }, data, select: jobSelect });
  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const jobId = params.id;

  await prisma.$transaction(async (tx) => {
    const relatedApps = await tx.application.findMany({
      where: { jobId },
      select: { id: true },
    });

    if (relatedApps.length > 0) {
      const applicationIds = relatedApps.map((application) => application.id);

      await tx.adminNotes.deleteMany({
        where: { applicationId: { in: applicationIds } },
      });

      await tx.application.deleteMany({ where: { jobId } });
    }

    await tx.job.delete({ where: { id: jobId }, select: { id: true } });
  });

  return NextResponse.json({ ok: true });
}
