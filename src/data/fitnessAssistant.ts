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

// Helper function to generate a diet plan
const generateDietPlan = (goal: FitnessGoal) => {
  const plans = {
    weight_loss: `Here's a balanced diet plan for weight loss:

Breakfast:
- Oatmeal with berries and nuts
- Greek yogurt
- Green tea

Lunch:
- Grilled chicken breast
- Mixed salad with olive oil dressing
- Quinoa

Dinner:
- Baked fish
- Steamed vegetables
- Brown rice

Snacks:
- Apple with almond butter
- Carrot sticks with hummus

Remember to maintain a slight caloric deficit and stay hydrated!`,

    muscle_gain: `Here's a high-protein diet plan for muscle gain:

Breakfast:
- 4 egg omelet with spinach and cheese
- Whole grain toast
- Protein shake

Lunch:
- Lean beef or chicken
- Sweet potato
- Broccoli
- Brown rice

Dinner:
- Salmon or tuna
- Quinoa
- Mixed vegetables
- Greek yogurt

Snacks:
- Protein bar
- Mixed nuts
- Banana with peanut butter

Aim for a caloric surplus of 300-500 calories and 1.6-2.2g protein per kg of bodyweight.`,

    general_fitness: `Here's a balanced diet plan for general fitness:

Breakfast:
- Whole grain cereal with milk
- Fresh fruit
- Hard-boiled eggs

Lunch:
- Turkey sandwich on whole grain bread
- Mixed salad
- Yogurt

Dinner:
- Grilled chicken or fish
- Brown rice or sweet potato
- Steamed vegetables

Snacks:
- Fresh fruit
- Mixed nuts
- Hummus with vegetables

Focus on balanced nutrition and staying hydrated!`
  };

  return plans[goal] || plans.general_fitness;
};

// Updated assistant response logic
export const getAssistantResponse = (
  userMessage: string,
  userProfile?: UserProfile
): string => {
  const message = userMessage.toLowerCase();

  // Check for workout plan request
  if (
    message.includes("workout plan") || 
    message.includes("exercise plan") ||
    (message.includes("plan") && message.includes("exercise")) ||
    (message.includes("give") && message.includes("workout"))
  ) {
    return generateWorkoutPlan(userProfile);
  }

  // Check for diet/nutrition plan request
  if (
    message.includes("diet plan") ||
    message.includes("meal plan") ||
    message.includes("nutrition plan") ||
    message.includes("what should i eat") ||
    (message.includes("plan") && message.includes("food"))
  ) {
    return generateDietPlan(userProfile?.fitnessGoal || "general_fitness");
  }

  // Check for specific exercise questions
  if (message.includes("how to") && message.includes("exercise")) {
    const exercise = sampleWorkouts
      .flatMap(w => w.exercises)
      .find(e => message.includes(e.name.toLowerCase()));
    
    if (exercise) {
      return `Here's how to do ${exercise.name}:
${exercise.description}

Sets: ${exercise.sets}
Reps: ${exercise.reps}
Rest between sets: ${exercise.restTime} seconds

Would you like me to explain anything else about this exercise?`;
    }
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
