
import { useState, useEffect, useRef } from "react";
import { Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { mockChatMessages, type ChatMessage } from "@/data/mock-data";

interface LiveChatProps {
  className?: string;
}

const LiveChat = ({ className }: LiveChatProps) => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [inputMessage, setInputMessage] = useState("");
  const { toast } = useToast();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Simulate new messages coming in
  useEffect(() => {
    const simulatedUsernames = ["Gamer123", "StreamFan42", "PurpleHeart", "TwitchLover"];
    const simulatedMessages = [
      "Nice stream!",
      "LOL 😂",
      "This is epic",
      "Pog",
      "Can't believe that just happened",
      "Let's goooo!!!",
      "First time watching, loving it!",
      "Hi from Germany!"
    ];

    const interval = setInterval(() => {
      const randomUsername = simulatedUsernames[Math.floor(Math.random() * simulatedUsernames.length)];
      const randomMessage = simulatedMessages[Math.floor(Math.random() * simulatedMessages.length)];

      setChatMessages(prev => [
        ...prev,
        {
          id: `msg-${Date.now()}`,
          username: randomUsername,
          message: randomMessage,
          timestamp: new Date(),
          avatarUrl: ""
        }
      ]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) {
      toast({
        title: "Cannot send empty message",
        variant: "destructive"
      });
      return;
    }

    setChatMessages(prev => [
      ...prev, 
      {
        id: `msg-${Date.now()}`,
        username: "You",
        message: inputMessage,
        timestamp: new Date(),
        avatarUrl: ""
      }
    ]);
    setInputMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className={cn("flex flex-col h-full animate-fade-in", className)}>
      <div className="px-4 py-2 bg-card/50 rounded-t-lg border-b">
        <h3 className="font-semibold">Live Chat</h3>
      </div>

      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar"
      >
        {chatMessages.map((msg, index) => (
          <div 
            key={msg.id} 
            className="flex gap-2 animate-fade-in" 
            style={{ animationDelay: `${Math.min(index * 0.05, 1)}s` }}
          >
            <Avatar className="h-6 w-6 flex-shrink-0">
              <AvatarImage src={msg.avatarUrl} />
              <AvatarFallback className="bg-twitch-500/20 text-xs">
                {msg.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm truncate">
                  {msg.username}
                </span>
                <span className="text-xs text-muted-foreground">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-sm break-words">{msg.message}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Send a message"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button 
            size="icon" 
            onClick={handleSendMessage}
            className="bg-twitch-500 hover:bg-twitch-600 animate-bounce-in"
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LiveChat;
