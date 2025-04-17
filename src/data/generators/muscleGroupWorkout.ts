
import { WorkoutDifficulty } from "@/types";
import { exercises } from "../exercises";

// Function to generate muscle group specific workout
export const generateMuscleGroupWorkout = (muscleGroup: string, difficulty: WorkoutDifficulty): string => {
  // Normalize muscle group name
  const normalizedMuscle = muscleGroup.toLowerCase();

  // Get relevant exercises from our exercise database
  const relevantExercises = Object.values(exercises).filter(exercise => 
    exercise.muscleGroup.toLowerCase().includes(normalizedMuscle) ||
    (normalizedMuscle.includes("arm") && (exercise.muscleGroup === "biceps" || exercise.muscleGroup === "triceps")) ||
    (normalizedMuscle.includes("ab") && exercise.muscleGroup === "core")
  );

  if (relevantExercises.length === 0) {
    return `I couldn't find exercises specifically for ${muscleGroup}. Would you like a full body workout instead?`;
  }

  // Adjust reps and sets based on difficulty
  const difficultySettings = {
    beginner: { sets: 2, restTime: 90, intensity: "lighter" },
    intermediate: { sets: 3, restTime: 60, intensity: "moderate" },
    advanced: { sets: 4, restTime: 45, intensity: "challenging" }
  };

  const { sets, restTime, intensity } = difficultySettings[difficulty];

  // Build the workout plan
  let workout = `# ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} ${
    muscleGroup.charAt(0).toUpperCase() + muscleGroup.slice(1)
  } Workout\n\n`;
  
  workout += `Here's a ${difficulty} ${muscleGroup} workout that will help you build strength and definition:\n\n`;
  workout += "## Warm-up\n";
  workout += "- 5 minutes of light cardio to get your blood flowing\n";
  workout += "- Dynamic stretching for the target muscle groups\n\n";
  
  workout += "## Main Workout\n";
  
  // Add up to 5 exercises from the filtered list
  const maxExercises = Math.min(5, relevantExercises.length);
  for (let i = 0; i < maxExercises; i++) {
    const exercise = relevantExercises[i];
    workout += `### ${i + 1}. ${exercise.name}\n`;
    workout += `- Sets: ${sets}\n`;
    workout += `- Reps: ${exercise.reps}\n`;
    workout += `- Rest: ${restTime} seconds\n`;
    workout += `- ${exercise.description}\n\n`;
  }
  
  workout += "## Cool-down\n";
  workout += "- Static stretching for the worked muscles (hold each stretch for 30 seconds)\n";
  workout += "- 5 minutes of light walking or cycling to gradually reduce heart rate\n\n";
  
  workout += `## Tips for ${difficulty} Level\n`;
  
  if (difficulty === "beginner") {
    workout += "- Focus on form rather than weight\n";
    workout += "- Take extra rest if needed\n";
    workout += "- Start with bodyweight variations if any movement feels too challenging\n";
  } else if (difficulty === "intermediate") {
    workout += "- Focus on mind-muscle connection\n";
    workout += "- Consider adding progressive overload by increasing weight slightly each week\n";
    workout += "- Track your workouts to monitor progress\n";
  } else {
    workout += "- Consider adding advanced techniques like drop sets or supersets\n";
    workout += "- Focus on time under tension by slowing down the eccentric (lowering) phase\n";
    workout += "- Ensure adequate recovery between workouts targeting the same muscle group\n";
  }

  return workout;
};
