"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

type Role = {
  id: string;
  title: string;
  category: string;
  location: string;
  employmentType: string;
  openings?: number;
};

type Props = {
  roles: Role[];
};

export default function OpenRoles({ roles }: Props) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="roles" className="container py-10">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent)]">Open Roles</p>
        <h2 className="text-3xl font-bold text-[var(--ink)]">Explore the roles available now</h2>
      </div>
      {roles.length === 0 ? (
        <div className="rounded-2xl border border-[var(--line)] bg-white p-8 text-center text-[var(--ink)] shadow-sm">
          No open roles right now — check back soon.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {roles.map((role, index) => (
            <motion.div
              key={role.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: shouldReduceMotion ? 0 : index * 0.08 }}
              className="rounded-3xl border border-[var(--line)] bg-white p-5 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-[var(--ink)] mb-2">{role.title}</h3>
              <p className="text-sm text-secondary mb-2">{role.category} · {role.employmentType} · {role.location}</p>
              <p className="mb-4 text-sm text-secondary">Openings: {Math.max(1, Number(role.openings ?? 1))}</p>
              <Link href={`/jobs/${role.id}`} className="inline-flex items-center rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--ink)] transition hover:bg-[var(--hover)]">
                Apply
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
