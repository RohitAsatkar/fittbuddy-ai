
import { Exercise } from "@/types";

export const chestExercises: Exercise[] = [
  {
    id: "chest-1",
    name: "Bench Press",
    description: "Lie on a flat bench, grip the barbell with hands slightly wider than shoulder-width. Lower the bar to chest level, then press back up.",
    sets: 4,
    reps: "8-10",
    restTime: 90,
    muscleGroup: "chest"
  },
  {
    id: "chest-2",
    name: "Push-ups",
    description: "Start in a plank position with hands slightly wider than shoulders. Lower your body until chest nearly touches the floor, then push back up.",
    sets: 3,
    reps: "12-20",
    restTime: 60,
    muscleGroup: "chest"
  },
  {
    id: "chest-3",
    name: "Chest Fly",
    description: "Lie on a flat bench holding dumbbells above chest with palms facing each other. Lower weights out to sides with a slight bend in elbows, then bring them back together.",
    sets: 3,
    reps: "12-15",
    restTime: 60,
    muscleGroup: "chest"
  },
  {
    id: "chest-4",
    name: "Incline Bench Press",
    description: "Similar to flat bench press, but performed on a bench angled at 30-45 degrees to emphasize the upper chest.",
    sets: 3,
    reps: "8-10",
    restTime: 90,
    muscleGroup: "chest"
  },
  {
    id: "chest-5",
    name: "Dips (Chest focus)",
    description: "Using parallel bars, lower your body by bending arms until shoulders are below elbows. Lean forward slightly to target chest, then push back up.",
    sets: 3,
    reps: "8-12",
    restTime: 60,
    muscleGroup: "chest"
  }
];
