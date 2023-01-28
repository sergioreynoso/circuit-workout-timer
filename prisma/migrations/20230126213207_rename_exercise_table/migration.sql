/*
  Warnings:

  - You are about to drop the `Exercise` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_workoutId_fkey";

-- DropTable
DROP TABLE "Exercise";

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "activity_name" VARCHAR(50) NOT NULL,
    "type" "Type" NOT NULL DEFAULT 'EXERCISE',
    "duration" INTEGER NOT NULL DEFAULT 0,
    "display_seq" SERIAL NOT NULL,
    "workoutId" TEXT NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;
