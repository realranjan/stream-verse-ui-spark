
import { useState, useEffect, useRef } from "react";
import { Send, User, Heart, Award, Gift, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { mockChatMessages, type ChatMessage } from "@/data/mock-data";
import { Badge } from "@/components/ui/badge";

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
    const simulatedUsernames = ["Gamer123", "StreamFan42", "PurpleHeart", "TwitchLover", "NeonGamer", "PixelPro"];
    const simulatedMessages = [
      "Nice stream! 👍",
      "LOL 😂",
      "This is epic",
      "Pog",
      "Can't believe that just happened",
      "Let's goooo!!!",
      "First time watching, loving it! ❤️",
      "Hi from Germany! 🇩🇪",
      "OMG that was insane",
      "GG",
      "Subscribed! Worth it!"
    ];

    const interval = setInterval(() => {
      const randomUsername = simulatedUsernames[Math.floor(Math.random() * simulatedUsernames.length)];
      const randomMessage = simulatedMessages[Math.floor(Math.random() * simulatedMessages.length)];
      const isSpecial = Math.random() > 0.8;
      const specialType = isSpecial ? (Math.random() > 0.5 ? "subscriber" : "moderator") as 'subscriber' | 'moderator' : undefined;

      setChatMessages(prev => [
        ...prev,
        {
          id: `msg-${Date.now()}`,
          username: randomUsername,
          message: randomMessage,
          timestamp: new Date(),
          avatarUrl: "",
          specialType
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
        avatarUrl: "",
        isOwn: true
      }
    ]);
    setInputMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const getBadgeForUser = (msg: ChatMessage) => {
    if (msg.isOwn) {
      return (
        <Badge className="text-[10px] h-4 px-1 bg-twitch-500 text-white">YOU</Badge>
      );
    }
    
    if (msg.specialType === "subscriber") {
      return (
        <Badge className="text-[10px] h-4 px-1 bg-gradient-to-r from-neon-pink to-twitch-500 flex items-center gap-0.5">
          <Star className="h-2 w-2" />
          <span>SUB</span>
        </Badge>
      );
    }
    
    if (msg.specialType === "moderator") {
      return (
        <Badge className="text-[10px] h-4 px-1 bg-green-600 flex items-center gap-0.5">
          <Shield className="h-2 w-2" />
          <span>MOD</span>
        </Badge>
      );
    }
    
    return null;
  };

  return (
    <div className={cn("flex flex-col h-full", className)}>
      <div className="px-4 py-3 bg-card/50 backdrop-blur-sm rounded-t-lg border-b border-white/10 flex items-center justify-between">
        <h3 className="font-bold text-gradient">Live Chat</h3>
        <Badge variant="outline" className="animate-pulse bg-red-500/10 text-red-500">Live</Badge>
      </div>

      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar"
      >
        {chatMessages.map((msg, index) => (
          <div 
            key={msg.id} 
            className={cn(
              "flex gap-2 animate-fade-in",
              msg.isOwn && "bg-twitch-500/5 p-2 rounded-lg border border-twitch-500/10"
            )}
            style={{ animationDelay: `${Math.min(index * 0.05, 1)}s` }}
          >
            <Avatar className="h-6 w-6 flex-shrink-0">
              <AvatarImage src={msg.avatarUrl} />
              <AvatarFallback className={cn(
                "text-xs", 
                msg.specialType === "subscriber" ? "bg-twitch-500/30" : 
                msg.specialType === "moderator" ? "bg-green-500/30" : 
                "bg-twitch-500/20"
              )}>
                {msg.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 flex-wrap">
                <span className={cn(
                  "font-medium text-sm truncate",
                  msg.specialType === "subscriber" ? "text-twitch-500" : 
                  msg.specialType === "moderator" ? "text-green-500" : 
                  msg.isOwn ? "text-white" : ""
                )}>
                  {msg.username}
                </span>
                
                {getBadgeForUser(msg)}
                
                <span className="text-xs text-muted-foreground ml-auto pl-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-sm break-words">{msg.message}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-white/10 bg-card/30">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Send a message"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-background/80 border-white/10 focus-visible:ring-twitch-500/20"
          />
          <Button 
            size="icon" 
            onClick={handleSendMessage}
            className="bg-twitch-500 hover:bg-twitch-600 shadow-md shadow-twitch-500/20"
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
        <div className="flex justify-between items-center mt-3 text-xs text-muted-foreground">
          <span>Emotes enabled</span>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <Gift className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <Heart className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Adding the Shield icon since it might not be imported
const Shield = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

export default LiveChat;
