
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "@/context/UserContext";
import { ChatProvider } from "@/context/ChatContext";
import { useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import WorkoutsPage from "./pages/WorkoutsPage";
import WorkoutDetailPage from "./pages/WorkoutDetailPage";
import ChatPage from "./pages/ChatPage";
import ProgressPage from "./pages/ProgressPage";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  // Create a client
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <UserProvider>
          <ChatProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/workouts" element={<WorkoutsPage />} />
                <Route path="/workout/:id" element={<WorkoutDetailPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/progress" element={<ProgressPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </ChatProvider>
        </UserProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
