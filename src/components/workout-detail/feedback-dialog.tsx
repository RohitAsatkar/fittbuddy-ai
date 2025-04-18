
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface FeedbackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (feedback: FeedbackData) => void;
  isSubmitting: boolean;
}

interface FeedbackData {
  difficulty: number;
  enjoyment: number;
  comment: string;
}

export function FeedbackDialog({ open, onOpenChange, onSubmit, isSubmitting }: FeedbackDialogProps) {
  const [feedback, setFeedback] = useState<FeedbackData>({
    difficulty: 3,
    enjoyment: 3,
    comment: ""
  });

  const handleSubmit = () => {
    onSubmit(feedback);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
              {[
                { value: "1", label: "Too Easy" },
                { value: "2", label: "Easy" },
                { value: "3", label: "Just Right" },
                { value: "4", label: "Hard" },
                { value: "5", label: "Too Hard" }
              ].map(({ value, label }) => (
                <div key={value} className="flex flex-col items-center">
                  <RadioGroupItem value={value} id={`diff-${value}`} />
                  <Label htmlFor={`diff-${value}`} className="text-xs mt-1">{label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">How enjoyable was this workout?</h4>
            <RadioGroup
              value={feedback.enjoyment.toString()}
              onValueChange={(value) => setFeedback({...feedback, enjoyment: parseInt(value)})}
              className="flex justify-between"
            >
              {[
                { value: "1", label: "Not at all" },
                { value: "2", label: "A little" },
                { value: "3", label: "Neutral" },
                { value: "4", label: "Enjoyed" },
                { value: "5", label: "Loved it" }
              ].map(({ value, label }) => (
                <div key={value} className="flex flex-col items-center">
                  <RadioGroupItem value={value} id={`enjoy-${value}`} />
                  <Label htmlFor={`enjoy-${value}`} className="text-xs mt-1">{label}</Label>
                </div>
              ))}
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
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
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
  );
}
