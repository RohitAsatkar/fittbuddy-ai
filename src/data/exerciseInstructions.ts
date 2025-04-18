
import { Exercise } from "@/types";
import { sampleWorkouts } from "./workouts";
import { exerciseDatabase } from "./exerciseDatabase";

interface ExerciseInstruction {
  name: string;
  description: string;
  instructions: string[];
  variations: {
    name: string;
    description: string;
    instructions: string[];
  }[];
  muscleGroups: string[];
  tips: string[];
}

// Exercise instructions database with variations
export const exerciseInstructions: Record<string, ExerciseInstruction> = {
  "push-up": {
    name: "Push-Up",
    description: "A compound exercise that targets the chest, shoulders, and triceps.",
    instructions: [
      "Start in a plank position with your hands slightly wider than shoulder-width apart.",
      "Keep your body in a straight line from head to heels.",
      "Lower your body until your chest nearly touches the floor.",
      "Push yourself back up to the starting position.",
      "Keep your core engaged throughout the movement."
    ],
    variations: [
      {
        name: "Knee Push-Ups",
        description: "An easier variation that's great for beginners.",
        instructions: [
          "Start in a modified plank position with your knees on the ground.",
          "Keep your back straight and hands slightly wider than shoulder-width.",
          "Lower your chest to the ground and push back up while maintaining form."
        ]
      },
      {
        name: "Decline Push-Ups",
        description: "A more challenging variation that puts more emphasis on the upper chest.",
        instructions: [
          "Place your feet on an elevated surface like a bench or step.",
          "Position your hands on the floor in a standard push-up position.",
          "Perform push-ups while keeping your body straight from head to heels."
        ]
      }
    ],
    muscleGroups: ["chest", "shoulders", "triceps"],
    tips: [
      "Keep your neck neutral by looking slightly ahead rather than down.",
      "Don't let your hips sag or pike up - maintain a straight line.",
      "For maximum chest activation, focus on spreading your shoulder blades at the top."
    ]
  },
  "plank": {
    name: "Plank",
    description: "An isometric core exercise that builds stability and endurance in the abdominals, back, and shoulders.",
    instructions: [
      "Start in a push-up position, but bend your elbows to rest on your forearms.",
      "Create a straight line from your head to your heels.",
      "Keep your core engaged and don't let your hips rise or sag.",
      "Hold the position for the prescribed time, breathing normally."
    ],
    variations: [
      {
        name: "Side Plank",
        description: "Targets the obliques and tests lateral core stability.",
        instructions: [
          "Lie on your side with legs extended and feet stacked.",
          "Prop yourself up on your elbow with forearm flat on the ground.",
          "Raise your hips so your body forms a straight line.",
          "Extend your top arm straight up or place it on your hip."
        ]
      },
      {
        name: "Plank with Shoulder Tap",
        description: "Adds an anti-rotation challenge to the standard plank.",
        instructions: [
          "Start in a high plank (push-up position).",
          "Without moving your hips, lift one hand to tap the opposite shoulder.",
          "Return hand to ground and repeat with the other hand."
        ]
      }
    ],
    muscleGroups: ["core", "shoulders", "back"],
    tips: [
      "Focus on quality over duration - a perfect 30-second plank is better than a poor 2-minute one.",
      "Engage your glutes to help maintain proper hip position.",
      "Look at a spot on the floor about a foot in front of you to keep your neck neutral."
    ]
  }
};

// Helper function to get exercise instructions
export const getExerciseInstructions = (exerciseName: string) => {
  // Convert exercise name to lowercase for case-insensitive matching
  const searchTerm = exerciseName.toLowerCase();
  
  // Look for an exact match first in our detailed instructions
  const exactMatchKey = Object.keys(exerciseInstructions).find(
    key => key.toLowerCase() === searchTerm
  );
  
  if (exactMatchKey) {
    return formatExerciseInstructions(exerciseInstructions[exactMatchKey]);
  }
  
  // Look for partial matches in our detailed instructions
  const partialMatchKey = Object.keys(exerciseInstructions).find(
    key => searchTerm.includes(key.toLowerCase()) || 
          key.toLowerCase().includes(searchTerm)
  );
  
  if (partialMatchKey) {
    return formatExerciseInstructions(exerciseInstructions[partialMatchKey]);
  }
  
  // Look in our exercise database
  const databaseExercise = Object.values(exerciseDatabase).find(
    ex => ex.name.toLowerCase().includes(searchTerm) || 
          searchTerm.includes(ex.name.toLowerCase())
  );
  
  if (databaseExercise) {
    return formatDatabaseExercise(databaseExercise);
  }
  
  // Look in sample workouts as a fallback
  const workoutExercise = sampleWorkouts
    .flatMap(w => w.exercises)
    .find(ex => ex.name.toLowerCase().includes(searchTerm) || 
               searchTerm.includes(ex.name.toLowerCase()));
  
  if (workoutExercise) {
    return formatWorkoutExercise(workoutExercise);
  }
  
  // No match found
  return `I don't have specific instructions for "${exerciseName}". Try asking about common exercises like push-ups, squats, or planks. Or you can specify which muscle group you'd like to train, and I can suggest exercises for that area.`;
};

// Format exercise instructions
const formatExerciseInstructions = (exercise: ExerciseInstruction) => {
  return `
### ${exercise.name}

${exercise.description}

#### How to perform:
${exercise.instructions.map((step, index) => `${index + 1}. ${step}`).join('\n')}

#### Variations:
${exercise.variations.map(variation => `
##### ${variation.name}
${variation.description}
${variation.instructions.map((step, index) => `${index + 1}. ${step}`).join('\n')}
`).join('')}

#### Muscles Worked:
Primary: ${exercise.muscleGroups.join(', ')}

#### Pro Tips:
${exercise.tips.map(tip => `• ${tip}`).join('\n')}
`;
};

// Format exercise from our database
const formatDatabaseExercise = (exercise: Exercise) => {
  return `
### ${exercise.name}

${exercise.description}

#### How to perform:
- Sets: ${exercise.sets}
- Reps: ${exercise.reps}
- Rest: ${exercise.restTime} seconds

#### Muscles Worked:
Primary: ${exercise.muscleGroup}

#### Additional Info:
This is a great exercise to include in your ${exercise.muscleGroup.toLowerCase()} training routine. Focus on proper form to get the most benefit and reduce injury risk.
`;
};

// Format workout exercise
const formatWorkoutExercise = (exercise: Exercise) => {
  return `
### ${exercise.name}

${exercise.description}

#### How to perform:
- Sets: ${exercise.sets}
- Reps: ${exercise.reps}
- Rest: ${exercise.restTime} seconds

I don't have detailed step-by-step instructions for this specific exercise, but you can find many tutorials online by searching for "${exercise.name} proper form".

#### Muscles Worked:
Primary: ${exercise.muscleGroup}
`;
};
