
const exerciseNames = [
  "bench press", "incline bench press", "decline bench press",
  "push-up", "pushup", "push up", 
  "squat", "front squat", "goblet squat", "back squat",
  "plank", "side plank", 
  "lunge", "walking lunge", "reverse lunge",
  "deadlift", "romanian deadlift", "sumo deadlift",
  "bicep curl", "hammer curl", "preacher curl",
  "shoulder press", "overhead press", "military press",
  "pull-up", "pullup", "pull up", "chin up",
  "row", "bent over row", "inverted row", "dumbbell row",
  "fly", "chest fly", "lateral raise", 
  "extension", "tricep extension", "leg extension",
  "crunch", "sit-up", "situp", "sit up", "russian twist",
  "dip", "tricep dip", "chest dip",
  "leg press", "calf raise", "calf raises", "leg curl", "hamstring curl",
  "face pull", "upright row", "shrug", 
  "burpee", "jumping jack", "mountain climber",
  "superman", "hyperextension", "back extension", 
  "glute bridge", "hip thrust", "good morning", 
  "reverse fly", "lat pulldown", "tricep pushdown",
  "hanging leg raise", "bicycle crunch", "step-up", "box jump",
  "kettlebell swing", "kettlebell snatch", "kettlebell clean", 
  "farmers walk", "farmers carry", "sled push", "battle rope", "jump rope"
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
    "what is ", "explain "
  ];
  
  for (const pattern of howToPatterns) {
    if (lowerMessage.includes(pattern)) {
      const afterPattern = lowerMessage.split(pattern)[1]?.trim();
      if (afterPattern) {
        for (const exercise of exerciseNames) {
          if (afterPattern.startsWith(exercise) || 
              afterPattern === exercise || 
              exercise.startsWith(afterPattern) ||
              afterPattern.includes(exercise)) {
            console.log(`Found exercise in how-to query: ${exercise}`);
            return exercise;
          }
        }
      }
    }
  }
  
  // Check for muscle group references
  const muscleGroupKeywords = {
    "chest": ["chest", "pectoral", "pecs"],
    "back": ["back", "lats", "latissimus", "trapezius", "traps"],
    "shoulders": ["shoulder", "delt", "deltoid"],
    "arms": ["arm", "bicep", "tricep", "forearm"],
    "core": ["core", "abs", "abdominal", "oblique"],
    "legs": ["leg", "quad", "hamstring", "calf", "calves", "glute", "thigh"]
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
  
  // Fallback for partial matches
  for (const exercise of exerciseNames) {
    if (lowerMessage.includes(exercise)) {
      console.log(`Found partial exercise match: ${exercise}`);
      return exercise;
    }
  }
  
  // Last attempt - check for single word matches
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
