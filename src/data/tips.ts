
import { FitnessGoal } from "@/types";

// Sample fitness tips for different goals
export const fitnessTips: Record<FitnessGoal, string[]> = {
  weight_loss: [
    "Mix cardio and strength training for optimal fat burning.",
    "Maintain a slight caloric deficit (about 500 calories below maintenance).",
    "Stay hydrated - sometimes hunger is actually thirst.",
    "Focus on protein-rich foods to maintain muscle while losing fat.",
    "Consistency beats intensity - regular moderate workouts are better than occasional intense ones.",
    "Get enough sleep - poor sleep can increase hunger hormones."
  ],
  muscle_gain: [
    "Ensure you're eating in a slight caloric surplus (about 300-500 calories extra).",
    "Prioritize protein intake (1.6-2.2g per kg of bodyweight).",
    "Progressive overload is key - gradually increase weights or reps.",
    "Allow 48 hours recovery for muscle groups you've trained intensely.",
    "Don't skip leg day - lower body workouts boost overall growth hormones.",
    "Post-workout nutrition matters - have protein and carbs within 30 minutes of finishing."
  ],
  strength: [
    "Focus on compound movements like squats, deadlifts, and bench press.",
    "Lower reps (1-5) with higher weights are optimal for strength gains.",
    "Rest longer between strength sets (3-5 minutes).",
    "Proper form is essential - don't sacrifice technique for weight.",
    "Periodization (varying intensity and volume) prevents plateaus.",
    "Core strength improves all other lifts - don't neglect it."
  ],
  endurance: [
    "Build up slowly - increase workout duration by no more than 10% per week.",
    "Mix high and low intensity training for best results.",
    "Proper fueling before longer sessions is crucial.",
    "Cross-training reduces injury risk while building endurance.",
    "Recovery runs/activities are as important as intense sessions.",
    "Hydration is especially important for endurance athletes."
  ],
  flexibility: [
    "Hold static stretches for 30-60 seconds for best results.",
    "Warm up before stretching to avoid injury.",
    "Yoga or Pilates can complement dedicated stretching sessions.",
    "Consistency is key - daily stretching beats occasional long sessions.",
    "Dynamic stretching is best before workouts, static after.",
    "Breathing properly during stretches enhances their effectiveness."
  ],
  general_fitness: [
    "Aim for a balanced program with cardio, strength, and flexibility components.",
    "Find activities you enjoy - adherence is the most important factor.",
    "Try to move at least 30 minutes every day.",
    "Don't compare yourself to others - focus on your own progress.",
    "Tracking workouts helps you see improvements over time.",
    "Remember that rest and recovery are part of fitness too."
  ]
};

// Sample motivational quotes
export const motivationalQuotes = [
  "The only bad workout is the one that didn't happen.",
  "Your body can stand almost anything. It's your mind you have to convince.",
  "Fitness is not about being better than someone else. It's about being better than you used to be.",
  "The hardest lift of all is lifting your butt off the couch.",
  "You don't have to be extreme, just consistent.",
  "Rome wasn't built in a day, and neither was your body.",
  "The pain you feel today will be the strength you feel tomorrow.",
  "Strive for progress, not perfection.",
  "Exercise is a celebration of what your body can do, not a punishment for what you ate.",
  "Strength doesn't come from what you can do. It comes from overcoming the things you once thought you couldn't."
];

// Helper function to get a daily tip
export const getTipOfTheDay = (goal: FitnessGoal = "general_fitness"): string => {
  const goalTips = fitnessTips[goal];
  const randomIndex = Math.floor(Math.random() * goalTips.length);
  return goalTips[randomIndex];
};
