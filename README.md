# HireTech Platform

Minimal multi-page ATS-style hiring platform built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, Zustand, Prisma/PostgreSQL, and placeholder auth/upload integrations.

## Pages
- `/` homepage with category filtering, jobs list, and ATS sections
- `/jobs/[id]` job details with sticky apply sidebar
- `/apply/[jobId]` application form inspired by provided layouts
- `/admin/login`, `/admin/dashboard` recruiter panel

## Setup
1. `npm install`
2. `cp .env.example .env`
3. `npx prisma generate`
4. `npm run dev`

## Deploying with Prisma
- Local development migrations use `npm run prisma:migrate`.
- Vercel/production deployments use `npm run vercel-build`, which runs `prisma migrate deploy` before generating Prisma Client and building Next.js. This applies committed migrations, including the `Job.openings` and `Job.customQuestions` columns, to the database referenced by Vercel's `DATABASE_URL`.
- If jobs disappear in production and Vercel logs show `P2022` for a missing column such as `Job.openings`, the deployment database has not received the latest Prisma migration. Confirm Vercel is pointing at the intended database and redeploy so `prisma migrate deploy` can apply the checked-in migrations.

## Features
- Role-based admin middleware
- Job/application API routes
- Responsive design + subtle hover animations
- Resume upload field + validation placeholders
- Schema models for `User`, `Job`, `Application`, `AdminNotes`
