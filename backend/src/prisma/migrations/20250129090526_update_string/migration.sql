/*
  Warnings:

  - You are about to drop the column `name` on the `Post` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[namePost]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `namePost` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Post_nickName_key";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "name",
ADD COLUMN     "namePost" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Post_namePost_key" ON "Post"("namePost");
