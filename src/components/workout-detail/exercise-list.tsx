
import { Exercise } from "@/types";
import { ExerciseCard } from "@/components/exercise-card";

interface ExerciseListProps {
  exercises: Exercise[];
}

export function ExerciseList({ exercises }: ExerciseListProps) {
  // Ensure exercises is not undefined and filter out any undefined values
  const validExercises = exercises?.filter(Boolean) || [];

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Exercises</h2>
      {validExercises.length > 0 ? (
        validExercises.map((exercise, index) => (
          <ExerciseCard key={exercise.id} exercise={exercise} index={index} />
        ))
      ) : (
        <p className="text-muted-foreground">No exercises found for this workout.</p>
      )}
    </div>
  );
}
