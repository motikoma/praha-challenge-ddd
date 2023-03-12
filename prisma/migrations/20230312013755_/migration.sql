-- CreateTable
CREATE TABLE "ParticipantAuth" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "passwordHash" TEXT NOT NULL,
    CONSTRAINT "ParticipantAuth_id_fkey" FOREIGN KEY ("id") REFERENCES "Participant" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT
);

-- CreateTable
CREATE TABLE "role" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ParticipantOnRole" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "participantId" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,
    CONSTRAINT "ParticipantOnRole_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT,
    CONSTRAINT "ParticipantOnRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "role" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT
);
