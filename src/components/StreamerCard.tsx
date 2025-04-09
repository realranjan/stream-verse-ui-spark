
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Eye, User, Heart, Award, Clock, MessageSquare, ExternalLink, Music, Gamepad } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

interface StreamerCardProps {
  id: string;
  thumbnailUrl: string;
  title: string;
  streamerName: string;
  streamerAvatar?: string;
  viewerCount: number;
  isLive?: boolean;
  categories: string[];
  className?: string;
  style?: React.CSSProperties;
}

const StreamerCard = ({
  id,
  thumbnailUrl,
  title,
  streamerName,
  streamerAvatar,
  viewerCount,
  isLive = true,
  categories,
  className,
  style,
}: StreamerCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [elapsed, setElapsed] = useState("2h 15m");
  const [hoverCount, setHoverCount] = useState(0);

  // Generate random stats for demo
  const chatMessages = Math.floor(Math.random() * 1000) + 100;
  const watchLater = Math.floor(Math.random() * 100) + 10;
  const streamClips = Math.floor(Math.random() * 20) + 1;

  // Random color accents for different categories
  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      "Gaming": "bg-neon-blue/20 text-neon-blue border-neon-blue/30",
      "Fortnite": "bg-neon-pink/20 text-neon-pink border-neon-pink/30",
      "Valorant": "bg-red-500/20 text-red-400 border-red-500/30",
      "FPS": "bg-orange-500/20 text-orange-400 border-orange-500/30",
      "CSGO": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      "Tournament": "bg-twitch-500/20 text-twitch-500 border-twitch-500/30",
      "IRL": "bg-green-500/20 text-green-400 border-green-500/30",
      "Just Chatting": "bg-neon-pink/20 text-neon-pink border-neon-pink/30",
      "Minecraft": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      "Among Us": "bg-purple-500/20 text-purple-400 border-purple-500/30",
      "Variety": "bg-blue-500/20 text-blue-400 border-blue-500/30",
      "Battle Royale": "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
    };

    return colors[category] || "bg-twitch-500/20 text-twitch-500 border-twitch-500/30";
  };

  // Update elapsed time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      const hours = Math.floor(Math.random() * 5) + 1;
      const minutes = Math.floor(Math.random() * 60);
      setElapsed(`${hours}h ${minutes}m`);
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const formatViewerCount = (count: number) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K";
    }
    return count;
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };
  
  const handleMouseEnter = () => {
    setIsHovered(true);
    setHoverCount(prev => prev + 1);
  };

  return (
    <div
      className={cn(
        "group card-hover twitch-card animate-fade-in relative overflow-hidden",
        isHovered && "shadow-lg shadow-twitch-500/10",
        className
      )}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden aspect-video">
        {/* Shimmer effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent shimmer-effect -translate-x-full group-hover:translate-x-full transition-all duration-1500"></div>
        
        <img
          src={thumbnailUrl}
          alt={title}
          className={cn(
            "w-full h-full object-cover transition-all duration-700",
            isHovered ? "scale-110 blur-[1px]" : "scale-100"
          )}
        />

        {isLive && (
          <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
            <span className={cn(
              "inline-block h-1.5 w-1.5 rounded-full bg-red-500",
              isHovered ? "animate-heartbeat" : "animate-pulse"
            )}></span>
            <span>LIVE</span>
          </div>
        )}

        <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
          <Eye className="h-3 w-3" />
          <span className={cn(
            isHovered ? "animate-pulse" : ""
          )}>{formatViewerCount(viewerCount)}</span>
        </div>
        
        {isLive && (
          <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
            <Clock className="h-3 w-3 text-twitch-500" />
            <span>{elapsed}</span>
          </div>
        )}

        <div className="absolute top-2 right-2 z-10">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="icon"
                  variant="ghost" 
                  className={cn(
                    "h-8 w-8 rounded-full bg-black/40 border border-white/10 backdrop-blur-sm text-white hover:bg-black/60 p-1.5 transition-all",
                    isHovered ? "opacity-100 scale-100" : "opacity-0 scale-90",
                    isLiked && "text-red-500 border-red-500/50"
                  )}
                  onClick={handleLike}
                >
                  <Heart className={cn(
                    "h-4 w-4 transition-transform",
                    isLiked && "fill-current animate-heartbeat"
                  )} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isLiked ? "Unlike" : "Like"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/90 via-black/70 to-black/20 transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="w-full px-4 space-y-3">
            <h3 className="text-white text-sm sm:text-base font-medium line-clamp-2 text-center animate-slide-up" 
                style={{ animationDuration: "0.3s", animationFillMode: "both", animationDelay: "0.1s" }}>
              {title}
            </h3>
            
            <div className="flex justify-center animate-slide-up" 
                style={{ animationDuration: "0.3s", animationFillMode: "both", animationDelay: "0.2s" }}>
              <Link to={`/stream/${id}`}>
                <Button className="bg-twitch-500 hover:bg-twitch-600 text-white shadow-neon-glow transition-all">
                  Watch Now
                </Button>
              </Link>
            </div>
            
            <div className="flex gap-2 justify-center animate-slide-up"
                style={{ animationDuration: "0.3s", animationFillMode: "both", animationDelay: "0.3s" }}>
              <Badge variant="outline" className="bg-black/30 backdrop-blur-sm border-white/10 flex items-center gap-1">
                <MessageSquare className="h-3 w-3 text-twitch-500" />
                <span>{chatMessages}</span>
              </Badge>
              
              <Badge variant="outline" className="bg-black/30 backdrop-blur-sm border-white/10 flex items-center gap-1">
                <Award className="h-3 w-3 text-yellow-400" />
                <span>{streamClips}</span>
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 space-y-2 bg-gradient-to-br from-transparent to-black/5">
        <div className="flex items-start gap-2">
          <HoverCard openDelay={200} closeDelay={100}>
            <HoverCardTrigger asChild>
              <Link to={`/profile/${streamerName}`} onClick={(e) => e.stopPropagation()}>
                <Avatar className={cn(
                  "h-8 w-8 flex-shrink-0 transition-all duration-300",
                  isHovered ? "ring-2 ring-twitch-500/80" : "ring-2 ring-transparent"
                )}>
                  <AvatarImage src={streamerAvatar} />
                  <AvatarFallback className="bg-twitch-500/20">
                    {streamerName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 backdrop-blur-lg bg-card/95 border border-white/10">
              <div className="flex justify-between space-x-4">
                <Avatar className="h-16 w-16 border-2 border-twitch-500">
                  <AvatarImage src={streamerAvatar} />
                  <AvatarFallback className="bg-twitch-500/20 text-lg">
                    {streamerName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-1">
                    <h4 className="text-sm font-semibold">{streamerName}</h4>
                    {Math.random() > 0.5 && (
                      <Badge variant="outline" className="h-4 text-[10px] bg-twitch-500/10 text-twitch-500 border-twitch-500/20">PRO</Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>{Math.floor(Math.random() * 1000) + 100}K followers</span>
                  </p>
                  <p className="text-xs line-clamp-2">
                    {Math.random() > 0.5 
                      ? "Professional gamer and content creator streaming daily gameplay and tutorials."
                      : "Variety streamer bringing you the latest games and entertainment. Come hang out!"}
                  </p>
                  <div className="pt-2">
                    <Button size="sm" className="h-7 text-xs w-full bg-twitch-500 hover:bg-twitch-600">Follow</Button>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>

          <div className="space-y-1 flex-1 min-w-0">
            <Link to={`/stream/${id}`}>
              <h3 className="font-medium text-sm line-clamp-1 hover:text-twitch-500 transition-colors duration-200">{title}</h3>
            </Link>
            <Link to={`/profile/${streamerName}`} onClick={(e) => e.stopPropagation()}>
              <p className="text-xs text-muted-foreground hover:text-twitch-500 transition-colors duration-200">{streamerName}</p>
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {categories.slice(0, 2).map((category, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className={cn(
                "text-xs border transition-all hover:scale-105",
                getCategoryColor(category)
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {category === "Gaming" && <Gamepad className="h-3 w-3 mr-1" />}
              {category === "Just Chatting" && <MessageSquare className="h-3 w-3 mr-1" />}
              {category === "IRL" && <ExternalLink className="h-3 w-3 mr-1" />}
              {category === "Music" && <Music className="h-3 w-3 mr-1" />}
              {category}
            </Badge>
          ))}
          {categories.length > 2 && (
            <Badge variant="outline" className="text-xs cursor-pointer hover:bg-card/80">
              +{categories.length - 2}
            </Badge>
          )}
        </div>
        
        {/* Easter egg for viewers who hover a lot */}
        {hoverCount > 3 && (
          <div className="absolute -top-1 -right-1 transform rotate-45">
            <Badge className="bg-gradient-to-r from-twitch-500 to-neon-pink text-white animate-bounce-in text-[10px]">
              Super Fan!
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
};

export default StreamerCard;
