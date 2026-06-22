import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ApplyForm from '../ApplyForm';
import { getJobFallback } from '@/lib/job-fallback';

type Props = {
  params: { jobId: string };
};

async function getJob(jobId: string) {
  try {
    return await prisma.job.findFirst({
      where: {
        id: jobId,
        isOpen: true,
        openings: { gt: 0 },
      },
    });
  } catch {
    return getJobFallback(jobId);
  }
}

export default async function ApplyPage({ params }: Props) {
  const job = await getJob(params.jobId);

  if (!job) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[var(--bg)] py-12">
      <div className="container shell p-6 md:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="space-y-4">
            <div className="rounded-3xl border border-[var(--line)] bg-[var(--panel)] p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent)]">Application</p>
              <h1 className="mt-4 text-4xl font-semibold text-[var(--ink)]">Submit your application</h1>
              <p className="text-secondary mt-2 max-w-2xl">
                Share your details so we can review your fit for the role. We recommend attaching your resume for faster consideration.
              </p>
            </div>

            <ApplyForm
              jobId={job.id}
              title={job.title}
              category={job.category}
              location={job.location}
              employmentType={job.employmentType}
            />
          </section>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-[var(--line)] bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent)]">Role summary</p>
              <h2 className="mt-4 text-2xl font-semibold text-[var(--ink)]">{job.title}</h2>
              <p className="text-secondary mt-2">{job.category} · {job.employmentType} · {job.location}</p>
              <div className="mt-6 space-y-3 text-sm text-secondary">
                <div>
                  <p className="font-semibold text-[var(--ink)]">Skills</p>
                  <p>{job.skills.join(', ')}</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-[var(--line)] bg-[var(--panel)] p-6">
              <h3 className="text-xl font-semibold text-[var(--ink)]">Next steps</h3>
              <ol className="mt-4 space-y-3 list-decimal pl-5 text-secondary">
                <li>Submit your details and resume.</li>
                <li>Our team reviews your fit.</li>
                <li>We reach out when you are shortlisted.</li>
              </ol>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
