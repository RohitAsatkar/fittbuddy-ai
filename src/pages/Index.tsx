
import { useUser } from "@/context/UserContext";
import { ProfileForm } from "@/components/profile-form";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Dumbbell, MessageSquare } from "lucide-react";
import { BicepsIcon } from "@/components/icons/biceps-icon";
import { getRandomWorkout } from "@/data/workouts";
import { WorkoutCard } from "@/components/workout-card";
import { getTipOfTheDay } from "@/data/fitnessAssistant";
import { NavBar } from "@/components/nav-bar";

export default function Index() {
  const { userProfile, isProfileComplete } = useUser();
  const randomWorkout = getRandomWorkout();
  
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

  return (
    <>
      <NavBar />
      <div className="container max-w-4xl mx-auto p-4 pb-20 md:pb-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            Welcome back, {userProfile?.name}!
          </h1>
        </div>

        {/* Today's workout suggestion */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Recommended Workout</h2>
          <WorkoutCard workout={randomWorkout} />
        </section>

        {/* Quick access cards */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <Dumbbell className="h-5 w-5 mr-2 text-fitness-purple" />
                  Browse Workouts
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <CardDescription>
                  Find workouts tailored to your goals and preferences
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" asChild className="text-fitness-purple">
                  <Link to="/workouts">
                    View All <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-fitness-purple" />
                  Ask the AI Coach
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <CardDescription>
                  Get fitness advice, nutritional tips, and motivation
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" asChild className="text-fitness-purple">
                  <Link to="/chat">
                    Chat Now <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <BicepsIcon className="h-5 w-5 mr-2 text-fitness-purple" />
                  Fitness Tip
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <CardDescription>
                  {getTipOfTheDay(userProfile?.fitnessGoal)}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" asChild className="text-fitness-purple">
                  <Link to="/chat">
                    More Tips <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
}
