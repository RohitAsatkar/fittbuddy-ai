
import { Exercise } from "@/types";

// Comprehensive exercise database
export const exerciseDatabase: Record<string, Exercise> = {
  // Chest Exercises
  "chest-1": {
    id: "chest-1",
    name: "Bench Press",
    description: "Lie on a flat bench, grip the barbell with hands slightly wider than shoulder-width. Lower the bar to chest level, then press back up.",
    sets: 4,
    reps: "8-10",
    restTime: 90,
    muscleGroup: "chest"
  },
  "chest-2": {
    id: "chest-2",
    name: "Push-ups",
    description: "Start in a plank position with hands slightly wider than shoulders. Lower your body until chest nearly touches the floor, then push back up.",
    sets: 3,
    reps: "12-20",
    restTime: 60,
    muscleGroup: "chest"
  },
  // ... Add all chest exercises

  // Back Exercises
  "back-1": {
    id: "back-1",
    name: "Pull-ups",
    description: "Hang from a bar with hands wider than shoulder-width. Pull your body up until chin is over the bar, then lower with control.",
    sets: 3,
    reps: "6-10",
    restTime: 90,
    muscleGroup: "back"
  },
  // ... Add all back exercises

  // Shoulder Exercises
  "shoulder-1": {
    id: "shoulder-1",
    name: "Overhead Press",
    description: "Stand with feet shoulder-width apart, press barbell or dumbbells from shoulder level to overhead.",
    sets: 3,
    reps: "8-10",
    restTime: 90,
    muscleGroup: "shoulders"
  },
  // ... Add all shoulder exercises

  // Arm Exercises
  "arm-1": {
    id: "arm-1",
    name: "Bicep Curls",
    description: "Stand holding weights at sides with palms forward. Curl weights toward shoulders while keeping elbows fixed at sides.",
    sets: 3,
    reps: "10-12",
    restTime: 60,
    muscleGroup: "arms"
  },
  // ... Add all arm exercises

  // Core Exercises
  "core-1": {
    id: "core-1",
    name: "Crunches",
    description: "Lie on back with knees bent, hands behind head. Curl upper body toward knees, then lower back down with control.",
    sets: 3,
    reps: "20",
    restTime: 45,
    muscleGroup: "core"
  },
  // ... Add all core exercises

  // Lower Body Exercises
  "lower-1": {
    id: "lower-1",
    name: "Squats",
    description: "Stand with feet shoulder-width apart, lower body by bending knees and hips as if sitting in a chair, then return to standing.",
    sets: 4,
    reps: "8-10",
    restTime: 90,
    muscleGroup: "legs"
  }
  // ... Add all lower body exercises
};

// Helper function to get exercises by muscle group
export const getExercisesByMuscleGroup = (muscleGroup: string): Exercise[] => {
  return Object.values(exerciseDatabase).filter(
    exercise => exercise.muscleGroup.toLowerCase() === muscleGroup.toLowerCase()
  );
};

// Helper function to get all exercises
export const getAllExercises = (): Exercise[] => {
  return Object.values(exerciseDatabase);
};
