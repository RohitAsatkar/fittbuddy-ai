
import { useState } from "react";
import { NavBar } from "@/components/nav-bar";
import { ProgressChart } from "@/components/progress-chart";
import { ProgressFilters } from "@/components/progress-filters";
import { ProgressInsights } from "@/components/progress-insights";
import { WorkoutHistory } from "@/components/workout-history";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProgressAchievements } from "@/components/progress-achievements";

export default function ProgressPage() {
  const [timeframe, setTimeframe] = useState<"weekly" | "monthly" | "all">("weekly");
  const [metricType, setMetricType] = useState<"workouts" | "calories" | "duration" | "muscles">("workouts");
  
  const handleTimeframeChange = (value: string) => {
    setTimeframe(value as "weekly" | "monthly" | "all");
  };
  
  const handleMetricChange = (value: string) => {
    setMetricType(value as "workouts" | "calories" | "duration" | "muscles");
  };

  return (
    <>
      <NavBar />
      <div className="container max-w-6xl mx-auto p-4 pb-20 md:pb-4">
        <h1 className="text-3xl font-bold mb-6">Your Progress</h1>
        
        <ProgressFilters 
          timeframe={timeframe} 
          onTimeframeChange={handleTimeframeChange}
          metricType={metricType}
          onMetricChange={handleMetricChange}
        />
        
        <div className="mt-6">
          <ProgressChart 
            timeframe={timeframe} 
            metricType={metricType} 
          />
        </div>
        
        <div className="mt-8">
          <ProgressInsights />
        </div>
        
        <div className="mt-8">
          <Tabs defaultValue="history" className="w-full">
            <TabsList className="w-full md:w-auto">
              <TabsTrigger value="history">Workout History</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>
            <TabsContent value="history" className="pt-4">
              <WorkoutHistory />
            </TabsContent>
            <TabsContent value="achievements" className="pt-4">
              <ProgressAchievements />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
