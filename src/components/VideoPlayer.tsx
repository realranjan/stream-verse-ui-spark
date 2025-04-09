
import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Heart, Share2, Settings, ExternalLink, Award, MessageSquare, Clock, Bookmark, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { formatViewCount } from "@/data/mock-data";

interface VideoPlayerProps {
  streamTitle: string;
  streamerName: string;
  streamerAvatar?: string;
  thumbnailUrl: string;
  viewerCount: number;
  categories: string[];
  isLive?: boolean;
  language?: string;
  tags?: string[];
}

const VideoPlayer = ({
  streamTitle,
  streamerName,
  streamerAvatar,
  thumbnailUrl,
  viewerCount,
  categories,
  isLive = true,
  language = "English",
  tags = [],
}: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [progressInterval, setProgressInterval] = useState<NodeJS.Timeout | null>(null);
  const [volume, setVolume] = useState(80);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [quality, setQuality] = useState("1080p");
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 5000) + 1000);
  const [shareCount, setShareCount] = useState(Math.floor(Math.random() * 1000) + 100);
  const videoRef = useRef<HTMLDivElement>(null);
  
  // Simulate random chat message count
  const [chatCount, setChatCount] = useState(Math.floor(Math.random() * 300) + 50);
  useEffect(() => {
    const chatInterval = setInterval(() => {
      setChatCount(prev => prev + Math.floor(Math.random() * 5) - 1);
    }, 5000);
    return () => clearInterval(chatInterval);
  }, []);
  
  // Simulate play/pause logic with progress bar
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.1;
        });
      }, 100);
      
      setProgressInterval(interval);
      return () => clearInterval(interval);
    } else if (progressInterval) {
      clearInterval(progressInterval);
      setProgressInterval(null);
    }
  }, [isPlaying]);

  // Random stream highlights/markers
  const streamMarkers = [
    { position: 15, label: "First Kill" },
    { position: 42, label: "Epic Play" },
    { position: 78, label: "Victory" },
  ];

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current?.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="flex flex-col overflow-hidden bg-background border border-border rounded-sm">
      <div className="relative" ref={videoRef}>
        {/* Main video container with hover effect */}
        <div 
          className="relative aspect-video bg-black overflow-hidden"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <img
            src={thumbnailUrl}
            alt={streamTitle}
            className={cn(
              "w-full h-full object-cover",
              isPlaying ? "opacity-90" : "opacity-100"
            )}
          />
          
          {/* Play/Pause overlay */}
          <div className={cn(
            "absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-200",
            isPlaying && !isHovering ? "opacity-0" : "opacity-100"
          )}>
            <Button
              variant="secondary"
              size="icon"
              className={cn(
                "h-16 w-16 rounded-full bg-black/70 text-white hover:bg-black/80 transition-transform",
                isHovering ? "scale-105" : "",
                isPlaying ? "opacity-0 hover:opacity-100" : "opacity-100"
              )}
              onClick={togglePlayback}
            >
              {isPlaying ? (
                <Pause className="h-8 w-8" />
              ) : (
                <Play className="h-8 w-8 ml-1" />
              )}
            </Button>
          </div>
          
          {/* Live badge with pulse animation */}
          {isLive && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-red-500 hover:bg-red-600 flex items-center gap-1.5 px-2 py-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse"></span>
                LIVE
              </Badge>
            </div>
          )}

          {/* Language & Quality badges */}
          <div className="absolute top-3 right-3 flex items-center gap-2">
            <Badge variant="outline" className="bg-black/70 text-white border-border">
              {language}
            </Badge>
            <Badge variant="outline" className="bg-black/70 text-white border-border">
              {quality}
            </Badge>
          </div>

          {/* Video controls - bottom */}
          <div className={cn(
            "absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent transition-opacity duration-200",
            isHovering || isPlaying ? "opacity-100" : "opacity-0"
          )}>
            <div className="flex items-center gap-2 mb-2 relative">
              <Slider
                value={[progress]}
                max={100}
                step={0.1}
                className="cursor-pointer"
                onValueChange={(value) => setProgress(value[0])}
              />
              
              {/* Stream markers/highlights */}
              {streamMarkers.map((marker, idx) => (
                <TooltipProvider key={idx}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div 
                        className="absolute h-3 w-1 bg-primary rounded-none cursor-pointer top-0 transform -translate-y-1/2 hover:h-4 transition-all"
                        style={{ left: `${marker.position}%` }}
                      ></div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs font-medium">{marker.label}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white hover:bg-white/10 rounded-sm"
                  onClick={togglePlayback}
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white hover:bg-white/10 rounded-sm"
                    onClick={toggleMute}
                  >
                    {isMuted ? (
                      <VolumeX className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                  </Button>
                  
                  <div className="hidden sm:block w-20">
                    <Slider
                      value={[isMuted ? 0 : volume]}
                      max={100}
                      step={1}
                      className="cursor-pointer"
                      onValueChange={(value) => {
                        setVolume(value[0]);
                        if (value[0] > 0 && isMuted) {
                          setIsMuted(false);
                        }
                      }}
                    />
                  </div>
                </div>
                
                <span className="text-xs text-white/90 font-mono">
                  {Math.floor(progress / 100 * 600).toString().padStart(2, '0')}:{Math.floor((progress / 100 * 600) % 60).toString().padStart(2, '0')} / 10:00
                </span>
              </div>
              
              <div className="flex items-center gap-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-white hover:bg-white/10 rounded-sm"
                        onClick={() => setQuality(quality === "1080p" ? "720p" : "1080p")}
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p>Stream settings</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-white hover:bg-white/10 rounded-sm"
                        onClick={toggleFullscreen}
                      >
                        <Maximize className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p>Fullscreen</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
          
          {/* Animated view count */}
          {isPlaying && (
            <div className="absolute top-12 left-3 animate-fade-in flex items-center gap-2 bg-black/70 px-2 py-1 rounded-sm text-sm text-white/90">
              <span className="inline-block h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
              <span className="font-medium">{formatViewCount(viewerCount)} viewers</span>
            </div>
          )}
          
          {/* Chat activity indicator */}
          <div className="absolute top-12 right-3 animate-fade-in">
            <div className="flex items-center gap-1 bg-black/70 px-2 py-1 rounded-sm text-xs">
              <MessageSquare className="h-3 w-3 text-primary" />
              <span className="text-white/90">{chatCount}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stream info section */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <Avatar className="h-10 w-10 rounded-sm ring-2 ring-primary/50 ring-offset-2 ring-offset-background">
              <AvatarImage src={streamerAvatar} />
              <AvatarFallback className="bg-primary/20">
                {streamerName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="space-y-1 flex-1 min-w-0">
              <h2 className="font-medium text-lg leading-tight line-clamp-2 group">
                {streamTitle}
              </h2>
              
              <div className="flex items-center flex-wrap gap-2">
                <span className="text-sm font-medium text-primary hover:underline cursor-pointer transition-colors">
                  {streamerName}
                </span>
                {isLive && (
                  <div className="flex items-center text-sm text-muted-foreground gap-1">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-500"></span>
                    <span>{formatViewCount(viewerCount)} viewers</span>
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap gap-1 pt-1">
                {categories.map((category, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="hover:bg-secondary/80 cursor-pointer transition-colors"
                  >
                    {category}
                  </Badge>
                ))}
                
                {tags && tags.slice(0, 2).map((tag, index) => (
                  <Badge 
                    key={`tag-${index}`} 
                    variant="outline"
                    className="text-xs bg-transparent border-border hover:border-primary"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <Button
              variant={isFollowing ? "default" : "outline"}
              size="sm"
              className={cn(
                "gap-1 transition-all duration-200 min-w-[100px]",
                isFollowing && "animate-pulse"
              )}
              onClick={toggleFollow}
            >
              {isFollowing ? "Following" : "Follow"}
            </Button>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-8 w-8 rounded-sm transition-colors",
                  isLiked && "text-red-500 hover:text-red-600"
                )}
                onClick={toggleLike}
              >
                <Heart className={cn(
                  "h-4 w-4 transition-transform",
                  isLiked && "fill-current scale-110"
                )} />
              </Button>
              
              <span className="text-xs text-muted-foreground">{formatViewCount(likeCount)}</span>
              
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-sm transition-colors"
                onClick={() => setShareCount(prev => prev + 1)}
              >
                <Share2 className="h-4 w-4" />
              </Button>
              
              <span className="text-xs text-muted-foreground">{formatViewCount(shareCount)}</span>
            </div>
          </div>
        </div>
        
        {/* Expandable stream details */}
        <div className="mt-4">
          <Button 
            variant="secondary" 
            onClick={() => setShowDetails(!showDetails)}
            className="w-full justify-between py-2 text-sm font-medium"
          >
            <span>Stream details</span>
            {showDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          
          {showDetails && (
            <div className="p-4 bg-secondary/30 rounded-sm mt-2 space-y-4 animate-slide-down border border-border/40">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Stream started</p>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>2 hours ago</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Language</p>
                  <div className="flex items-center gap-1">
                    <span>{language}</span>
                  </div>
                </div>
                
                {tags && tags.length > 0 && (
                  <div className="sm:col-span-2">
                    <p className="text-sm text-muted-foreground mb-1">Tags</p>
                    <div className="flex flex-wrap gap-1">
                      {tags.map((tag, index) => (
                        <Badge 
                          key={`detail-tag-${index}`} 
                          variant="outline"
                          className="hover:bg-primary/10 cursor-pointer transition-colors"
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="sm:col-span-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <ExternalLink className="h-3 w-3" />
                    <span>Go to channel page</span>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
