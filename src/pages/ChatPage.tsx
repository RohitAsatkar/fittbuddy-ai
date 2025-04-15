
import { NavBar } from "@/components/nav-bar";
import { ChatInterface } from "@/components/chat-interface";

export default function ChatPage() {
  return (
    <>
      <NavBar />
      <div className="container max-w-4xl mx-auto p-4 pb-20 md:pb-4 h-[calc(100vh-170px)] md:h-[calc(100vh-120px)]">
        <h1 className="text-2xl font-bold mb-6">AI Coach</h1>
        <div className="h-[calc(100%-60px)]">
          <ChatInterface />
        </div>
      </div>
    </>
  );
}
