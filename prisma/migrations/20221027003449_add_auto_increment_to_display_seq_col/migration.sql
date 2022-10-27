-- AlterTable
CREATE SEQUENCE "exercise_display_seq_seq";
ALTER TABLE "Exercise" ALTER COLUMN "display_seq" SET DEFAULT nextval('exercise_display_seq_seq');
ALTER SEQUENCE "exercise_display_seq_seq" OWNED BY "Exercise"."display_seq";

-- AlterTable
CREATE SEQUENCE "workout_display_seq_seq";
ALTER TABLE "Workout" ALTER COLUMN "display_seq" SET DEFAULT nextval('workout_display_seq_seq');
ALTER SEQUENCE "workout_display_seq_seq" OWNED BY "Workout"."display_seq";
