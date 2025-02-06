/*
  Warnings:

  - Added the required column `autrhorID` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "autrhorID" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_autrhorID_fkey" FOREIGN KEY ("autrhorID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
