/*
  Warnings:

  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `nom` on the `Category` table. All the data in the column will be lost.
  - The `id` column on the `Category` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Comment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Comment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `FAQ` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `dateCreation` on the `FAQ` table. All the data in the column will be lost.
  - You are about to drop the column `reponse` on the `FAQ` table. All the data in the column will be lost.
  - The `id` column on the `FAQ` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `File` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cheminStockage` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `dateUpload` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `statutAccessibilite` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `statutTelechargement` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `titre` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `typeFichier` on the `File` table. All the data in the column will be lost.
  - The `id` column on the `File` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `dateEnvoi` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `statut` on the `Notification` table. All the data in the column will be lost.
  - The primary key for the `Rating` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `commentaire` on the `Rating` table. All the data in the column will be lost.
  - You are about to drop the column `dateEvaluation` on the `Rating` table. All the data in the column will be lost.
  - The `id` column on the `Rating` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `dateRequete` on the `Request` table. All the data in the column will be lost.
  - You are about to drop the column `statut` on the `Request` table. All the data in the column will be lost.
  - You are about to drop the column `titre` on the `Request` table. All the data in the column will be lost.
  - The primary key for the `Tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `nom` on the `Tag` table. All the data in the column will be lost.
  - The `id` column on the `Tag` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `dateInscription` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `matricule` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `motDePasse` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `nom` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `prenom` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `FileCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FileTag` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[regNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `fileId` on the `Comment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `answer` to the `FAQ` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `File` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `fileId` on the `Rating` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `title` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Tag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regNumber` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surname` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_fileId_fkey";

-- DropForeignKey
ALTER TABLE "FileCategory" DROP CONSTRAINT "FileCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "FileCategory" DROP CONSTRAINT "FileCategory_fileId_fkey";

-- DropForeignKey
ALTER TABLE "FileTag" DROP CONSTRAINT "FileTag_fileId_fkey";

-- DropForeignKey
ALTER TABLE "FileTag" DROP CONSTRAINT "FileTag_tagId_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_fileId_fkey";

-- DropIndex
DROP INDEX "Category_nom_key";

-- DropIndex
DROP INDEX "Tag_nom_key";

-- DropIndex
DROP INDEX "User_matricule_key";

-- AlterTable
ALTER TABLE "Category" DROP CONSTRAINT "Category_pkey",
DROP COLUMN "nom",
ADD COLUMN     "name" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Category_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "fileId",
ADD COLUMN     "fileId" INTEGER NOT NULL,
ADD CONSTRAINT "Comment_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "FAQ" DROP CONSTRAINT "FAQ_pkey",
DROP COLUMN "dateCreation",
DROP COLUMN "reponse",
ADD COLUMN     "answer" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "FAQ_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "File" DROP CONSTRAINT "File_pkey",
DROP COLUMN "cheminStockage",
DROP COLUMN "dateUpload",
DROP COLUMN "statutAccessibilite",
DROP COLUMN "statutTelechargement",
DROP COLUMN "titre",
DROP COLUMN "typeFichier",
ADD COLUMN     "isAccessible" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isDownloadable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "path" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "type" "FileType" NOT NULL,
ADD COLUMN     "uploadDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "File_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "dateEnvoi",
DROP COLUMN "statut",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_pkey",
DROP COLUMN "commentaire",
DROP COLUMN "dateEvaluation",
ADD COLUMN     "comment" TEXT,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "fileId",
ADD COLUMN     "fileId" INTEGER NOT NULL,
ADD CONSTRAINT "Rating_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Request" DROP COLUMN "dateRequete",
DROP COLUMN "statut",
DROP COLUMN "titre",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" "RequestStatus" NOT NULL DEFAULT 'EN_ATTENTE',
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_pkey",
DROP COLUMN "nom",
ADD COLUMN     "name" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Tag_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "dateInscription",
DROP COLUMN "matricule",
DROP COLUMN "motDePasse",
DROP COLUMN "nom",
DROP COLUMN "prenom",
ADD COLUMN     "firstname" TEXT NOT NULL,
ADD COLUMN     "inscriptionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "regNumber" TEXT NOT NULL,
ADD COLUMN     "surname" TEXT NOT NULL;

-- DropTable
DROP TABLE "FileCategory";

-- DropTable
DROP TABLE "FileTag";

-- CreateTable
CREATE TABLE "_FileToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_FileToTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CategoryToFile" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CategoryToFile_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_FileToTag_B_index" ON "_FileToTag"("B");

-- CreateIndex
CREATE INDEX "_CategoryToFile_B_index" ON "_CategoryToFile"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_regNumber_key" ON "User"("regNumber");

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FileToTag" ADD CONSTRAINT "_FileToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FileToTag" ADD CONSTRAINT "_FileToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToFile" ADD CONSTRAINT "_CategoryToFile_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToFile" ADD CONSTRAINT "_CategoryToFile_B_fkey" FOREIGN KEY ("B") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;
