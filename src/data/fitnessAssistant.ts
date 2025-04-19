
import { ChatMessage, FitnessGoal, UserProfile } from "@/types";
import { getTipOfTheDay, motivationalQuotes } from "./tips";
import { generateDietPlan } from "./dietPlans";
import { getExerciseInstructions } from "./exerciseInstructions";
import { generateMuscleGroupWorkout, generateWorkoutPlan } from "./workouts";
import { getAllExercises, getExercisesByMuscleGroup } from "./exerciseDatabase";

// Helper function to capitalize first letter
const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.replace('_', ' ').slice(1);
};

// Improved function to extract exercise names from user messages with more accurate matching
const extractExerciseName = (message: string): string | null => {
  const lowerMessage = message.toLowerCase();
  
  // Common full exercise names that might be present in queries - exact matches first
  const fullExerciseNames = [
    "bench press", "incline bench press", "decline bench press",
    "push-up", "pushup", "push up", 
    "squat", "front squat", "goblet squat", "back squat",
    "plank", "side plank", 
    "lunge", "walking lunge", "reverse lunge",
    "deadlift", "romanian deadlift", "sumo deadlift",
    "bicep curl", "hammer curl", "preacher curl",
    "shoulder press", "overhead press", "military press",
    "pull-up", "pullup", "pull up", "chin up",
    "row", "bent over row", "inverted row", "dumbbell row",
    "fly", "chest fly", "lateral raise", 
    "extension", "tricep extension", "leg extension",
    "crunch", "sit-up", "situp", "sit up", "russian twist",
    "dip", "tricep dip", "chest dip",
    "leg press", "calf raise", "leg curl",
    "face pull", "upright row", "shrug", 
    "burpee", "jumping jack", "mountain climber",
    "superman", "hyperextension", "back extension", 
    "glute bridge", "hip thrust", "good morning", 
    "reverse fly", "lat pulldown", "tricep pushdown",
    "hanging leg raise", "bicycle crunch", "step-up", "box jump",
    "kettlebell swing", "kettlebell snatch", "kettlebell clean", 
    "farmers walk", "farmers carry", "sled push", "battle rope", "jump rope"
  ];
  
  // First check for exact matches (when the message contains the full exercise name)
  for (const exercise of fullExerciseNames) {
    // Full match or surrounded by spaces/punctuation to avoid partial matches
    if (lowerMessage.includes(` ${exercise} `) || 
        lowerMessage.includes(`${exercise} `) || 
        lowerMessage.includes(` ${exercise}`) || 
        lowerMessage === exercise) {
      console.log(`Found exact exercise match: ${exercise}`);
      return exercise;
    }
  }
  
  // Then check if it's part of a "how to do X" query
  const howToPatterns = [
    "how to do ", "how to perform ", "how do i do ", 
    "how to ", "show me how to do ", "tell me about "
  ];
  
  for (const pattern of howToPatterns) {
    if (lowerMessage.includes(pattern)) {
      const afterPattern = lowerMessage.split(pattern)[1]?.trim();
      if (afterPattern) {
        // Check if what follows the pattern matches any exercise
        for (const exercise of fullExerciseNames) {
          if (afterPattern.startsWith(exercise) || 
              afterPattern === exercise || 
              exercise.startsWith(afterPattern)) {
            console.log(`Found exercise in how-to query: ${exercise}`);
            return exercise;
          }
        }
      }
    }
  }
  
  // Check for muscle group references
  const muscleGroupKeywords = {
    "chest": ["chest", "pectoral", "pecs"],
    "back": ["back", "lats", "latissimus", "trapezius", "traps"],
    "shoulders": ["shoulder", "delt", "deltoid"],
    "arms": ["arm", "bicep", "tricep", "forearm"],
    "core": ["core", "abs", "abdominal", "oblique"],
    "legs": ["leg", "quad", "hamstring", "calf", "calves", "glute", "thigh"]
  };
  
  for (const [group, keywords] of Object.entries(muscleGroupKeywords)) {
    for (const keyword of keywords) {
      if (lowerMessage.includes(keyword)) {
        // Return the muscle group if specifically asking about exercises for that group
        if (lowerMessage.includes(`${keyword} exercise`) || 
            lowerMessage.includes(`exercise for ${keyword}`) ||
            lowerMessage.includes(`${keyword} workout`)) {
          console.log(`Found muscle group query: ${group}`);
          return group;
        }
      }
    }
  }
  
  // If no exact match found but a partial exercise name exists in the message
  // Look for any exercise as a fallback, but with lower confidence
  for (const exercise of fullExerciseNames) {
    if (lowerMessage.includes(exercise)) {
      console.log(`Found partial exercise match: ${exercise}`);
      return exercise;
    }
  }
  
  return null;
};

// Updated assistant response logic with improved exercise detection
export const getAssistantResponse = (
  userMessage: string,
  userProfile?: UserProfile
): string => {
  const message = userMessage.toLowerCase();
  console.log("Received message:", message);
  
  // First check if the message is asking about a specific exercise
  if (
    message.includes("exercise") || 
    message.includes("workout") || 
    message.includes("how to") || 
    message.includes("do") ||
    message.includes("perform") ||
    message.includes("what is") ||
    message.includes("tell me about")
  ) {
    // Try to extract a specific exercise name from the message
    const exerciseName = extractExerciseName(message);
    console.log("Extracted exercise name:", exerciseName);
    
    if (exerciseName) {
      // If we found an exercise term, return instructions for it
      const exerciseInstructions = getExerciseInstructions(exerciseName);
      
      // If we got valid instructions (not a fallback message)
      if (!exerciseInstructions.includes("I don't have specific instructions")) {
        return exerciseInstructions;
      }
    }
  }

  // Check for muscle group exercise list requests
  const muscleGroups = ["chest", "back", "legs", "shoulders", "arms", "core"];
  let targetMuscle = null;
  
  for (const muscle of muscleGroups) {
    if (message.includes(`${muscle} exercises`) || 
        message.includes(`exercises for ${muscle}`) ||
        message.includes(`${muscle} workout`) ||
        message.includes(`workout for ${muscle}`)) {
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

  // Check for exercise list request
  if (message.includes("list exercises") || 
      message.includes("show exercises") || 
      message.includes("what exercises") ||
      message.includes("all exercises")) {
    
    const exercises = getAllExercises();
    const categories = [...new Set(exercises.map(ex => ex.muscleGroup))];
    
    return `
### Exercise Categories

Here are the main exercise categories:

${categories.map(category => `- **${category}**`).join('\n')}

Ask me about exercises for a specific muscle group like "Show me chest exercises" or ask for details about a specific exercise like "How to do a proper push-up".
    `;
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
  return "I'm your FitBuddy AI assistant! I can help with workout plans, diet advice, or answer any fitness-related questions. Try asking me about specific exercises like \"How do I do a push-up?\" or \"What are good chest exercises?\"";
};

// Create sample chat history
export const generateInitialChatHistory = (): ChatMessage[] => {
  return [
    {
      id: "1",
      content: "Hi there! I'm your FitBuddy AI assistant. How can I help with your fitness journey today? Try asking me about specific exercises like \"How do I do a proper squat?\" or \"Show me some back exercises.\"",
      sender: "assistant",
      timestamp: new Date()
    }
  ];
};

// Export getTipOfTheDay so it can be used in other files
export { getTipOfTheDay };
