
import { useUser } from "@/context/UserContext";
import { 
  BarChart as BarChartIcon, 
  Calendar, 
  Dumbbell, 
  TrendingUp, 
  Trophy
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { EmptyState } from "./ui/empty-state";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export function ProgressChart() {
  const { userProfile, completedWorkouts } = useUser();

  if (!userProfile) {
    return (
      <EmptyState
        icon={<BarChartIcon className="h-6 w-6" />}
        title="No Profile Found"
        description="Create your profile to track your fitness progress"
        action={
          <Button asChild>
            <Link to="/profile">Create Profile</Link>
          </Button>
        }
      />
    );
  }

  if (completedWorkouts.length === 0) {
    return (
      <EmptyState
        icon={<Dumbbell className="h-6 w-6" />}
        title="No Workouts Yet"
        description="Complete your first workout to start tracking your progress"
        action={
          <Button asChild>
            <Link to="/workouts">Browse Workouts</Link>
          </Button>
        }
      />
    );
  }

  // Group workouts by date
  const workoutsByDate = completedWorkouts.reduce((acc, workout) => {
    const date = new Date(workout.date).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(workout);
    return acc;
  }, {} as Record<string, typeof completedWorkouts>);

  // Create data for the chart
  const chartData = Object.entries(workoutsByDate).map(([date, workouts]) => ({
    date,
    count: workouts.length,
    duration: workouts.reduce((sum, w) => sum + w.duration, 0),
  }));

  return (
    <div className="space-y-6">
      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardDescription>Total Workouts</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="flex items-center">
              <Dumbbell className="h-5 w-5 mr-2 text-fitness-purple" />
              <CardTitle>{userProfile.workoutsCompleted}</CardTitle>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardDescription>Current Streak</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-fitness-orange" />
              <CardTitle>{userProfile.streakDays} days</CardTitle>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardDescription>Last Active</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-fitness-blue" />
              <CardTitle>
                {userProfile.lastWorkoutDate
                  ? new Date(userProfile.lastWorkoutDate).toLocaleDateString()
                  : "Never"}
              </CardTitle>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardDescription>Goal</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
              <CardTitle className="capitalize">
                {userProfile.fitnessGoal.replace("_", " ")}
              </CardTitle>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Workout History Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Workout History</CardTitle>
          <CardDescription>
            Your recent workout activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" name="Workouts" fill="#9b87f5" />
                <Bar dataKey="duration" name="Duration (mins)" fill="#F97316" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
