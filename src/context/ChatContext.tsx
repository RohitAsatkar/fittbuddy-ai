
import { ChatMessage } from "@/types";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { generateInitialChatHistory, getAssistantResponse } from "@/data/fitnessAssistant";
import { useUser } from "./UserContext";

interface ChatContextProps {
  messages: ChatMessage[];
  sendMessage: (message: string) => void;
  clearChat: () => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(generateInitialChatHistory());
  const { userProfile } = useUser();

  // Load chat history from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      const parsedMessages = JSON.parse(savedMessages);
      // Convert date strings back to Date objects
      const messagesWithDates = parsedMessages.map((message: any) => ({
        ...message,
        timestamp: new Date(message.timestamp)
      }));
      setMessages(messagesWithDates);
    }
  }, []);

  // Save messages to localStorage when they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  const sendMessage = (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);

    // Generate AI response
    setTimeout(() => {
      const aiResponse = getAssistantResponse(content, userProfile || undefined);
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    }, 500); // Small delay to simulate thinking
  };

  const clearChat = () => {
    setMessages(generateInitialChatHistory());
    localStorage.removeItem('chatMessages');
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        sendMessage,
        clearChat
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
