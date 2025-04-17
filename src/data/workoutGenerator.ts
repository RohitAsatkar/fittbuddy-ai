import { WorkoutDifficulty, WorkoutType, UserProfile, FitnessGoal } from "@/types";
import { exercises } from "./exercises";

// Function to generate muscle group specific workout
export const generateMuscleGroupWorkout = (muscleGroup: string, difficulty: WorkoutDifficulty): string => {
  // Normalize muscle group name
  const normalizedMuscle = muscleGroup.toLowerCase();

  // Get relevant exercises from our exercise database
  const relevantExercises = Object.values(exercises).filter(exercise => 
    exercise.muscleGroup.toLowerCase().includes(normalizedMuscle) ||
    (normalizedMuscle.includes("arm") && (exercise.muscleGroup === "biceps" || exercise.muscleGroup === "triceps")) ||
    (normalizedMuscle.includes("ab") && exercise.muscleGroup === "core")
  );

  if (relevantExercises.length === 0) {
    return `I couldn't find exercises specifically for ${muscleGroup}. Would you like a full body workout instead?`;
  }

  // Adjust reps and sets based on difficulty
  const difficultySettings = {
    beginner: { sets: 2, restTime: 90, intensity: "lighter" },
    intermediate: { sets: 3, restTime: 60, intensity: "moderate" },
    advanced: { sets: 4, restTime: 45, intensity: "challenging" }
  };

  const { sets, restTime, intensity } = difficultySettings[difficulty];

  // Build the workout plan
  let workout = `# ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} ${
    muscleGroup.charAt(0).toUpperCase() + muscleGroup.slice(1)
  } Workout\n\n`;
  
  workout += `Here's a ${difficulty} ${muscleGroup} workout that will help you build strength and definition:\n\n`;
  workout += "## Warm-up\n";
  workout += "- 5 minutes of light cardio to get your blood flowing\n";
  workout += "- Dynamic stretching for the target muscle groups\n\n";
  
  workout += "## Main Workout\n";
  
  // Add up to 5 exercises from the filtered list
  const maxExercises = Math.min(5, relevantExercises.length);
  for (let i = 0; i < maxExercises; i++) {
    const exercise = relevantExercises[i];
    workout += `### ${i + 1}. ${exercise.name}\n`;
    workout += `- Sets: ${sets}\n`;
    workout += `- Reps: ${exercise.reps}\n`;
    workout += `- Rest: ${restTime} seconds\n`;
    workout += `- ${exercise.description}\n\n`;
  }
  
  workout += "## Cool-down\n";
  workout += "- Static stretching for the worked muscles (hold each stretch for 30 seconds)\n";
  workout += "- 5 minutes of light walking or cycling to gradually reduce heart rate\n\n";
  
  workout += `## Tips for ${difficulty} Level\n`;
  
  if (difficulty === "beginner") {
    workout += "- Focus on form rather than weight\n";
    workout += "- Take extra rest if needed\n";
    workout += "- Start with bodyweight variations if any movement feels too challenging\n";
  } else if (difficulty === "intermediate") {
    workout += "- Focus on mind-muscle connection\n";
    workout += "- Consider adding progressive overload by increasing weight slightly each week\n";
    workout += "- Track your workouts to monitor progress\n";
  } else {
    workout += "- Consider adding advanced techniques like drop sets or supersets\n";
    workout += "- Focus on time under tension by slowing down the eccentric (lowering) phase\n";
    workout += "- Ensure adequate recovery between workouts targeting the same muscle group\n";
  }

  return workout;
};

