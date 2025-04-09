
import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
}: StreamerCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatViewerCount = (count: number) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K";
    }
    return count;
  };

  return (
    <div
      className="group rounded-lg overflow-hidden bg-card border transition-all duration-300 hover:border-twitch-500 hover:shadow-md hover:shadow-twitch-500/10 animate-fade-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden aspect-video">
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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

        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center bg-black/50 transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        >
          <Link to={`/stream/${id}`}>
            <Button className="bg-twitch-500 hover:bg-twitch-600 transition-transform hover:scale-105 animate-bounce-in">
              Watch Now
            </Button>
          </Link>
        </div>
      </div>

      <div className="p-3 space-y-2">
        <div className="flex items-start gap-2">
          <Avatar className="h-8 w-8 flex-shrink-0 float-animation">
            <AvatarImage src={streamerAvatar} />
            <AvatarFallback className="bg-twitch-500/20">
              {streamerName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-1 flex-1 min-w-0">
            <h3 className="font-medium text-sm line-clamp-1">{title}</h3>
            <p className="text-xs text-muted-foreground">{streamerName}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {categories.slice(0, 2).map((category, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="text-xs shimmer-effect"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {category}
            </Badge>
          ))}
          {categories.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{categories.length - 2}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default StreamerCard;
