
import { NavBar } from "@/components/nav-bar";
import { ChatInterface } from "@/components/chat-interface";
import { ChatProvider } from "@/context/ChatContext";
import { findRelevantQA } from "@/data/aiCoachTraining";

export default function ChatPage() {
  // Optional: You can add a test query to see if the training data works
  // const testResults = findRelevantQA("protein muscle");
  // console.log("Test query results:", testResults);
  
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
