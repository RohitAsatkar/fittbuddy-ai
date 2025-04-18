
import { Exercise } from "@/types";
import { ExerciseCard } from "@/components/exercise-card";

interface ExerciseListProps {
  exercises: Exercise[];
}

export function ExerciseList({ exercises }: ExerciseListProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Exercises</h2>
      {exercises.map((exercise, index) => (
        <ExerciseCard key={exercise.id} exercise={exercise} index={index} />
      ))}
    </div>
  );
}
