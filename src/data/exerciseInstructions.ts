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
  },
  "squat": {
    name: "Squat",
    description: "A fundamental lower body compound exercise that strengthens the quads, hamstrings, and glutes.",
    instructions: [
      "Stand with feet shoulder-width apart or slightly wider.",
      "Keep your chest up and core engaged.",
      "Bend at your knees and hips as if sitting down in a chair.",
      "Lower until your thighs are at least parallel to the ground (or lower if mobility allows).",
      "Push through your heels to return to the starting position."
    ],
    variations: [
      {
        name: "Goblet Squat",
        description: "A squat variation that involves holding a weight in front of your chest.",
        instructions: [
          "Hold a dumbbell or kettlebell close to your chest with both hands.",
          "Stand with feet shoulder-width apart.",
          "Perform a squat while keeping the weight close to your body.",
          "Use the weight as a counterbalance to help maintain proper form."
        ]
      },
      {
        name: "Bulgarian Split Squat",
        description: "A unilateral squat that targets one leg at a time for better balance and stability.",
        instructions: [
          "Stand about two feet in front of a bench or step.",
          "Place one foot behind you on the bench.",
          "Lower your body by bending your front knee, keeping your torso upright.",
          "Push through the heel of your front foot to return to the starting position."
        ]
      }
    ],
    muscleGroups: ["quadriceps", "hamstrings", "glutes", "core"],
    tips: [
      "Keep your knees in line with your toes - don't let them collapse inward.",
      "Maintain a neutral spine throughout the movement.",
      "Drive through your heels rather than your toes.",
      "Focus on depth over weight for muscle development."
    ]
  },
  "deadlift": {
    name: "Deadlift",
    description: "A powerful compound exercise that targets the posterior chain, including the back, glutes, and hamstrings.",
    instructions: [
      "Stand with feet hip-width apart, with the barbell positioned over the middle of your feet.",
      "Bend at your hips and knees to grip the bar with hands just outside your legs.",
      "Keep your chest up and back flat as you lift the bar by extending your hips and knees.",
      "Stand tall at the top, with shoulders back and core engaged.",
      "Return the bar to the ground by hinging at the hips and bending the knees."
    ],
    variations: [
      {
        name: "Romanian Deadlift",
        description: "A variation that emphasizes the hamstrings and glutes with less knee bend.",
        instructions: [
          "Start standing with the bar in hand at hip level.",
          "Keep a slight bend in your knees throughout the movement.",
          "Hinge at your hips to lower the bar along your legs.",
          "Stop when you feel a stretch in your hamstrings, then return to starting position."
        ]
      },
      {
        name: "Sumo Deadlift",
        description: "A wider stance variation that places more emphasis on the quads and inner thighs.",
        instructions: [
          "Stand with feet wider than shoulder-width apart, toes pointed out.",
          "Grip the bar with hands inside your legs.",
          "Keep your chest up and back flat as you lift by extending hips and knees.",
          "Maintain a more upright torso compared to conventional deadlifts."
        ]
      }
    ],
    muscleGroups: ["back", "glutes", "hamstrings", "traps", "core"],
    tips: [
      "Keep the bar close to your body throughout the movement.",
      "Start with lighter weights to perfect your form before going heavy.",
      "Engage your lats by thinking about 'protecting your armpits'.",
      "Think about pushing the floor away rather than pulling the weight up."
    ]
  },
  "bench press": {
    name: "Bench Press",
    description: "A classic upper body strength exercise that primarily targets the chest, shoulders, and triceps.",
    instructions: [
      "Lie flat on a bench with feet planted firmly on the ground.",
      "Grip the barbell slightly wider than shoulder-width apart.",
      "Unrack the bar and hold it directly above your chest with arms extended.",
      "Lower the bar in a controlled manner until it touches your mid-chest.",
      "Press the bar back up to the starting position by extending your arms."
    ],
    variations: [
      {
        name: "Incline Bench Press",
        description: "Performed on an inclined bench to emphasize the upper chest.",
        instructions: [
          "Set the bench to a 30-45 degree incline.",
          "Grip the bar slightly wider than shoulder-width apart.",
          "Lower the bar to the upper part of your chest.",
          "Press back up to the starting position by extending your arms."
        ]
      },
      {
        name: "Dumbbell Bench Press",
        description: "Using dumbbells instead of a barbell for greater range of motion.",
        instructions: [
          "Lie flat on a bench holding a dumbbell in each hand at chest level.",
          "Press the dumbbells upward until arms are extended.",
          "Lower the dumbbells back to chest level in a controlled manner.",
          "This variation allows each arm to work independently."
        ]
      }
    ],
    muscleGroups: ["chest", "shoulders", "triceps"],
    tips: [
      "Keep your wrists straight and directly above your elbows.",
      "Maintain contact with the bench with your head, upper back, and glutes.",
      "Slightly arch your lower back to protect your spine and engage your chest more.",
      "Always use a spotter when lifting heavy weights."
    ]
  }
};

