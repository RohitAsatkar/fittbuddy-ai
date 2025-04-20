
import { Exercise } from "@/types";
import { chestExercises } from "./exercises/chest";
import { backExercises } from "./exercises/back";
import { shoulderExercises } from "./exercises/shoulders";
import { armExercises } from "./exercises/arms";
import { coreExercises } from "./exercises/core";
import { legExercises } from "./exercises/legs";

// Combine all exercises into one database
export const exerciseDatabase: Record<string, Exercise> = {
  ...chestExercises.reduce((acc, exercise) => ({ ...acc, [exercise.id]: exercise }), {}),
  ...backExercises.reduce((acc, exercise) => ({ ...acc, [exercise.id]: exercise }), {}),
  ...shoulderExercises.reduce((acc, exercise) => ({ ...acc, [exercise.id]: exercise }), {}),
  ...armExercises.reduce((acc, exercise) => ({ ...acc, [exercise.id]: exercise }), {}),
  ...coreExercises.reduce((acc, exercise) => ({ ...acc, [exercise.id]: exercise }), {}),
  ...legExercises.reduce((acc, exercise) => ({ ...acc, [exercise.id]: exercise }), {})
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
