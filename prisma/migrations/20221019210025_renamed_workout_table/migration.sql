/*
  Warnings:

  - You are about to drop the `Workouts` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
ALTER TYPE "Type" ADD VALUE 'WARMUP';

-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_workoutsId_fkey";

-- DropForeignKey
ALTER TABLE "Workouts" DROP CONSTRAINT "Workouts_userId_fkey";

-- DropTable
DROP TABLE "Workouts";

-- CreateTable
CREATE TABLE "Workout" (
    "id" TEXT NOT NULL,
    "workout_name" VARCHAR(50) NOT NULL,
    "set_count" INTEGER NOT NULL DEFAULT 0,
    "set_rest" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Workout_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_workoutsId_fkey" FOREIGN KEY ("workoutsId") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;
