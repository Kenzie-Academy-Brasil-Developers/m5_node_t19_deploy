/*
  Warnings:

  - A unique constraint covering the columns `[detailId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "detailId" BIGINT;

-- CreateIndex
CREATE UNIQUE INDEX "User_detailId_key" ON "User"("detailId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_detailId_fkey" FOREIGN KEY ("detailId") REFERENCES "Detail"("id") ON DELETE CASCADE ON UPDATE CASCADE;
