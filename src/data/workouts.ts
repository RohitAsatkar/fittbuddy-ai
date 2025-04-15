
import { Exercise, Workout, WorkoutDifficulty, WorkoutType } from "@/types";

// Sample exercises
const exercises: Record<string, Exercise> = {
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

// Function to get workouts by user preferences
export const getWorkoutsByPreferences = (
  type: WorkoutType,
  difficulty: WorkoutDifficulty
): Workout[] => {
  return sampleWorkouts.filter(
    workout => workout.type === type && workout.difficulty === difficulty
  );
};

// Function to get a workout by ID
export const getWorkoutById = (id: string): Workout | undefined => {
  return sampleWorkouts.find(workout => workout.id === id);
};

// Generate a random workout recommendation
export const getRandomWorkout = (): Workout => {
  const randomIndex = Math.floor(Math.random() * sampleWorkouts.length);
  return sampleWorkouts[randomIndex];
};
