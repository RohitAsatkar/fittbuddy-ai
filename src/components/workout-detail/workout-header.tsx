
import { Workout } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Clock, Dumbbell, Flame } from "lucide-react";

interface WorkoutHeaderProps {
  workout: Workout;
}

export function WorkoutHeader({ workout }: WorkoutHeaderProps) {
  const { title, description, difficulty, duration, caloriesBurn, targetMuscleGroups, type, exercises } = workout;

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2 mb-2">
        <Badge variant="outline" className={
          difficulty === "beginner" 
            ? "bg-green-100 text-green-800 hover:bg-green-200" 
            : difficulty === "intermediate" 
            ? "bg-amber-100 text-amber-800 hover:bg-amber-200" 
            : "bg-red-100 text-red-800 hover:bg-red-200"
        }>
          {difficulty}
        </Badge>
        <Badge variant="outline">
          {type.replace("_", " ")}
        </Badge>
      </div>
      
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-muted-foreground mt-1">{description}</p>
      
      <div className="flex flex-wrap gap-4 mt-4">
        <div className="flex items-center">
          <Clock className="mr-1 h-5 w-5 text-muted-foreground" />
          <span>{duration} minutes</span>
        </div>
        <div className="flex items-center">
          <Flame className="mr-1 h-5 w-5 text-muted-foreground" />
          <span>~{caloriesBurn} calories</span>
        </div>
        <div className="flex items-center">
          <Dumbbell className="mr-1 h-5 w-5 text-muted-foreground" />
          <span>{exercises.length} exercises</span>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-1 mt-4">
        {targetMuscleGroups.map((group) => (
          <Badge key={group} variant="secondary" className="capitalize">
            {group}
          </Badge>
        ))}
      </div>
    </div>
  );
}
