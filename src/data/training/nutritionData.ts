
import { NutritionItem } from "@/types/training";

export const nutritionData: NutritionItem[] = [
  {
    name: "Chicken Breast",
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    category: "protein",
    dietTypes: ["omnivore", "keto", "paleo"],
    servingSize: "100g",
    nutrients: {
      vitamins: { "B6": 0.6, "B12": 0.3 },
      minerals: { "potassium": 256, "phosphorus": 210 }
    }
  },
  {
    name: "Brown Rice",
    calories: 112,
    protein: 2.6,
    carbs: 23.5,
    fat: 0.9,
    fiber: 1.8,
    sugar: 0.4,
    category: "carbohydrate",
    dietTypes: ["vegetarian", "vegan"],
    servingSize: "100g cooked"
  }
];
