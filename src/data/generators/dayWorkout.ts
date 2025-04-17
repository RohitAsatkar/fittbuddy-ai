
import { WorkoutDifficulty, WorkoutType } from "@/types";

// Helper function to generate workout for a specific day
export const generateDayWorkout = (focus: string, difficulty: WorkoutDifficulty, type: WorkoutType): string => {
  const difficultySettings = {
    beginner: { sets: "2-3", intensity: "lighter weights, focus on form" },
    intermediate: { sets: "3-4", intensity: "moderate weights with good form" },
    advanced: { sets: "4-5", intensity: "challenging weights while maintaining form" }
  };
  
  const { sets, intensity } = difficultySettings[difficulty];
  
  let workout = "";
  
  if (focus === "chest") {
    workout += `- Perform ${sets} sets of each exercise with ${intensity}:\n`;
    workout += "- Push-ups or chest press (8-12 reps)\n";
    workout += "- Incline dumbbell press or incline push-ups (10-12 reps)\n";
    workout += "- Chest flies (12-15 reps)\n";
    workout += "- Tricep dips (10-15 reps)\n";
    workout += "- Tricep extensions (12-15 reps)\n";
  } else if (focus === "back") {
    workout += `- Perform ${sets} sets of each exercise with ${intensity}:\n`;
    workout += "- Bent-over rows or seated rows (10-12 reps)\n";
    workout += "- Lat pulldowns or pull-ups (8-12 reps)\n";
    workout += "- Reverse flies (12-15 reps)\n";
    workout += "- Bicep curls (12-15 reps)\n";
    workout += "- Hammer curls (12-15 reps)\n";
  } else if (focus === "legs") {
    workout += `- Perform ${sets} sets of each exercise with ${intensity}:\n`;
    workout += "- Squats (10-15 reps)\n";
    workout += "- Lunges (10-12 reps per leg)\n";
    workout += "- Deadlifts (8-12 reps)\n";
    workout += "- Calf raises (15-20 reps)\n";
    workout += "- Glute bridges (15-20 reps)\n";
    workout += "- Planks (30-60 seconds)\n";
  } else if (focus === "shoulders") {
    workout += `- Perform ${sets} sets of each exercise with ${intensity}:\n`;
    workout += "- Shoulder press (10-12 reps)\n";
    workout += "- Lateral raises (12-15 reps)\n";
    workout += "- Front raises (12-15 reps)\n";
    workout += "- Reverse flies (12-15 reps)\n";
    workout += "- Shrugs (15-20 reps)\n";
  } else if (focus === "upper body") {
    workout += `- Perform ${sets} sets of each exercise with ${intensity}:\n`;
    workout += "- Push-ups or chest press (10-12 reps)\n";
    workout += "- Bent-over rows or seated rows (10-12 reps)\n";
    workout += "- Shoulder press (10-12 reps)\n";
    workout += "- Bicep curls (12-15 reps)\n";
    workout += "- Tricep dips or extensions (12-15 reps)\n";
  } else if (focus === "lower body") {
    workout += `- Perform ${sets} sets of each exercise with ${intensity}:\n`;
    workout += "- Squats (12-15 reps)\n";
    workout += "- Lunges (10-12 reps per leg)\n";
    workout += "- Deadlifts or glute bridges (12-15 reps)\n";
    workout += "- Calf raises (15-20 reps)\n";
    workout += "- Wall sits (30-60 seconds)\n";
  } else {
    // Full body
    workout += `- Perform ${sets} sets of each exercise with ${intensity}:\n`;
    workout += "- Squats (12-15 reps)\n";
    workout += "- Push-ups (10-12 reps)\n";
    workout += "- Bent-over rows (10-12 reps)\n";
    workout += "- Lunges (10 reps per leg)\n";
    workout += "- Shoulder press (10-12 reps)\n";
    workout += "- Plank (30-60 seconds)\n";
  }
  
  if (type === "home") {
    workout += "\nThis workout can be done at home with minimal equipment (dumbbells or resistance bands are helpful but not required).\n";
  } else {
    workout += "\nThis workout is designed for the gym with access to various equipment.\n";
  }
  
  return workout;
};
