
import { NavBar } from "@/components/nav-bar";
import { useUser } from "@/context/UserContext";
import { useChat } from "@/context/ChatContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { EmptyState } from "@/components/ui/empty-state";
import { Save, Trash2, UserCircle } from "lucide-react";
import { BicepsIcon } from "@/components/icons/biceps-icon";
import { ProfileForm } from "@/components/profile-form";
import { FitnessGoal, WorkoutDifficulty, WorkoutType } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

export default function ProfilePage() {
  const { userProfile, isProfileComplete, updateUserGoal, updateWorkoutPreferences, resetProfile } = useUser();
  const { clearChat } = useChat();
  const [openResetDialog, setOpenResetDialog] = useState(false);
  const [goal, setGoal] = useState<FitnessGoal | undefined>(userProfile?.fitnessGoal);
  const [workoutType, setWorkoutType] = useState<WorkoutType | undefined>(userProfile?.preferredWorkoutType);
  const [difficulty, setDifficulty] = useState<WorkoutDifficulty | undefined>(userProfile?.workoutDifficulty);

  const handleSavePreferences = () => {
    if (goal && goal !== userProfile?.fitnessGoal) {
      updateUserGoal(goal);
    }
    
    if (workoutType && difficulty && (workoutType !== userProfile?.preferredWorkoutType || difficulty !== userProfile?.workoutDifficulty)) {
      updateWorkoutPreferences(workoutType, difficulty);
    }
    
    toast({
      title: "Preferences Saved",
      description: "Your fitness preferences have been updated.",
    });
  };

  const handleResetProfile = () => {
    resetProfile();
    clearChat();
    setOpenResetDialog(false);
    toast({
      title: "Profile Reset",
      description: "Your profile and data have been reset.",
    });
  };

  // If profile is not complete, show the setup form
  if (!isProfileComplete) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-fitness-pastel-purple/30">
        <div className="flex items-center mb-8">
          <BicepsIcon className="h-10 w-10 text-fitness-purple" />
          <h1 className="text-3xl font-bold ml-2 text-fitness-purple">FitBuddy AI</h1>
        </div>
        <ProfileForm />
      </div>
    );
  }

  if (!userProfile) {
    return (
      <>
        <NavBar />
        <div className="container max-w-4xl mx-auto p-4">
          <EmptyState
            icon={<UserCircle className="h-6 w-6" />}
            title="No Profile Found"
            description="Create your profile to personalize your fitness experience"
            action={<ProfileForm />}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="container max-w-4xl mx-auto p-4 pb-20 md:pb-4">
        <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
        
        {/* Profile overview */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl">
              <span className="flex items-center">
                <UserCircle className="h-5 w-5 mr-2" />
                {userProfile.name}
              </span>
            </CardTitle>
            <CardDescription>
              Member since {new Date().toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1">
              <Badge variant="outline" className="bg-fitness-pastel-purple capitalize">
                {userProfile.fitnessGoal.replace("_", " ")}
              </Badge>
              <Badge variant="outline" className="capitalize">
                {userProfile.preferredWorkoutType.replace("_", " ")} workouts
              </Badge>
              <Badge variant="outline">
                {userProfile.workoutDifficulty} level
              </Badge>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold">{userProfile.workoutsCompleted}</p>
                <p className="text-sm text-muted-foreground">Workouts</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{userProfile.streakDays}</p>
                <p className="text-sm text-muted-foreground">Day Streak</p>
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {userProfile.lastWorkoutDate
                    ? new Date(userProfile.lastWorkoutDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
                    : "-"}
                </p>
                <p className="text-sm text-muted-foreground">Last Workout</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Preferences form */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl">Fitness Preferences</CardTitle>
            <CardDescription>
              Update your fitness goals and workout preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Fitness Goal</label>
              <Select
                value={goal || userProfile.fitnessGoal}
                onValueChange={(value) => setGoal(value as FitnessGoal)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your fitness goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weight_loss">Weight Loss</SelectItem>
                  <SelectItem value="muscle_gain">Muscle Gain</SelectItem>
                  <SelectItem value="strength">Strength</SelectItem>
                  <SelectItem value="endurance">Endurance</SelectItem>
                  <SelectItem value="flexibility">Flexibility</SelectItem>
                  <SelectItem value="general_fitness">General Fitness</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Preferred Workout Type</label>
              <Select
                value={workoutType || userProfile.preferredWorkoutType}
                onValueChange={(value) => setWorkoutType(value as WorkoutType)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select workout type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="home">Home Workouts</SelectItem>
                  <SelectItem value="gym">Gym Workouts</SelectItem>
                  <SelectItem value="outdoors">Outdoor Workouts</SelectItem>
                  <SelectItem value="minimal_equipment">Minimal Equipment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Workout Difficulty</label>
              <Select
                value={difficulty || userProfile.workoutDifficulty}
                onValueChange={(value) => setDifficulty(value as WorkoutDifficulty)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleSavePreferences}
              className="w-full bg-fitness-purple hover:bg-fitness-purple-dark"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Preferences
            </Button>
          </CardFooter>
        </Card>
        
        {/* Reset profile */}
        <Card className="border-destructive/30">
          <CardHeader>
            <CardTitle className="text-xl">Danger Zone</CardTitle>
            <CardDescription>
              Actions here cannot be undone
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Resetting your profile will delete all your data, including workout history,
              progress, and chat conversations.
            </p>
          </CardContent>
          <CardFooter>
            <Dialog open={openResetDialog} onOpenChange={setOpenResetDialog}>
              <DialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Reset Profile
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. All your data, including workout history,
                    progress, and conversations will be permanently deleted.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setOpenResetDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={handleResetProfile}
                  >
                    Yes, Reset Everything
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
