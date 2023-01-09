-- CreateTable
CREATE TABLE "Pair" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pairName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "teamName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PairOnTeam" (
    "pairId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,

    PRIMARY KEY ("pairId", "teamId"),
    CONSTRAINT "PairOnTeam_pairId_fkey" FOREIGN KEY ("pairId") REFERENCES "Pair" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT,
    CONSTRAINT "PairOnTeam_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT
);

-- CreateTable
CREATE TABLE "ParticipantOnTeam" (
    "participantId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,

    PRIMARY KEY ("participantId", "teamId"),
    CONSTRAINT "ParticipantOnTeam_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT,
    CONSTRAINT "ParticipantOnTeam_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT
);

-- CreateTable
CREATE TABLE "ParticipantOnPair" (
    "participantId" TEXT NOT NULL,
    "pairId" TEXT NOT NULL,

    PRIMARY KEY ("participantId", "pairId"),
    CONSTRAINT "ParticipantOnPair_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT,
    CONSTRAINT "ParticipantOnPair_pairId_fkey" FOREIGN KEY ("pairId") REFERENCES "Pair" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT
);
