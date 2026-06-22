-- Align Job visibility fields with the original working hiring site.
ALTER TABLE "Job" ADD COLUMN IF NOT EXISTS "customQuestions" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "Job" ADD COLUMN IF NOT EXISTS "openings" INTEGER NOT NULL DEFAULT 1;

CREATE UNIQUE INDEX IF NOT EXISTS "Job_title_category_location_key" ON "Job"("title", "category", "location");
