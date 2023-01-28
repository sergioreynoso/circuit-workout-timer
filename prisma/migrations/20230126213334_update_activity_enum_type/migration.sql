/*
  Warnings:

  - The values [EXERCISE,WARMUP,SET_REST] on the enum `Type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Type_new" AS ENUM ('WORK', 'REST');
ALTER TABLE "Activity" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "Activity" ALTER COLUMN "type" TYPE "Type_new" USING ("type"::text::"Type_new");
ALTER TYPE "Type" RENAME TO "Type_old";
ALTER TYPE "Type_new" RENAME TO "Type";
DROP TYPE "Type_old";
ALTER TABLE "Activity" ALTER COLUMN "type" SET DEFAULT 'WORK';
COMMIT;

-- AlterTable
ALTER TABLE "Activity" ALTER COLUMN "type" SET DEFAULT 'WORK';
