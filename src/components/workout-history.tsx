
import { useUser } from "@/context/UserContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { format } from "date-fns";
import { 
  Calendar, 
  Clock, 
  Flame, 
  Star 
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function WorkoutHistory() {
  const { completedWorkouts } = useUser();
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string | null>(null);

  // Sort workouts by date, newest first
  const sortedWorkouts = [...completedWorkouts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (completedWorkouts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Workout History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Complete a workout to see your history.</p>
        </CardContent>
      </Card>
    );
  }

  const getWorkoutName = (workoutId: string) => {
    // In a real app, you would fetch the workout name from a workout database
    // For this demo, we'll generate a placeholder name
    const workoutTypes = ["Full Body", "Upper Body", "Lower Body", "HIIT", "Cardio", "Core"];
    const randomType = workoutTypes[parseInt(workoutId.charAt(0), 16) % workoutTypes.length];
    return `${randomType} Workout`;
  };

  const selectedWorkout = selectedWorkoutId 
    ? completedWorkouts.find(w => w.id === selectedWorkoutId) 
    : null;

  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Workout History</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Workout</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead className="text-center">Rating</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedWorkouts.map((workout) => (
                  <TableRow 
                    key={workout.id}
                    className={`cursor-pointer ${selectedWorkoutId === workout.id ? 'bg-muted' : ''}`}
                    onClick={() => setSelectedWorkoutId(workout.id === selectedWorkoutId ? null : workout.id)}
                  >
                    <TableCell>{format(new Date(workout.date), 'MMM d, yyyy')}</TableCell>
                    <TableCell>{getWorkoutName(workout.workoutId)}</TableCell>
                    <TableCell>{workout.duration} mins</TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        {Array.from({ length: workout.feedback.enjoyment }).map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            className="text-yellow-500" 
                            fill="currentColor" 
                          />
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      {selectedWorkout && (
        <Card className="animate-fade-in shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">
              {format(new Date(selectedWorkout.date), 'EEEE, MMMM d, yyyy')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center">
                <Flame className="h-5 w-5 mr-2 text-orange-500" />
                <div>
                  <p className="font-medium">Est. Calories</p>
                  <p className="text-2xl font-bold">{Math.round(selectedWorkout.duration * 8)}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-blue-500" />
                <div>
                  <p className="font-medium">Duration</p>
                  <p className="text-2xl font-bold">{selectedWorkout.duration} mins</p>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-purple-500" />
                <div>
                  <p className="font-medium">Workout</p>
                  <p className="text-2xl font-bold">{getWorkoutName(selectedWorkout.workoutId)}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <p className="text-sm font-medium">Difficulty Rating</p>
                  <p className="text-sm font-medium">{selectedWorkout.feedback.difficulty}/5</p>
                </div>
                <Progress value={selectedWorkout.feedback.difficulty * 20} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <p className="text-sm font-medium">Enjoyment Rating</p>
                  <p className="text-sm font-medium">{selectedWorkout.feedback.enjoyment}/5</p>
                </div>
                <Progress value={selectedWorkout.feedback.enjoyment * 20} className="h-2" />
              </div>
            </div>

            {selectedWorkout.feedback.comment && (
              <div className="mt-4 p-3 bg-muted rounded-md">
                <p className="text-sm font-medium mb-1">Your Comments:</p>
                <p className="text-sm italic">"{selectedWorkout.feedback.comment}"</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
