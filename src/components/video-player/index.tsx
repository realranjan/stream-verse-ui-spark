import { useState, useRef, useEffect } from "react";
import { Play, Pause, Heart, Bell, Maximize2, Activity, ZapOff, Zap, Crown, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import VideoControls from "./VideoControls";
import StreamBadges from "./StreamBadges";
import StreamInfo from "./StreamInfo";
import { VideoPlayerProps, StreamMarker, EmoteData } from "./types";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";

// Generate random chat messages every few seconds to simulate live chat
const useSimulatedChat = (initialMessages: string[] = [], interval = 4000) => {
  const [chatMessages, setChatMessages] = useState<string[]>(initialMessages);
  
  useEffect(() => {
    const sampleMessages = [
      "OMG that was insane! 🔥",
      "LMAO 😂 did you see that?",
      "POG CHAMP!",
      "no wayyy",
      "first time here, loving the stream!",
      "can we get some W's in the chat",
      "who else is watching from Europe?",
      "THIS IS EPIC",
      "that's cap fr fr",
      "sheeeesh 🥶",
      "vibes are immaculate ✨",
      "lowkey cracked at this game",
      "This soundtrack slaps so hard",
      "YESSIRRRR",
      "Let's gooooo!",
      "RIPBOZO 💀",
      "am I the only one lagging?",
      "gg",
      "that's fire 🔥",
      "based take",
    ];
    
    const timer = setInterval(() => {
      const randomMessage = sampleMessages[Math.floor(Math.random() * sampleMessages.length)];
      setChatMessages(prev => [...prev.slice(-20), randomMessage]);
    }, interval);
    
    return () => clearInterval(timer);
  }, [interval]);
  
  return { chatMessages, setChatMessages };
};

// Simulate stream progress automatically
const usePlaybackProgress = (isPlaying: boolean, duration: number = 600) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= duration) return 0;
        return prev + 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isPlaying, duration]);
  
  return { progress, setProgress };
};

