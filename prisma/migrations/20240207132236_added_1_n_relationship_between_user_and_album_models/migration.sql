/*
  Warnings:

  - You are about to drop the column `yard` on the `Album` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `Album` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Album` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Album" DROP COLUMN "yard",
ADD COLUMN     "ownerId" BIGINT NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
