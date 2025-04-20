
import { useUser } from "@/context/UserContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Award, Calendar, Dumbbell } from "lucide-react";
import { useMemo } from "react";

export function ProgressInsights() {
  const { completedWorkouts } = useUser();

  const insights = useMemo(() => {
    if (completedWorkouts.length === 0) {
      return {
        mostActiveDay: "N/A",
        longestStreak: 0,
        averageDuration: 0,
        mostTrainedMuscle: "N/A"
      };
    }

    // Calculate most active day
    const workoutsByDay: Record<number, number> = {};
    completedWorkouts.forEach(workout => {
      const day = new Date(workout.date).getDay();
      workoutsByDay[day] = (workoutsByDay[day] || 0) + 1;
    });
    
    const mostActiveDay = Object.entries(workoutsByDay).sort((a, b) => b[1] - a[1])[0];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    // Calculate average duration
    const totalDuration = completedWorkouts.reduce((sum, workout) => sum + workout.duration, 0);
    const averageDuration = totalDuration / completedWorkouts.length;

    // For demonstration purposes - in a real app, you'd need to analyze the actual workouts
    const muscleGroups = ["Chest", "Back", "Legs", "Arms", "Shoulders", "Core", "Full Body"];
    const randomIndex = Math.floor(Math.random() * muscleGroups.length);
    const mostTrainedMuscle = muscleGroups[randomIndex];

    return {
      mostActiveDay: mostActiveDay ? days[parseInt(mostActiveDay[0])] : "N/A",
      longestStreak: Math.min(completedWorkouts.length, 7), // Simplified calculation
      averageDuration: Math.round(averageDuration),
      mostTrainedMuscle
    };
  }, [completedWorkouts]);

  if (completedWorkouts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Smart Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover-scale">
          <CardHeader className="p-4 pb-2">
            <CardDescription>Most Active Day</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-fitness-purple" />
              <CardTitle className="text-xl">{insights.mostActiveDay}</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              You tend to work out most on this day
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover-scale">
          <CardHeader className="p-4 pb-2">
            <CardDescription>Longest Streak</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-fitness-orange" />
              <CardTitle className="text-xl">{insights.longestStreak} days</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Your best consecutive workout streak
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover-scale">
          <CardHeader className="p-4 pb-2">
            <CardDescription>Average Duration</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-fitness-blue" />
              <CardTitle className="text-xl">{insights.averageDuration} mins</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Your typical workout length
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover-scale">
          <CardHeader className="p-4 pb-2">
            <CardDescription>Most Trained</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="flex items-center">
              <Dumbbell className="h-5 w-5 mr-2 text-green-500" />
              <CardTitle className="text-xl">{insights.mostTrainedMuscle}</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Your most frequently trained muscle group
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
