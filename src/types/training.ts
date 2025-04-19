
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
