/*
  Warnings:

  - You are about to drop the column `fileUrl` on the `Document` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cloudinaryPublicId]` on the table `Document` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cloudinaryPublicId` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cloudinaryResourceType` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Document" DROP COLUMN "fileUrl",
ADD COLUMN     "cloudinaryPublicId" TEXT NOT NULL,
ADD COLUMN     "cloudinaryResourceType" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Document_cloudinaryPublicId_key" ON "Document"("cloudinaryPublicId");
