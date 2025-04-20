
import React, { useState, useEffect } from 'react';
import { Exercise } from '@/types';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface WorkoutSequenceProps {
  exercises: Exercise[];
  onComplete: () => void;
}

export function WorkoutSequence({ exercises, onComplete }: WorkoutSequenceProps) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [timer, setTimer] = useState<number | null>(null);
  const [restTimer, setRestTimer] = useState<number>(30); // 30 seconds rest between exercises

  const currentExercise = exercises[currentExerciseIndex];
  const nextExercise = exercises[currentExerciseIndex + 1];
  const progress = ((currentExerciseIndex + 1) / exercises.length) * 100;

  useEffect(() => {
    if (isResting && restTimer > 0) {
      const interval = setInterval(() => {
        setRestTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (isResting && restTimer === 0) {
      setIsResting(false);
      setRestTimer(30);
    }
  }, [isResting, restTimer]);

  useEffect(() => {
    if (timer !== null && timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => (prev !== null ? prev - 1 : null));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const startExerciseTimer = () => {
    // Extract time from reps string (e.g., "30 seconds" -> 30)
    const timeMatch = currentExercise.reps.match(/(\d+)\s*seconds?/i);
    if (timeMatch) {
      setTimer(parseInt(timeMatch[1]));
    }
  };

  const handleNext = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
      setTimer(null);
      setIsResting(true);
    } else {
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress tracker */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Exercise {currentExerciseIndex + 1} of {exercises.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} />
      </div>

      {/* Current exercise */}
      <Card className="p-6 space-y-4">
        <h3 className="text-xl font-semibold">{currentExercise.name}</h3>
        <p className="text-muted-foreground">{currentExercise.description}</p>
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">Sets: {currentExercise.sets}</p>
            <p className="font-medium">Reps: {currentExercise.reps}</p>
          </div>
          {timer !== null && (
            <div className="text-2xl font-bold">
              {timer}s
            </div>
          )}
        </div>
        
        {currentExercise.reps.toLowerCase().includes('seconds') && timer === null && (
          <Button 
            onClick={startExerciseTimer}
            className="w-full"
          >
            Start Timer
          </Button>
        )}
      </Card>

      {/* Rest timer or next button */}
      {isResting ? (
        <Card className="p-6 text-center">
          <h4 className="text-lg font-medium mb-2">Rest Time</h4>
          <p className="text-2xl font-bold">{restTimer}s</p>
        </Card>
      ) : (
        <Button 
          onClick={handleNext} 
          className="w-full"
          disabled={timer !== null && timer > 0}
        >
          {currentExerciseIndex < exercises.length - 1 ? (
            <>Next Exercise <ArrowRight className="ml-2" /></>
          ) : (
            'Complete Workout'
          )}
        </Button>
      )}

      {/* Next exercise preview */}
      {nextExercise && (
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Up Next:</p>
          <p className="font-medium">{nextExercise.name}</p>
        </Card>
      )}
    </div>
  );
}
