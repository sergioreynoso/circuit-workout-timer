/*
  Warnings:

  - You are about to drop the `Exercises` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Exercises" DROP CONSTRAINT "Exercises_workoutsId_fkey";

-- DropTable
DROP TABLE "Exercises";

-- CreateTable
CREATE TABLE "Exercise" (
    "id" TEXT NOT NULL,
    "exercise_name" VARCHAR(50) NOT NULL,
    "type" "Type" NOT NULL DEFAULT 'EXERCISE',
    "duration" INTEGER NOT NULL DEFAULT 0,
    "workoutsId" TEXT NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_workoutsId_fkey" FOREIGN KEY ("workoutsId") REFERENCES "Workouts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