// Helper function to generate workout for a specific day
export const generateDayWorkout = (focus: string, difficulty: WorkoutDifficulty, type: WorkoutType): string => {
  const difficultySettings = {
    beginner: { sets: "2-3", intensity: "lighter weights, focus on form" },
    intermediate: { sets: "3-4", intensity: "moderate weights with good form" },
    advanced: { sets: "4-5", intensity: "challenging weights while maintaining form" }
  };
  
  const { sets, intensity } = difficultySettings[difficulty];
  
  let workout = "";
  
  if (focus === "chest") {
    workout += `- Perform ${sets} sets of each exercise with ${intensity}:\n`;
    workout += "- Push-ups or chest press (8-12 reps)\n";
    workout += "- Incline dumbbell press or incline push-ups (10-12 reps)\n";
    workout += "- Chest flies (12-15 reps)\n";
    workout += "- Tricep dips (10-15 reps)\n";
    workout += "- Tricep extensions (12-15 reps)\n";
  } else if (focus === "back") {
    workout += `- Perform ${sets} sets of each exercise with ${intensity}:\n`;
    workout += "- Bent-over rows or seated rows (10-12 reps)\n";
    workout += "- Lat pulldowns or pull-ups (8-12 reps)\n";
    workout += "- Reverse flies (12-15 reps)\n";
    workout += "- Bicep curls (12-15 reps)\n";
    workout += "- Hammer curls (12-15 reps)\n";
  } else if (focus === "legs") {
    workout += `- Perform ${sets} sets of each exercise with ${intensity}:\n`;
    workout += "- Squats (10-15 reps)\n";
    workout += "- Lunges (10-12 reps per leg)\n";
    workout += "- Deadlifts (8-12 reps)\n";
    workout += "- Calf raises (15-20 reps)\n";
    workout += "- Glute bridges (15-20 reps)\n";
    workout += "- Planks (30-60 seconds)\n";
  } else if (focus === "shoulders") {
    workout += `- Perform ${sets} sets of each exercise with ${intensity}:\n`;
    workout += "- Shoulder press (10-12 reps)\n";
    workout += "- Lateral raises (12-15 reps)\n";
    workout += "- Front raises (12-15 reps)\n";
    workout += "- Reverse flies (12-15 reps)\n";
    workout += "- Shrugs (15-20 reps)\n";
  } else if (focus === "upper body") {
    workout += `- Perform ${sets} sets of each exercise with ${intensity}:\n`;
    workout += "- Push-ups or chest press (10-12 reps)\n";
    workout += "- Bent-over rows or seated rows (10-12 reps)\n";
    workout += "- Shoulder press (10-12 reps)\n";
    workout += "- Bicep curls (12-15 reps)\n";
    workout += "- Tricep dips or extensions (12-15 reps)\n";
  } else if (focus === "lower body") {
    workout += `- Perform ${sets} sets of each exercise with ${intensity}:\n`;
    workout += "- Squats (12-15 reps)\n";
    workout += "- Lunges (10-12 reps per leg)\n";
    workout += "- Deadlifts or glute bridges (12-15 reps)\n";
    workout += "- Calf raises (15-20 reps)\n";
    workout += "- Wall sits (30-60 seconds)\n";
  } else {
    // Full body
    workout += `- Perform ${sets} sets of each exercise with ${intensity}:\n`;
    workout += "- Squats (12-15 reps)\n";
    workout += "- Push-ups (10-12 reps)\n";
    workout += "- Bent-over rows (10-12 reps)\n";
    workout += "- Lunges (10 reps per leg)\n";
    workout += "- Shoulder press (10-12 reps)\n";
    workout += "- Plank (30-60 seconds)\n";
  }
  
  if (type === "home") {
    workout += "\nThis workout can be done at home with minimal equipment (dumbbells or resistance bands are helpful but not required).\n";
  } else {
    workout += "\nThis workout is designed for the gym with access to various equipment.\n";
  }
  
  return workout;
};

