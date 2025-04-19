import { NavBar } from "@/components/nav-bar";
import { ChatInterface } from "@/components/chat-interface";
import { ChatProvider } from "@/context/ChatContext";
import { findRelevantQA } from "@/data/training";
import { useEffect } from "react";
import { extractExerciseName } from "@/utils/exerciseUtils";
import { getExerciseInstructions } from "@/data/exerciseInstructions";
import { exerciseDatabase } from "@/data/exerciseDatabase";
import { exerciseData } from "@/data/training/exerciseData";

export default function ChatPage() {
  useEffect(() => {
    console.log("ChatPage mounted");
    
    // Log exercises from exercise database
    const exerciseDatabaseCount = Object.keys(exerciseDatabase).length;
    console.log(`Exercises in Exercise Database: ${exerciseDatabaseCount}`);
    console.log("Exercise Database Exercises:", Object.values(exerciseDatabase).map(ex => ex.name));
    
    // Log exercises from training data
    console.log(`Exercises in Training Data: ${exerciseData.length}`);
    console.log("Training Data Exercises:", exerciseData.map(ex => ex.name));
  }, []);
  
  return (
    <>
      <NavBar />
      <div className="container max-w-4xl mx-auto p-4 pb-20 md:pb-4 h-[calc(100vh-170px)] md:h-[calc(100vh-120px)]">
        <h1 className="text-2xl font-bold mb-6">AI Coach</h1>
        <div className="h-[calc(100%-60px)]">
          <ChatProvider>
            <ChatInterface />
          </ChatProvider>
        </div>
      </div>
    </>
  );
}
