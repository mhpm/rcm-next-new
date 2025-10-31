-- DropIndex
DROP INDEX "public"."members_id_first_name_email_role_created_at_church_id_idx";

-- CreateIndex
CREATE INDEX "members_email_idx" ON "members"("email");

-- CreateIndex
CREATE INDEX "members_role_idx" ON "members"("role");

-- CreateIndex
CREATE INDEX "members_created_at_idx" ON "members"("created_at");

-- CreateIndex
CREATE INDEX "members_church_id_idx" ON "members"("church_id");
