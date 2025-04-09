
import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface VideoPlayerProps {
  streamTitle: string;
  streamerName: string;
  streamerAvatar?: string;
  thumbnailUrl: string;
  viewerCount: number;
  categories: string[];
  isLive?: boolean;
}

const VideoPlayer = ({
  streamTitle,
  streamerName,
  streamerAvatar,
  thumbnailUrl,
  viewerCount,
  categories,
  isLive = true,
}: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [progressInterval, setProgressInterval] = useState<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  
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

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const formatViewerCount = (count: number) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K";
    }
    return count;
  };

  return (
    <div className="flex flex-col rounded-lg overflow-hidden bg-card">
      <div className="relative" ref={videoRef}>
        {/* Main video/thumbnail container */}
        <div className="relative aspect-video bg-black overflow-hidden">
          <img
            src={thumbnailUrl}
            alt={streamTitle}
            className={cn(
              "w-full h-full object-cover transition-opacity",
              isPlaying ? "opacity-80" : "opacity-100"
            )}
          />
          
          {/* Play/Pause overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="h-16 w-16 rounded-full bg-black/50 text-white hover:bg-black/70 hover:scale-110 transition-transform"
              onClick={togglePlayback}
            >
              {isPlaying ? (
                <Pause className="h-8 w-8" />
              ) : (
                <Play className="h-8 w-8" />
              )}
            </Button>
          </div>
          
          {/* Live badge */}
          {isLive && (
            <div className="absolute top-4 left-4">
              <Badge className="bg-red-500 hover:bg-red-600 animate-pulse">LIVE</Badge>
            </div>
          )}

          {/* Video controls - bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex items-center gap-2 mb-2">
              <Slider
                value={[progress]}
                max={100}
                step={0.1}
                className="cursor-pointer"
                onValueChange={(value) => setProgress(value[0])}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white hover:bg-white/10"
                  onClick={togglePlayback}
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white hover:bg-white/10"
                  onClick={toggleMute}
                >
                  {isMuted ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </Button>
                
                <span className="text-xs text-white/90">00:00 / 10:00</span>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/10"
              >
                <Maximize className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stream info section */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <Avatar className="h-10 w-10 border-2 border-twitch-500">
              <AvatarImage src={streamerAvatar} />
              <AvatarFallback className="bg-twitch-500/20">
                {streamerName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="space-y-1">
              <h2 className="font-semibold text-lg leading-tight">{streamTitle}</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{streamerName}</span>
                {isLive && (
                  <div className="flex items-center text-sm text-muted-foreground gap-1">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-500"></span>
                    <span>{formatViewerCount(viewerCount)} viewers</span>
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap gap-1 pt-1">
                {categories.map((category, index) => (
                  <Badge key={index} variant="secondary" className="hover-scale">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "gap-1 transition-all duration-300",
                isFollowing
                  ? "bg-twitch-500 text-white hover:bg-twitch-600 hover:text-white"
                  : "border-twitch-500 text-twitch-500 hover:bg-twitch-500/10"
              )}
              onClick={toggleFollow}
            >
              {isFollowing ? "Following" : "Follow"}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-9 w-9 transition-colors",
                isLiked && "text-red-500 hover:text-red-600"
              )}
              onClick={toggleLike}
            >
              <Heart className={cn(
                "h-5 w-5 transition-transform",
                isLiked && "fill-current scale-110"
              )} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
