
import { DietPlanTemplate } from "@/types/training";

export const dietPlanData: DietPlanTemplate[] = [
  {
    name: "Weight Loss Meal Plan",
    description: "A balanced meal plan designed for gradual, sustainable weight loss",
    targetGoal: "weight_loss",
    dietType: "omnivore",
    macroSplit: {
      protein: 30,
      carbs: 40,
      fat: 30
    },
    mealStructure: {
      mealsPerDay: 4,
      mealNames: ["Breakfast", "Lunch", "Dinner", "Snack"],
      mealTimings: ["7-9am", "12-2pm", "6-8pm", "3-4pm"]
    },
    sampleMeals: {
      "Breakfast": ["Greek yogurt with berries", "Veggie omelette with whole grain toast"],
      "Lunch": ["Grilled chicken salad", "Turkey and vegetable wrap"],
      "Dinner": ["Baked salmon with roasted vegetables", "Lean beef stir-fry with brown rice"],
      "Snack": ["Apple with almond butter", "Protein shake"]
    },
    restrictions: ["Limit processed foods", "Avoid sugary drinks"],
    recommendations: ["Drink plenty of water", "Include protein in every meal"]
  }
];
