/*
  Warnings:

  - You are about to drop the column `workout_name` on the `Workout` table. All the data in the column will be lost.
  - Added the required column `name` to the `Workout` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Workout" RENAME COLUMN "workout_name" TO "name";