
import { UserProfile, FitnessGoal, WorkoutType, WorkoutDifficulty } from "@/types";
import { useUser } from "@/context/UserContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ProfileForm() {
  const { setUserProfile, isProfileComplete } = useUser();
  const [activeTab, setActiveTab] = useState("goals");
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    name: "",
    fitnessGoal: "general_fitness",
    preferredWorkoutType: "home",
    workoutDifficulty: "beginner",
    workoutsCompleted: 0,
    streakDays: 0
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const handleGoalChange = (value: string) => {
    setFormData({ ...formData, fitnessGoal: value as FitnessGoal });
  };

  const handleWorkoutTypeChange = (value: string) => {
    setFormData({ ...formData, preferredWorkoutType: value as WorkoutType });
  };

  const handleDifficultyChange = (value: string) => {
    setFormData({ ...formData, workoutDifficulty: value as WorkoutDifficulty });
  };

  const handleNext = () => {
    if (activeTab === "goals" && formData.name && formData.fitnessGoal) {
      setActiveTab("preferences");
    }
  };

  const handleSubmit = () => {
    if (formData.name && formData.fitnessGoal && formData.preferredWorkoutType && formData.workoutDifficulty) {
      setUserProfile(formData as UserProfile);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl text-center">Welcome to FitBuddy AI</CardTitle>
        <CardDescription className="text-center">
          Let's set up your profile to personalize your fitness journey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="preferences" disabled={!formData.name || !formData.fitnessGoal}>
              Preferences
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="goals" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleNameChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Fitness Goal</Label>
              <RadioGroup 
                value={formData.fitnessGoal} 
                onValueChange={handleGoalChange}
                className="grid grid-cols-1 gap-2"
              >
                <Label className="flex items-center space-x-2 cursor-pointer border rounded-md p-3 hover:bg-muted">
                  <RadioGroupItem value="weight_loss" id="weight_loss" />
                  <span>Weight Loss</span>
                </Label>
                <Label className="flex items-center space-x-2 cursor-pointer border rounded-md p-3 hover:bg-muted">
                  <RadioGroupItem value="muscle_gain" id="muscle_gain" />
                  <span>Muscle Gain</span>
                </Label>
                <Label className="flex items-center space-x-2 cursor-pointer border rounded-md p-3 hover:bg-muted">
                  <RadioGroupItem value="strength" id="strength" />
                  <span>Strength</span>
                </Label>
                <Label className="flex items-center space-x-2 cursor-pointer border rounded-md p-3 hover:bg-muted">
                  <RadioGroupItem value="endurance" id="endurance" />
                  <span>Endurance</span>
                </Label>
                <Label className="flex items-center space-x-2 cursor-pointer border rounded-md p-3 hover:bg-muted">
                  <RadioGroupItem value="flexibility" id="flexibility" />
                  <span>Flexibility</span>
                </Label>
                <Label className="flex items-center space-x-2 cursor-pointer border rounded-md p-3 hover:bg-muted">
                  <RadioGroupItem value="general_fitness" id="general_fitness" />
                  <span>General Fitness</span>
                </Label>
              </RadioGroup>
            </div>
          </TabsContent>
          
          <TabsContent value="preferences" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Preferred Workout Type</Label>
              <RadioGroup 
                value={formData.preferredWorkoutType} 
                onValueChange={handleWorkoutTypeChange}
                className="grid grid-cols-1 gap-2"
              >
                <Label className="flex items-center space-x-2 cursor-pointer border rounded-md p-3 hover:bg-muted">
                  <RadioGroupItem value="home" id="home" />
                  <span>Home Workouts</span>
                </Label>
                <Label className="flex items-center space-x-2 cursor-pointer border rounded-md p-3 hover:bg-muted">
                  <RadioGroupItem value="gym" id="gym" />
                  <span>Gym Workouts</span>
                </Label>
                <Label className="flex items-center space-x-2 cursor-pointer border rounded-md p-3 hover:bg-muted">
                  <RadioGroupItem value="outdoors" id="outdoors" />
                  <span>Outdoor Workouts</span>
                </Label>
                <Label className="flex items-center space-x-2 cursor-pointer border rounded-md p-3 hover:bg-muted">
                  <RadioGroupItem value="minimal_equipment" id="minimal_equipment" />
                  <span>Minimal Equipment</span>
                </Label>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label>Workout Difficulty</Label>
              <RadioGroup 
                value={formData.workoutDifficulty} 
                onValueChange={handleDifficultyChange}
                className="grid grid-cols-1 gap-2"
              >
                <Label className="flex items-center space-x-2 cursor-pointer border rounded-md p-3 hover:bg-muted">
                  <RadioGroupItem value="beginner" id="beginner" />
                  <span>Beginner</span>
                </Label>
                <Label className="flex items-center space-x-2 cursor-pointer border rounded-md p-3 hover:bg-muted">
                  <RadioGroupItem value="intermediate" id="intermediate" />
                  <span>Intermediate</span>
                </Label>
                <Label className="flex items-center space-x-2 cursor-pointer border rounded-md p-3 hover:bg-muted">
                  <RadioGroupItem value="advanced" id="advanced" />
                  <span>Advanced</span>
                </Label>
              </RadioGroup>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        {activeTab === "goals" ? (
          <Button 
            onClick={handleNext} 
            disabled={!formData.name || !formData.fitnessGoal}
            className="w-full bg-fitness-purple hover:bg-fitness-purple-dark"
          >
            Next
          </Button>
        ) : (
          <Button 
            onClick={handleSubmit}
            className="w-full bg-fitness-purple hover:bg-fitness-purple-dark"
          >
            Complete Setup
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
