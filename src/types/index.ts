
export type FitnessGoal = 
  | 'weight_loss' 
  | 'muscle_gain' 
  | 'strength' 
  | 'endurance' 
  | 'flexibility' 
  | 'general_fitness';

export type WorkoutType = 
  | 'home' 
  | 'gym' 
  | 'outdoors' 
  | 'minimal_equipment';

export type WorkoutDifficulty = 
  | 'beginner' 
  | 'intermediate' 
  | 'advanced';

export type Exercise = {
  id: string;
  name: string;
  description: string;
  sets: number;
  reps: string;
  restTime: number; // in seconds
  muscleGroup: string;
  imageUrl?: string;
  videoUrl?: string;
};

export type Workout = {
  id: string;
  title: string;
  description: string;
  difficulty: WorkoutDifficulty;
  type: WorkoutType;
  duration: number; // in minutes
  caloriesBurn: number; // estimated
  exercises: Exercise[];
  targetMuscleGroups: string[];
};

export type UserProfile = {
  name: string;
  fitnessGoal: FitnessGoal;
  preferredWorkoutType: WorkoutType;
  workoutDifficulty: WorkoutDifficulty;
  workoutsCompleted: number;
  streakDays: number;
  lastWorkoutDate?: Date;
  dailyStepGoal?: number;
};

export type CompletedWorkout = {
  id: string;
  workoutId: string;
  date: Date;
  duration: number; // actual duration in minutes
  feedback: {
    difficulty: 1 | 2 | 3 | 4 | 5;
    enjoyment: 1 | 2 | 3 | 4 | 5;
    comment?: string;
  };
};

export type ChatMessage = {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
};

export type StepData = {
  count: number;
  date: string; // ISO date string format YYYY-MM-DD
  goal: number;
};
