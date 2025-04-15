
import { Exercise } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ExerciseCardProps {
  exercise: Exercise;
  index: number;
}

export function ExerciseCard({ exercise, index }: ExerciseCardProps) {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Badge className="h-6 w-6 rounded-full bg-fitness-purple text-white">
              {index + 1}
            </Badge>
            <CardTitle className="text-lg">{exercise.name}</CardTitle>
          </div>
          <Badge variant="outline" className="capitalize">{exercise.muscleGroup}</Badge>
        </div>
        <CardDescription className="text-sm mt-1">{exercise.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="flex flex-col">
            <span className="text-muted-foreground">Sets</span>
            <span className="font-medium">{exercise.sets}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Reps</span>
            <span className="font-medium">{exercise.reps}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Rest</span>
            <span className="font-medium">{exercise.restTime}s</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
