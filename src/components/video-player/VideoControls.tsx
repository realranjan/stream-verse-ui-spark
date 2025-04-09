
import { useState } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface VideoControlsProps {
  isPlaying: boolean;
  isMuted: boolean;
  progress: number;
  volume: number;
  quality: string;
  isHovering: boolean;
  streamMarkers: { position: number; label: string }[];
  togglePlayback: () => void;
  toggleMute: () => void;
  setProgress: (value: number) => void;
  setVolume: (value: number) => void;
  setIsMuted: (value: boolean) => void;
  toggleFullscreen: () => void;
  setQuality: (quality: string) => void;
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
}: VideoControlsProps) => {
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
  );
};

export default VideoControls;
