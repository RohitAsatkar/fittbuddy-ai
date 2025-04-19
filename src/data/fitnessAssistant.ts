
import { ChatMessage, FitnessGoal, UserProfile } from "@/types";
import { getTipOfTheDay, motivationalQuotes } from "./tips";
import { extractExerciseName } from "@/utils/exerciseUtils";
import { handleNutritionQuery } from "@/utils/nutritionMessageHandler";
import { handleWorkoutQuery } from "@/utils/workoutMessageHandler";

export const getAssistantResponse = (
  userMessage: string,
  userProfile?: UserProfile
): string => {
  const message = userMessage.toLowerCase();
  console.log("Received message:", message);
  
  // Try workout-related responses first
  const workoutResponse = handleWorkoutQuery(message, userProfile);
  if (workoutResponse) return workoutResponse;

  // Try nutrition-related responses
  const nutritionResponse = handleNutritionQuery(message, userProfile);
  if (nutritionResponse) return nutritionResponse;

  // Check if asking about motivation
  if (message.includes("motivat") || message.includes("stuck") || 
      message.includes("give up") || message.includes("don't feel like")) {
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    return `I understand it can be tough to stay motivated! ${randomQuote} Remember why you started, and try setting small, achievable goals to build momentum. Even a 10-minute workout is better than nothing!`;
  }

  // Check if asking about rest days
  if (message.includes("rest day") || message.includes("recovery") || 
      message.includes("too sore")) {
    return "Rest days are crucial for your fitness journey! They allow your muscles to recover and grow stronger. If you're feeling very sore, consider active recovery like light walking, stretching, or yoga. Make sure you're getting enough sleep and staying hydrated to support recovery.";
  }

  // Check if asking about progress
  if (message.includes("progress") || message.includes("result") || 
      message.includes("not seeing")) {
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