export const getExerciseInstructions = (exerciseName: string) => {
  console.log(`Searching for exercise instructions for: ${exerciseName}`);
  
  const searchTerm = exerciseName.toLowerCase();
  
  // Try exact match first
  const exactMatchKey = Object.keys(exerciseInstructions).find(
    key => key.toLowerCase() === searchTerm
  );
  
  if (exactMatchKey) {
    console.log(`Found exact match in instructions: ${exactMatchKey}`);
    return formatExerciseInstructions(exerciseInstructions[exactMatchKey]);
  }
  
  // Check database exercises
  const databaseExercise = Object.values(exerciseDatabase).find(
    ex => ex.name.toLowerCase() === searchTerm || 
          searchTerm.includes(ex.name.toLowerCase()) || 
          ex.name.toLowerCase().includes(searchTerm)
  );
  
  if (databaseExercise) {
    console.log(`Found match in database: ${databaseExercise.name}`);
    return formatDatabaseExercise(databaseExercise);
  }
  
  // Check for muscle group queries
  const muscleGroups = ["chest", "back", "legs", "shoulders", "arms", "core"];
  const matchedMuscleGroup = muscleGroups.find(group => 
    searchTerm === group || 
    searchTerm.includes(group) || 
    group.includes(searchTerm)
  );
  
  if (matchedMuscleGroup) {
    const exercises = Object.values(exerciseDatabase)
      .filter(ex => ex.muscleGroup.toLowerCase() === matchedMuscleGroup.toLowerCase())
      .slice(0, 5);
    
    if (exercises.length > 0) {
      return formatMuscleGroupExercises(exercises, matchedMuscleGroup);
    }
  }
  
  // If no exact match, try fuzzy matching exercise names
  const allExerciseNames = [
    ...Object.values(exerciseDatabase).map(ex => ex.name.toLowerCase()),
    ...Object.keys(exerciseInstructions).map(key => key.toLowerCase())
  ];
  
  const similarExercises = allExerciseNames
    .filter(name => 
      name.split(" ").some(word => 
        searchTerm.includes(word) || 
        word.includes(searchTerm)
      )
    )
    .slice(0, 3);
  
  if (similarExercises.length > 0) {
    return `
I couldn't find exact instructions for "${exerciseName}", but here are some similar exercises you might be interested in:

${similarExercises.map(name => `- ${name.charAt(0).toUpperCase() + name.slice(1)}`).join('\n')}

Would you like to learn more about any of these?
    `;
  }
  
  return `I don't have specific instructions for "${exerciseName}". Try asking about common exercises like push-ups, squats, or planks. Or you can ask for exercises by muscle group, like "Show me chest exercises" or "What are good back exercises?"`;
};

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

#### Proper Form:
1. Start with proper setup - good posture and stable position
2. Focus on the mind-muscle connection with the target muscles
3. Use controlled movements through the full range of motion
4. Breathe out during the exertion phase (when pushing/pulling)
5. Maintain proper form throughout all repetitions

#### Additional Info:
This is a great exercise to include in your ${exercise.muscleGroup.toLowerCase()} training routine. Focus on proper form to get the most benefit and reduce injury risk.
`;
};

const formatMuscleGroupExercises = (exercises: Exercise[], muscleGroup: string): string => {
  return `
### Top ${muscleGroup.charAt(0).toUpperCase() + muscleGroup.slice(1)} Exercises

Here are some effective exercises for your ${muscleGroup}:

${exercises.map((ex, i) => `
${i+1}. **${ex.name}**
   ${ex.description}
   - Sets: ${ex.sets}
   - Reps: ${ex.reps}
   - Rest: ${ex.restTime}s
`).join('\n')}

Would you like detailed instructions for any of these exercises? Just ask me "How to do [exercise name]" or "Show me proper form for [exercise name]".
  `;
};
