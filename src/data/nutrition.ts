
interface FoodNutrition {
  protein: number;
  carbs: number;
  calories: number;
  category: 'protein' | 'carb' | 'vegetable' | 'fat';
}

export const foodNutrition: {
  vegetarian: Record<string, FoodNutrition>;
  nonVegetarian: Record<string, FoodNutrition>;
} = {
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

