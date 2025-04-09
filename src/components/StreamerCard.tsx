
import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, User, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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

  return (
    <div
      className={cn(
        "group card-hover twitch-card animate-fade-in",
        className
      )}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden aspect-video">
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {isLive && (
          <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-1 rounded-full neon-glow">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse"></span>
            <span>LIVE</span>
          </div>
        )}

        <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
          <Eye className="h-3 w-3" />
          <span>{formatViewerCount(viewerCount)}</span>
        </div>

        <div className="absolute top-2 right-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="icon"
                  variant="ghost" 
                  className={cn(
                    "h-8 w-8 rounded-full bg-black/40 border border-white/10 text-white hover:bg-black/60 p-1.5",
                    isHovered ? "opacity-100" : "opacity-0",
                    isLiked && "text-red-500"
                  )}
                  onClick={handleLike}
                >
                  <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
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
            "absolute inset-0 flex items-center justify-center bg-black/50 transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        >
          <Link to={`/stream/${id}`}>
            <Button className="btn-twitch shadow-lg shadow-twitch-500/20 transition-transform hover:scale-105 animate-bounce-in">
              Watch Now
            </Button>
          </Link>
        </div>
      </div>

      <div className="p-3 space-y-2">
        <div className="flex items-start gap-2">
          <Link to={`/profile/${streamerName}`} onClick={(e) => e.stopPropagation()}>
            <Avatar className="h-8 w-8 flex-shrink-0 ring-2 ring-transparent hover:ring-twitch-500 transition-all duration-200">
              <AvatarImage src={streamerAvatar} />
              <AvatarFallback className="bg-twitch-500/20">
                {streamerName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Link>

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
              variant="secondary" 
              className="text-xs shimmer-effect cursor-pointer hover:bg-twitch-500/20"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {category}
            </Badge>
          ))}
          {categories.length > 2 && (
            <Badge variant="outline" className="text-xs cursor-pointer hover:bg-card/80">
              +{categories.length - 2}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default StreamerCard;
