import { jobs } from '@/lib/data';

export function getJobsFallback() {
  return jobs.filter((job) => job.isOpen);
}

export function getJobFallback(id: string) {
  return jobs.find((job) => job.id === id) ?? null;
}
