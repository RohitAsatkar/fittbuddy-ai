
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { 
  Home, 
  Dumbbell, 
  MessageSquare, 
  BarChart, 
  UserCircle
} from "lucide-react";
import { BicepsIcon } from "@/components/icons/biceps-icon";

export function NavBar() {
  const location = useLocation();
  const { isProfileComplete } = useUser();
  
  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: <Home className="h-5 w-5" />,
    },
    {
      name: "Workouts",
      path: "/workouts",
      icon: <Dumbbell className="h-5 w-5" />,
    },
    {
      name: "Chat",
      path: "/chat",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      name: "Progress",
      path: "/progress",
      icon: <BarChart className="h-5 w-5" />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <UserCircle className="h-5 w-5" />,
    },
  ];

  // Only show navbar if profile is complete
  if (!isProfileComplete) return null;

  return (
    <>
      {/* Top navbar for larger screens */}
      <nav className="hidden md:flex justify-between items-center p-4 border-b bg-white">
        <div className="flex items-center">
          <BicepsIcon className="h-8 w-8 text-fitness-purple" />
          <span className="ml-2 text-xl font-bold text-fitness-purple">FitBuddy</span>
        </div>
        <div className="flex space-x-2">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant={location.pathname === item.path ? "default" : "ghost"}
              className={
                location.pathname === item.path
                  ? "bg-fitness-purple hover:bg-fitness-purple-dark"
                  : ""
              }
              asChild
            >
              <Link to={item.path}>
                {item.name}
              </Link>
            </Button>
          ))}
        </div>
      </nav>

      {/* Bottom navbar for mobile */}
      <nav className="fixed bottom-0 left-0 right-0 md:hidden flex justify-around items-center p-2 bg-white border-t z-10">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center py-1 px-3 rounded-md ${
              location.pathname === item.path
                ? "text-fitness-purple"
                : "text-gray-500"
            }`}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.name}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
