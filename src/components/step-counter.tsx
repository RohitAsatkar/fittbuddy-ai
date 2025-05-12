
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Footprints } from "lucide-react";
import { StepTrackingService } from "@/services/StepTrackingService";
import { Button } from "./ui/button";
import { toast } from "@/components/ui/use-toast";

export function StepCounter() {
  const [steps, setSteps] = useState(0);
  const [goal, setGoal] = useState(10000);
  const [isTracking, setIsTracking] = useState(false);
  
  useEffect(() => {
    const stepService = StepTrackingService.getInstance();
    const stepData = stepService.loadStepData();
    
    setSteps(stepData.count);
    setGoal(stepData.goal);
    
    // Listen for step updates
    const removeListener = stepService.addStepListener((newSteps) => {
      setSteps(newSteps);
    });
    
    return () => {
      removeListener();
      // Stop tracking when component unmounts
      stepService.stopTracking();
    };
  }, []);
  
  const handleToggleTracking = async () => {
    const stepService = StepTrackingService.getInstance();
    
    if (isTracking) {
      stepService.stopTracking();
      setIsTracking(false);
      toast({
        title: "Step tracking stopped",
        description: "Your steps are no longer being tracked"
      });
    } else {
      try {
        await stepService.startTracking();
        setIsTracking(true);
        toast({
          title: "Step tracking started",
          description: "Your steps are now being tracked"
        });
      } catch (error) {
        console.error("Error starting step tracking:", error);
        toast({
          title: "Step tracking error",
          description: "Could not activate step tracking. Using simulation mode.",
          variant: "destructive"
        });
        
        // Fall back to simulation if real tracking fails
        stepService.startSimulation();
        setIsTracking(true);
      }
    }
  };
  
  const progressPercentage = Math.min(Math.round((steps / goal) * 100), 100);
  
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Footprints className="h-5 w-5 text-fitness-purple" />
            Steps Today
          </CardTitle>
          <Button
            variant={isTracking ? "destructive" : "default"}
            onClick={handleToggleTracking}
            size="sm"
            className="text-xs"
          >
            {isTracking ? "Stop Tracking" : "Start Tracking"}
          </Button>
        </div>
        <CardDescription>
          Track your daily movement
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-2">
          <span className="text-3xl font-bold">{steps.toLocaleString()}</span>
          <span className="text-sm text-muted-foreground">Goal: {goal.toLocaleString()}</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
        <div className="flex justify-between mt-1 text-xs text-muted-foreground">
          <span>0%</span>
          <span>{progressPercentage}%</span>
          <span>100%</span>
        </div>
        <p className="text-sm mt-4">
          {steps < goal / 2
            ? "Keep moving! You're on your way."
            : steps < goal
            ? "Great progress! Keep it up."
            : "Amazing! You've reached your daily goal!"}
        </p>
      </CardContent>
    </Card>
  );
}
