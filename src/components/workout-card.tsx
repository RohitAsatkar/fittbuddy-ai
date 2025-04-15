
import { Workout } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, Dumbbell, Flame } from "lucide-react";
import { Link } from "react-router-dom";

interface WorkoutCardProps {
  workout: Workout;
  compact?: boolean;
}

export function WorkoutCard({ workout, compact = false }: WorkoutCardProps) {
  const { title, description, difficulty, duration, caloriesBurn, targetMuscleGroups, type } = workout;
  
  // Choose badge color based on difficulty
  const difficultyColor = {
    beginner: "bg-green-100 text-green-800 hover:bg-green-200",
    intermediate: "bg-amber-100 text-amber-800 hover:bg-amber-200",
    advanced: "bg-red-100 text-red-800 hover:bg-red-200"
  }[difficulty];

  if (compact) {
    return (
      <Card className="h-full hover:shadow-md transition-shadow duration-200">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-base">{title}</CardTitle>
            <Badge variant="outline" className={difficultyColor}>
              {difficulty}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              <span>{duration} min</span>
            </div>
            <div className="flex items-center">
              <Flame className="mr-1 h-4 w-4" />
              <span>{caloriesBurn} cal</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="ghost" size="sm" asChild className="ml-auto text-fitness-purple">
            <Link to={`/workout/${workout.id}`}>
              View <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="h-full hover:shadow-md transition-shadow duration-200">
      <CardHeader>
        <div className="flex flex-wrap gap-2 mb-2">
          <Badge variant="outline" className={difficultyColor}>
            {difficulty}
          </Badge>
          <Badge variant="outline">
            {type.replace("_", " ")}
          </Badge>
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-4 text-sm">
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            <span>{duration} min</span>
          </div>
          <div className="flex items-center">
            <Flame className="mr-1 h-4 w-4" />
            <span>{caloriesBurn} cal</span>
          </div>
          <div className="flex items-center">
            <Dumbbell className="mr-1 h-4 w-4" />
            <span>{workout.exercises.length} exercises</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1">
          {targetMuscleGroups.map((group) => (
            <Badge key={group} variant="secondary" className="capitalize">
              {group}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full bg-fitness-purple hover:bg-fitness-purple-dark">
          <Link to={`/workout/${workout.id}`}>
            Start Workout
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
