
import { useState } from "react";
import { NavBar } from "@/components/nav-bar";
import { WorkoutCard } from "@/components/workout-card";
import { sampleWorkouts, getWorkoutsByPreferences } from "@/data/workouts";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WorkoutDifficulty, WorkoutType } from "@/types";
import { Search } from "lucide-react";

export default function WorkoutsPage() {
  const { userProfile } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<WorkoutDifficulty | "all">("all");
  const [typeFilter, setTypeFilter] = useState<WorkoutType | "all">("all");

  // Get personalized workouts based on user preferences
  const personalizedWorkouts = userProfile 
    ? getWorkoutsByPreferences(userProfile.preferredWorkoutType, userProfile.workoutDifficulty)
    : [];

  // Filter workouts based on search and filters
  const filteredWorkouts = sampleWorkouts.filter(workout => {
    // Search filter
    const matchesSearch = searchTerm === "" || 
      workout.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workout.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workout.targetMuscleGroups.some(group => 
        group.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    // Difficulty filter
    const matchesDifficulty = difficultyFilter === "all" || 
      workout.difficulty === difficultyFilter;
    
    // Type filter
    const matchesType = typeFilter === "all" || 
      workout.type === typeFilter;
    
    return matchesSearch && matchesDifficulty && matchesType;
  });

  return (
    <>
      <NavBar />
      <div className="container max-w-4xl mx-auto p-4 pb-20 md:pb-4">
        <h1 className="text-2xl font-bold mb-6">Workouts</h1>
        
        {/* Filters */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search workouts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Select
                value={difficultyFilter}
                onValueChange={(value) => setDifficultyFilter(value as WorkoutDifficulty | "all")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Difficulties</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select
                value={typeFilter}
                onValueChange={(value) => setTypeFilter(value as WorkoutType | "all")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Workout Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="home">Home</SelectItem>
                  <SelectItem value="gym">Gym</SelectItem>
                  <SelectItem value="outdoors">Outdoors</SelectItem>
                  <SelectItem value="minimal_equipment">Minimal Equipment</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {(difficultyFilter !== "all" || typeFilter !== "all" || searchTerm) && (
            <Button 
              variant="outline" 
              onClick={() => {
                setDifficultyFilter("all");
                setTypeFilter("all");
                setSearchTerm("");
              }}
              className="text-sm"
            >
              Clear Filters
            </Button>
          )}
        </div>
        
        {/* Workout listings */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Workouts</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredWorkouts.length > 0 ? (
                filteredWorkouts.map(workout => (
                  <WorkoutCard key={workout.id} workout={workout} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">No workouts match your filters.</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="recommended">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {personalizedWorkouts.length > 0 ? (
                personalizedWorkouts.map(workout => (
                  <WorkoutCard key={workout.id} workout={workout} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">
                    {userProfile 
                      ? "No personalized workouts available yet." 
                      : "Complete your profile to get personalized recommendations."}
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
