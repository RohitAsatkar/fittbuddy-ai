import { Workout, WorkoutDifficulty, WorkoutType } from "@/types";
import { exercises } from "./exercises";

// Sample workouts
export const sampleWorkouts: Workout[] = [
  {
    id: "beginner_full_body",
    title: "Beginner Full Body Workout",
    description: "A simple full-body routine perfect for beginners looking to build a foundation.",
    difficulty: "beginner" as WorkoutDifficulty,
    type: "home" as WorkoutType,
    duration: 30,
    caloriesBurn: 200,
    exercises: [
      exercises.jumpingJacks,
      exercises.pushups,
      exercises.squats,
      exercises.plank,
      exercises.tricepDips
    ],
    targetMuscleGroups: ["full body", "chest", "legs", "core", "arms"]
  },
  {
    id: "hiit_cardio",
    title: "High-Intensity Cardio Blast",
    description: "A fast-paced workout to elevate your heart rate and burn calories.",
    difficulty: "intermediate" as WorkoutDifficulty,
    type: "home" as WorkoutType,
    duration: 25,
    caloriesBurn: 300,
    exercises: [
      exercises.jumpingJacks,
      exercises.burpees,
      exercises.mountainClimbers,
      exercises.jumpRope,
      exercises.squats
    ],
    targetMuscleGroups: ["full body", "cardio", "legs", "core"]
  },
  {
    id: "upper_body_strength",
    title: "Upper Body Strength Builder",
    description: "Focus on building strength in your chest, shoulders, back and arms.",
    difficulty: "intermediate" as WorkoutDifficulty,
    type: "gym" as WorkoutType,
    duration: 45,
    caloriesBurn: 250,
    exercises: [
      exercises.pushups,
      exercises.bicepCurls,
      exercises.tricepDips,
      exercises.shoulderPress,
      exercises.bentOverRows
    ],
    targetMuscleGroups: ["chest", "arms", "shoulders", "back"]
  },
  {
    id: "lower_body_focus",
    title: "Lower Body Sculpt",
    description: "Target your legs and glutes with this focused workout.",
    difficulty: "intermediate" as WorkoutDifficulty,
    type: "home" as WorkoutType,
    duration: 40,
    caloriesBurn: 280,
    exercises: [
      exercises.squats,
      exercises.lunges,
      exercises.gluteBridge,
      exercises.jumpingJacks,
      exercises.plank
    ],
    targetMuscleGroups: ["legs", "glutes", "core"]
  },
  {
    id: "core_crusher",
    title: "Core Crusher",
    description: "Strengthen your entire core with this targeted routine.",
    difficulty: "intermediate" as WorkoutDifficulty,
    type: "home" as WorkoutType,
    duration: 30,
    caloriesBurn: 220,
    exercises: [
      exercises.plank,
      exercises.mountainClimbers,
      exercises.russianTwists,
      exercises.gluteBridge,
      exercises.burpees
    ],
    targetMuscleGroups: ["core", "abs", "lower back"]
  },
  {
    id: "quick_morning",
    title: "Quick Morning Energizer",
    description: "A fast workout to start your day with energy.",
    difficulty: "beginner" as WorkoutDifficulty,
    type: "home" as WorkoutType,
    duration: 15,
    caloriesBurn: 150,
    exercises: [
      exercises.jumpingJacks,
      exercises.pushups,
      exercises.squats,
      exercises.plank
    ],
    targetMuscleGroups: ["full body"]
  },
  {
    id: "advanced_full_body",
    title: "Advanced Total Body Challenge",
    description: "A challenging workout for experienced fitness enthusiasts.",
    difficulty: "advanced" as WorkoutDifficulty,
    type: "gym" as WorkoutType,
    duration: 60,
    caloriesBurn: 450,
    exercises: [
      exercises.burpees,
      exercises.pushups,
      exercises.squats,
      exercises.bicepCurls,
      exercises.tricepDips,
      exercises.shoulderPress,
      exercises.bentOverRows
    ],
    targetMuscleGroups: ["full body", "chest", "legs", "arms", "shoulders", "back"]
  }
];

// Helper functions for workout retrieval
export const getWorkoutsByPreferences = (
  type: WorkoutType,
  difficulty: WorkoutDifficulty
): Workout[] => {
  return sampleWorkouts.filter(
    workout => workout.type === type && workout.difficulty === difficulty
  );
};

export const getWorkoutById = (id: string): Workout | undefined => {
  return sampleWorkouts.find(workout => workout.id === id);
};

export const getRandomWorkout = (): Workout => {
  const randomIndex = Math.floor(Math.random() * sampleWorkouts.length);
  return sampleWorkouts[randomIndex];
};
