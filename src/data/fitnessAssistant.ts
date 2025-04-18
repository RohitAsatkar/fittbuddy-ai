
import { ChatMessage, FitnessGoal, UserProfile } from "@/types";
import { getTipOfTheDay, motivationalQuotes } from "./tips";
import { generateDietPlan } from "./dietPlans";
import { getExerciseInstructions } from "./exerciseInstructions";
import { generateMuscleGroupWorkout, generateWorkoutPlan } from "./workouts";

// Helper function to capitalize first letter
const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.replace('_', ' ').slice(1);
};

// Updated assistant response logic
export const getAssistantResponse = (
  userMessage: string,
  userProfile?: UserProfile
): string => {
  const message = userMessage.toLowerCase();

  // Improved exercise instructions matching - check first for any kind of exercise questions
  if (
    message.includes("exercise") || 
    message.includes("workout") || 
    message.includes("how to") || 
    message.includes("do") ||
    message.includes("perform")
  ) {
    // Check specifically for exercise instructions
    const potentialExerciseTerms = [
      "bench press", "push-up", "pushup", "push up", "squat", "plank", "lunge", "deadlift", 
      "curl", "press", "pull-up", "pullup", "row", "fly", "raise", "extension", "crunch", 
      "twist", "dip", "chest", "back", "shoulder", "leg", "arm", "bicep", "tricep", "core", 
      "abs", "glute", "lateral", "overhead", "bent", "hammer", "skull", "triceps", "dumbbell",
      "barbell", "jumping"
    ];
    
    let targetExercise = "";
    
    // First try to identify a specific exercise name
    for (const term of potentialExerciseTerms) {
      if (message.includes(term)) {
        // If message contains "how to do X" or similar patterns
        if (
          message.includes(`how to do ${term}`) || 
          message.includes(`how to perform ${term}`) || 
          message.includes(`how do i do ${term}`) ||
          message.includes(`how to ${term}`)
        ) {
          targetExercise = term;
          break;
        }
        // Check if it's a question about a specific exercise
        if (message.includes(`what is ${term}`) || message.includes(`tell me about ${term}`)) {
          targetExercise = term;
          break;
        }
        // If direct exercise reference without specific question pattern
        targetExercise = term;
      }
    }
    
    // If we found an exercise term, return instructions for it
    if (targetExercise) {
      console.log(`Found exercise query for: ${targetExercise}`);
      return getExerciseInstructions(targetExercise);
    }
  }

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
    // Extract muscle group and difficulty
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
    
    const difficulty = message.includes("beginner") ? 'beginner' :
                      message.includes("advanced") ? 'advanced' :
                      userProfile?.workoutDifficulty || 'intermediate';
    
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

  // Check for diet/nutrition plan request
  if (
    message.includes("diet plan") ||
    message.includes("meal plan") ||
    message.includes("nutrition plan") ||
    message.includes("what should i eat") ||
    (message.includes("plan") && message.includes("food"))
  ) {
    const dietType = message.includes("vegetarian") || message.includes("veg") 
      ? 'vegetarian' 
      : 'nonVegetarian';
    
    return generateDietPlan(userProfile?.fitnessGoal || "general_fitness", dietType);
  }

  // Check if asking about workout recommendations
  if (message.includes("workout") && (message.includes("recommend") || message.includes("suggest"))) {
    if (userProfile) {
      return `Based on your goal of ${userProfile.fitnessGoal.replace('_', ' ')} and preference for ${userProfile.preferredWorkoutType} workouts, I'd recommend trying our ${userProfile.workoutDifficulty} level workout routine! Check the workout tab for a personalized recommendation.`;
    }
    return "I'd be happy to recommend a workout! First, could you tell me about your fitness goals and what type of workouts you prefer?";
  }

  // Check if asking about nutrition
  if (message.includes("eat") || message.includes("food") || message.includes("nutrition") || message.includes("diet")) {
    if (userProfile?.fitnessGoal === "weight_loss") {
      return "For weight loss, focus on creating a moderate calorie deficit through a balanced diet rich in protein, fiber, and nutrients. Include plenty of vegetables, lean proteins, and whole foods while limiting processed foods and sugars. Stay hydrated and consider eating smaller meals more frequently to manage hunger.";
    }
    if (userProfile?.fitnessGoal === "muscle_gain") {
      return "To support muscle growth, you'll want to eat in a slight caloric surplus with plenty of protein (around 1.6-2.2g per kg of bodyweight). Focus on nutrient-dense whole foods, complex carbs for energy, and healthy fats. Consider timing protein intake around your workouts for optimal results.";
    }
    return "Nutrition is a crucial part of any fitness journey! A balanced diet with adequate protein, complex carbohydrates, healthy fats, and plenty of fruits and vegetables will support your workouts and recovery. What specific nutrition questions do you have?";
  }

  // Check if asking about motivation
  if (message.includes("motivat") || message.includes("stuck") || message.includes("give up") || message.includes("don't feel like")) {
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    return `I understand it can be tough to stay motivated! ${randomQuote} Remember why you started, and try setting small, achievable goals to build momentum. Even a 10-minute workout is better than nothing!`;
  }

  // Check if asking about rest days
  if (message.includes("rest day") || message.includes("recovery") || message.includes("too sore")) {
    return "Rest days are crucial for your fitness journey! They allow your muscles to recover and grow stronger. If you're feeling very sore, consider active recovery like light walking, stretching, or yoga. Make sure you're getting enough sleep and staying hydrated to support recovery.";
  }

  // Check if asking about progress
  if (message.includes("progress") || message.includes("result") || message.includes("not seeing")) {
    return "Fitness progress takes time and consistency! Remember that visible results often lag behind the actual changes happening in your body. Track measurements beyond the scale, like how your clothes fit, your energy levels, and your strength gains. Take progress photos and be patient with yourself!";
  }

  // Default response
  return "I'm your FitBuddy AI assistant! I can help with workout plans, diet advice, or answer any fitness-related questions. What would you like to know about?";
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

// Export getTipOfTheDay so it can be used in other files
export { getTipOfTheDay };
