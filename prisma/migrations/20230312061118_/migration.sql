/*
  Warnings:

  - You are about to drop the `role` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "role";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Role" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ParticipantOnRole" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "participantId" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,
    CONSTRAINT "ParticipantOnRole_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT,
    CONSTRAINT "ParticipantOnRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT
);
INSERT INTO "new_ParticipantOnRole" ("id", "participantId", "roleId") SELECT "id", "participantId", "roleId" FROM "ParticipantOnRole";
DROP TABLE "ParticipantOnRole";
ALTER TABLE "new_ParticipantOnRole" RENAME TO "ParticipantOnRole";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
