
import { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, MinusCircle, PlusCircle, PictureInPicture } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { StreamMarker } from "./types";
import QualitySelector from "./QualitySelector";
import ClipCreator from "./ClipCreator";
import EmotePanel from "./EmotePanel";
import PictureInPicture from "./PictureInPicture";

interface VideoControlsProps {
  isPlaying: boolean;
  isMuted: boolean;
  progress: number;
  volume: number;
  quality: string;
  isHovering: boolean;
  streamMarkers: StreamMarker[];
  togglePlayback: () => void;
  toggleMute: () => void;
  setProgress: (value: number) => void;
  setVolume: (value: number) => void;
  setIsMuted: (value: boolean) => void;
  toggleFullscreen: () => void;
  setQuality: (quality: string) => void;
  isLive?: boolean;
  thumbnailUrl: string;
  streamTitle: string;
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
  isLive = true,
  thumbnailUrl,
  streamTitle,
}: VideoControlsProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const handleEmoteSelect = (emote) => {
    console.log("Emote selected:", emote);
    // In a real app, you would send this to a WebSocket or similar
  };

  const adjustPlaybackSpeed = (delta: number) => {
    const newSpeed = Math.max(0.25, Math.min(2, playbackSpeed + delta));
    setPlaybackSpeed(newSpeed);
    
    // In a real app, you would apply this to the video element
    if (videoRef.current) {
      videoRef.current.playbackRate = newSpeed;
    }
  };

  return (
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
                  className={cn(
                    "absolute h-3 w-1 rounded-none cursor-pointer top-0 transform -translate-y-1/2 hover:h-4 transition-all",
                    marker.type === 'highlight' ? "bg-primary" :
                    marker.type === 'clip' ? "bg-neon-orange" :
                    "bg-primary"
                  )}
                  style={{ 
                    left: `${marker.position}%`,
                    backgroundColor: marker.color
                  }}
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
        
        {/* New Playback Speed Controls - only for VODs */}
        {!isLive && (
          <div className="hidden md:flex items-center mr-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-white hover:bg-white/10 rounded-sm"
                    onClick={() => adjustPlaybackSpeed(-0.25)}
                  >
                    <MinusCircle className="h-3.5 w-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>Slow down</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <span className="text-xs bg-white/10 px-2 py-0.5 rounded mx-1">
              {playbackSpeed}x
            </span>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-white hover:bg-white/10 rounded-sm"
                    onClick={() => adjustPlaybackSpeed(0.25)}
                  >
                    <PlusCircle className="h-3.5 w-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>Speed up</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
        
        <div className="flex items-center gap-1">
          {/* Emote Panel */}
          <EmotePanel onEmoteSelect={handleEmoteSelect} />
          
          {/* Clip Creator */}
          <ClipCreator
            progress={progress}
            duration={600} // 10 minutes in seconds
            isLive={isLive}
            thumbnailUrl={thumbnailUrl}
            streamTitle={streamTitle}
          />
          
          <PictureInPicture 
            videoRef={videoRef}
            fallbackRef={containerRef}
          />
          
          {/* Quality Selector */}
          <QualitySelector 
            currentQuality={quality} 
            setQuality={setQuality} 
          />
          
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
  );
};

export default VideoControls;
