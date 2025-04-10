import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Eye, User, Heart, Award, Clock, MessageSquare, ExternalLink, Music, Gamepad, Zap, Flame, Diamond, Sparkles } from "lucide-react";
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
  chatMessages?: number;
  streamClips?: number;
  streamLanguage?: string;
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
  chatMessages = Math.floor(Math.random() * 300) + 50,
  streamClips = Math.floor(Math.random() * 30) + 5,
  streamLanguage = "English",
}: StreamerCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [elapsed, setElapsed] = useState("00:00:00");
  const [glitchActive, setGlitchActive] = useState(false);
  const [cornerEffectActive, setCornerEffectActive] = useState(false);
  const [tiltValues, setTiltValues] = useState({ x: 0, y: 0 });
  const [showDecals, setShowDecals] = useState(false);
  const [isFeatured] = useState(Math.random() > 0.7);
  const cardRef = useRef<HTMLDivElement>(null);

  // Random accent color for variety
  const getRandomAccent = () => {
    const accents = ["neon-pink", "neon-blue", "neon-green", "neon-yellow", "neon-purple"];
    return accents[Math.floor(Math.random() * accents.length)];
  };
  
  const accentColor = getRandomAccent();

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

  // 3D tilt effect
  useEffect(() => {
    if (!isHovered || !cardRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const tiltX = (y - centerY) / 20;
      const tiltY = (centerX - x) / 20;
      
      setTiltValues({ x: tiltX, y: tiltY });
    };
    
    const cardElement = cardRef.current;
    cardElement.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      if (cardElement) {
        cardElement.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [isHovered]);

  const formatViewerCount = (count: number) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K";
    }
    return count;
  };

  const handleHover = (hovered: boolean) => {
    setIsHovered(hovered);
    if (hovered) {
      // Trigger glitch effect randomly
      if (Math.random() > 0.5) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 500);
      }
      
      // Always trigger corner effect on hover
      setCornerEffectActive(true);
      setShowDecals(true);
    } else {
      setCornerEffectActive(false);
      setShowDecals(false);
      setTiltValues({ x: 0, y: 0 });
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        "group relative w-full cursor-pointer overflow-hidden rounded-lg border-4 border-neon-pink transition-all duration-300 flex flex-col justify-between",
        "bg-card hover:bg-card/90 dark:bg-card/20 dark:hover:bg-card/30",
        "neo-brutalism hover:scale-[1.01] active:scale-[0.98]",
        isHovered && "shadow-[0_0_15px_rgba(255,0,255,0.5)]",
        glitchActive && "animate-glitch",
        className
      )}
      style={{
        ...style,
        // Random subtle rotation for asymmetrical layout
        transform: `rotate(${Math.random() * 1 - 0.5}deg) perspective(1000px) rotateX(${tiltValues.x}deg) rotateY(${tiltValues.y}deg)`,
        transition: "transform 0.2s ease-out"
      }}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      {/* Y2K-style decorative stickers */}
      {showDecals && (
        <>
          <div className="absolute top-3 right-14 z-50 transform rotate-12 opacity-80 transition-opacity duration-300">
            {isFeatured && (
              <div className="text-xs font-vt323 bg-white text-black px-1.5 rounded-full border-2 border-black flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-yellow-500" /> HOT
              </div>
            )}
          </div>
          <div className={cn(
            "absolute -top-1 -right-1 w-16 h-16 animate-float opacity-0 transition-opacity duration-500 z-20",
            showDecals && "opacity-100"
          )}>
            {Math.random() > 0.6 && (
              <div className="absolute top-0 right-0 transform rotate-12 bg-yellow-300 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border-2 border-black text-black">
                NEW!
              </div>
            )}
          </div>
        </>
      )}

      {/* Corner decoration - only shows on hover */}
      {cornerEffectActive && (
        <>
          <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-neon-yellow -translate-x-1 -translate-y-1 animate-slide-in-tl z-10"></div>
          <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-neon-blue translate-x-1 -translate-y-1 animate-slide-in-tr z-10"></div>
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-neon-green -translate-x-1 translate-y-1 animate-slide-in-bl z-10"></div>
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-neon-purple translate-x-1 translate-y-1 animate-slide-in-br z-10"></div>
        </>
      )}

      {/* Digital noise overlay */}
      <div className={cn(
        "absolute inset-0 vhs-noise opacity-0 pointer-events-none z-10 mix-blend-overlay",
        isHovered && "opacity-20"
      )}></div>

      {/* Thumbnail section */}
      <div className="relative">
        {/* VHS effect overlay */}
        <div className={cn(
          "absolute inset-0 opacity-0 bg-gradient-to-b from-transparent to-black/40 z-10 pointer-events-none",
          isHovered && "opacity-100"
        )}></div>
        
        {/* VHS scan line effect */}
        <div className={cn(
          "absolute inset-0 bg-scan-lines opacity-0 mix-blend-multiply pointer-events-none z-10",
          isHovered && "opacity-20"
        )}></div>

        {/* Tracking line animation */}
        <div className={cn(
          "absolute inset-x-0 h-px bg-white opacity-0 pointer-events-none z-20 tracking-line",
          isHovered && "opacity-100"
        )}></div>

        {isLive && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/80 text-white text-xs px-3 py-1.5 rounded-full border-2 border-neon-pink backdrop-blur-md z-20">
            <div className="flex items-center gap-1 text-xs">
              <div className="bg-red-500 rounded-full h-2.5 w-2.5 animate-pulse"></div>
              <span className="font-vt323 tracking-wide">LIVE</span>
            </div>
          </div>
        )}

        {/* Enhanced viewer count badge */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-black/80 text-white font-bold text-xs px-3 py-1.5 rounded-full border-2 border-neon-blue backdrop-blur-md z-20">
          <Eye className="h-4 w-4" />
          <span className={cn(
            "font-mono",
            isHovered ? "animate-text-rainbow" : ""
          )}>{formatViewerCount(viewerCount)}</span>
        </div>
        
        {/* Enhanced time display */}
        {isLive && (
          <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/80 text-white font-bold text-xs px-3 py-1.5 rounded-full border-2 border-neon-green backdrop-blur-md z-20">
            <Clock className="h-4 w-4" />
            <span className="font-mono">{elapsed}</span>
          </div>
        )}

        <div className="absolute top-3 right-3 z-30">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="icon"
                  variant="ghost" 
                  className={cn(
                    "h-9 w-9 rounded-full bg-black/70 border-2 border-neon-pink backdrop-blur-md text-white hover:bg-black/90 p-1.5 transition-all",
                    isHovered ? "opacity-100 scale-100" : "opacity-0 scale-90",
                    isLiked && "text-neon-pink border-neon-pink"
                  )}
                  onClick={handleLike}
                >
                  <Heart className={cn(
                    "h-5 w-5 transition-transform",
                    isLiked && "fill-current animate-heartbeat"
                  )} />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="border-4 border-black bg-card/90 backdrop-blur-md">
                <p className="font-bold">{isLiked ? "Unlike" : "Like"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Premium content indicator for some streams */}
        {Math.random() > 0.7 && (
          <div className="absolute top-14 right-3 z-20 transform rotate-3">
            <Badge className="bg-gradient-to-r from-yellow-300 to-orange-500 text-black border-2 border-black px-2 py-0.5 font-bold uppercase text-[10px] flex items-center gap-1">
              <Zap className="h-3 w-3" /> Premium
            </Badge>
          </div>
        )}

        {/* Trending indicator */}
        {viewerCount > 500 && (
          <div className="absolute top-20 right-3 z-20 transform -rotate-3">
            <Badge className="bg-gradient-to-r from-red-500 to-orange-400 text-white border-2 border-black px-2 py-0.5 font-bold uppercase text-[10px] flex items-center gap-1">
              <Flame className="h-3 w-3" /> Trending
            </Badge>
          </div>
        )}

        {/* Thumbnail with aspect ratio */}
        <div className="relative pb-[56.25%] rounded-t-lg overflow-hidden">
          <img
            src={thumbnailUrl}
            alt={`${streamerName}'s stream thumbnail`}
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-transform duration-700 z-0",
              isHovered && "scale-110"
            )}
          />
          
          {/* Holographic effect overlay */}
          <div className={cn(
            "absolute inset-0 opacity-0 transition-opacity duration-300 z-5 pointer-events-none bg-gradient-to-br from-neon-pink/10 via-neon-blue/10 to-neon-green/10",
            isHovered && "opacity-80"
          )}></div>
        </div>

        {/* Hover overlay with additional stats */}
        <div className={cn(
          "absolute inset-0 bg-black/70 flex flex-col justify-center items-center opacity-0 transition-opacity duration-300 pointer-events-none",
          isHovered && "opacity-100 animate-fade-in"
        )}>
            {/* Enhanced stats display */}
            <div className="flex gap-3 justify-center animate-slide-up"
                style={{ animationDuration: "0.4s", animationFillMode: "both", animationDelay: "0.3s" }}>
              <Badge variant="outline" className="bg-black/70 backdrop-blur-sm border-2 border-neon-pink flex items-center gap-2 px-3 py-1.5 rounded-full">
                <MessageSquare className="h-4 w-4 text-neon-pink" />
                <span className="font-mono font-bold">{chatMessages}</span>
              </Badge>
              
              <Badge variant="outline" className="bg-black/70 backdrop-blur-sm border-2 border-neon-yellow flex items-center gap-2 px-3 py-1.5 rounded-full">
                <Award className="h-4 w-4 text-neon-yellow" />
                <span className="font-mono font-bold">{streamClips}</span>
              </Badge>
            </div>
            
            {/* Quick view button */}
            <Button 
              size="sm" 
              className="mt-3 animate-slide-up bg-neon-pink hover:bg-neon-pink/80 text-white font-bold border-2 border-black rounded-md"
              style={{ animationDuration: "0.5s", animationFillMode: "both", animationDelay: "0.4s" }}
            >
              Watch Now
            </Button>
        </div>
      </div>

      {/* Content section */}
      <div className="p-4 relative">
        <div className={cn(
          "absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-pink/50 to-transparent opacity-0 transition-opacity",
          isHovered && "opacity-100"
        )}></div>

        {/* Stream title with hover effect */}
        <h3 className={cn(
          "font-bold text-lg mb-2 line-clamp-1 transition-all",
          isHovered && "text-gradient-pink-blue"
        )}>
          {title}
        </h3>

        {/* Streamer info with hover card */}
        <div className="flex items-center justify-between">
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer group/streamer">
                <div className="relative h-8 w-8 rounded-full overflow-hidden border-2 border-neon-blue">
                  <img 
                    src={streamerAvatar} 
                    alt={streamerName}
                    className={cn(
                      "h-full w-full object-cover transition-transform duration-300",
                      isHovered && "scale-110"
                    )}
                  />
                </div>
                <div>
                  <p className={cn(
                    "font-semibold text-sm flex items-center",
                    "group-hover/streamer:text-neon-blue transition-colors"
                  )}>
                    {streamerName}
                  </p>
                </div>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="border-4 border-black neo-brutalism w-72 p-0 bg-card/90 backdrop-blur-md">
              <div className="flex justify-between space-x-4 p-4">
                <div className="relative h-16 w-16 rounded-md border-2 border-neon-green overflow-hidden shrink-0">
                  <img
                    src={streamerAvatar}
                    alt={streamerName}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-neon-pink/20 via-transparent to-neon-blue/20 mix-blend-overlay"></div>
                </div>
                <div className="space-y-1">
                  <h4 className="text-xl font-bold text-gradient-blue-green">{streamerName}</h4>
                  <div className="flex gap-1 flex-col">
                    <p className="text-xs text-foreground/80 flex items-center gap-1">
                      <User className="h-3.5 w-3.5" />
                      <span className="font-mono">{Math.floor(Math.random() * 1000) + 100}K followers</span>
                    </p>
                    <p className="text-xs flex items-center gap-1 text-foreground/80">
                      <Badge className="bg-black/30 text-white text-[10px] px-1.5 py-0 hover:bg-black/40">
                        {streamLanguage}
                      </Badge>
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-black/10 p-3 flex flex-col gap-2 border-t-2 border-black/20">
                <div className="text-xs text-foreground/80">Most popular categories:</div>
                <div className="flex flex-wrap gap-1">
                  {categories.map((category, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className={cn(
                        "text-[10px] py-0.5 px-1.5 border-2 transition-all hover:scale-105 font-bold rounded-md",
                        getCategoryColor(category)
                      )}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
                <div className="pt-1 flex justify-center">
                  <Button 
                    size="sm" 
                    className="w-full rounded-md bg-neon-blue text-white border-2 border-black font-bold hover:bg-neon-blue/80"
                  >
                    Follow
                  </Button>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>

          {/* Bottom Decorative Line */}
          <div className={cn(
            "absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-neon-blue/50 to-transparent opacity-0 transition-opacity",
            isHovered && "opacity-100"
          )}></div>

          {/* Categories */}
          <div className="flex flex-wrap gap-1">
            {categories.slice(0, 2).map((category, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className={cn(
                  "text-xs py-0.5 px-2 border-2 transition-all hover:scale-105 font-bold rounded-md",
                  getCategoryColor(category)
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {category === "Gaming" && <Gamepad className="h-3.5 w-3.5 mr-1" />}
                {category === "Just Chatting" && <MessageSquare className="h-3.5 w-3.5 mr-1" />}
                {category === "IRL" && <ExternalLink className="h-3.5 w-3.5 mr-1" />}
                {category === "Music" && <Music className="h-3.5 w-3.5 mr-1" />}
                {category}
              </Badge>
            ))}
            {categories.length > 2 && (
              <Badge variant="outline" className="text-xs cursor-pointer hover:bg-card/80 border-2 py-0.5 px-2 rounded-md font-bold">
                +{categories.length - 2}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamerCard;
