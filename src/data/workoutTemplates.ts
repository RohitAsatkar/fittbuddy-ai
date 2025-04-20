import { Workout, WorkoutDifficulty, WorkoutType } from "@/types";
import { exerciseDatabase } from "./exerciseDatabase";

// Get exercises from the database
const getExercise = (id: string) => {
  return exerciseDatabase[id] || null;
};

// Create safe exercise references
const safeExercises = {
  // Core exercises
  plank: getExercise("core-3") || {
    id: "core-3",
    name: "Planks",
    description: "Hold a push-up position with body weight on forearms and toes, maintaining straight body alignment.",
    sets: 3,
    reps: "30-60 seconds",
    restTime: 45,
    muscleGroup: "core"
  },
  
  russianTwists: getExercise("core-5") || {
    id: "core-5",
    name: "Russian Twists",
    description: "Sit with knees bent and torso leaned back slightly. Rotate torso to tap floor on each side, optionally holding weight.",
    sets: 3,
    reps: "20 (10 each side)",
    restTime: 45,
    muscleGroup: "core"
  },
  
  // Leg exercises
  squats: getExercise("lower-1") || {
    id: "lower-1",
    name: "Squats",
    description: "Stand with feet shoulder-width apart, lower body by bending knees and hips as if sitting in a chair, then return to standing.",
    sets: 4,
    reps: "8-10",
    restTime: 90,
    muscleGroup: "legs"
  },
  
  lunges: getExercise("lower-5") || {
    id: "lower-5",
    name: "Bulgarian Split Squats",
    description: "Stand with one foot elevated behind you on bench. Lower body by bending front knee, then push back up.",
    sets: 3,
    reps: "8-10 per leg",
    restTime: 60,
    muscleGroup: "legs"
  },
  
  gluteBridge: getExercise("lower-4") || {
    id: "lower-4",
    name: "Hip Thrusts",
    description: "Sit with upper back against bench, barbell across hips. Drive hips upward until body forms straight line from shoulders to knees.",
    sets: 4,
    reps: "10-12",
    restTime: 90,
    muscleGroup: "legs"
  },
  
  jumpingJacks: {
    id: "cardio-1",
    name: "Jumping Jacks",
    description: "Stand with feet together and arms at sides, then jump while spreading legs and raising arms overhead.",
    sets: 3,
    reps: "30 seconds",
    restTime: 30,
    muscleGroup: "cardio"
  },
  
  // Arm exercises
  bicepCurls: getExercise("arm-1") || {
    id: "arm-1",
    name: "Bicep Curls",
    description: "Stand holding weights at sides with palms forward. Curl weights toward shoulders while keeping elbows fixed at sides.",
    sets: 3,
    reps: "10-12",
    restTime: 60,
    muscleGroup: "arms"
  },
  
  tricepDips: getExercise("arm-4") || {
    id: "arm-4",
    name: "Triceps Dips",
    description: "On parallel bars or bench, lower body by bending arms until elbows reach 90 degrees, then push back up.",
    sets: 3,
    reps: "10-12",
    restTime: 60,
    muscleGroup: "arms"
  },
  
  // Chest exercises
  pushups: getExercise("chest-2") || {
    id: "chest-2",
    name: "Push-ups",
    description: "Start in a plank position with hands slightly wider than shoulders. Lower your body until chest nearly touches the floor, then push back up.",
    sets: 3,
    reps: "12-20",
    restTime: 60,
    muscleGroup: "chest"
  },
  
  // Back exercises
  bentOverRows: getExercise("back-3") || {
    id: "back-3",
    name: "Rows",
    description: "Bend at hips with flat back, pull weight toward lower chest/abdomen, keeping elbows close to body.",
    sets: 4,
    reps: "10-12",
    restTime: 60,
    muscleGroup: "back"
  },
  
  // Shoulder exercises
  shoulderPress: getExercise("shoulder-1") || {
    id: "shoulder-1",
    name: "Overhead Press",
    description: "Stand with feet shoulder-width apart, press barbell or dumbbells from shoulder level to overhead.",
    sets: 3,
    reps: "8-10",
    restTime: 90,
    muscleGroup: "shoulders"
  },
  
  // Additional cardio
  burpees: {
    id: "cardio-2",
    name: "Burpees",
    description: "Begin in standing position, drop to squat position, kick feet back to plank position, return to squat position, then jump up.",
    sets: 3,
    reps: "10-15",
    restTime: 60,
    muscleGroup: "cardio"
  },
  
  mountainClimbers: {
    id: "cardio-3",
    name: "Mountain Climbers",
    description: "Start in plank position, rapidly alternate bringing knees to chest, keeping hips down and core engaged.",
    sets: 3,
    reps: "30 seconds",
    restTime: 30,
    muscleGroup: "cardio"
  },
  
  jumpRope: {
    id: "cardio-4",
    name: "Jump Rope",
    description: "Jump rope with both feet together or alternating feet, maintaining a steady rhythm.",
    sets: 3,
    reps: "60 seconds",
    restTime: 45,
    muscleGroup: "cardio"
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
      safeExercises.jumpingJacks,
      safeExercises.pushups,
      safeExercises.squats,
      safeExercises.plank,
      safeExercises.tricepDips
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
      safeExercises.jumpingJacks,
      safeExercises.burpees,
      safeExercises.mountainClimbers,
      safeExercises.jumpRope,
      safeExercises.squats
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
      safeExercises.pushups,
      safeExercises.bicepCurls,
      safeExercises.tricepDips,
      safeExercises.shoulderPress,
      safeExercises.bentOverRows
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
      safeExercises.squats,
      safeExercises.lunges,
      safeExercises.gluteBridge,
      safeExercises.jumpingJacks,
      safeExercises.plank
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
      safeExercises.plank,
      safeExercises.mountainClimbers,
      safeExercises.russianTwists,
      safeExercises.gluteBridge,
      safeExercises.burpees
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
      safeExercises.jumpingJacks,
      safeExercises.pushups,
      safeExercises.squats,
      safeExercises.plank
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
      safeExercises.burpees,
      safeExercises.pushups,
      safeExercises.squats,
      safeExercises.bicepCurls,
      safeExercises.tricepDips,
      safeExercises.shoulderPress,
      safeExercises.bentOverRows
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
