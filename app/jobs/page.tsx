import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import OpenRoles from '@/components/OpenRoles';

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

type Props = {
  searchParams: {
    category?: string;
  };
};

export default async function JobsPage({ searchParams }: Props) {
  const category = searchParams.category?.trim() || 'Explore All Roles';
  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: 'desc' },
    select: jobSelect,
  });

  const categories = Array.from(
    new Set(['Explore All Roles', ...jobs.map((job) => job.category)]),
  );

  const selectedJobs =
    category === 'Explore All Roles'
      ? jobs
      : jobs.filter((job) => job.category === category);

  return (
    <main className="min-h-screen bg-[var(--bg)] py-10">
      <section className="container shell space-y-8">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent)]">Open Roles</p>
          <h1 className="text-5xl font-extrabold">Find your next role at LocalSM</h1>
          <p className="max-w-2xl text-lg text-secondary">
            Browse all active positions, filter by department, and apply with a modern candidate experience.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {categories.map((categoryLabel) => {
            const isActive = categoryLabel === category;
            const href =
              categoryLabel === 'Explore All Roles'
                ? '/jobs'
                : `/jobs?category=${encodeURIComponent(categoryLabel)}`;

            const linkProps = {
              pathname: categoryLabel === 'Explore All Roles' ? '/jobs' : '/jobs',
              query: categoryLabel === 'Explore All Roles' ? undefined : { category: categoryLabel },
            };

            return (
              <Link
                key={categoryLabel}
                href={linkProps}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[var(--accent)] text-[var(--ink)] border-transparent'
                    : 'bg-white text-secondary border-[var(--line)] hover:border-[var(--accent)]'
                }`}
              >
                {categoryLabel}
              </Link>
            );
          })}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-3xl border border-[var(--line)] bg-[var(--panel)] p-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent)]">Now hiring</p>
            <p className="text-2xl font-semibold text-[var(--ink)]">{selectedJobs.length} open {selectedJobs.length === 1 ? 'role' : 'roles'}</p>
          </div>
          <Link href="/" className="btn-secondary w-full text-center sm:w-auto">
            Back to homepage
          </Link>
        </div>
      </section>

      <OpenRoles roles={selectedJobs} />
    </main>
  );
}
