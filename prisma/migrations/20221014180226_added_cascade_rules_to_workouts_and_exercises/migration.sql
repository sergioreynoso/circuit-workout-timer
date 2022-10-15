-- DropForeignKey
ALTER TABLE "Exercises" DROP CONSTRAINT "Exercises_workoutsId_fkey";

-- DropForeignKey
ALTER TABLE "Workouts" DROP CONSTRAINT "Workouts_userId_fkey";

-- AddForeignKey
ALTER TABLE "Workouts" ADD CONSTRAINT "Workouts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercises" ADD CONSTRAINT "Exercises_workoutsId_fkey" FOREIGN KEY ("workoutsId") REFERENCES "Workouts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
