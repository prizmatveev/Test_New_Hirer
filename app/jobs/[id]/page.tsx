import Link from 'next/link';
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

export default async function JobDetail({ params }: { params: { id: string } }) {
  const job = await prisma.job.findUnique({
    where: { id: params.id },
    select: jobSelect,
  });

  if (!job) {
    return <div className='container py-20'>Job not found.</div>;
  }

  return (
    <main className='min-h-screen bg-[var(--bg)] py-10'>
      <div className='container'>
        <div className='rounded-3xl border border-[var(--line)] bg-gradient-to-b from-[var(--bg)] to-[var(--panel)] p-4 md:p-6'>
          <div className='rounded-2xl border border-[var(--line)] bg-white shadow-[0_12px_36px_rgba(31,31,31,0.06)] p-6 md:p-10 grid lg:grid-cols-[1fr_320px] gap-8'>
            <section className='space-y-6'>
              <div className='space-y-4'>
                <h1 className='text-4xl font-semibold'>{job.title}</h1>
                <p className='text-secondary'>
                  {job.category} • {job.location}
                </p>
                <p className='text-lg text-[var(--ink)]'>{job.description}</p>
              </div>

              <div className='grid gap-6 md:grid-cols-2'>
                <div>
                  <h2 className='font-semibold mb-3'>What you’ll do</h2>
                  <ul className='list-disc pl-6 text-secondary space-y-2'>
                    <li>Build elegant, performant features.</li>
                    <li>Partner with product and design teams.</li>
                    <li>Help shape our hiring and onboarding process.</li>
                  </ul>
                </div>
                <div>
                  <h2 className='font-semibold mb-3'>What we’re looking for</h2>
                  <ul className='list-disc pl-6 text-secondary space-y-2'>
                    <li>Curious, eager learners with strong collaboration skills.</li>
                    <li>{job.skills.join(', ')}</li>
                  </ul>
                </div>
              </div>

              {job.customQuestions.length > 0 && (
                <div>
                  <h2 className='font-semibold mb-3'>Custom Questions</h2>
                  <ul className='list-disc pl-6 text-secondary space-y-2'>
                    {job.customQuestions.map((question) => (
                      <li key={question}>{question}</li>
                    ))}
                  </ul>
                </div>
              )}
            </section>

            <aside className='lg:sticky lg:top-20 space-y-4'>
              <div className='rounded-3xl border border-[var(--line)] bg-white p-6 shadow-sm'>
                <p className='text-sm uppercase tracking-[0.3em] text-[var(--accent)]'>Ready to apply?</p>
                <p className='mt-4 text-lg text-[var(--ink)]'>Submit your information and resume for fast review.</p>
              </div>
              <div className='rounded-3xl border border-[var(--line)] bg-white p-4'>
                <Link href={`/apply/${job.id}`} className='btn-primary block w-full text-center'>
                  Apply Now
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