const VideoPlayer = ({
  streamTitle,
  streamerName,
  streamerAvatar = "https://github.com/shadcn.png",
  thumbnailUrl,
  viewerCount,
  categories,
  isLive = true,
  language = "English",
  tags = [],
}: VideoPlayerProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [currentQuality, setCurrentQuality] = useState("auto");
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [chatCount, setChatCount] = useState(120);
  const [progress, setProgress] = useState(0);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 5000) + 1000);
  const [shareCount, setShareCount] = useState(Math.floor(Math.random() * 1000) + 100);
  
  const { chatMessages, setChatMessages } = useSimulatedChat([
    "Welcome to the stream!",
    "Let's go!!!",
    "Happy to be here"
  ]);
  
  const { progress: playbackProgress, setProgress: setPlaybackProgress } = usePlaybackProgress(isPlaying, 600);
  
  const videoRef = useRef<HTMLDivElement>(null);
  const controlsTimeout = useRef<NodeJS.Timeout | null>(null);
  
  // Define stream markers for important moments
  const streamMarkers: StreamMarker[] = [
    { position: 12, label: "First Victory", type: "highlight" },
    { position: 28, label: "Epic Play", type: "clip" },
    { position: 45, label: "Funny Moment", type: "custom", color: "#ff5500" }
  ];
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    showControlsTemporarily();
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
    showControlsTemporarily();
  };
  
  const toggleLike = () => {
    setIsLiked(prev => !prev);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    
    // Show floating heart reaction
    if (!isLiked && videoRef.current) {
      const rect = videoRef.current.getBoundingClientRect();
      const x = Math.random() * rect.width * 0.6 + rect.width * 0.2;
      const y = Math.random() * rect.height * 0.4 + rect.height * 0.3;
      
      setShowReactionEmoji({ emoji: "❤️", x, y });
      setTimeout(() => setShowReactionEmoji(null), 1500);
      
      // Add small glitch for effect
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }
  };
  
  const toggleFollow = () => {
    setIsFollowing(prev => !prev);
  };
  
  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    
    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };
  
  const showControlsTemporarily = () => {
    setIsHovering(true);
    
    if (controlsTimeout.current) {
      clearTimeout(controlsTimeout.current);
    }
    
    controlsTimeout.current = setTimeout(() => {
      if (isPlaying) {
        setIsHovering(false);
      }
    }, 3000);
  };
  
  useEffect(() => {
    const handleMouseMove = () => showControlsTemporarily();
    
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("fullscreenchange", handleFullscreenChange);
    }
    
    return () => {
      if (videoElement) {
        videoElement.removeEventListener("mousemove", handleMouseMove);
      }
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current);
      }
    };
  }, [isPlaying]);
  
  // Simulate chat count increasing
  useEffect(() => {
    const timer = setInterval(() => {
      setChatCount(prev => prev + Math.floor(Math.random() * 3));
    }, 8000);
    
    return () => clearInterval(timer);
  }, []);

  // Glitch effect interval
  const [glitchActive, setGlitchActive] = useState(false);
  
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 200);
      }
    }, 5000);
    
    return () => clearInterval(glitchInterval);
  }, []);
  
  return (
    <div className="relative w-full mb-4 video-player-container">
      {/* VHS tracking line effect */}
      <div className="absolute top-0 left-0 w-full h-1 bg-neon-blue opacity-70 z-10 tracking-line"></div>
      
      {/* Neo-brutalism container */}
      <motion.div 
        ref={videoRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "relative aspect-video rounded-lg overflow-hidden neo-brutalism",
          "border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
          "transition-all duration-200"
        )}
        onMouseMove={showControlsTemporarily}
        onMouseLeave={() => isPlaying && setIsHovering(false)}
      >
        {/* VHS effect container */}
        <div className={cn(
          "absolute inset-0 z-10 pointer-events-none vhs-effect",
          glitchActive && "glitch-active"
        )}>
          <div className="vhs-scanline"></div>
          <div className="vhs-noise"></div>
          {glitchActive && <div className="vhs-glitch"></div>}
        </div>
        
        {/* Video thumbnail/placeholder */}
        <div className="absolute inset-0 bg-black">
          <img 
            src={thumbnailUrl} 
            alt={streamTitle}
            className={cn(
              "w-full h-full object-cover transition-opacity",
              isPlaying ? "opacity-100" : "opacity-90"
            )}
          />
        </div>
        
        {/* Y2K Corner decorations */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-neon-pink rounded-tl-lg z-20"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-neon-blue rounded-tr-lg z-20"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-neon-green rounded-bl-lg z-20"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-neon-yellow rounded-br-lg z-20"></div>
        
        {/* Video overlay with indicators */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {isLive && (
            <motion.div 
              className="absolute top-4 left-4 flex items-center gap-2"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Badge 
                className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 flex items-center gap-1 font-bold video-controls-text-shadow"
                variant="default"
              >
                <span className="animate-pulse w-2 h-2 rounded-full bg-white"></span>
                LIVE
              </Badge>
              <Badge 
                className="bg-background/80 backdrop-blur-sm text-white px-2 flex items-center video-controls-text-shadow"
                variant="outline"
              >
                {language}
              </Badge>
              <Badge 
                className="bg-background/80 backdrop-blur-sm text-white px-2 video-controls-text-shadow"
                variant="outline"
              >
                {currentQuality}
              </Badge>
            </motion.div>
          )}
          
          <motion.div 
            className="absolute top-4 right-4 flex items-center gap-2"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Badge 
              className="bg-background/80 backdrop-blur-sm text-white px-2 py-1 flex items-center gap-1 video-controls-text-shadow"
              variant="outline"
            >
              <Activity className="w-3 h-3 text-neon-pink" />
              {viewerCount.toLocaleString()}
            </Badge>
          </motion.div>
        </div>
        
        {/* Big play button (when paused) */}
        <AnimatePresence>
          {!isPlaying && (
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="absolute inset-0 w-full h-full flex items-center justify-center z-30"
              onClick={togglePlay}
            >
              <div className="w-20 h-20 rounded-full bg-neon-pink border-4 border-black flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(255,0,255,0.5)]">
                <Play className="w-10 h-10 text-white" />
              </div>
            </motion.button>
          )}
        </AnimatePresence>
        
        {/* Video controls */}
        <AnimatePresence>
          {(isHovering || !isPlaying) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-0 left-0 right-0 z-30 pointer-events-auto"
            >
              <VideoControls
                isPlaying={isPlaying}
                isMuted={isMuted}
                progress={progress}
                volume={volume}
                quality={currentQuality}
                isHovering={isHovering}
                streamMarkers={streamMarkers}
                togglePlayback={togglePlay}
                toggleMute={toggleMute}
                setProgress={setProgress}
                setVolume={setVolume}
                setIsMuted={setIsMuted}
                toggleFullscreen={toggleFullscreen}
                setQuality={setCurrentQuality}
                isLive={isLive}
                thumbnailUrl={thumbnailUrl}
                streamTitle={streamTitle}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Video info */}
      <div className="mt-4">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col gap-2"
        >
          <h2 className="text-xl font-bold font-heading line-clamp-1">{streamTitle}</h2>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground video-info-text">
            <span className="font-semibold text-foreground">{streamerName}</span>
            <span className="flex items-center gap-1">
              <span className="text-neon-pink font-bold">{viewerCount.toLocaleString()}</span> viewers
            </span>
            <span>•</span>
            <span>{categories.join(", ")}</span>
            {tags.length > 0 && (
              <>
                <span>•</span>
                <div className="flex flex-wrap gap-1">
                  {tags.map((tag, i) => (
                    <Badge 
                      key={i} 
                      variant="outline" 
                      className="text-xs py-0 px-1 border-neon-blue bg-black/20 text-neon-blue"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </>
            )}
          </div>
          
          <div className="flex items-center gap-3 mt-1">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleFollow}
              className={cn(
                "px-4 py-1.5 rounded font-medium text-sm neo-brutalism border-2",
                isFollowing
                  ? "bg-neon-pink text-white hover:bg-neon-pink/90 border-black"
                  : "bg-white text-black hover:bg-gray-100 border-black neo-brutalism-button"
              )}
            >
              {isFollowing ? "Following" : "Follow"}
            </motion.button>
            
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleLike}
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground video-info-text"
            >
              <Heart className={cn(
                "w-4 h-4 transition-colors like-button-icon",
                isLiked && "fill-red-500 text-red-500"
              )} />
              <span>{likeCount.toLocaleString()}</span>
            </motion.button>
            
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground video-info-text"
            >
              <Bell className="w-4 h-4" />
              <span>{shareCount.toLocaleString()}</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VideoPlayer;
