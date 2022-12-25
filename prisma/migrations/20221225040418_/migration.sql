-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "authorId" INTEGER,
    CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Participant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "EnrollmentStatus" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ParticipantOnEnrollmentStatus" (
    "participantId" TEXT NOT NULL,
    "enrollmentStatusId" TEXT NOT NULL,

    PRIMARY KEY ("participantId", "enrollmentStatusId"),
    CONSTRAINT "ParticipantOnEnrollmentStatus_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT,
    CONSTRAINT "ParticipantOnEnrollmentStatus_enrollmentStatusId_fkey" FOREIGN KEY ("enrollmentStatusId") REFERENCES "EnrollmentStatus" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT
);

-- CreateTable
CREATE TABLE "ParticipantMailAddress" (
    "participantId" TEXT NOT NULL PRIMARY KEY,
    "mailAddress" TEXT NOT NULL,
    CONSTRAINT "ParticipantMailAddress_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
