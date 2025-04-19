
import { areExerciseNamesMatching } from "@/utils/stringUtils";

// Expanded list of exercise names for better matching
const exerciseNames = [
  // Chest exercises
  "bench press", "incline bench press", "decline bench press",
  "push-up", "pushup", "push up", "chest fly", "chest press", "pec deck",
  "dumbbell fly", "cable crossover", "chest dip",
  
  // Back exercises
  "pull-up", "pullup", "pull up", "chin up", "chinup", "lat pulldown",
  "row", "bent over row", "inverted row", "dumbbell row", "cable row",
  "t-bar row", "seated row", "face pull", "back extension", "hyperextension",
  "good morning", "reverse fly", "lat pulldown", "pull down",
  
  // Leg exercises
  "squat", "front squat", "goblet squat", "back squat", "box squat", 
  "leg press", "lunge", "walking lunge", "reverse lunge", "side lunge",
  "deadlift", "romanian deadlift", "sumo deadlift", "stiff leg deadlift",
  "leg extension", "leg curl", "hamstring curl", "calf raise", "calf raises",
  "hip thrust", "glute bridge", "hip abduction", "hip adduction", "step-up",
  "box jump", "wall sit", "pistol squat", "bulgarian split squat",
  
  // Shoulder exercises
  "shoulder press", "overhead press", "military press", "lateral raise",
  "front raise", "upright row", "shrug", "face pull", "reverse fly",
  "arnold press", "push press", "landmine press", "shoulder tap",
  
  // Arm exercises
  "bicep curl", "hammer curl", "preacher curl", "concentration curl",
  "tricep extension", "skull crusher", "tricep pushdown", "tricep dip",
  "dip", "diamond push-up", "chin up", "wrist curl", "reverse curl",
  "tricep kickback", "close grip bench press",
  
  // Core exercises
  "plank", "side plank", "crunch", "sit-up", "situp", "sit up",
  "russian twist", "bicycle crunch", "leg raise", "hanging leg raise",
  "mountain climber", "ab rollout", "hollow hold", "v-up", "reverse crunch",
  "dead bug", "bird dog", "windshield wiper", "cable crunch", "woodchopper",
  
  // Functional/Compound exercises
  "burpee", "jumping jack", "kettlebell swing", "kettlebell snatch",
  "kettlebell clean", "farmers walk", "farmers carry", "sled push", 
  "battle rope", "jump rope", "clean and jerk", "power clean", 
  "snatch", "thruster", "turkish get-up", "medicine ball slam",
  
  // Machine exercises
  "lat pulldown", "leg extension", "leg curl", "chest press machine",
  "seated row machine", "pec deck", "cable crossover", "smith machine",
  "hip abduction machine", "hip adduction machine", "seated calf raise machine",
  "assisted pull-up machine", "hack squat machine", "leg press machine"
];

export const extractExerciseName = (message: string): string | null => {
  const lowerMessage = message.toLowerCase();
  console.log(`Extracting exercise name from: "${lowerMessage}"`);
  
  // First check for exact matches
  for (const exercise of exerciseNames) {
    if (lowerMessage.includes(` ${exercise} `) || 
        lowerMessage.includes(`${exercise} `) || 
        lowerMessage.includes(` ${exercise}`) || 
        lowerMessage === exercise) {
      console.log(`Found exact exercise match: ${exercise}`);
      return exercise;
    }
  }
  
  // Check for "how to" patterns
  const howToPatterns = [
    "how to do ", "how to perform ", "how do i do ", 
    "how to ", "show me how to do ", "tell me about ",
    "what is ", "explain ", "guide for ", "instructions for ",
    "proper form for ", "technique for "
  ];
  
  for (const pattern of howToPatterns) {
    if (lowerMessage.includes(pattern)) {
      const afterPattern = lowerMessage.split(pattern)[1]?.trim();
      if (afterPattern) {
        for (const exercise of exerciseNames) {
          if (areExerciseNamesMatching(afterPattern, exercise)) {
            console.log(`Found exercise in how-to query: ${exercise}`);
            return exercise;
          }
        }
      }
    }
  }
  
  // Check for muscle group references
  const muscleGroupKeywords = {
    "chest": ["chest", "pectoral", "pecs", "bench"],
    "back": ["back", "lats", "latissimus", "trapezius", "traps", "row", "pull"],
    "shoulders": ["shoulder", "delt", "deltoid", "overhead", "press"],
    "arms": ["arm", "bicep", "tricep", "forearm", "curl", "extension"],
    "core": ["core", "abs", "abdominal", "oblique", "plank", "crunch"],
    "legs": ["leg", "quad", "hamstring", "calf", "calves", "glute", "thigh", 
             "squat", "lunge", "deadlift", "hinge", "hip"]
  };
  
  for (const [group, keywords] of Object.entries(muscleGroupKeywords)) {
    for (const keyword of keywords) {
      if (lowerMessage.includes(keyword)) {
        if (lowerMessage.includes(`${keyword} exercise`) || 
            lowerMessage.includes(`exercise for ${keyword}`) ||
            lowerMessage.includes(`${keyword} workout`)) {
          console.log(`Found muscle group query: ${group}`);
          return group;
        }
      }
    }
  }
  
  // Check for machine exercises explicitly
  if (lowerMessage.includes("machine")) {
    const machineExercises = exerciseNames.filter(ex => ex.includes("machine"));
    for (const machine of machineExercises) {
      if (lowerMessage.includes(machine.replace(" machine", "")) || 
          areExerciseNamesMatching(lowerMessage, machine)) {
        console.log(`Found machine exercise match: ${machine}`);
        return machine;
      }
    }
    
    // Try to extract the muscle group involved with the machine
    for (const [group, keywords] of Object.entries(muscleGroupKeywords)) {
      for (const keyword of keywords) {
        if (lowerMessage.includes(keyword) && lowerMessage.includes("machine")) {
          const candidateExercise = `${keyword} machine`;
          console.log(`Constructed machine exercise: ${candidateExercise}`);
          return candidateExercise;
        }
      }
    }
  }
  
  // Fallback for partial matches
  for (const exercise of exerciseNames) {
    if (lowerMessage.includes(exercise)) {
      console.log(`Found partial exercise match: ${exercise}`);
      return exercise;
    }
  }
  
  // Last attempt - check for significant word matches
  const messageWords = lowerMessage.split(/\s+/);
  for (const word of messageWords) {
    if (word.length > 3) { // Only check words longer than 3 chars
      for (const exercise of exerciseNames) {
        if (exercise.includes(word) || word === exercise) {
          console.log(`Found word match: ${word} in ${exercise}`);
          return exercise;
        }
      }
    }
  }
  
  console.log("No exercise name found in query");
  return null;
};
