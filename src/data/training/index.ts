
import { AICoachTrainingData, NutritionItem, ExerciseDataItem, TrainingQA } from "@/types/training";
import { nutritionData } from "./nutritionData";
import { exerciseData } from "./exerciseData";
import { dietPlanData } from "./dietPlanData";
import { qaData } from "./qaData";

export const defaultTrainingData: AICoachTrainingData = {
  nutrition: nutritionData,
  exercises: exerciseData,
  dietPlans: dietPlanData,
  qa: qaData
};

// Function to load your training data
export const loadTrainingData = (): AICoachTrainingData => {
  return defaultTrainingData;
};

// Helper function to find relevant QA entries based on user query
export const findRelevantQA = (query: string): TrainingQA[] => {
  const trainingData = loadTrainingData();
  const keywords = query.toLowerCase().split(' ');
  
  return trainingData.qa.filter(qaItem => {
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

export { nutritionData, exerciseData, dietPlanData, qaData };
