
import { useUser } from "@/context/UserContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Medal, Award, Trophy, Star } from "lucide-react";
import { useMemo } from "react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

export function ProgressAchievements() {
  const { userProfile, completedWorkouts } = useUser();

  const achievements = useMemo(() => {
    const totalWorkouts = completedWorkouts.length;
    const streakDays = userProfile?.streakDays || 0;
    
    const achievementList: Achievement[] = [
      {
        id: "first-workout",
        title: "First Step",
        description: "Complete your first workout",
        icon: <Star className="h-8 w-8 text-yellow-500" />,
        unlocked: totalWorkouts >= 1,
      },
      {
        id: "five-workouts",
        title: "Getting Started",
        description: "Complete 5 workouts",
        icon: <Medal className="h-8 w-8 text-fitness-blue" />,
        unlocked: totalWorkouts >= 5,
        progress: Math.min(totalWorkouts, 5),
        maxProgress: 5
      },
      {
        id: "ten-workouts",
        title: "Regular",
        description: "Complete 10 workouts",
        icon: <Medal className="h-8 w-8 text-fitness-purple" />,
        unlocked: totalWorkouts >= 10,
        progress: Math.min(totalWorkouts, 10),
        maxProgress: 10
      },
      {
        id: "streak-3",
        title: "Momentum",
        description: "Maintain a 3-day workout streak",
        icon: <Award className="h-8 w-8 text-fitness-orange" />,
        unlocked: streakDays >= 3,
        progress: Math.min(streakDays, 3),
        maxProgress: 3
      },
      {
        id: "streak-7",
        title: "Consistency",
        description: "Maintain a 7-day workout streak",
        icon: <Trophy className="h-8 w-8 text-yellow-500" />,
        unlocked: streakDays >= 7,
        progress: Math.min(streakDays, 7),
        maxProgress: 7
      },
      {
        id: "twenty-workouts",
        title: "Dedicated",
        description: "Complete 20 workouts",
        icon: <Trophy className="h-8 w-8 text-green-500" />,
        unlocked: totalWorkouts >= 20,
        progress: Math.min(totalWorkouts, 20),
        maxProgress: 20
      }
    ];
    
    return achievementList;
  }, [completedWorkouts.length, userProfile]);

  if (completedWorkouts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Complete workouts to earn achievements.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((achievement) => (
          <Card 
            key={achievement.id}
            className={`transition-all ${achievement.unlocked ? 'hover-scale border-2 border-fitness-purple bg-gradient-to-br from-white to-purple-50' : 'opacity-70'}`}
          >
            <CardHeader className="p-4 pb-2 flex flex-row items-center space-y-0 gap-4">
              <div className={`${achievement.unlocked ? '' : 'opacity-50'}`}>
                {achievement.icon}
              </div>
              <div>
                <CardTitle className={achievement.unlocked ? 'text-fitness-purple' : ''}>
                  {achievement.title}
                </CardTitle>
                <CardDescription>{achievement.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              {achievement.progress !== undefined && achievement.maxProgress !== undefined && (
                <div className="mt-2">
                  <div className="relative pt-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block text-fitness-purple">
                          {achievement.unlocked ? 'Completed!' : `${achievement.progress}/${achievement.maxProgress}`}
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-purple-200">
                      <div
                        style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-fitness-purple"
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