// Generate a complete workout plan based on user profile
export const generateWorkoutPlan = (userProfile?: UserProfile): string => {
  if (!userProfile) {
    return "I need more information about your fitness level and goals to create a personalized workout plan. Please complete your profile first!";
  }

  const { fitnessGoal, workoutDifficulty, preferredWorkoutType } = userProfile;
  
  // Define workout frequency based on goal
  const getFrequency = (goal: FitnessGoal): number => {
    switch (goal) {
      case "muscle_gain": return 5;
      case "strength": return 4;
      case "weight_loss": return 5;
      case "endurance": return 5;
      case "flexibility": return 4;
      default: return 3;
    }
  };
  
  const frequency = getFrequency(fitnessGoal);
  
  // Build the workout plan
  let plan = `# Custom ${fitnessGoal.replace('_', ' ').charAt(0).toUpperCase() + fitnessGoal.replace('_', ' ').slice(1)} Workout Plan\n\n`;
  
  plan += `Based on your goal of ${fitnessGoal.replace('_', ' ')}, ${workoutDifficulty} fitness level, and preference for ${preferredWorkoutType} workouts, here's a ${frequency}-day workout plan:\n\n`;
  
  // Different workout splits based on goal
  if (fitnessGoal === "muscle_gain" || fitnessGoal === "strength") {
    plan += "## Day 1: Chest and Triceps\n";
    plan += generateDayWorkout("chest", workoutDifficulty, preferredWorkoutType);
    
    plan += "\n## Day 2: Back and Biceps\n";
    plan += generateDayWorkout("back", workoutDifficulty, preferredWorkoutType);
    
    plan += "\n## Day 3: Rest or Light Activity\n";
    plan += "- Active recovery: light walking, swimming, or yoga\n";
    plan += "- Ensure adequate hydration and nutrition\n";
    
    plan += "\n## Day 4: Legs and Core\n";
    plan += generateDayWorkout("legs", workoutDifficulty, preferredWorkoutType);
    
    plan += "\n## Day 5: Shoulders and Arms\n";
    plan += generateDayWorkout("shoulders", workoutDifficulty, preferredWorkoutType);
    
    if (frequency > 5) {
      plan += "\n## Day 6: Full Body or Lagging Muscle Groups\n";
      plan += "- Focus on muscle groups you feel need extra attention\n";
      plan += "- Keep intensity moderate to avoid overtraining\n";
    }
    
    plan += "\n## Recovery Tips\n";
    plan += "- Ensure you get 7-9 hours of quality sleep\n";
    plan += "- Consume adequate protein (1.6-2.2g per kg of bodyweight)\n";
    plan += "- Stay hydrated throughout the day\n";
    plan += "- Consider foam rolling or stretching on rest days\n";
  } else if (fitnessGoal === "weight_loss") {
    plan += "## Day 1: Full Body Strength + HIIT\n";
    plan += "- 30-40 minutes of compound exercises (squats, push-ups, rows)\n";
    plan += "- Followed by 15-20 minutes of high-intensity interval training\n";
    
    plan += "\n## Day 2: Cardio Focus\n";
    plan += "- 45-60 minutes of moderate-intensity cardio (jogging, cycling, swimming)\n";
    plan += "- Optional: 15 minutes of core exercises\n";
    
    plan += "\n## Day 3: Upper Body Strength + HIIT\n";
    plan += generateDayWorkout("upper body", workoutDifficulty, preferredWorkoutType);
    plan += "- Finish with 15 minutes of HIIT intervals\n";
    
    plan += "\n## Day 4: Active Recovery\n";
    plan += "- 30-45 minutes of low-intensity movement (walking, light cycling)\n";
    plan += "- Stretching or yoga session\n";
    
    plan += "\n## Day 5: Lower Body Strength + HIIT\n";
    plan += generateDayWorkout("lower body", workoutDifficulty, preferredWorkoutType);
    plan += "- Finish with 15 minutes of HIIT intervals\n";
    
    plan += "\n## Nutrition Tips for Weight Loss\n";
    plan += "- Create a moderate calorie deficit (300-500 calories below maintenance)\n";
    plan += "- Prioritize protein and fiber in each meal\n";
    plan += "- Stay well-hydrated, especially before meals\n";
    plan += "- Consider intermittent fasting if it suits your lifestyle\n";
  } else if (fitnessGoal === "endurance") {
    plan += "## Day 1: Long Cardio Session\n";
    plan += "- 45-75 minutes of steady-state cardio at moderate intensity\n";
    plan += "- Focus on maintaining consistent effort throughout\n";
    
    plan += "\n## Day 2: Interval Training\n";
    plan += "- Warm up for 10 minutes\n";
    plan += "- 6-10 intervals of 2-3 minutes high intensity followed by 2 minutes recovery\n";
    plan += "- Cool down for 10 minutes\n";
    
    plan += "\n## Day 3: Strength Training\n";
    plan += "- Full body workout with higher reps (15-20) and shorter rest periods\n";
    plan += "- Focus on compound movements to build supporting muscles\n";
    
    plan += "\n## Day 4: Active Recovery\n";
    plan += "- 30-45 minutes of very light activity (walking, swimming, cycling)\n";
    plan += "- Stretching or mobility work\n";
    
    plan += "\n## Day 5: Mixed Cardio and Strength\n";
    plan += "- 30 minutes cardio at moderate intensity\n";
    plan += "- 20-30 minutes circuit training (minimal rest between exercises)\n";
    
    plan += "\n## Endurance Tips\n";
    plan += "- Gradually increase duration by no more than 10% per week\n";
    plan += "- Pay attention to proper fueling before, during (for sessions >60 min), and after workouts\n";
    plan += "- Invest in proper shoes and gear to prevent injuries\n";
  } else {
    // General fitness or flexibility
    plan += "## Day 1: Full Body Strength\n";
    plan += generateDayWorkout("full body", workoutDifficulty, preferredWorkoutType);
    
    plan += "\n## Day 2: Cardio and Core\n";
    plan += "- 30-45 minutes of cardio at a comfortable pace\n";
    plan += "- 15-20 minutes of core-focused exercises\n";
    
    plan += "\n## Day 3: Rest or Active Recovery\n";
    plan += "- Light walking, swimming, or cycling\n";
    plan += "- Stretching or yoga session\n";
    
    plan += "\n## Day 4: Upper Body Focus\n";
    plan += generateDayWorkout("upper body", workoutDifficulty, preferredWorkoutType);
    
    if (frequency > 4) {
      plan += "\n## Day 5: Lower Body Focus\n";
      plan += generateDayWorkout("lower body", workoutDifficulty, preferredWorkoutType);
    }
    
    plan += "\n## General Fitness Tips\n";
    plan += "- Find activities you enjoy to maintain consistency\n";
    plan += "- Mix up your routine every 4-6 weeks to prevent plateaus\n";
    plan += "- Focus on gradual improvement rather than perfection\n";
    plan += "- Balance your training with adequate recovery\n";
  }
  
  plan += "\n\nRemember to adjust this plan based on how your body responds. Listen to your body, prioritize proper form, and be consistent for the best results!";
  
  return plan;
};
