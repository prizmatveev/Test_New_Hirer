import React from 'react';

export default function WhyJoinUs() {
  const reasons = [
    { icon: '🚀', title: 'Real Projects', desc: 'Work on features actually shipping to LocalSM users.' },
    { icon: '🎓', title: 'Certificate of Completion', desc: 'Verified proof of your internship, ready for your resume.' },
    { icon: '📈', title: 'Career Growth', desc: 'Mentorship and a clear path from intern to full-time.' },
    { icon: '🎉', title: 'Fun & Inclusive Culture', desc: 'A small team that actually likes working together.' },
  ];

  return (
    <section className="container py-8">
      <div className="rounded-2xl bg-white shadow-md p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[var(--ink)]">Why Join LocalSM?</h2>
        <p className="text-secondary max-w-2xl mb-6">Work with a small, focused team building products that serve our city. Internships at LocalSM are hands-on, mentored, and designed to grow your career.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reasons.map((r) => (
            <div key={r.title} className="p-4 rounded-xl border border-[var(--line)] bg-white">
              <div className="text-3xl mb-3">{r.icon}</div>
              <h3 className="font-semibold text-lg mb-1">{r.title}</h3>
              <p className="text-sm text-secondary">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
