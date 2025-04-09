
import { MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatViewCount } from "@/data/mock-data";

interface StreamBadgesProps {
  isLive: boolean;
  isPlaying: boolean;
  viewerCount: number;
  chatCount: number;
  language: string;
  quality: string;
}

const StreamBadges = ({ 
  isLive, 
  isPlaying, 
  viewerCount, 
  chatCount,
  language,
  quality 
}: StreamBadgesProps) => {
  return (
    <>
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
    </>
  );
};

export default StreamBadges;
