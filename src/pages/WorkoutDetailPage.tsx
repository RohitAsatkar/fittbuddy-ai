
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getWorkoutById } from "@/data/workouts";
import { NavBar } from "@/components/nav-bar";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { toast } from "@/components/ui/use-toast";
import { useUser } from "@/context/UserContext";
import { WorkoutHeader } from "@/components/workout-detail/workout-header";
import { ExerciseList } from "@/components/workout-detail/exercise-list";
import { FeedbackDialog } from "@/components/workout-detail/feedback-dialog";
import { ArrowLeft, Dumbbell } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';

export default function WorkoutDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addCompletedWorkout } = useUser();
  const [isWorkoutComplete, setIsWorkoutComplete] = useState(false);
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // Ensure that workout.exercises is always an array
  const exercises = workout.exercises || [];

  const handleCompleteWorkout = () => {
    setIsFeedbackDialogOpen(true);
  };

  const handleFeedbackSubmit = (feedback: { difficulty: number; enjoyment: number; comment: string }) => {
    setIsSubmitting(true);
    
    setTimeout(() => {
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

      setIsSubmitting(false);
      setIsFeedbackDialogOpen(false);
      setIsWorkoutComplete(true);
      
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
        
        <WorkoutHeader workout={workout} />
        <ExerciseList exercises={exercises} />
        
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

        <FeedbackDialog
          open={isFeedbackDialogOpen}
          onOpenChange={setIsFeedbackDialogOpen}
          onSubmit={handleFeedbackSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </>
  );
}
