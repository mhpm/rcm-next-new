/*
  Warnings:

  - You are about to drop the column `skills` on the `members` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."members_church_id_idx";

-- DropIndex
DROP INDEX "public"."members_created_at_idx";

-- DropIndex
DROP INDEX "public"."members_email_idx";

-- DropIndex
DROP INDEX "public"."members_role_idx";

-- AlterTable
ALTER TABLE "members" DROP COLUMN "skills",
ALTER COLUMN "gender" SET DEFAULT 'MASCULINO';

-- CreateIndex
CREATE INDEX "members_id_first_name_email_role_created_at_church_id_idx" ON "members"("id", "first_name", "email", "role", "created_at", "church_id");
