
import { ChatMessage, FitnessGoal, UserProfile, WorkoutDifficulty, WorkoutType } from "@/types";
import { sampleWorkouts } from "./workouts";

// Sample fitness tips for different goals
export const fitnessTips: Record<FitnessGoal, string[]> = {
  weight_loss: [
    "Mix cardio and strength training for optimal fat burning.",
    "Maintain a slight caloric deficit (about 500 calories below maintenance).",
    "Stay hydrated - sometimes hunger is actually thirst.",
    "Focus on protein-rich foods to maintain muscle while losing fat.",
    "Consistency beats intensity - regular moderate workouts are better than occasional intense ones.",
    "Get enough sleep - poor sleep can increase hunger hormones."
  ],
  muscle_gain: [
    "Ensure you're eating in a slight caloric surplus (about 300-500 calories extra).",
    "Prioritize protein intake (1.6-2.2g per kg of bodyweight).",
    "Progressive overload is key - gradually increase weights or reps.",
    "Allow 48 hours recovery for muscle groups you've trained intensely.",
    "Don't skip leg day - lower body workouts boost overall growth hormones.",
    "Post-workout nutrition matters - have protein and carbs within 30 minutes of finishing."
  ],
  strength: [
    "Focus on compound movements like squats, deadlifts, and bench press.",
    "Lower reps (1-5) with higher weights are optimal for strength gains.",
    "Rest longer between strength sets (3-5 minutes).",
    "Proper form is essential - don't sacrifice technique for weight.",
    "Periodization (varying intensity and volume) prevents plateaus.",
    "Core strength improves all other lifts - don't neglect it."
  ],
  endurance: [
    "Build up slowly - increase workout duration by no more than 10% per week.",
    "Mix high and low intensity training for best results.",
    "Proper fueling before longer sessions is crucial.",
    "Cross-training reduces injury risk while building endurance.",
    "Recovery runs/activities are as important as intense sessions.",
    "Hydration is especially important for endurance athletes."
  ],
  flexibility: [
    "Hold static stretches for 30-60 seconds for best results.",
    "Warm up before stretching to avoid injury.",
    "Yoga or Pilates can complement dedicated stretching sessions.",
    "Consistency is key - daily stretching beats occasional long sessions.",
    "Dynamic stretching is best before workouts, static after.",
    "Breathing properly during stretches enhances their effectiveness."
  ],
  general_fitness: [
    "Aim for a balanced program with cardio, strength, and flexibility components.",
    "Find activities you enjoy - adherence is the most important factor.",
    "Try to move at least 30 minutes every day.",
    "Don't compare yourself to others - focus on your own progress.",
    "Tracking workouts helps you see improvements over time.",
    "Remember that rest and recovery are part of fitness too."
  ]
};

// Sample motivational quotes
export const motivationalQuotes = [
  "The only bad workout is the one that didn't happen.",
  "Your body can stand almost anything. It's your mind you have to convince.",
  "Fitness is not about being better than someone else. It's about being better than you used to be.",
  "The hardest lift of all is lifting your butt off the couch.",
  "You don't have to be extreme, just consistent.",
  "Rome wasn't built in a day, and neither was your body.",
  "The pain you feel today will be the strength you feel tomorrow.",
  "Strive for progress, not perfection.",
  "Exercise is a celebration of what your body can do, not a punishment for what you ate.",
  "Strength doesn't come from what you can do. It comes from overcoming the things you once thought you couldn't."
];

