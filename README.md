# Circuit Workout Timer
The Circuit Workout Timer web app is designed to help users track their work and rest periods during circuit training. The app allows users to create customizable workouts with exercises, rests, and sets. Users can track their current and upcoming exercise during the workout and monitor total workout time and remaining time.



## Features
- **Customizable Workouts:** Users can create workouts with exercises, rests, and sets tailored to their fitness goals.

- **Real-Time Tracking:** The app allows users to track their current and upcoming activities during the workout. The app displays the remaining time for the current exercise and the remaining time for the entire workout.

- **Cloud Storage:** Users can save their workouts in the cloud by creating a profile; This makes it easy to access their workouts from any device.

- **Secure Authentication:** The app uses NextAuth.js to authenticate users; This ensures that only authorized users have access to their workout data.

- **Database Integration:** User data is stored in a PostgreSQL database hosted on www.railway.app. This allows for secure and reliable storage of user data.

- **Voice Prompts:** The app uses Web Speech API to prompt the user about the current and next exercise.



## Inspiration
I was inspired to create this app during the pandemic lockdowns. At the time, I was laid off, stuck at home, and needed a way to stay mentally and physically healthy, so I took up kettlebell training. Circuit training is a popular way to train with kettlebells. A circuit can consist of 5 to 8 exercises, each performed for 30 to 90 seconds, one after the other. After completing a circuit, you take a 60 to 90-second break and then repeat the circuit 3 or more times. The challenge with circuit training is keeping track of time and exercise names and orders.

## Todo's
This app is in beta and is an ongoing passion project, here is a none-exhaustive, unordered, list of tasks I'm currently working on.

* Upgrade to Next.js 13.
* Port application to new Next 13 app directory.
* Ability to switch color themes (light and dark mode).
* Add anonymous auth sessions, so users don't have to login to try the app.
* Full accessability audit of all interactions with Voice Over on OSX/iOS and NVDA on windows.
* Create custom hook to handle voice prompts.
* Create a single Dialog component that is more composable and reusable. 
* Prevent screen from going to sleep on mobile devices.
* Use path alias for all imports.

