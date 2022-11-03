export { default } from "next-auth/middleware";

// // See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/dashboard",
    "/workout/:path*",
    "/editWorkout/:path*",
    "/api/workouts",
    "/api/createWorkout",
    "/api/updateExercise",
    "/api/deleteWorkout",
    "/api/createExercise",
    "/api/deleteExercise",
    "/api/updateExercise",
    "/api/createExercise",
  ],
};
