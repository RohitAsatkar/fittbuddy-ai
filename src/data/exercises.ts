import { Exercise } from "@/types";

// Sample exercises database
export const exercises: Record<string, Exercise> = {
  pushups: {
    id: "pushups",
    name: "Push-Ups",
    description: "A classic exercise that works your chest, shoulders, and triceps.",
    sets: 3,
    reps: "10-12",
    restTime: 60,
    muscleGroup: "chest"
  },
  squats: {
    id: "squats",
    name: "Bodyweight Squats",
    description: "A fundamental lower body exercise targeting your quadriceps, hamstrings and glutes.",
    sets: 3,
    reps: "15-20",
    restTime: 60,
    muscleGroup: "legs"
  },
  lunges: {
    id: "lunges",
    name: "Walking Lunges",
    description: "A great exercise for your legs, focusing on balance and unilateral strength.",
    sets: 3,
    reps: "10 each leg",
    restTime: 60,
    muscleGroup: "legs"
  },
  plank: {
    id: "plank",
    name: "Plank",
    description: "An isometric core exercise that improves your stability and posture.",
    sets: 3,
    reps: "30-60 seconds",
    restTime: 60,
    muscleGroup: "core"
  },
  jumpingJacks: {
    id: "jumpingJacks",
    name: "Jumping Jacks",
    description: "A cardio exercise that raises your heart rate and warms up your whole body.",
    sets: 3,
    reps: "30 seconds",
    restTime: 30,
    muscleGroup: "full body"
  },
  mountainClimbers: {
    id: "mountainClimbers",
    name: "Mountain Climbers",
    description: "A dynamic exercise that targets your core while elevating your heart rate.",
    sets: 3,
    reps: "20 each leg",
    restTime: 45,
    muscleGroup: "core"
  },
  burpees: {
    id: "burpees",
    name: "Burpees",
    description: "A full-body exercise that combines a push-up with a jump for maximum intensity.",
    sets: 3,
    reps: "10-15",
    restTime: 60,
    muscleGroup: "full body"
  },
  russianTwists: {
    id: "russianTwists",
    name: "Russian Twists",
    description: "A rotational core exercise that targets your obliques.",
    sets: 3,
    reps: "20 total (10 each side)",
    restTime: 45,
    muscleGroup: "core"
  },
  bicepCurls: {
    id: "bicepCurls",
    name: "Dumbbell Bicep Curls",
    description: "An isolation exercise for your biceps using dumbbells.",
    sets: 3,
    reps: "12-15 each arm",
    restTime: 60,
    muscleGroup: "arms"
  },
  tricepDips: {
    id: "tricepDips",
    name: "Tricep Dips",
    description: "An exercise that targets your triceps using a chair, bench, or couch.",
    sets: 3,
    reps: "10-15",
    restTime: 60,
    muscleGroup: "arms"
  },
  shoulderPress: {
    id: "shoulderPress",
    name: "Dumbbell Shoulder Press",
    description: "A compound exercise that targets your shoulder muscles.",
    sets: 3,
    reps: "10-12",
    restTime: 60,
    muscleGroup: "shoulders"
  },
  bentOverRows: {
    id: "bentOverRows",
    name: "Dumbbell Bent Over Rows",
    description: "A compound exercise for your back muscles.",
    sets: 3,
    reps: "12-15",
    restTime: 60,
    muscleGroup: "back"
  },
  jumpRope: {
    id: "jumpRope",
    name: "Jump Rope",
    description: "A cardiovascular exercise that improves coordination and burns calories.",
    sets: 3,
    reps: "1 minute",
    restTime: 30,
    muscleGroup: "full body"
  },
  gluteBridge: {
    id: "gluteBridge",
    name: "Glute Bridge",
    description: "An exercise targeting your glutes and lower back.",
    sets: 3,
    reps: "15-20",
    restTime: 45,
    muscleGroup: "glutes"
  }
};
