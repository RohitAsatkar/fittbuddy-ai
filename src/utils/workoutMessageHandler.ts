
import { UserProfile } from "@/types";
import { generateMuscleGroupWorkout, generateWorkoutPlan } from "@/data/workouts";
import { getExerciseInstructions } from "@/data/exerciseInstructions";
import { getExercisesByMuscleGroup, getAllExercises } from "@/data/exerciseDatabase";
import { extractExerciseName } from "@/utils/exerciseUtils";

export const handleWorkoutQuery = (message: string, userProfile?: UserProfile): string => {
  const lowerMessage = message.toLowerCase();

  // First try to extract a specific exercise name
  const exerciseName = extractExerciseName(message);
  if (exerciseName) {
    const instructions = getExerciseInstructions(exerciseName);
    if (instructions) return instructions;
  }

  // Check for muscle group specific queries
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
### ${targetMuscle.charAt(0).toUpperCase() + targetMuscle.slice(1)} Exercises

Here are some effective exercises for your ${targetMuscle}:

${exercises.map((ex, i) => `
${i+1}. **${ex.name}**
   ${ex.description}
   - Sets: ${ex.sets}
   - Reps: ${ex.reps}
   - Rest: ${ex.restTime}s
`).join('\n')}

Would you like detailed instructions for any of these exercises? Just ask me "How to do [exercise name]" or "Show me proper form for [exercise name]".
      `;
    }
  }

  // Handle general exercise queries
  if (lowerMessage.includes("exercise") || 
      lowerMessage.includes("workout") || 
      lowerMessage.includes("training")) {
    
    if (lowerMessage.includes("list") || 
        lowerMessage.includes("show") || 
        lowerMessage.includes("what") ||
        lowerMessage.includes("all")) {
      
      const exercises = getAllExercises();
      const categories = [...new Set(exercises.map(ex => ex.muscleGroup))];
      
      return `
### Exercise Categories

Here are all the muscle groups you can train:

${categories.map(category => `- **${category.charAt(0).toUpperCase() + category.slice(1)}**`).join('\n')}

You can ask me:
- "Show me [muscle group] exercises" for exercises targeting a specific muscle group
- "How to do [exercise name]" for detailed instructions on any exercise
- "Give me a workout plan" for a personalized workout plan
      `;
    }
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
