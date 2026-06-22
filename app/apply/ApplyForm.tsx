"use client";

import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type ApplyFormData = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  portfolio?: string;
  coverLetter?: string;
  currentCompany?: string;
  resume?: FileList;
};

type Props = {
  jobId: string;
  title: string;
  category: string;
  location: string;
  employmentType: string;
};

export default function ApplyForm({ jobId, title, category, location: jobLocation, employmentType }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ApplyFormData>();

  const onSubmit = async (data: ApplyFormData) => {
    if (!jobId) {
      toast.error('Invalid job link. Please open the role again.');
      return;
    }

    const formData = new FormData();
    formData.append('jobId', jobId);
    formData.append('fullName', data.fullName);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('location', data.location);
    formData.append('linkedin', data.linkedin);
    formData.append('github', data.github);
    if (data.currentCompany) formData.append('currentCompany', data.currentCompany);
    if (data.coverLetter) formData.append('coverLetter', data.coverLetter);
    if (data.portfolio) formData.append('portfolio', data.portfolio);
    if (data.resume?.[0]) {
      formData.append('resume', data.resume[0]);
    }

    const res = await fetch('/api/applications', { method: 'POST', body: formData });
    const payload = await res.json().catch(() => ({}));

    if (!res.ok) {
      toast.error(payload?.error || 'Failed to submit application');
      return;
    }

    toast.success('Application submitted successfully');
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card p-8 space-y-6 bg-[var(--panel)]">
      <div className="rounded-3xl border border-[var(--line)] bg-white p-6 shadow-sm">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent)]">Applying for</p>
        <h1 className="mt-2 text-3xl font-semibold text-[var(--ink)]">{title}</h1>
        <p className="text-secondary">{category} · {employmentType} · {jobLocation}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <label className="space-y-2">
          <span className="text-sm font-medium">Full Name *</span>
          <input className="border rounded-lg p-3 w-full" {...register('fullName', { required: true })} />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">Email *</span>
          <input type="email" className="border rounded-lg p-3 w-full" {...register('email', { required: true })} />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">Phone *</span>
          <input className="border rounded-lg p-3 w-full" {...register('phone', { required: true })} />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">Current Location *</span>
          <input className="border rounded-lg p-3 w-full" {...register('location', { required: true })} />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">Current Company</span>
          <input className="border rounded-lg p-3 w-full" {...register('currentCompany')} />
        </label>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <label className="space-y-2">
          <span className="text-sm font-medium">LinkedIn URL *</span>
          <input className="border rounded-lg p-3 w-full" {...register('linkedin', { required: true })} />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">GitHub URL *</span>
          <input className="border rounded-lg p-3 w-full" {...register('github', { required: true })} />
        </label>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <label className="space-y-2">
          <span className="text-sm font-medium">Portfolio URL</span>
          <input className="border rounded-lg p-3 w-full" {...register('portfolio')} />
        </label>
      </div>

      <label className="space-y-2">
        <span className="text-sm font-medium">Resume</span>
        <input type="file" accept=".pdf,.doc,.docx" className="w-full" {...register('resume')} />
      </label>

      <label className="space-y-2">
        <span className="text-sm font-medium">Cover Letter</span>
        <textarea className="border rounded-lg p-3 min-h-28 w-full" {...register('coverLetter')} />
      </label>

      <button disabled={isSubmitting} className="btn-primary w-full">
        {isSubmitting ? 'Submitting...' : 'Submit Your Application'}
      </button>

      {Object.keys(errors).length > 0 && (
        <p className="text-sm text-red-600">Please complete required fields marked with *</p>
      )}
    </form>
  );
}
