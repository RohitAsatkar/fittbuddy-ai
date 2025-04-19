
import { UserProfile } from "@/types";
import { generateDietPlan } from "@/data/dietPlans";

export const handleNutritionQuery = (message: string, userProfile?: UserProfile): string => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes("diet plan") ||
      lowerMessage.includes("meal plan") ||
      lowerMessage.includes("nutrition plan") ||
      lowerMessage.includes("what should i eat") ||
      (lowerMessage.includes("plan") && lowerMessage.includes("food"))) {
    
    const dietType = lowerMessage.includes("vegetarian") || lowerMessage.includes("veg") 
      ? 'vegetarian' 
      : 'nonVegetarian';
    
    return generateDietPlan(userProfile?.fitnessGoal || "general_fitness", dietType);
  }

  if (lowerMessage.includes("eat") || lowerMessage.includes("food") || 
      lowerMessage.includes("nutrition") || lowerMessage.includes("diet")) {
    if (userProfile?.fitnessGoal === "weight_loss") {
      return "For weight loss, focus on creating a moderate calorie deficit through a balanced diet rich in protein, fiber, and nutrients. Include plenty of vegetables, lean proteins, and whole foods while limiting processed foods and sugars. Stay hydrated and consider eating smaller meals more frequently to manage hunger.";
    }
    if (userProfile?.fitnessGoal === "muscle_gain") {
      return "To support muscle growth, you'll want to eat in a slight caloric surplus with plenty of protein (around 1.6-2.2g per kg of bodyweight). Focus on nutrient-dense whole foods, complex carbs for energy, and healthy fats. Consider timing protein intake around your workouts for optimal results.";
    }
    return "Nutrition is a crucial part of any fitness journey! A balanced diet with adequate protein, complex carbohydrates, healthy fats, and plenty of fruits and vegetables will support your workouts and recovery. What specific nutrition questions do you have?";
  }

  return "";
};
