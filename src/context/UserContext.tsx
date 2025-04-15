
import { 
  CompletedWorkout, 
  FitnessGoal, 
  UserProfile, 
  WorkoutDifficulty, 
  WorkoutType 
} from "@/types";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface UserContextProps {
  userProfile: UserProfile | null;
  completedWorkouts: CompletedWorkout[];
  setUserProfile: (profile: UserProfile) => void;
  updateUserGoal: (goal: FitnessGoal) => void;
  updateWorkoutPreferences: (type: WorkoutType, difficulty: WorkoutDifficulty) => void;
  addCompletedWorkout: (workout: CompletedWorkout) => void;
  isProfileComplete: boolean;
  incrementStreak: () => void;
  resetProfile: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [completedWorkouts, setCompletedWorkouts] = useState<CompletedWorkout[]>([]);
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  // Load user data from localStorage on initial render
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    const savedWorkouts = localStorage.getItem('completedWorkouts');
    
    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile);
      // Convert date string back to Date object if it exists
      if (parsedProfile.lastWorkoutDate) {
        parsedProfile.lastWorkoutDate = new Date(parsedProfile.lastWorkoutDate);
      }
      setUserProfile(parsedProfile);
      setIsProfileComplete(true);
    }
    
    if (savedWorkouts) {
      const parsedWorkouts = JSON.parse(savedWorkouts);
      // Convert date strings back to Date objects
      const workoutsWithDates = parsedWorkouts.map((workout: any) => ({
        ...workout,
        date: new Date(workout.date)
      }));
      setCompletedWorkouts(workoutsWithDates);
    }
  }, []);

  // Save changes to localStorage whenever user data changes
  useEffect(() => {
    if (userProfile) {
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
      setIsProfileComplete(true);
    }
  }, [userProfile]);

  useEffect(() => {
    if (completedWorkouts.length > 0) {
      localStorage.setItem('completedWorkouts', JSON.stringify(completedWorkouts));
    }
  }, [completedWorkouts]);

  const updateUserGoal = (goal: FitnessGoal) => {
    if (userProfile) {
      setUserProfile({
        ...userProfile,
        fitnessGoal: goal
      });
    }
  };

  const updateWorkoutPreferences = (type: WorkoutType, difficulty: WorkoutDifficulty) => {
    if (userProfile) {
      setUserProfile({
        ...userProfile,
        preferredWorkoutType: type,
        workoutDifficulty: difficulty
      });
    }
  };

  const addCompletedWorkout = (workout: CompletedWorkout) => {
    setCompletedWorkouts(prev => [...prev, workout]);
    
    if (userProfile) {
      const updatedProfile = {
        ...userProfile,
        workoutsCompleted: userProfile.workoutsCompleted + 1,
        lastWorkoutDate: new Date()
      };
      setUserProfile(updatedProfile);
    }
  };

  const incrementStreak = () => {
    if (userProfile) {
      setUserProfile({
        ...userProfile,
        streakDays: userProfile.streakDays + 1
      });
    }
  };

  const resetProfile = () => {
    localStorage.removeItem('userProfile');
    localStorage.removeItem('completedWorkouts');
    setUserProfile(null);
    setCompletedWorkouts([]);
    setIsProfileComplete(false);
  };

  return (
    <UserContext.Provider
      value={{
        userProfile,
        completedWorkouts,
        setUserProfile,
        updateUserGoal,
        updateWorkoutPreferences,
        addCompletedWorkout,
        isProfileComplete,
        incrementStreak,
        resetProfile
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
