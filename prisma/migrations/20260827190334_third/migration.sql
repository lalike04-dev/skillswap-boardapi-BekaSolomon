/*
  Warnings:

  - You are about to drop the column `skillid` on the `listings` table. All the data in the column will be lost.
  - Added the required column `listingid` to the `skills` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "listings" DROP CONSTRAINT "listings_skillid_fkey";

-- AlterTable
ALTER TABLE "listings" DROP COLUMN "skillid";

-- AlterTable
ALTER TABLE "skills" ADD COLUMN     "listingid" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "skills" ADD CONSTRAINT "skills_listingid_fkey" FOREIGN KEY ("listingid") REFERENCES "listings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
