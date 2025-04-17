
import { FitnessGoal } from "@/types";
import { foodNutrition } from "./nutrition";

// Diet plan generator
export const generateDietPlan = (goal: FitnessGoal, dietType: 'vegetarian' | 'nonVegetarian' = 'nonVegetarian') => {
  const foodSource = dietType === 'vegetarian' ? foodNutrition.vegetarian : foodNutrition.nonVegetarian;
  
  // Select appropriate foods based on goal
  const proteinRich = Object.entries(foodSource).filter(([_, data]) => data.category === "protein");
  const carbRich = Object.entries(foodSource).filter(([_, data]) => data.category === "carb");
  const vegetables = Object.entries(foodSource).filter(([_, data]) => data.category === "vegetable");
  const fats = Object.entries(foodSource).filter(([_, data]) => data.category === "fat");
  
  // Get goal-specific targets
  const { calorieGoal, proteinGoal, carbGoal, fatGoal } = getDietGoals(goal);

  // Create random selection function
  const randomItem = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];
  
  // Build the diet plan components
  const meals = generateMeals(randomItem, proteinRich, carbRich, vegetables, fats);
  
  return formatDietPlan(goal, dietType, calorieGoal, proteinGoal, carbGoal, fatGoal, meals);
};

function getDietGoals(goal: FitnessGoal) {
  switch(goal) {
    case 'weight_loss':
      return {
        calorieGoal: "1500-1800",
        proteinGoal: "high (25-30% of calories)",
        carbGoal: "moderate (40-45% of calories)",
        fatGoal: "moderate (25-30% of calories)"
      };
    case 'muscle_gain':
      return {
        calorieGoal: "2500-3000",
        proteinGoal: "very high (30-35% of calories)",
        carbGoal: "high (45-50% of calories)",
        fatGoal: "moderate (20-25% of calories)"
      };
    default:
      return {
        calorieGoal: "2000-2200",
        proteinGoal: "moderate (20-25% of calories)",
        carbGoal: "moderate (45-50% of calories)",
        fatGoal: "moderate (25-30% of calories)"
      };
  }
}

function generateMeals(randomItem: (arr: any[]) => any, proteinRich: any[], carbRich: any[], vegetables: any[], fats: any[]) {
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
    protein: randomItem(proteinRich.filter(item => 
      item[0] !== breakfast.protein[0] && item[0] !== lunch.protein[0])),
    vegetable: randomItem(vegetables.filter(item => item[0] !== lunch.vegetable[0])),
    fat: randomItem(fats.filter(item => item[0] !== breakfast.fat[0]))
  };
  
  const snacks = {
    morning: randomItem([...proteinRich, ...fats]),
    afternoon: randomItem(carbRich.filter(item => 
      item[0] !== breakfast.carb[0] && item[0] !== lunch.carb[0]))
  };

  return { breakfast, lunch, dinner, snacks };
}

function formatDietPlan(
  goal: FitnessGoal,
  dietType: 'vegetarian' | 'nonVegetarian',
  calorieGoal: string,
  proteinGoal: string,
  carbGoal: string,
  fatGoal: string,
  meals: any
) {
  const { breakfast, lunch, dinner, snacks } = meals;
  
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
- ${snacks.morning[0]} (${snacks.morning[1].protein}g protein, ${snacks.morning[1].carbs}g carbs per 100g)

#### Lunch:
- ${lunch.protein[0]} (${lunch.protein[1].protein}g protein, ${lunch.protein[1].carbs}g carbs per 100g)
- ${lunch.carb[0]} (${lunch.carb[1].protein}g protein, ${lunch.carb[1].carbs}g carbs per 100g)
- ${lunch.vegetable[0]} (${lunch.vegetable[1].protein}g protein, ${lunch.vegetable[1].carbs}g carbs per 100g)

#### Afternoon Snack:
- ${snacks.afternoon[0]} (${snacks.afternoon[1].protein}g protein, ${snacks.afternoon[1].carbs}g carbs per 100g)

#### Dinner:
- ${dinner.protein[0]} (${dinner.protein[1].protein}g protein, ${dinner.protein[1].carbs}g carbs per 100g)
- ${dinner.vegetable[0]} (${dinner.vegetable[1].protein}g protein, ${dinner.vegetable[1].carbs}g carbs per 100g)
- ${dinner.fat[0]} (in moderation)

Water: Drink at least 2-3 liters of water throughout the day.

Tips for ${goal.replace('_', ' ')}:
${generateDietTips(goal, dietType)}
`;
}

// Diet tips generator
export const generateDietTips = (goal: FitnessGoal, dietType: 'vegetarian' | 'nonVegetarian') => {
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

  const generalTips = tips[goal] || tips.general_fitness;
  const dietTip = dietSpecificTips[dietType][goal] || dietSpecificTips[dietType].general_fitness;
  
  return [...generalTips, dietTip].map(tip => `• ${tip}`).join('\n');
};

