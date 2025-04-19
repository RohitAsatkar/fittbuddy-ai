
import { UserProfile } from "@/types";
import { generateMuscleGroupWorkout, generateWorkoutPlan } from "@/data/workouts";
import { getExerciseInstructions } from "@/data/exerciseInstructions";
import { getExercisesByMuscleGroup, getAllExercises } from "@/data/exerciseDatabase";
import { extractExerciseName } from "@/utils/exerciseUtils";
import { cleanupUserQuery } from "@/utils/stringUtils";

export const handleWorkoutQuery = (message: string, userProfile?: UserProfile): string => {
  const lowerMessage = cleanupUserQuery(message);
  
  // First, check if there's a specific exercise being asked about
  const exerciseName = extractExerciseName(message);
  if (exerciseName) {
    console.log(`Found exercise in query: ${exerciseName}`);
    const exerciseInstructions = getExerciseInstructions(exerciseName);
    if (exerciseInstructions) {
      return exerciseInstructions;
    }
  }

  // Check for muscle group exercises
  const muscleGroups = ["chest", "back", "legs", "shoulders", "arms", "core"];
  let targetMuscle = null;
  
  for (const muscle of muscleGroups) {
    if (lowerMessage.includes(`${muscle} exercises`) || 
        lowerMessage.includes(`exercises for ${muscle}`) ||
        lowerMessage.includes(`${muscle} workout`) ||
        lowerMessage.includes(`workout for ${muscle}`)) {
      targetMuscle = muscle;
      break;
    }
  }
  
  if (targetMuscle) {
    const exercises = getExercisesByMuscleGroup(targetMuscle);
    if (exercises.length > 0) {
      return `
### Top ${targetMuscle.charAt(0).toUpperCase() + targetMuscle.slice(1)} Exercises

Here are some effective exercises for your ${targetMuscle}:

${exercises.slice(0, 5).map((ex, i) => `${i+1}. **${ex.name}**: ${ex.description}\n   Sets: ${ex.sets}, Reps: ${ex.reps}, Rest: ${ex.restTime}s`).join('\n\n')}

Would you like more detailed instructions for any of these exercises?
      `;
    }
  }

  // Check for "how to do" patterns
  if (lowerMessage.includes("how to do") || 
      lowerMessage.includes("how do i do") ||
      lowerMessage.includes("how to perform") ||
      lowerMessage.includes("show me how to")) {
    // This is handled by extractExerciseName above, but adding extra logging
    console.log("Detected 'how to' pattern but no specific exercise was identified");
  }

  // Check for exercise list request
  if (lowerMessage.includes("list exercises") || 
      lowerMessage.includes("show exercises") || 
      lowerMessage.includes("what exercises") ||
      lowerMessage.includes("all exercises")) {
    
    const exercises = getAllExercises();
    const categories = [...new Set(exercises.map(ex => ex.muscleGroup))];
    
    return `
### Exercise Categories

Here are the main exercise categories:

${categories.map(category => `- **${category}**`).join('\n')}

Ask me about exercises for a specific muscle group like "Show me chest exercises" or ask for details about a specific exercise like "How to do a proper push-up".
    `;
  }

  // Check for workout plan requests
  if (lowerMessage.includes("workout plan") || 
      lowerMessage.includes("exercise plan") ||
      (lowerMessage.includes("plan") && lowerMessage.includes("exercise")) ||
      (lowerMessage.includes("give") && lowerMessage.includes("workout"))) {
    return generateWorkoutPlan(userProfile);
  }

  return "";
};
