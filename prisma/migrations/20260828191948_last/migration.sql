-- DropForeignKey
ALTER TABLE "responses" DROP CONSTRAINT "responses_listingid_fkey";

-- DropForeignKey
ALTER TABLE "skill_listing" DROP CONSTRAINT "skill_listing_listingid_fkey";

-- DropForeignKey
ALTER TABLE "skill_listing" DROP CONSTRAINT "skill_listing_skillid_fkey";

-- AddForeignKey
ALTER TABLE "responses" ADD CONSTRAINT "responses_listingid_fkey" FOREIGN KEY ("listingid") REFERENCES "listings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skill_listing" ADD CONSTRAINT "skill_listing_listingid_fkey" FOREIGN KEY ("listingid") REFERENCES "listings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skill_listing" ADD CONSTRAINT "skill_listing_skillid_fkey" FOREIGN KEY ("skillid") REFERENCES "skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;
