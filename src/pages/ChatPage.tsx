
import { NavBar } from "@/components/nav-bar";
import { ChatInterface } from "@/components/chat-interface";
import { ChatProvider } from "@/context/ChatContext";
import { findRelevantQA } from "@/data/training";
import { useEffect } from "react";

export default function ChatPage() {
  // Add some debugging to help identify issues
  useEffect(() => {
    console.log("ChatPage mounted");
    
    // Test exercise extraction
    const testQueries = [
      "How do I do push-ups?", 
      "What are good chest exercises?",
      "Tell me about squats"
    ];
    
    // Logging sample queries for debugging
    console.log("Sample query test results:");
    testQueries.forEach(query => {
      const results = findRelevantQA(query);
      console.log(`Query: "${query}" - Found ${results.length} results`);
    });
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
