
import { ExerciseDataItem } from "@/types/training";

export const exerciseData: ExerciseDataItem[] = [
  {
    name: "Push-Up",
    primaryMuscle: "chest",
    secondaryMuscles: ["triceps", "shoulders", "core"],
    equipment: ["bodyweight"],
    difficulty: "beginner",
    instructions: [
      "Start in a plank position with hands shoulder-width apart",
      "Lower your body until your chest nearly touches the floor",
      "Pause, then push back up to the starting position"
    ],
    tips: [
      "Keep your body in a straight line",
      "Look slightly ahead of you, not directly down",
      "Keep your elbows at a 45-degree angle to your body"
    ],
    metaData: {
      calorieBurn: 8,
      targetReps: "10-15",
      targetSets: 3,
      restTime: 60
    }
  }
];
