/*
  Warnings:

  - You are about to drop the column `listingid` on the `skills` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "responses" DROP CONSTRAINT "responses_listingid_fkey";

-- DropForeignKey
ALTER TABLE "responses" DROP CONSTRAINT "responses_userid_fkey";

-- DropForeignKey
ALTER TABLE "skills" DROP CONSTRAINT "skills_listingid_fkey";

-- AlterTable
ALTER TABLE "skills" DROP COLUMN "listingid";

-- CreateTable
CREATE TABLE "skill_listing" (
    "listingid" INTEGER NOT NULL,
    "skillid" INTEGER NOT NULL,

    CONSTRAINT "skill_listing_pkey" PRIMARY KEY ("listingid","skillid")
);

-- AddForeignKey
ALTER TABLE "responses" ADD CONSTRAINT "responses_listingid_fkey" FOREIGN KEY ("listingid") REFERENCES "listings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "responses" ADD CONSTRAINT "responses_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skill_listing" ADD CONSTRAINT "skill_listing_listingid_fkey" FOREIGN KEY ("listingid") REFERENCES "listings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skill_listing" ADD CONSTRAINT "skill_listing_skillid_fkey" FOREIGN KEY ("skillid") REFERENCES "skills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
