/*
  Warnings:

  - A unique constraint covering the columns `[mailAddress]` on the table `ParticipantMailAddress` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ParticipantMailAddress_mailAddress_key" ON "ParticipantMailAddress"("mailAddress");
