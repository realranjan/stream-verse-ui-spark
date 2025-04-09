
import { useState, useRef, useEffect } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import VideoControls from "./VideoControls";
import StreamBadges from "./StreamBadges";
import StreamInfo from "./StreamInfo";
import { VideoPlayerProps } from "./types";

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
              <Play className="h-8 w-8 ml-1" />
            </Button>
          </div>
          
          {/* Stream badges (live, language, quality, viewers, chat) */}
          <StreamBadges
            isLive={isLive}
            isPlaying={isPlaying}
            viewerCount={viewerCount}
            chatCount={chatCount}
            language={language}
            quality={quality}
          />
          
          {/* Video controls (play/pause, volume, progress, etc) */}
          <VideoControls
            isPlaying={isPlaying}
            isMuted={isMuted}
            progress={progress}
            volume={volume}
            quality={quality}
            isHovering={isHovering}
            streamMarkers={streamMarkers}
            togglePlayback={togglePlayback}
            toggleMute={toggleMute}
            setProgress={setProgress}
            setVolume={setVolume}
            setIsMuted={setIsMuted}
            toggleFullscreen={toggleFullscreen}
            setQuality={setQuality}
          />
        </div>
      </div>
      
      {/* Stream info section with interactive elements */}
      <StreamInfo
        streamTitle={streamTitle}
        streamerName={streamerName}
        streamerAvatar={streamerAvatar}
        viewerCount={viewerCount}
        categories={categories}
        isLive={isLive}
        isLiked={isLiked}
        isFollowing={isFollowing}
        showDetails={showDetails}
        likeCount={likeCount}
        shareCount={shareCount}
        language={language}
        tags={tags}
        toggleLike={toggleLike}
        toggleFollow={toggleFollow}
        setShowDetails={setShowDetails}
        setShareCount={setShareCount}
      />
    </div>
  );
};

export default VideoPlayer;
