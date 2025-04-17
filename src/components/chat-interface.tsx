
import { useState, useRef, useEffect } from "react";
import { useChat } from "@/context/ChatContext";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Send } from "lucide-react";
import { getTipOfTheDay } from "@/data/tips";
import { useUser } from "@/context/UserContext";

export function ChatInterface() {
  const { messages, sendMessage } = useChat();
  const { userProfile } = useUser();
  const [input, setInput] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Focus the input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full border rounded-lg overflow-hidden">
      <div className="bg-fitness-purple p-3 text-white">
        <h2 className="font-semibold">FitBuddy Chat Assistant</h2>
        <p className="text-xs text-white/80">
          Ask me anything about fitness, workouts, or nutrition!
        </p>
      </div>
      
      {/* Tip of the day */}
      <div className="bg-fitness-pastel-purple p-3 border-b">
        <p className="text-xs font-medium text-fitness-purple-dark">Tip of the day</p>
        <p className="text-sm">
          {getTipOfTheDay(userProfile?.fitnessGoal || "general_fitness")}
        </p>
      </div>
      
      {/* Chat messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex max-w-[80%] ${
                  message.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {message.sender === "assistant" && (
                  <Avatar className="h-8 w-8 mr-2 bg-fitness-purple text-white">
                    <span className="text-xs">AI</span>
                  </Avatar>
                )}
                <div
                  className={`rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-fitness-purple text-white"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <span className="text-xs opacity-70 block mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      {/* Input area */}
      <div className="p-3 border-t flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-1 bg-transparent border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fitness-purple/60"
        />
        <Button 
          onClick={handleSend}
          className="ml-2 bg-fitness-purple hover:bg-fitness-purple-dark"
          size="icon"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
