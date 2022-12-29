/*
  Warnings:

  - The primary key for the `ParticipantOnEnrollmentStatus` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ParticipantOnEnrollmentStatus" (
    "participantId" TEXT NOT NULL PRIMARY KEY,
    "enrollmentStatusId" TEXT NOT NULL,
    CONSTRAINT "ParticipantOnEnrollmentStatus_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT,
    CONSTRAINT "ParticipantOnEnrollmentStatus_enrollmentStatusId_fkey" FOREIGN KEY ("enrollmentStatusId") REFERENCES "EnrollmentStatus" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT
);
INSERT INTO "new_ParticipantOnEnrollmentStatus" ("enrollmentStatusId", "participantId") SELECT "enrollmentStatusId", "participantId" FROM "ParticipantOnEnrollmentStatus";
DROP TABLE "ParticipantOnEnrollmentStatus";
ALTER TABLE "new_ParticipantOnEnrollmentStatus" RENAME TO "ParticipantOnEnrollmentStatus";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
