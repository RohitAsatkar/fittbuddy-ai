import { UserProfile } from "@/types";
import { generateMuscleGroupWorkout, generateWorkoutPlan } from "@/data/workouts";
import { getExerciseInstructions } from "@/data/exerciseInstructions";
import { getExercisesByMuscleGroup, getAllExercises } from "@/data/exerciseDatabase";
import { extractExerciseName } from "@/utils/exerciseUtils";
import { cleanupUserQuery, areExerciseNamesMatching } from "@/utils/stringUtils";

export const handleWorkoutQuery = (message: string, userProfile?: UserProfile): string => {
  if (!message) {
    console.log("Empty message received in workout query handler");
    return "";
  }
  
  const lowerMessage = cleanupUserQuery(message);
  console.log(`Processing workout query: "${lowerMessage}"`);
  
  // First, check if there's a specific exercise being asked about
  const exerciseName = extractExerciseName(message);
  if (exerciseName) {
    console.log(`Found exercise in query: ${exerciseName}`);
    try {
      const exerciseInstructions = getExerciseInstructions(exerciseName);
      if (exerciseInstructions) {
        return exerciseInstructions;
      }
      
      // If no specific instructions found, we'll try to find it in the database
      const allExercises = getAllExercises();
      if (allExercises && allExercises.length > 0) {
        const matchingExercise = allExercises.find(ex => 
          ex && ex.name && areExerciseNamesMatching(ex.name, exerciseName)
        );
        
        if (matchingExercise) {
          console.log(`Found matching exercise in database: ${matchingExercise.name}`);
          return `
### ${matchingExercise.name}

${matchingExercise.description}

#### How to perform:
- Sets: ${matchingExercise.sets}
- Reps: ${matchingExercise.reps}
- Rest: ${matchingExercise.restTime} seconds

#### Muscles Worked:
Primary: ${matchingExercise.muscleGroup}

This is a great exercise for strengthening your ${matchingExercise.muscleGroup}. Focus on proper form and controlled movements throughout the exercise.
          `;
        }
      }
    } catch (err) {
      console.error(`Error processing exercise "${exerciseName}":`, err);
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
    // This is handled by extractExerciseName above, but if we got here,
    // we need a fallback for exercises that might not be in our database
    
    // Try to extract the exercise name from the query directly
    const afterPattern = lowerMessage.replace(/how to (do|perform)|how do i do|show me how to/g, "").trim();
    if (afterPattern) {
      console.log(`Attempting to find exercise from pattern: "${afterPattern}"`);
      // Search all exercises for a potential match
      const allExercises = getAllExercises();
      const potentialMatch = allExercises.find(ex => 
        areExerciseNamesMatching(ex.name, afterPattern)
      );
      
      if (potentialMatch) {
        console.log(`Found potential match for "${afterPattern}": ${potentialMatch.name}`);
        return getExerciseInstructions(potentialMatch.name) || `
### ${potentialMatch.name}

${potentialMatch.description}

#### How to perform:
- Sets: ${potentialMatch.sets}
- Reps: ${potentialMatch.reps}
- Rest: ${potentialMatch.restTime} seconds

#### Muscles Worked:
Primary: ${potentialMatch.muscleGroup}

Focus on proper form and controlled movements for best results.
        `;
      }
    }
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

  // Search directly in exercise database as last resort
  const allExercises = getAllExercises();
  const wordMatch = lowerMessage.split(/\s+/).filter(word => word.length > 3);
  
  if (wordMatch.length > 0) {
    for (const word of wordMatch) {
      const matchingExercise = allExercises.find(ex => 
        ex.name.toLowerCase().includes(word) || 
        ex.muscleGroup.toLowerCase().includes(word)
      );
      
      if (matchingExercise) {
        console.log(`Found word match "${word}" with exercise: ${matchingExercise.name}`);
        return getExerciseInstructions(matchingExercise.name) || `
### ${matchingExercise.name}

${matchingExercise.description}

#### How to perform:
- Sets: ${matchingExercise.sets}
- Reps: ${matchingExercise.reps}
- Rest: ${matchingExercise.restTime} seconds

#### Muscles Worked:
Primary: ${matchingExercise.muscleGroup}

This is a ${matchingExercise.muscleGroup} exercise that can help improve your strength and muscle definition.
        `;
      }
    }
  }

  return "";
};
