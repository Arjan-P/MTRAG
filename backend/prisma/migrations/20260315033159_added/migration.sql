/*
  Warnings:

  - A unique constraint covering the columns `[id,org_id]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Project_id_org_id_key" ON "Project"("id", "org_id");