// Exercise instructions database with variations
export const exerciseInstructions = {
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
      },
      {
        name: "Diamond Push-Ups",
        description: "A variation that puts more emphasis on the triceps.",
        instructions: [
          "Place your hands close together forming a diamond shape with your thumbs and index fingers.",
          "Keep your body straight and lower yourself down.",
          "Push back up while keeping your elbows close to your body."
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
  "squat": {
    name: "Squat",
    description: "A fundamental lower body exercise that targets quadriceps, hamstrings, and glutes.",
    instructions: [
      "Stand with feet shoulder-width apart.",
      "Keep your chest up and back straight.",
      "Bend your knees and hips, lowering as if sitting into a chair.",
      "Go as low as comfortable, ideally until thighs are parallel to the ground.",
      "Push through your heels to return to standing position."
    ],
    variations: [
      {
        name: "Goblet Squat",
        description: "Holding a weight in front of your chest to add resistance.",
        instructions: [
          "Hold a kettlebell or dumbbell close to your chest.",
          "Perform a squat while keeping the weight close to your body.",
          "Focus on keeping your elbows between your knees at the bottom."
        ]
      },
      {
        name: "Sumo Squat",
        description: "A wider stance that targets the inner thighs more.",
        instructions: [
          "Take a wide stance with toes pointed slightly outward.",
          "Lower your body while keeping your back straight and chest up.",
          "Push through your heels to return to standing."
        ]
      },
      {
        name: "Jump Squat",
        description: "An explosive variation that adds cardio and power development.",
        instructions: [
          "Perform a regular squat, but explode upward into a jump at the top.",
          "Land softly with bent knees and immediately lower into the next squat.",
          "Use your arms for momentum by swinging them up during the jump."
        ]
      }
    ],
    muscleGroups: ["quadriceps", "hamstrings", "glutes", "core"],
    tips: [
      "Keep your knees tracking over your toes, not caving inward.",
      "Maintain weight in your heels rather than shifting forward to your toes.",
      "Breathe in as you lower down and exhale as you push up."
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
      },
      {
        name: "Plank Jacks",
        description: "Combines planking with jumping jack motion for added cardio.",
        instructions: [
          "Start in a standard plank position.",
          "Jump your feet wide apart and then back together, like a jumping jack.",
          "Maintain a stable upper body throughout the movement."
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

// Sample food nutrition data (protein, carbs per 100g)
export const foodNutrition = {
  vegetarian: {
    "tofu": { protein: 8, carbs: 2, calories: 76, category: "protein" },
    "lentils": { protein: 9, carbs: 20, calories: 116, category: "protein" },
    "chickpeas": { protein: 8.9, carbs: 27, calories: 164, category: "protein" },
    "quinoa": { protein: 4.4, carbs: 21, calories: 120, category: "carb" },
    "brown rice": { protein: 2.6, carbs: 23, calories: 112, category: "carb" },
    "sweet potato": { protein: 1.6, carbs: 20, calories: 86, category: "carb" },
    "oats": { protein: 13.2, carbs: 68, calories: 389, category: "carb" },
    "greek yogurt": { protein: 10, carbs: 3.5, calories: 59, category: "protein" },
    "cottage cheese": { protein: 11, carbs: 3.5, calories: 98, category: "protein" },
    "spinach": { protein: 2.9, carbs: 3.6, calories: 23, category: "vegetable" },
    "broccoli": { protein: 2.8, carbs: 6.6, calories: 34, category: "vegetable" },
    "almonds": { protein: 21, carbs: 22, calories: 579, category: "fat" },
    "avocado": { protein: 2, carbs: 9, calories: 160, category: "fat" },
    "olive oil": { protein: 0, carbs: 0, calories: 884, category: "fat" }
  },
  nonVegetarian: {
    "chicken breast": { protein: 31, carbs: 0, calories: 165, category: "protein" },
    "salmon": { protein: 25, carbs: 0, calories: 208, category: "protein" },
    "eggs": { protein: 13, carbs: 1, calories: 155, category: "protein" },
    "lean beef": { protein: 26, carbs: 0, calories: 250, category: "protein" },
    "tuna": { protein: 30, carbs: 0, calories: 130, category: "protein" },
    "turkey breast": { protein: 24, carbs: 0, calories: 104, category: "protein" },
    "white rice": { protein: 2.7, carbs: 28, calories: 130, category: "carb" },
    "potato": { protein: 2, carbs: 17, calories: 77, category: "carb" },
    "whole grain bread": { protein: 13, carbs: 43, calories: 265, category: "carb" },
    "pasta": { protein: 5, carbs: 25, calories: 131, category: "carb" },
    "kale": { protein: 4.3, carbs: 8.8, calories: 49, category: "vegetable" },
    "bell peppers": { protein: 1, carbs: 6, calories: 31, category: "vegetable" },
    "peanut butter": { protein: 25, carbs: 20, calories: 588, category: "fat" },
    "cheese": { protein: 25, carbs: 2.4, calories: 402, category: "fat" }
  }
};

// Diet plan generator
const generateDietPlan = (goal: FitnessGoal, dietType: 'vegetarian' | 'nonVegetarian' = 'nonVegetarian') => {
  const foodSource = dietType === 'vegetarian' ? foodNutrition.vegetarian : foodNutrition.nonVegetarian;
  
  // Select appropriate foods based on goal
  const proteinRich = Object.entries(foodSource).filter(([_, data]) => data.category === "protein");
  const carbRich = Object.entries(foodSource).filter(([_, data]) => data.category === "carb");
  const vegetables = Object.entries(foodSource).filter(([_, data]) => data.category === "vegetable");
  const fats = Object.entries(foodSource).filter(([_, data]) => data.category === "fat");
  
  // Generate meals based on goal
  let calorieGoal, proteinGoal, carbGoal, fatGoal;
  
  switch(goal) {
    case 'weight_loss':
      calorieGoal = "1500-1800";
      proteinGoal = "high (25-30% of calories)";
      carbGoal = "moderate (40-45% of calories)";
      fatGoal = "moderate (25-30% of calories)";
      break;
    case 'muscle_gain':
      calorieGoal = "2500-3000";
      proteinGoal = "very high (30-35% of calories)";
      carbGoal = "high (45-50% of calories)";
      fatGoal = "moderate (20-25% of calories)";
      break;
    default:
      calorieGoal = "2000-2200";
      proteinGoal = "moderate (20-25% of calories)";
      carbGoal = "moderate (45-50% of calories)";
      fatGoal = "moderate (25-30% of calories)";
  }

  // Create random selection function
  const randomItem = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];
  
  // Build the diet plan
  const breakfast = {
    protein: randomItem(proteinRich),
    carb: randomItem(carbRich),
    fat: randomItem(fats)
  };
  
  const lunch = {
    protein: randomItem(proteinRich.filter(item => item[0] !== breakfast.protein[0])),
    carb: randomItem(carbRich.filter(item => item[0] !== breakfast.carb[0])),
    vegetable: randomItem(vegetables)
  };
  
  const dinner = {
    protein: randomItem(proteinRich.filter(item => item[0] !== breakfast.protein[0] && item[0] !== lunch.protein[0])),
    vegetable: randomItem(vegetables.filter(item => item[0] !== lunch.vegetable[0])),
    fat: randomItem(fats.filter(item => item[0] !== breakfast.fat[0]))
  };
  
  const snack1 = randomItem([...proteinRich, ...fats]);
  const snack2 = randomItem(carbRich.filter(item => item[0] !== breakfast.carb[0] && item[0] !== lunch.carb[0]));
  
  // Format the meal plan
  return `
### ${dietType === 'vegetarian' ? 'Vegetarian' : 'Non-Vegetarian'} Diet Plan for ${goal.replace('_', ' ')}

Calorie Target: ${calorieGoal} calories
Protein Goal: ${proteinGoal}
Carbohydrate Goal: ${carbGoal}
Fat Goal: ${fatGoal}

#### Breakfast:
- ${breakfast.protein[0]} (${breakfast.protein[1].protein}g protein, ${breakfast.protein[1].carbs}g carbs per 100g)
- ${breakfast.carb[0]} (${breakfast.carb[1].protein}g protein, ${breakfast.carb[1].carbs}g carbs per 100g)
- ${breakfast.fat[0]} (in moderation)

#### Morning Snack:
- ${snack1[0]} (${snack1[1].protein}g protein, ${snack1[1].carbs}g carbs per 100g)

#### Lunch:
- ${lunch.protein[0]} (${lunch.protein[1].protein}g protein, ${lunch.protein[1].carbs}g carbs per 100g)
- ${lunch.carb[0]} (${lunch.carb[1].protein}g protein, ${lunch.carb[1].carbs}g carbs per 100g)
- ${lunch.vegetable[0]} (${lunch.vegetable[1].protein}g protein, ${lunch.vegetable[1].carbs}g carbs per 100g)

#### Afternoon Snack:
- ${snack2[0]} (${snack2[1].protein}g protein, ${snack2[1].carbs}g carbs per 100g)

#### Dinner:
- ${dinner.protein[0]} (${dinner.protein[1].protein}g protein, ${dinner.protein[1].carbs}g carbs per 100g)
- ${dinner.vegetable[0]} (${dinner.vegetable[1].protein}g protein, ${dinner.vegetable[1].carbs}g carbs per 100g)
- ${dinner.fat[0]} (in moderation)

Water: Drink at least 2-3 liters of water throughout the day.

Tips for ${goal.replace('_', ' ')}:
${generateDietTips(goal, dietType)}
`;
};

// Diet tips generator
const generateDietTips = (goal: FitnessGoal, dietType: 'vegetarian' | 'nonVegetarian') => {
  const tips = {
    weight_loss: [
      "Eat slowly and mindfully to recognize fullness cues",
      "Focus on high-volume, low-calorie foods like vegetables",
      "Drink water before meals to help with portion control",
      "Limit processed foods and added sugars",
      "Consider intermittent fasting approaches (consult a healthcare provider first)"
    ],
    muscle_gain: [
      "Eat a protein-rich meal or shake within 30 minutes after workouts",
      "Ensure you're in a caloric surplus of 300-500 calories daily",
      "Distribute protein intake evenly throughout the day",
      "Don't skip carbs - they're essential for fueling intense workouts",
      "Consider a casein protein source before bed for overnight recovery"
    ],
    strength: [
      "Prioritize protein and carbohydrates around your training sessions",
      "Consider creatine supplementation for improved strength performance",
      "Time carbohydrate intake to maximize glycogen stores before training",
      "Don't severely restrict any macronutrient while focusing on strength",
      "Stay well-hydrated for optimal performance"
    ],
    endurance: [
      "Carb-loading before endurance events improves performance",
      "Consume easily digestible carbs during longer sessions",
      "Replenish with a 4:1 carb-to-protein ratio after long workouts",
      "Train your gut by practicing your nutrition strategy during training",
      "Consider electrolyte replacement for sessions over 60 minutes"
    ],
    flexibility: [
      "Stay well-hydrated to maintain tissue elasticity",
      "Include omega-3 rich foods to reduce inflammation",
      "Collagen-rich foods may support joint and tendon health",
      "Avoid excessive caffeine which can contribute to dehydration",
      "Consider anti-inflammatory foods like turmeric in your diet"
    ],
    general_fitness: [
      "Focus on whole foods and minimize highly processed items",
      "Eat a rainbow of colored fruits and vegetables daily",
      "Stay hydrated throughout the day, especially around workouts",
      "Balance your macronutrients according to your activity level",
      "Consider timing nutrition around your workouts for best results"
    ]
  };

  const dietSpecificTips = {
    vegetarian: {
      weight_loss: "Combine incomplete protein sources to get all essential amino acids",
      muscle_gain: "Consider protein supplementation to meet higher protein needs",
      general_fitness: "Include vitamin B12 supplementation or fortified foods in your diet"
    },
    nonVegetarian: {
      weight_loss: "Choose leaner cuts of meat to reduce calorie intake",
      muscle_gain: "Rotate between different animal protein sources for varied amino acid profiles",
      general_fitness: "Include fatty fish at least twice a week for omega-3 fatty acids"
    }
  };

  // Get general tips for the goal
  const generalTips = tips[goal] || tips.general_fitness;
  
  // Get diet-specific tip if available
  const dietTip = dietSpecificTips[dietType][goal] || dietSpecificTips[dietType].general_fitness;
  
  // Combine tips
  return [...generalTips, dietTip].map(tip => `• ${tip}`).join('\n');
};

// Generate a detailed workout plan for a specific muscle group
const generateMuscleGroupWorkout = (muscleGroup: string, difficultyLevel: WorkoutDifficulty = 'intermediate') => {
  // Filter exercises for requested muscle group
  const relevantExercises = sampleWorkouts
    .flatMap(w => w.exercises)
    .filter(exercise => {
      const lowerCaseMuscleGroup = muscleGroup.toLowerCase();
      if (lowerCaseMuscleGroup === 'abs') return exercise.muscleGroup === 'core';
      if (lowerCaseMuscleGroup === 'chest') return exercise.muscleGroup === 'chest';
      if (lowerCaseMuscleGroup === 'back') return exercise.muscleGroup === 'back';
      if (lowerCaseMuscleGroup === 'legs') return ['legs', 'glutes'].includes(exercise.muscleGroup);
      if (lowerCaseMuscleGroup === 'shoulders') return exercise.muscleGroup === 'shoulders';
      if (lowerCaseMuscleGroup === 'arms') return ['arms', 'biceps', 'triceps'].includes(exercise.muscleGroup);
      if (lowerCaseMuscleGroup === 'full body') return exercise.muscleGroup === 'full body';
      return exercise.muscleGroup.toLowerCase().includes(lowerCaseMuscleGroup);
    });

  // If no exercises found, return a message
  if (relevantExercises.length === 0) {
    return `I couldn't find specific exercises for "${muscleGroup}". Please try a common muscle group like chest, back, legs, shoulders, arms, or core.`;
  }

  // Select exercises based on difficulty level
  let exerciseCount: number;
  let setCount: number;
  let repRange: string;
  let restTime: number;

  switch(difficultyLevel) {
    case 'beginner':
      exerciseCount = 4;
      setCount = 3;
      repRange = "10-12";
      restTime = 60;
      break;
    case 'advanced':
      exerciseCount = 6;
      setCount = 4;
      repRange = "8-10";
      restTime = 45;
      break;
    default: // intermediate
      exerciseCount = 5;
      setCount = 3;
      repRange = "10-12";
      restTime = 60;
  }

  // Get random exercises
  const shuffled = [...relevantExercises].sort(() => 0.5 - Math.random());
  const selectedExercises = shuffled.slice(0, Math.min(exerciseCount, shuffled.length));
  
  // Adjust workout if we don't have enough exercises
  if (selectedExercises.length < exerciseCount) {
    setCount += 1; // Add an extra set if we have fewer exercises
  }

  // Format the workout plan
  const formattedPlan = `
### ${capitalizeFirstLetter(muscleGroup)} Workout (${capitalizeFirstLetter(difficultyLevel)} Level)

Warm up with 5-10 minutes of light cardio and dynamic stretching before starting.

${selectedExercises.map((exercise, index) => `
#### ${index + 1}. ${exercise.name}
- Sets: ${setCount}
- Reps: ${repRange}
- Rest: ${restTime} seconds
- Description: ${exercise.description}
`).join('')}

Cool down with 5 minutes of static stretching, focusing on the ${muscleGroup} area.

#### Workout Tips:
- Focus on proper form rather than lifting heavy weights
- Breathe out during the exertion phase of each exercise
- Stay hydrated throughout your workout
- Aim to progressively increase weight or repetitions over time
- Allow ${muscleGroup} muscles 48-72 hours to recover before training them again
`;

  return formattedPlan;
};

// Helper function to get exercise instructions
const getExerciseInstructions = (exerciseName: string) => {
  // Look for an exact match first
  const exactMatchKey = Object.keys(exerciseInstructions).find(
    key => key.toLowerCase() === exerciseName.toLowerCase()
  );
  
  if (exactMatchKey) {
    return formatExerciseInstructions(exerciseInstructions[exactMatchKey]);
  }
  
  // Look for partial matches
  const partialMatchKey = Object.keys(exerciseInstructions).find(
    key => exerciseName.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(exerciseName.toLowerCase())
  );
  
  if (partialMatchKey) {
    return formatExerciseInstructions(exerciseInstructions[partialMatchKey]);
  }
  
  // Look in sample workouts if not found in exercise instructions
  const workoutExercise = sampleWorkouts
    .flatMap(w => w.exercises)
    .find(ex => ex.name.toLowerCase().includes(exerciseName.toLowerCase()));
  
  if (workoutExercise) {
    return `
### ${workoutExercise.name}

${workoutExercise.description}

#### How to perform:
- Sets: ${workoutExercise.sets}
- Reps: ${workoutExercise.reps}
- Rest: ${workoutExercise.restTime} seconds

I don't have detailed step-by-step instructions for this specific exercise, but you can find many tutorials online by searching for "${workoutExercise.name} proper form".

#### Muscles Worked:
Primary: ${workoutExercise.muscleGroup}
`;
  }
  
  // No match found
  return `I don't have specific instructions for "${exerciseName}". Try asking about common exercises like push-ups, squats, or planks. Or you can specify which muscle group you'd like to train, and I can suggest exercises for that area.`;
};

// Format exercise instructions
const formatExerciseInstructions = (exercise: any) => {
  return `
### ${exercise.name}

${exercise.description}

#### How to perform:
${exercise.instructions.map((step: string, index: number) => `${index + 1}. ${step}`).join('\n')}

#### Variations:
${exercise.variations.map((variation: any) => `
##### ${variation.name}
${variation.description}
${variation.instructions.map((step: string, index: number) => `${index + 1}. ${step}`).join('\n')}
`).join('')}

#### Muscles Worked:
Primary: ${exercise.muscleGroups.join(', ')}

#### Pro Tips:
${exercise.tips.map((tip: string) => `• ${tip}`).join('\n')}
`;
};

// Helper function to capitalize first letter
const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.replace('_', ' ').slice(1);
};

// Helper function to generate a workout plan
const generateWorkoutPlan = (userProfile: UserProfile | undefined) => {
  if (!userProfile) {
    return "To provide a personalized workout plan, I need to know your fitness goals and preferences. Could you share those with me?";
  }

  const matchingWorkouts = sampleWorkouts.filter(
    workout => 
      workout.difficulty === userProfile.workoutDifficulty &&
      workout.type === userProfile.preferredWorkoutType
  );

  if (matchingWorkouts.length === 0) {
    return "I couldn't find an exact match for your preferences, but here's a general workout plan you can follow...";
  }

  const workout = matchingWorkouts[Math.floor(Math.random() * matchingWorkouts.length)];
  
  return `Here's a personalized workout plan based on your ${userProfile.fitnessGoal.replace('_', ' ')} goal:

${workout.title}
Duration: ${workout.duration} minutes
Estimated calories burn: ${workout.caloriesBurn}

Exercises:
${workout.exercises.map(ex => `- ${ex.name}: ${ex.sets} sets of ${ex.reps}`).join('\n')}

Would you like me to explain any of these exercises in detail?`;
};

// Updated assistant response logic
export const getAssistantResponse = (
  userMessage: string,
  userProfile?: UserProfile
): string => {
  const message = userMessage.toLowerCase();

  // Check for workout plan request for specific muscle group
  if (
    (message.includes("workout") || message.includes("exercise")) && 
    (message.includes("plan") || message.includes("routine")) &&
    (
      message.includes("chest") || 
      message.includes("back") || 
      message.includes("leg") || 
      message.includes("shoulder") || 
      message.includes("arm") || 
      message.includes("bicep") || 
      message.includes("tricep") || 
      message.includes("core") || 
      message.includes("abs") ||
      message.includes("glute") ||
      message.includes("full body")
    )
  ) {
    // Extract muscle group
    const muscleGroups = [
      "chest", "back", "legs", "shoulders", "arms", 
      "biceps", "triceps", "core", "abs", "glutes", "full body"
    ];
    
    let targetMuscle = "full body";
    for (const muscle of muscleGroups) {
      if (message.includes(muscle)) {
        targetMuscle = muscle;
        break;
      }
    }
    
    // Determine difficulty level
    let difficulty: WorkoutDifficulty = userProfile?.workoutDifficulty || 'intermediate';
    if (message.includes("beginner")) difficulty = 'beginner';
    if (message.includes("intermediate")) difficulty = 'intermediate';
    if (message.includes("advanced")) difficulty = 'advanced';
    
    return generateMuscleGroupWorkout(targetMuscle, difficulty);
  }

  // Check for general workout plan request
  if (
    message.includes("workout plan") || 
    message.includes("exercise plan") ||
    (message.includes("plan") && message.includes("exercise")) ||
    (message.includes("give") && message.includes("workout"))
  ) {
    return generateWorkoutPlan(userProfile);
  }

  // Check for exercise instructions
  if (
    message.includes("how to do") || 
    message.includes("how to perform") || 
    message.includes("instructions for") || 
    message.includes("how to") && message.includes("exercise") ||
    message.includes("guide") && message.includes("exercise")
  ) {
    // Extract exercise name
    const messageParts = message.replace("?", "").split(" ");
    const exercises = ["push-up", "pushup", "push up", "squat", "plank", "lunge", "deadlift", "curl", "press"];
    
    let targetExercise = "";
    for (const part of messageParts) {
      for (const exercise of exercises) {
        if (part.includes(exercise)) {
          targetExercise = exercise;
          break;
        }
      }
      if (targetExercise) break;
    }
    
    // If no specific exercise found in our list, use the last few words as the exercise name
    if (!targetExercise && messageParts.length > 3) {
      targetExercise = messageParts.slice(Math.max(messageParts.length - 3, 0)).join(" ");
    }
    
    return getExerciseInstructions(targetExercise);
  }

  // Check for diet/nutrition plan request
  if (
    message.includes("diet plan") ||
    message.includes("meal plan") ||
    message.includes("nutrition plan") ||
    message.includes("what should i eat") ||
    (message.includes("plan") && message.includes("food"))
  ) {
    let dietType: 'vegetarian' | 'nonVegetarian' = 'nonVegetarian';
    
    if (message.includes("vegetarian") || message.includes("veg")) {
      dietType = 'vegetarian';
    }
    
    return generateDietPlan(userProfile?.fitnessGoal || "general_fitness", dietType);
  }

  // Check if asking about workout recommendations
  if (userMessage.includes("workout") && (userMessage.includes("recommend") || userMessage.includes("suggest"))) {
    if (userProfile) {
      return `Based on your goal of ${userProfile.fitnessGoal.replace('_', ' ')} and preference for ${userProfile.preferredWorkoutType} workouts, I'd recommend trying our ${userProfile.workoutDifficulty} level workout routine! Check the workout tab for a personalized recommendation.`;
    } else {
      return "I'd be happy to recommend a workout! First, could you tell me about your fitness goals and what type of workouts you prefer?";
    }
  }

  // Check if asking about nutrition
  if (userMessage.includes("eat") || userMessage.includes("food") || userMessage.includes("nutrition") || userMessage.includes("diet")) {
    if (userProfile?.fitnessGoal === "weight_loss") {
      return "For weight loss, focus on creating a moderate calorie deficit through a balanced diet rich in protein, fiber, and nutrients. Include plenty of vegetables, lean proteins, and whole foods while limiting processed foods and sugars. Stay hydrated and consider eating smaller meals more frequently to manage hunger.";
    } else if (userProfile?.fitnessGoal === "muscle_gain") {
      return "To support muscle growth, you'll want to eat in a slight caloric surplus with plenty of protein (around 1.6-2.2g per kg of bodyweight). Focus on nutrient-dense whole foods, complex carbs for energy, and healthy fats. Consider timing protein intake around your workouts for optimal results.";
    } else {
      return "Nutrition is a crucial part of any fitness journey! A balanced diet with adequate protein, complex carbohydrates, healthy fats, and plenty of fruits and vegetables will support your workouts and recovery. What specific nutrition questions do you have?";
    }
  }

  // Check if asking about motivation
  if (userMessage.includes("motivat") || userMessage.includes("stuck") || userMessage.includes("give up") || userMessage.includes("don't feel like")) {
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    return `I understand it can be tough to stay motivated! ${randomQuote} Remember why you started, and try setting small, achievable goals to build momentum. Even a 10-minute workout is better than nothing!`;
  }

  // Check if asking about rest days
  if (userMessage.includes("rest day") || userMessage.includes("recovery") || userMessage.includes("too sore")) {
    return "Rest days are crucial for your fitness journey! They allow your muscles to recover and grow stronger. If you're feeling very sore, consider active recovery like light walking, stretching, or yoga. Make sure you're getting enough sleep and staying hydrated to support recovery.";
  }

  // Check if asking about progress
  if (userMessage.includes("progress") || userMessage.includes("result") || userMessage.includes("not seeing")) {
    return "Fitness progress takes time and consistency! Remember that visible results often lag behind the actual changes happening in your body. Track measurements beyond the scale, like how your clothes fit, your energy levels, and your strength gains. Take progress photos and be patient with yourself!";
  }

  // Default response
  return "I'm your FitBuddy AI assistant! I can help with workout plans, diet advice, or answer any fitness-related questions. What would you like to know about?";
};

// Generate a health tip of the day
export const getTipOfTheDay = (goal: FitnessGoal = "general_fitness"): string => {
  const goalTips = fitnessTips[goal];
  const randomIndex = Math.floor(Math.random() * goalTips.length);
  return goalTips[randomIndex];
};

// Create sample chat history
export const generateInitialChatHistory = (): ChatMessage[] => {
  return [
    {
      id: "1",
      content: "Hi there! I'm your FitBuddy AI assistant. How can I help with your fitness journey today?",
      sender: "assistant",
      timestamp: new Date()
    }
  ];
};

