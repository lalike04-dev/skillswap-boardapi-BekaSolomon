/*
  Warnings:

  - A unique constraint covering the columns `[title,description]` on the table `listings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "listings_title_description_key" ON "listings"("title", "description");
