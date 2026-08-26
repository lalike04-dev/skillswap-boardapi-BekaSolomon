/*
  Warnings:

  - Changed the type of `list_type` on the `listings` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `name` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "listing_type" AS ENUM ('Offering', 'Recieving');

-- AlterTable
ALTER TABLE "listings" DROP COLUMN "list_type",
ADD COLUMN     "list_type" "listing_type" NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "name" SET NOT NULL;
