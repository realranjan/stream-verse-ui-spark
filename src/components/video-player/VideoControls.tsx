import { useState, useRef } from "react";
import { 
  Play, Pause, Volume2, VolumeX, Settings, SkipForward, 
  Maximize2, ChevronRight, MessageSquare, Scissors, 
  Check, FastForward, Rewind, Sparkles, Zap, Download,
  Music, Star, Smile, Crown, Flame, Rocket, Dices
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { StreamMarker } from "./types";
import { motion, AnimatePresence } from "framer-motion";

interface VideoControlsProps {
  isPlaying: boolean;
  isMuted: boolean;
  progress: number;
  volume: number;
  quality: string;
  isHovering: boolean;
  streamMarkers: StreamMarker[];
  thumbnailUrl: string;
  streamTitle: string;
  togglePlayback: () => void;
  toggleMute: () => void;
  setProgress: (progress: number) => void;
  setVolume: (volume: number) => void;
  setIsMuted: (isMuted: boolean) => void;
  toggleFullscreen: () => void;
  setQuality: (quality: string) => void;
  isLive?: boolean;
}

const VideoControls = ({
  isPlaying,
  isMuted,
  progress,
  volume,
  quality,
  isHovering,
  streamMarkers,
  togglePlayback,
  toggleMute,
  setProgress,
  setVolume,
  setIsMuted,
  toggleFullscreen,
  setQuality,
  isLive = false,
  thumbnailUrl = "",
  streamTitle = "",
}: VideoControlsProps) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isEmotePanelOpen, setIsEmotePanelOpen] = useState(false);
  const [isClipCreatorOpen, setIsClipCreatorOpen] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [hoverProgress, setHoverProgress] = useState<number | null>(null);
  const [hoverPosition, setHoverPosition] = useState(0);
  const [activePlaybackSpeed, setActivePlaybackSpeed] = useState(1);
  const [isVolumeExpanded, setIsVolumeExpanded] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);
  
  // Emote panel data
  const emotes = [
    { name: "pog", url: "https://placehold.co/32x32/f0f/f0f/png" },
    { name: "kekw", url: "https://placehold.co/32x32/0ff/0ff/png" },
    { name: "gg", url: "https://placehold.co/32x32/ff0/ff0/png" },
    { name: "ez", url: "https://placehold.co/32x32/f00/f00/png" },
    { name: "uwu", url: "https://placehold.co/32x32/0f0/0f0/png" },
    { name: "pika", url: "https://placehold.co/32x32/00f/00f/png" },
  ];
  
  // New state for gen Z features
  const [activeEffectMode, setActiveEffectMode] = useState<string | null>(null);
  const [showEffectsPanel, setShowEffectsPanel] = useState(false);
  
  const handleProgressBarInteraction = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const percentage = (e.clientX - rect.left) / rect.width;
    const newProgressValue = Math.max(0, Math.min(600, percentage * 600));
    
    if (e.type === "click") {
      setProgress(newProgressValue);
    } else if (e.type === "mousemove") {
      setHoverProgress(newProgressValue);
      setHoverPosition(e.clientX - rect.left);
    }
  };
  
  const handleProgressBarHover = (e: React.MouseEvent<HTMLDivElement>) => {
    handleProgressBarInteraction(e);
  };
  
  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    handleProgressBarInteraction(e);
  };
  
  const handleProgressBarLeave = () => {
    setHoverProgress(null);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" + secs : secs}`;
  };
  
  // Effects panel data
  const effectsModes = [
    { name: "vaporwave", icon: <Star className="h-4 w-4" />, color: "text-neon-pink" },
    { name: "glitch", icon: <Zap className="h-4 w-4" />, color: "text-neon-blue" },
    { name: "aesthetic", icon: <Sparkles className="h-4 w-4" />, color: "text-neon-green" },
    { name: "retro", icon: <Dices className="h-4 w-4" />, color: "text-neon-yellow" },
    { name: "vibe", icon: <Music className="h-4 w-4" />, color: "text-purple-400" },
    { name: "hype", icon: <Flame className="h-4 w-4" />, color: "text-orange-400" },
  ];
  
  return (
    <div className="p-2 bg-gradient-to-t from-black/90 via-black/70 to-transparent backdrop-blur-sm neo-brutalism-bottom">
      {/* Progress bar */}
      <div 
        ref={progressBarRef}
        className="relative h-4 group cursor-pointer mb-2 px-1"
        onClick={handleProgressBarClick}
        onMouseMove={handleProgressBarHover}
        onMouseLeave={handleProgressBarLeave}
      >
        {/* Thumbnail preview on hover */}
        <AnimatePresence>
          {hoverProgress !== null && thumbnailUrl && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: -80 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.15 }}
              className="absolute w-40 pointer-events-none border-4 border-black neo-brutalism overflow-hidden"
              style={{ 
                bottom: "100%", 
                left: `${hoverPosition - 80}px`,
                backgroundImage: `url(${thumbnailUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                aspectRatio: "16/9" 
              }}
            >
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 truncate">
                {formatTime(hoverProgress)} - {streamTitle}
              </div>
              
              {/* VHS scanline effect */}
              <div className="absolute inset-0 pointer-events-none opacity-20 vhs-scanline"></div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Track background */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded h-1.5 mt-1.5 overflow-hidden border-2 border-white/20 group-hover:border-neon-pink transition-colors">
          {/* Stream markers */}
          {streamMarkers.map((marker, idx) => (
            <div 
              key={idx}
              className={cn(
                "absolute top-0 bottom-0 w-1 cursor-pointer",
                marker.type === "highlight" ? "bg-neon-yellow" :
                marker.type === "clip" ? "bg-neon-blue" :
                marker.color || "bg-neon-pink"
              )}
              style={{ left: `${(marker.position / 600) * 100}%` }}
              title={marker.label}
            >
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 px-1 rounded-sm">
                {marker.label}
              </div>
            </div>
          ))}
          
          {/* Buffered progress */}
          <div 
            className="absolute h-full bg-white/20"
            style={{ width: `${Math.min(100, (progress / 600 * 100) + 15)}%` }}
          />
          
          {/* Actual progress */}
          <div 
            className="absolute h-full bg-gradient-to-r from-neon-pink via-purple-500 to-neon-blue"
            style={{ width: `${(progress / 600) * 100}%` }}
          >
            {/* Pulsing effect on live edge */}
            {isLive && progress > 590 && (
              <div className="absolute right-0 top-0 bottom-0 w-4 animate-pulse bg-gradient-to-r from-transparent to-neon-green" />
            )}
          </div>
        </div>
        
        {/* Thumb */}
        <div 
          className={cn(
            "absolute h-4 w-4 rounded-full bg-white border-2 border-black transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity shadow-neon-glow",
            isSeeking && "opacity-100 scale-125"
          )}
          style={{ 
            left: `${(progress / 600) * 100}%`,
            top: "50%" 
          }}
        />
      </div>
      
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          {/* Play/pause */}
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="h-8 w-8 rounded-md text-white hover:bg-white/20 transition-colors focus-visible:ring-0 neo-brutalism-sm"
                  onClick={togglePlayback}
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4 ml-0.5" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="neo-brutalism border-2 border-black">
                {isPlaying ? "Pause" : "Play"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          {/* Rewind & Fast-forward */}
          <div className="flex items-center gap-1">
            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-7 w-7 rounded-md text-white hover:bg-white/20 transition-colors focus-visible:ring-0"
                    onClick={() => setProgress(Math.max(0, progress - 10))}
                  >
                    <Rewind className="h-3.5 w-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" className="neo-brutalism border-2 border-black">
                  -10s
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-7 w-7 rounded-md text-white hover:bg-white/20 transition-colors focus-visible:ring-0"
                    onClick={() => setProgress(Math.min(600, progress + 10))}
                  >
                    <FastForward className="h-3.5 w-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" className="neo-brutalism border-2 border-black">
                  +10s
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          {/* Time display */}
          <div className="text-xs font-bold font-mono bg-black/30 px-2 py-0.5 rounded-full border border-white/20">
            {formatTime(progress)} / {formatTime(600)}
          </div>

          {/* Volume */}
          <div 
            className="flex items-center"
            onMouseEnter={() => setIsVolumeExpanded(true)}
            onMouseLeave={() => setIsVolumeExpanded(false)}
          >
            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-7 w-7 rounded-md text-white hover:bg-white/20 transition-colors focus-visible:ring-0"
                    onClick={toggleMute}
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="h-3.5 w-3.5" />
                    ) : (
                      <Volume2 className="h-3.5 w-3.5" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" className="neo-brutalism border-2 border-black">
                  {isMuted ? "Unmute" : "Mute"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <AnimatePresence>
              {isVolumeExpanded && (
                <motion.div 
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 80, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="overflow-hidden ml-1"
                >
                  <Slider
                    value={[isMuted ? 0 : volume]}
                    min={0}
                    max={100}
                    step={1}
                    className="w-24 cursor-pointer volume-slider y2k-slider"
                    onValueChange={(value) => {
                      setVolume(value[0]);
                      if (value[0] > 0 && isMuted) {
                        setIsMuted(false);
                      }
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Effects Panel Button */}
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className={cn(
                    "h-7 w-7 rounded-md text-white hover:bg-white/20 transition-colors focus-visible:ring-0",
                    activeEffectMode && "bg-white/20 border border-neon-pink"
                  )}
                  onClick={() => setShowEffectsPanel(!showEffectsPanel)}
                >
                  <Sparkles className="h-3.5 w-3.5 text-neon-pink" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="neo-brutalism border-2 border-black">
                Video Effects
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          {/* Effects Panel */}
          <AnimatePresence>
            {showEffectsPanel && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                className="absolute right-24 bottom-full mb-2 bg-black/80 backdrop-blur-md rounded-lg p-2 neo-brutalism border-4 border-black"
              >
                <div className="flex gap-2 items-center">
                  {effectsModes.map((effect) => (
                    <button
                      key={effect.name}
                      className={cn(
                        "flex flex-col items-center p-1 rounded-lg transition-colors",
                        activeEffectMode === effect.name 
                          ? "bg-white/20 neo-brutalism-sm border-2 border-black" 
                          : "hover:bg-white/10"
                      )}
                      onClick={() => {
                        setActiveEffectMode(activeEffectMode === effect.name ? null : effect.name);
                        setShowEffectsPanel(false);
                      }}
                    >
                      <div className={cn(
                        "p-1 rounded-full bg-black/50",
                        effect.color
                      )}>
                        {effect.icon}
                      </div>
                      <span className="text-white text-xs mt-1 font-bold">
                        {effect.name}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Emote panel button */}
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className={cn(
                    "h-7 w-7 rounded-md text-white hover:bg-white/20 transition-colors focus-visible:ring-0",
                    isEmotePanelOpen && "bg-white/20"
                  )}
                  onClick={() => setIsEmotePanelOpen(!isEmotePanelOpen)}
                >
                  <Smile className="h-3.5 w-3.5 text-neon-yellow" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="neo-brutalism border-2 border-black">
                Emotes
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          {/* Create clip button */}
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className={cn(
                    "h-7 w-7 rounded-md text-white hover:bg-white/20 transition-colors focus-visible:ring-0",
                    isClipCreatorOpen && "bg-white/20"
                  )}
                  onClick={() => setIsClipCreatorOpen(!isClipCreatorOpen)}
                >
                  <Scissors className="h-3.5 w-3.5 text-neon-blue" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="neo-brutalism border-2 border-black">
                Clip
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          {/* Messages */}
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="h-7 w-7 rounded-md text-white hover:bg-white/20 transition-colors focus-visible:ring-0"
                >
                  <MessageSquare className="h-3.5 w-3.5 text-neon-green" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="neo-brutalism border-2 border-black">
                Chat
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          {/* Quality */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-7 w-7 rounded-md text-white hover:bg-white/20 transition-colors focus-visible:ring-0"
              >
                <Settings className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 neo-brutalism border-4 border-black">
              <div className="flex justify-between items-center px-2 py-1.5 text-xs font-bold">
                <span>QUALITY</span>
                <span className="px-1.5 py-0.5 bg-neon-pink text-white rounded text-xs">{quality}</span>
              </div>
              
              {["1080p", "720p", "480p", "360p", "auto"].map((q) => (
                <DropdownMenuItem 
                  key={q} 
                  className={cn(
                    "flex justify-between items-center cursor-pointer",
                    quality === q && "bg-black/20 font-bold"
                  )}
                  onClick={() => setQuality(q)}
                >
                  {q}
                  {quality === q && <Check className="h-4 w-4" />}
                </DropdownMenuItem>
              ))}
              
              <DropdownMenuSeparator />
              
              <div className="flex justify-between items-center px-2 py-1.5 text-xs font-bold">
                <span>PLAYBACK SPEED</span>
                <span className="px-1.5 py-0.5 bg-neon-blue text-white rounded text-xs">{activePlaybackSpeed}x</span>
              </div>
              
              {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                <DropdownMenuItem 
                  key={speed} 
                  className={cn(
                    "flex justify-between items-center cursor-pointer",
                    activePlaybackSpeed === speed && "bg-black/20 font-bold"
                  )}
                  onClick={() => setActivePlaybackSpeed(speed)}
                >
                  {speed}x
                  {activePlaybackSpeed === speed && <Check className="h-4 w-4" />}
                </DropdownMenuItem>
              ))}
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem className="cursor-pointer">
                <Download className="h-4 w-4 mr-2" /> 
                <span>Download</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Fullscreen */}
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="h-7 w-7 rounded-md text-white hover:bg-white/20 transition-colors focus-visible:ring-0"
                  onClick={toggleFullscreen}
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="neo-brutalism border-2 border-black">
                Fullscreen
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      {/* Emote panel */}
      <AnimatePresence>
        {isEmotePanelOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 bg-black/80 backdrop-blur-md p-2 rounded-lg neo-brutalism border-4 border-black"
          >
            <div className="flex flex-wrap gap-2 max-w-md justify-center">
              {emotes.map((emote) => (
                <button 
                  key={emote.name}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <img src={emote.url} alt={emote.name} className="w-8 h-8" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Clip creator */}
      <AnimatePresence>
        {isClipCreatorOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 bg-black/80 backdrop-blur-md p-3 rounded-lg neo-brutalism border-4 border-black"
          >
            <div className="text-center mb-2">
              <h3 className="text-white font-bold text-sm">Create a Clip</h3>
              <p className="text-white/70 text-xs">Capture the last 30 seconds</p>
            </div>
            
            <div className="flex justify-center gap-2">
              <Button size="sm" variant="outline" className="text-xs neo-brutalism-sm hover:bg-white/20">
                Cancel
              </Button>
              <Button size="sm" className="text-xs bg-neon-pink text-white hover:bg-neon-pink/90 neo-brutalism-sm">
                Create Clip
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoControls;
