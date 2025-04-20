
import { useUser } from "@/context/UserContext";
import { 
  BarChart as BarChartIcon, 
  Calendar, 
  Dumbbell, 
  TrendingUp, 
  Trophy,
  PieChart
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell,
  Legend
} from "recharts";
import { EmptyState } from "./ui/empty-state";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useMemo } from "react";

interface ProgressChartProps {
  timeframe: "weekly" | "monthly" | "all";
  metricType: "workouts" | "calories" | "duration" | "muscles";
}

const COLORS = ["#9b87f5", "#4C4CFF", "#F97316", "#10B981", "#8B5CF6", "#EC4899"];

export function ProgressChart({ timeframe, metricType }: ProgressChartProps) {
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

  // Prepare chart data based on timeframe and metric type
  const chartData = useMemo(() => {
    // Filter workouts based on timeframe
    const now = new Date();
    let filteredWorkouts = [...completedWorkouts];
    
    if (timeframe === "weekly") {
      const oneWeekAgo = new Date(now);
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      filteredWorkouts = completedWorkouts.filter(workout => 
        new Date(workout.date) >= oneWeekAgo
      );
    } else if (timeframe === "monthly") {
      const oneMonthAgo = new Date(now);
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      filteredWorkouts = completedWorkouts.filter(workout => 
        new Date(workout.date) >= oneMonthAgo
      );
    }

    // Group and format data based on metric type
    if (metricType === "muscles") {
      // For muscle groups, we need a pie chart of most trained muscle groups
      const muscleGroups: Record<string, number> = {};
      
      filteredWorkouts.forEach(workout => {
        const workoutDetails = userProfile.workoutsCompleted > 0 ? 
          { targetMuscleGroups: ["Full Body"] } : { targetMuscleGroups: [] };
        
        workoutDetails.targetMuscleGroups.forEach(group => {
          if (!muscleGroups[group]) muscleGroups[group] = 0;
          muscleGroups[group]++;
        });
      });
      
      return Object.entries(muscleGroups).map(([name, value]) => ({ name, value }));
    } else {
      // For other metrics, prepare time series data
      let groupedData: Record<string, any> = {};
      
      if (timeframe === "weekly") {
        // Group by day of week
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        days.forEach(day => {
          groupedData[day] = { day, count: 0, calories: 0, duration: 0 };
        });
        
        filteredWorkouts.forEach(workout => {
          const day = days[new Date(workout.date).getDay()];
          groupedData[day].count++;
          groupedData[day].calories += 300; // Placeholder value
          groupedData[day].duration += workout.duration;
        });
        
        return Object.values(groupedData);
      } else if (timeframe === "monthly") {
        // Group by date within the month
        filteredWorkouts.forEach(workout => {
          const date = new Date(workout.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          if (!groupedData[date]) {
            groupedData[date] = { date, count: 0, calories: 0, duration: 0 };
          }
          groupedData[date].count++;
          groupedData[date].calories += 300; // Placeholder value
          groupedData[date].duration += workout.duration;
        });
        
        return Object.values(groupedData);
      } else {
        // All time - group by month
        filteredWorkouts.forEach(workout => {
          const month = new Date(workout.date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
          if (!groupedData[month]) {
            groupedData[month] = { month, count: 0, calories: 0, duration: 0 };
          }
          groupedData[month].count++;
          groupedData[month].calories += 300; // Placeholder value
          groupedData[month].duration += workout.duration;
        });
        
        return Object.values(groupedData);
      }
    }
  }, [completedWorkouts, timeframe, metricType, userProfile]);

  // Get relevant chart properties based on metric type
  const getChartProps = () => {
    switch (metricType) {
      case "workouts":
        return {
          title: "Workout Frequency",
          description: `Number of workouts completed ${timeframe === "weekly" ? "this week" : timeframe === "monthly" ? "this month" : "all time"}`,
          dataKey: "count",
          fill: "#9b87f5",
          label: "Workouts"
        };
      case "calories":
        return {
          title: "Calories Burned",
          description: `Estimated calories burned ${timeframe === "weekly" ? "this week" : timeframe === "monthly" ? "this month" : "all time"}`,
          dataKey: "calories",
          fill: "#F97316",
          label: "Calories"
        };
      case "duration":
        return {
          title: "Workout Duration",
          description: `Total workout time ${timeframe === "weekly" ? "this week" : timeframe === "monthly" ? "this month" : "all time"}`,
          dataKey: "duration",
          fill: "#10B981",
          label: "Minutes"
        };
      case "muscles":
        return {
          title: "Muscle Groups Trained",
          description: `Distribution of muscle groups trained ${timeframe === "weekly" ? "this week" : timeframe === "monthly" ? "this month" : "all time"}`,
          dataKey: "value",
          nameKey: "name",
          label: "Sessions"
        };
    }
  };

  const chartProps = getChartProps();

  // Stats cards
  const statsData = {
    totalWorkouts: userProfile.workoutsCompleted,
    streakDays: userProfile.streakDays,
    lastWorkoutDate: userProfile.lastWorkoutDate ? 
      new Date(userProfile.lastWorkoutDate).toLocaleDateString() : "Never",
    fitnessGoal: userProfile.fitnessGoal.replace("_", " ")
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="hover-scale transition-transform">
          <CardHeader className="p-4 pb-2">
            <CardDescription>Total Workouts</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="flex items-center">
              <Dumbbell className="h-5 w-5 mr-2 text-fitness-purple" />
              <CardTitle>{statsData.totalWorkouts}</CardTitle>
            </div>
          </CardContent>
        </Card>
        <Card className="hover-scale transition-transform">
          <CardHeader className="p-4 pb-2">
            <CardDescription>Current Streak</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-fitness-orange" />
              <CardTitle>{statsData.streakDays} days</CardTitle>
            </div>
          </CardContent>
        </Card>
        <Card className="hover-scale transition-transform">
          <CardHeader className="p-4 pb-2">
            <CardDescription>Last Active</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-fitness-blue" />
              <CardTitle>{statsData.lastWorkoutDate}</CardTitle>
            </div>
          </CardContent>
        </Card>
        <Card className="hover-scale transition-transform">
          <CardHeader className="p-4 pb-2">
            <CardDescription>Goal</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
              <CardTitle className="capitalize">{statsData.fitnessGoal}</CardTitle>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Chart */}
      <Card className="shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>{chartProps.title}</CardTitle>
          <CardDescription>{chartProps.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              {metricType === "muscles" ? (
                <RechartsPieChart>
                  <Pie
                    data={chartData}
                    nameKey="name"
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    label
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} sessions`, 'Total']} />
                  <Legend />
                </RechartsPieChart>
              ) : timeframe === "weekly" ? (
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={timeframe === "all" ? "month" : "day"} />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} ${chartProps.label}`, 'Total']} />
                  <Bar dataKey={chartProps.dataKey} name={chartProps.label} fill={chartProps.fill} radius={[4, 4, 0, 0]} />
                </BarChart>
              ) : (
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={timeframe === "all" ? "month" : "date"} />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} ${chartProps.label}`, 'Total']} />
                  <Line 
                    type="monotone" 
                    dataKey={chartProps.dataKey} 
                    stroke={chartProps.fill} 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
