
import { Exercise } from "@/types";

// Comprehensive exercise database
export const exerciseDatabase: Record<string, Exercise> = {
  // Chest Exercises
  "chest-1": {
    id: "chest-1",
    name: "Bench Press",
    description: "Lie on a flat bench, grip the barbell with hands slightly wider than shoulder-width. Lower the bar to chest level, then press back up.",
    sets: 4,
    reps: "8-10",
    restTime: 90,
    muscleGroup: "chest"
  },
  "chest-2": {
    id: "chest-2",
    name: "Push-ups",
    description: "Start in a plank position with hands slightly wider than shoulders. Lower your body until chest nearly touches the floor, then push back up.",
    sets: 3,
    reps: "12-20",
    restTime: 60,
    muscleGroup: "chest"
  },
  "chest-3": {
    id: "chest-3",
    name: "Chest Fly",
    description: "Lie on a flat bench holding dumbbells above chest with palms facing each other. Lower weights out to sides with a slight bend in elbows, then bring them back together.",
    sets: 3,
    reps: "12-15",
    restTime: 60,
    muscleGroup: "chest"
  },
  "chest-4": {
    id: "chest-4",
    name: "Incline Bench Press",
    description: "Similar to flat bench press, but performed on a bench angled at 30-45 degrees to emphasize the upper chest.",
    sets: 3,
    reps: "8-10",
    restTime: 90,
    muscleGroup: "chest"
  },
  "chest-5": {
    id: "chest-5",
    name: "Dips (Chest focus)",
    description: "Using parallel bars, lower your body by bending arms until shoulders are below elbows. Lean forward slightly to target chest, then push back up.",
    sets: 3,
    reps: "8-12",
    restTime: 60,
    muscleGroup: "chest"
  },

  // Back Exercises
  "back-1": {
    id: "back-1",
    name: "Pull-ups",
    description: "Hang from a bar with hands wider than shoulder-width. Pull your body up until chin is over the bar, then lower with control.",
    sets: 3,
    reps: "6-10",
    restTime: 90,
    muscleGroup: "back"
  },
  "back-2": {
    id: "back-2",
    name: "Lat Pulldown",
    description: "Sit at a lat pulldown machine, grip the bar wider than shoulder-width. Pull the bar down to chest level while keeping back straight.",
    sets: 4,
    reps: "10-12",
    restTime: 60,
    muscleGroup: "back"
  },
  "back-3": {
    id: "back-3",
    name: "Rows",
    description: "Bend at hips with flat back, pull weight toward lower chest/abdomen, keeping elbows close to body.",
    sets: 4,
    reps: "10-12",
    restTime: 60,
    muscleGroup: "back"
  },
  "back-4": {
    id: "back-4",
    name: "Shrugs",
    description: "Stand holding weights at sides, lift shoulders up toward ears and slightly back, then lower with control.",
    sets: 3,
    reps: "15",
    restTime: 45,
    muscleGroup: "back"
  },
  "back-5": {
    id: "back-5",
    name: "Face Pulls",
    description: "Using a cable machine with rope attachment at face height, pull rope towards face while separating ends, focusing on rear delts.",
    sets: 3,
    reps: "12-15",
    restTime: 45,
    muscleGroup: "back"
  },
  "back-6": {
    id: "back-6",
    name: "Reverse Fly",
    description: "Bend forward at hips with dumbbells hanging down. Raise arms out to sides while squeezing shoulder blades together.",
    sets: 3,
    reps: "12-15",
    restTime: 45,
    muscleGroup: "back"
  },
  "back-7": {
    id: "back-7",
    name: "Deadlifts",
    description: "Stand with feet hip-width apart, grip barbell with hands outside knees. Lift bar by extending hips and knees, keeping back straight.",
    sets: 4,
    reps: "5-8",
    restTime: 120,
    muscleGroup: "back"
  },
  "back-8": {
    id: "back-8",
    name: "Back Extensions",
    description: "Using a hyperextension bench, cross arms over chest and bend at waist, then raise torso until body forms a straight line.",
    sets: 3,
    reps: "15",
    restTime: 45,
    muscleGroup: "back"
  },

  // Shoulder Exercises
  "shoulder-1": {
    id: "shoulder-1",
    name: "Overhead Press",
    description: "Stand with feet shoulder-width apart, press barbell or dumbbells from shoulder level to overhead.",
    sets: 3,
    reps: "8-10",
    restTime: 90,
    muscleGroup: "shoulders"
  },
  "shoulder-2": {
    id: "shoulder-2",
    name: "Front Raise",
    description: "Stand holding weights at sides, raise arms forward to shoulder height while keeping them straight.",
    sets: 3,
    reps: "12-15",
    restTime: 45,
    muscleGroup: "shoulders"
  },
  "shoulder-3": {
    id: "shoulder-3",
    name: "Lateral Raise",
    description: "Stand holding weights at sides, raise arms out to sides to shoulder height while keeping elbows slightly bent.",
    sets: 3,
    reps: "12-15",
    restTime: 45,
    muscleGroup: "shoulders"
  },
  "shoulder-4": {
    id: "shoulder-4",
    name: "Arnold Press",
    description: "Sit holding dumbbells at shoulders with palms facing you. Press overhead while rotating wrists so palms face forward at the top.",
    sets: 3,
    reps: "8-10",
    restTime: 60,
    muscleGroup: "shoulders"
  },

  // Arm Exercises
  "arm-1": {
    id: "arm-1",
    name: "Bicep Curls",
    description: "Stand holding weights at sides with palms forward. Curl weights toward shoulders while keeping elbows fixed at sides.",
    sets: 3,
    reps: "10-12",
    restTime: 60,
    muscleGroup: "arms"
  },
  "arm-2": {
    id: "arm-2",
    name: "Chin-ups",
    description: "Hang from a bar with palms facing toward you. Pull body up until chin is over the bar, then lower with control.",
    sets: 3,
    reps: "6-10",
    restTime: 90,
    muscleGroup: "arms"
  },
  "arm-3": {
    id: "arm-3",
    name: "Hammer Curls",
    description: "Stand holding weights at sides with palms facing each other. Curl weights toward shoulders while maintaining neutral grip.",
    sets: 3,
    reps: "10-12",
    restTime: 60,
    muscleGroup: "arms"
  },
  "arm-4": {
    id: "arm-4",
    name: "Triceps Dips",
    description: "On parallel bars or bench, lower body by bending arms until elbows reach 90 degrees, then push back up.",
    sets: 3,
    reps: "10-12",
    restTime: 60,
    muscleGroup: "arms"
  },
  "arm-5": {
    id: "arm-5",
    name: "Skull Crushers",
    description: "Lie on bench holding weight above chest. Bend elbows to lower weight toward forehead, then extend arms back up.",
    sets: 3,
    reps: "10-12",
    restTime: 60,
    muscleGroup: "arms"
  },
  "arm-6": {
    id: "arm-6",
    name: "Wrist Curls",
    description: "Sit with forearms resting on thighs, wrists extending beyond knees. Curl weight using only wrists.",
    sets: 3,
    reps: "15-20",
    restTime: 45,
    muscleGroup: "arms"
  },
  "arm-7": {
    id: "arm-7",
    name: "Farmer's Carry",
    description: "Hold heavy weights at sides and walk with good posture for specified distance or time.",
    sets: 3,
    reps: "30-60 seconds",
    restTime: 60,
    muscleGroup: "arms"
  },

  // Core Exercises
  "core-1": {
    id: "core-1",
    name: "Crunches",
    description: "Lie on back with knees bent, hands behind head. Curl upper body toward knees, then lower back down with control.",
    sets: 3,
    reps: "20",
    restTime: 45,
    muscleGroup: "core"
  },
  "core-2": {
    id: "core-2",
    name: "Hanging Leg Raises",
    description: "Hang from a bar and raise legs straight up until parallel to floor or higher, then lower with control.",
    sets: 3,
    reps: "10-15",
    restTime: 60,
    muscleGroup: "core"
  },
  "core-3": {
    id: "core-3",
    name: "Planks",
    description: "Hold a push-up position with body weight on forearms and toes, maintaining straight body alignment.",
    sets: 3,
    reps: "30-60 seconds",
    restTime: 45,
    muscleGroup: "core"
  },
  "core-4": {
    id: "core-4",
    name: "Deadbugs",
    description: "Lie on back with arms extended upward and knees bent. Extend opposite arm and leg while keeping lower back pressed to floor.",
    sets: 3,
    reps: "10 per side",
    restTime: 45,
    muscleGroup: "core"
  },
  "core-5": {
    id: "core-5",
    name: "Russian Twists",
    description: "Sit with knees bent and torso leaned back slightly. Rotate torso to tap floor on each side, optionally holding weight.",
    sets: 3,
    reps: "20 (10 each side)",
    restTime: 45,
    muscleGroup: "core"
  },
  "core-6": {
    id: "core-6",
    name: "Side Planks",
    description: "Lie on side with weight on forearm and stacked feet. Raise hips to create straight line from head to feet.",
    sets: 3,
    reps: "30-45 seconds per side",
    restTime: 30,
    muscleGroup: "core"
  },

  // Lower Body Exercises
  "lower-1": {
    id: "lower-1",
    name: "Squats",
    description: "Stand with feet shoulder-width apart, lower body by bending knees and hips as if sitting in a chair, then return to standing.",
    sets: 4,
    reps: "8-10",
    restTime: 90,
    muscleGroup: "legs"
  },
  "lower-2": {
    id: "lower-2",
    name: "Leg Press",
    description: "Sit in leg press machine, press platform away by extending knees, then return to starting position with control.",
    sets: 4,
    reps: "10-12",
    restTime: 90,
    muscleGroup: "legs"
  },
  "lower-3": {
    id: "lower-3",
    name: "Hamstring Curls",
    description: "Lie face down on hamstring curl machine, curl legs toward buttocks by bending knees, then lower with control.",
    sets: 3,
    reps: "12-15",
    restTime: 60,
    muscleGroup: "legs"
  },
  "lower-4": {
    id: "lower-4",
    name: "Hip Thrusts",
    description: "Sit with upper back against bench, barbell across hips. Drive hips upward until body forms straight line from shoulders to knees.",
    sets: 4,
    reps: "10-12",
    restTime: 90,
    muscleGroup: "legs"
  },
  "lower-5": {
    id: "lower-5",
    name: "Bulgarian Split Squats",
    description: "Stand with one foot elevated behind you on bench. Lower body by bending front knee, then push back up.",
    sets: 3,
    reps: "8-10 per leg",
    restTime: 60,
    muscleGroup: "legs"
  },
  "lower-6": {
    id: "lower-6",
    name: "Sumo Deadlifts",
    description: "Stand with feet wider than shoulder-width, toes pointed out. Grip barbell between legs and lift by extending hips and knees.",
    sets: 4,
    reps: "6-8",
    restTime: 120,
    muscleGroup: "legs"
  },
  "lower-7": {
    id: "lower-7",
    name: "Hip Abduction Machine",
    description: "Sit in machine with pads against outer thighs. Push legs outward against resistance, then return with control.",
    sets: 3,
    reps: "15",
    restTime: 45,
    muscleGroup: "legs"
  },
  "lower-8": {
    id: "lower-8",
    name: "Side-Lying Leg Raises",
    description: "Lie on side with bottom leg bent for support. Raise top leg toward ceiling while keeping it straight, then lower with control.",
    sets: 3,
    reps: "15 per side",
    restTime: 30,
    muscleGroup: "legs"
  },
  "lower-9": {
    id: "lower-9",
    name: "Calf Raises",
    description: "Stand with balls of feet on elevated surface, heels hanging off. Raise heels as high as possible, then lower below starting position.",
    sets: 4,
    reps: "15-20",
    restTime: 45,
    muscleGroup: "legs"
  },
  "lower-10": {
    id: "lower-10",
    name: "Jump Rope",
    description: "Jump rope continuously with feet together or alternating, focusing on using calves to propel movement.",
    sets: 3,
    reps: "60 seconds",
    restTime: 60,
    muscleGroup: "legs"
  }
};

// Helper function to get exercises by muscle group
export const getExercisesByMuscleGroup = (muscleGroup: string): Exercise[] => {
  return Object.values(exerciseDatabase).filter(
    exercise => exercise.muscleGroup.toLowerCase() === muscleGroup.toLowerCase()
  );
};

// Helper function to get all exercises
export const getAllExercises = (): Exercise[] => {
  return Object.values(exerciseDatabase);
};

