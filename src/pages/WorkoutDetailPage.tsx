
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getWorkoutById } from "@/data/workouts";
import { NavBar } from "@/components/nav-bar";
import { ExerciseCard } from "@/components/exercise-card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useUser } from "@/context/UserContext";
import { Clock, Dumbbell, Flame, ArrowLeft, Loader2 } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';

export default function WorkoutDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addCompletedWorkout } = useUser();
  const [isWorkoutComplete, setIsWorkoutComplete] = useState(false);
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({
    difficulty: 3,
    enjoyment: 3,
    comment: ""
  });

  const workout = id ? getWorkoutById(id) : null;

  if (!workout) {
    return (
      <>
        <NavBar />
        <div className="container max-w-4xl mx-auto p-4">
          <EmptyState
            icon={<Dumbbell className="h-6 w-6" />}
            title="Workout Not Found"
            description="We couldn't find the workout you're looking for."
            action={
              <Button onClick={() => navigate("/workouts")}>
                Browse Workouts
              </Button>
            }
          />
        </div>
      </>
    );
  }

  const handleCompleteWorkout = () => {
    setIsFeedbackDialogOpen(true);
  };

  const submitFeedback = () => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      // Record the completed workout
      addCompletedWorkout({
        id: uuidv4(),
        workoutId: workout.id,
        date: new Date(),
        duration: workout.duration,
        feedback: {
          difficulty: feedback.difficulty as 1 | 2 | 3 | 4 | 5,
          enjoyment: feedback.enjoyment as 1 | 2 | 3 | 4 | 5,
          comment: feedback.comment
        }
      });

      // Reset states
      setIsSubmitting(false);
      setIsFeedbackDialogOpen(false);
      setIsWorkoutComplete(true);
      
      // Show success toast
      toast({
        title: "Workout Completed!",
        description: "Great job! Your progress has been recorded.",
      });
    }, 1000);
  };

  return (
    <>
      <NavBar />
      <div className="container max-w-4xl mx-auto p-4 pb-20 md:pb-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)} 
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        
        {/* Workout header */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 mb-2">
            <Badge variant="outline" className={
              workout.difficulty === "beginner" 
                ? "bg-green-100 text-green-800 hover:bg-green-200" 
                : workout.difficulty === "intermediate" 
                ? "bg-amber-100 text-amber-800 hover:bg-amber-200" 
                : "bg-red-100 text-red-800 hover:bg-red-200"
            }>
              {workout.difficulty}
            </Badge>
            <Badge variant="outline">
              {workout.type.replace("_", " ")}
            </Badge>
          </div>
          
          <h1 className="text-2xl font-bold">{workout.title}</h1>
          <p className="text-muted-foreground mt-1">{workout.description}</p>
          
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center">
              <Clock className="mr-1 h-5 w-5 text-muted-foreground" />
              <span>{workout.duration} minutes</span>
            </div>
            <div className="flex items-center">
              <Flame className="mr-1 h-5 w-5 text-muted-foreground" />
              <span>~{workout.caloriesBurn} calories</span>
            </div>
            <div className="flex items-center">
              <Dumbbell className="mr-1 h-5 w-5 text-muted-foreground" />
              <span>{workout.exercises.length} exercises</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 mt-4">
            {workout.targetMuscleGroups.map((group) => (
              <Badge key={group} variant="secondary" className="capitalize">
                {group}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Exercise list */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Exercises</h2>
          {workout.exercises.map((exercise, index) => (
            <ExerciseCard key={exercise.id} exercise={exercise} index={index} />
          ))}
        </div>
        
        {/* Complete workout button */}
        <div className="sticky bottom-20 md:bottom-4 bg-white p-4 border-t md:border rounded-lg shadow-md">
          <Button 
            onClick={handleCompleteWorkout} 
            disabled={isWorkoutComplete}
            className="w-full bg-fitness-purple hover:bg-fitness-purple-dark"
            size="lg"
          >
            {isWorkoutComplete ? "Workout Completed!" : "Complete Workout"}
          </Button>
        </div>
      </div>
      
      {/* Feedback dialog */}
      <Dialog open={isFeedbackDialogOpen} onOpenChange={setIsFeedbackDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Workout Feedback</DialogTitle>
            <DialogDescription>
              Tell us about your experience with this workout.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <h4 className="font-medium">How difficult was this workout?</h4>
              <RadioGroup
                value={feedback.difficulty.toString()}
                onValueChange={(value) => setFeedback({...feedback, difficulty: parseInt(value)})}
                className="flex justify-between"
              >
                <div className="flex flex-col items-center">
                  <RadioGroupItem value="1" id="diff-1" />
                  <Label htmlFor="diff-1" className="text-xs mt-1">Too Easy</Label>
                </div>
                <div className="flex flex-col items-center">
                  <RadioGroupItem value="2" id="diff-2" />
                  <Label htmlFor="diff-2" className="text-xs mt-1">Easy</Label>
                </div>
                <div className="flex flex-col items-center">
                  <RadioGroupItem value="3" id="diff-3" />
                  <Label htmlFor="diff-3" className="text-xs mt-1">Just Right</Label>
                </div>
                <div className="flex flex-col items-center">
                  <RadioGroupItem value="4" id="diff-4" />
                  <Label htmlFor="diff-4" className="text-xs mt-1">Hard</Label>
                </div>
                <div className="flex flex-col items-center">
                  <RadioGroupItem value="5" id="diff-5" />
                  <Label htmlFor="diff-5" className="text-xs mt-1">Too Hard</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">How enjoyable was this workout?</h4>
              <RadioGroup
                value={feedback.enjoyment.toString()}
                onValueChange={(value) => setFeedback({...feedback, enjoyment: parseInt(value)})}
                className="flex justify-between"
              >
                <div className="flex flex-col items-center">
                  <RadioGroupItem value="1" id="enjoy-1" />
                  <Label htmlFor="enjoy-1" className="text-xs mt-1">Not at all</Label>
                </div>
                <div className="flex flex-col items-center">
                  <RadioGroupItem value="2" id="enjoy-2" />
                  <Label htmlFor="enjoy-2" className="text-xs mt-1">A little</Label>
                </div>
                <div className="flex flex-col items-center">
                  <RadioGroupItem value="3" id="enjoy-3" />
                  <Label htmlFor="enjoy-3" className="text-xs mt-1">Neutral</Label>
                </div>
                <div className="flex flex-col items-center">
                  <RadioGroupItem value="4" id="enjoy-4" />
                  <Label htmlFor="enjoy-4" className="text-xs mt-1">Enjoyed</Label>
                </div>
                <div className="flex flex-col items-center">
                  <RadioGroupItem value="5" id="enjoy-5" />
                  <Label htmlFor="enjoy-5" className="text-xs mt-1">Loved it</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="comment">Additional comments (optional)</Label>
              <Textarea
                id="comment"
                placeholder="Share any thoughts about this workout..."
                value={feedback.comment}
                onChange={(e) => setFeedback({...feedback, comment: e.target.value})}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsFeedbackDialogOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              onClick={submitFeedback}
              disabled={isSubmitting}
              className="bg-fitness-purple hover:bg-fitness-purple-dark"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Feedback"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
