"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Handshake, Store, ShoppingBag, Building2, Users, ShieldCheck, Truck } from "lucide-react";
import CountUp from "@/components/CountUp";
import OpenRoles from "@/components/OpenRoles";
import WhyJoinUs from "@/components/WhyJoinUs";
import { Navbar } from "@/components/layout/navbar";
import { useAppStore } from "@/lib/store";
import { useEffect, useState } from "react";

type Job = {
  id: string;
  title: string;
  category: string;
  location: string;
  employmentType: string;
};

export default function Home() {
  const { category, setCategory } = useAppStore();
  const [jobs, setJobs] = useState<Job[]>([]);

  const loadJobs = async () => {
    const res = await fetch('/api/jobs', { cache: 'no-store' });
    if (!res.ok) return;
    setJobs(await res.json());
  };

  useEffect(() => {
    void loadJobs();

    const intervalId = window.setInterval(() => {
      void loadJobs();
    }, 5000);

    const handleFocus = () => {
      void loadJobs();
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleFocus);

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleFocus);
    };
  }, []);

  const categories = [
    'Explore All Roles',
    ...Array.from(new Set(jobs.map((job) => job.category).filter(Boolean))),
  ];
  const filters = categories;
  const filtered = category === 'Explore All Roles' ? jobs : jobs.filter((j) => j.category === category);
  const previewJobs = filtered.slice(0, 6);

  return (
    <main className="pb-12">
      <Navbar />
      <section className="container shell p-8 md:p-12 grid lg:grid-cols-2 gap-8 items-center relative overflow-hidden futuristic-hero">
        <div className="absolute inset-0 pointer-events-none">
          <div className="futuristic-grid" />
          <div className="futuristic-ring left-8 top-10" />
          <div className="futuristic-ring right-12 bottom-12" />
          <div className="futuristic-sparkle top-20 left-1/3" />
          <div className="futuristic-sparkle bottom-16 right-1/4" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="space-y-6 relative z-10"
        >
          <h1 className="text-5xl md:text-6xl leading-tight font-extrabold">Work with Us</h1>
          <p className="text-secondary text-lg max-w-xl">Find jobs that match your interests and abilities with a minimal, modern hiring experience.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/jobs" className="btn-primary inline-flex items-center justify-center">
              Get Started
            </Link>
            <Link href="/jobs" className="btn-secondary inline-flex items-center justify-center">
              Explore Roles
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="relative rounded-3xl border border-[var(--line)] bg-[var(--card)]/90 p-6 shadow-[0_40px_90px_rgba(31,31,31,0.12)] overflow-hidden backdrop-blur-xl"
        >
          <div className="absolute -left-8 -top-6 h-32 w-32 rounded-full bg-[var(--accent)]/20 blur-3xl" />
          <div className="absolute -right-10 bottom-4 h-40 w-40 rounded-full bg-[var(--navbar)]/50 blur-3xl" />
          <motion.div
            drag
            dragMomentum={false}
            dragElastic={0.18}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mx-auto max-w-md cursor-grab touch-none hero-float"
          >
            <Image src="/hero-placeholder.png" alt="Hero image placeholder" width={720} height={420} className="rounded-3xl shadow-2xl object-cover" priority />
          </motion.div>
        </motion.div>
      </section>

      <section className="container -mt-8 relative z-10">
        <div className="relative rounded-full bg-[var(--panel)] p-1">
          <div className="grid grid-cols-4 gap-3">
            {filters.map((filter) => {
              const isActive = category === filter;
              return (
                <button
                  key={filter}
                  onClick={() => {
                    setCategory(filter);
                    document.getElementById('roles')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`relative z-10 rounded-full px-4 py-2 text-sm font-medium transition-colors ${isActive ? 'text-black' : 'text-gray-500'}`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
          <motion.div
            layout
            className="pointer-events-none absolute inset-y-1 left-0 rounded-full bg-[var(--accent)]"
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            style={{ width: `${100 / filters.length}%`, transform: `translateX(${filters.indexOf(category) * 100}%)` }}
          />
        </div>
      </section>

      <WhyJoinUs />

      <OpenRoles roles={previewJobs} />

      {filtered.length > previewJobs.length && (
        <div className="container mb-10 text-right">
          <Link href="/jobs" className="text-sm font-semibold text-[var(--accent)] hover:underline">
            View all {filtered.length} roles →
          </Link>
        </div>
      )}

      <section id="about" className="container py-6 space-y-5">
        <div className="card p-6">
          <h2 className="text-2xl font-bold mb-2">About LocalSM</h2>
          <p className="text-secondary">Jabalpur's premier online marketplace, connecting buyers and sellers within our city. Empowering local businesses and making shopping convenient for everyone.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Handshake, value: 12, suffix: '+', label: 'Interns Onboarded' },
            { icon: Store, value: 40, suffix: '%', label: 'Convert to Full-time' },
            { icon: ShoppingBag, value: 19, suffix: '+', label: 'Roles Open' },
            { icon: Building2, value: 2024, suffix: '', label: 'Founded' },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.08, duration: 0.5, ease: 'easeOut' }}
              className="card p-6 text-center"
            >
              <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-[var(--accent)] text-[var(--ink)] grid place-items-center"><item.icon size={24} /></div>
              <CountUp value={item.value} suffix={item.suffix} />
              <p className="text-secondary mt-1">{item.label}</p>
            </motion.div>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { icon: Store, title: 'Local Products', text: 'Curated selection of products from Jabalpur sellers' },
            { icon: Users, title: 'Community First', text: 'Supporting local businesses and entrepreneurs' },
            { icon: ShieldCheck, title: 'Secure Shopping', text: 'Safe transactions with Cash on Delivery' },
            { icon: Truck, title: 'Fast Delivery', text: 'Quick delivery within Jabalpur city' },
          ].map((item) => (
            <div key={item.title} className="card p-6 text-center">
              <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-[var(--accent)] text-[var(--ink)] grid place-items-center"><item.icon size={24} /></div>
              <h3 className="text-2xl font-semibold">{item.title}</h3>
              <p className="text-secondary mt-2">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="container py-2">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="card p-5"><p className="text-sm text-secondary">Email</p><p className="font-semibold break-all">founder@localsm.com</p></div>
          <div className="card p-5"><p className="text-sm text-secondary">Email</p><p className="font-semibold break-all">management@localsm.com</p></div>
          <div className="card p-5"><p className="text-sm text-secondary">Address</p><p className="font-semibold">Jabalpur</p></div>
        </div>
      </section>

    </main>
  );
}
