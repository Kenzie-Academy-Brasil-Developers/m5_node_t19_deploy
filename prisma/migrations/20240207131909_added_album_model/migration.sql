-- CreateTable
CREATE TABLE "Album" (
    "id" BIGSERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "band" VARCHAR(255) NOT NULL,
    "yard" INTEGER NOT NULL,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);
