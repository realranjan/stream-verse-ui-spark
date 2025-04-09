
import { ChevronDown, ChevronUp, Heart, Share2, ExternalLink, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { formatViewCount } from "@/data/mock-data";

interface StreamInfoProps {
  streamTitle: string;
  streamerName: string;
  streamerAvatar?: string;
  viewerCount: number;
  categories: string[];
  isLive: boolean;
  isLiked: boolean;
  isFollowing: boolean;
  showDetails: boolean;
  likeCount: number;
  shareCount: number;
  language: string;
  tags?: string[];
  toggleLike: () => void;
  toggleFollow: () => void;
  setShowDetails: (show: boolean) => void;
  setShareCount: (callback: (prev: number) => number) => void;
}

const StreamInfo = ({
  streamTitle,
  streamerName,
  streamerAvatar,
  viewerCount,
  categories,
  isLive,
  isLiked,
  isFollowing,
  showDetails,
  likeCount,
  shareCount,
  language,
  tags = [],
  toggleLike,
  toggleFollow,
  setShowDetails,
  setShareCount,
}: StreamInfoProps) => {
  return (
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
  );
};

export default StreamInfo;
