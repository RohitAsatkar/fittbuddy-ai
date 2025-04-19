
import { TrainingQA } from "@/types/training";

export const qaData: TrainingQA[] = [
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
];
