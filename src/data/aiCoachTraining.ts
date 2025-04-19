
// Define types for AI coach training data
export interface NutritionItem {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  sugar?: number;
  category: string;
  dietTypes: string[];
  servingSize: string;
  nutrients?: {
    vitamins?: Record<string, number>;
    minerals?: Record<string, number>;
  };
}

export interface ExerciseDataItem {
  name: string;
  primaryMuscle: string;
  secondaryMuscles: string[];
  equipment: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  instructions: string[];
  tips: string[];
  variations?: {
    name: string;
    description: string;
    difficulty: string;
  }[];
  videoUrl?: string;
  imageUrl?: string;
  metaData: {
    calorieBurn: number;
    targetReps: string;
    targetSets: number;
    restTime: number;
  };
}

export interface DietPlanTemplate {
  name: string;
  description: string;
  targetGoal: "weight_loss" | "muscle_gain" | "maintenance" | "performance";
  dietType: "omnivore" | "vegetarian" | "vegan" | "keto" | "paleo";
  macroSplit: {
    protein: number;
    carbs: number;
    fat: number;
  };
  mealStructure: {
    mealsPerDay: number;
    mealNames: string[];
    mealTimings?: string[];
  };
  sampleMeals: Record<string, string[]>;
  restrictions: string[];
  recommendations: string[];
}

export interface TrainingQA {
  category: "nutrition" | "exercise" | "diet" | "general";
  question: string;
  answer: string;
  relatedTopics: string[];
  keywords: string[];
  intentType: "information" | "recommendation" | "instruction" | "calculation";
}

export interface AICoachTrainingData {
  nutrition: NutritionItem[];
  exercises: ExerciseDataItem[];
  dietPlans: DietPlanTemplate[];
  qa: TrainingQA[];
}

// Default training data (you can replace with your JSON data by converting it to TS objects)
export const defaultTrainingData: AICoachTrainingData = {
  nutrition: [
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
  ],
  exercises: [
    {
      name: "Push-Up",
      primaryMuscle: "chest",
      secondaryMuscles: ["triceps", "shoulders", "core"],
      equipment: ["bodyweight"],
      difficulty: "beginner",
      instructions: [
        "Start in a plank position with hands shoulder-width apart",
        "Lower your body until your chest nearly touches the floor",
        "Pause, then push back up to the starting position"
      ],
      tips: [
        "Keep your body in a straight line",
        "Look slightly ahead of you, not directly down",
        "Keep your elbows at a 45-degree angle to your body"
      ],
      metaData: {
        calorieBurn: 8,
        targetReps: "10-15",
        targetSets: 3,
        restTime: 60
      }
    }
  ],
  dietPlans: [
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
  ],
  qa: [
    {
      category: "exercise",
      question: "How do I do a proper push-up?",
      answer: "To do a proper push-up: 1) Start in a plank position with hands shoulder-width apart. 2) Lower your body until your chest nearly touches the floor. 3) Keep your body in a straight line from head to heels. 4) Push back up to the starting position by fully extending your arms. 5) Breathe in as you lower and out as you push up.",
      relatedTopics: ["chest exercises", "bodyweight training", "form technique"],
      keywords: ["push-up", "chest", "form", "technique", "bodyweight"],
      intentType: "instruction"
    },
    {
      category: "nutrition",
      question: "How much protein should I eat for muscle gain?",
      answer: "For muscle gain, aim for 1.6-2.2g of protein per kg of bodyweight daily. For example, a 70kg person would need 112-154g of protein. Spread your protein intake across meals throughout the day, with a focus on quality sources like lean meats, eggs, dairy, legumes, and protein supplements if needed.",
      relatedTopics: ["muscle building", "protein sources", "macronutrients", "diet planning"],
      keywords: ["protein", "muscle", "gain", "diet", "bodybuilding"],
      intentType: "recommendation"
    }
  ]
};

// Function to load your training data
export const loadTrainingData = (): AICoachTrainingData => {
  // You could try to import JSON here once your module declaration is set up
  // For example:
  // try {
  //   const importedData = require('./your-data-file.json');
  //   return importedData as AICoachTrainingData;
  // } catch (error) {
  //   console.error('Failed to load JSON data:', error);
  //   return defaultTrainingData;
  // }
  
  // For now, return the default data
  return defaultTrainingData;
};

// Helper function to find relevant QA entries based on user query
export const findRelevantQA = (query: string): TrainingQA[] => {
  const trainingData = loadTrainingData();
  const keywords = query.toLowerCase().split(' ');
  
  return trainingData.qa.filter(qaItem => {
    // Check if any keywords match
    return qaItem.keywords.some(keyword => 
      keywords.some(queryWord => 
        keyword.toLowerCase().includes(queryWord) || 
        queryWord.includes(keyword.toLowerCase())
      )
    );
  });
};

// Helper function to get nutrition information
export const getNutritionInfo = (foodName: string): NutritionItem | undefined => {
  const trainingData = loadTrainingData();
  return trainingData.nutrition.find(item => 
    item.name.toLowerCase() === foodName.toLowerCase()
  );
};

// Helper function to get exercise information
export const getExerciseInfo = (exerciseName: string): ExerciseDataItem | undefined => {
  const trainingData = loadTrainingData();
  return trainingData.exercises.find(item => 
    item.name.toLowerCase() === exerciseName.toLowerCase()
  );
};
