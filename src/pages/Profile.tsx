
import { useState } from "react";
import { Eye, Calendar, Users, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatViewCount, mockStreamers, mockPastStreams } from "@/data/mock-data";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const { toast } = useToast();
  
  // Using first streamer from mock data
  const streamer = mockStreamers[0];
  const pastStreams = mockPastStreams;
  
  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast({
      title: !isFollowing ? "Following Ninja" : "Unfollowed Ninja",
      description: !isFollowing ? "You'll be notified when they go live" : "You'll no longer receive notifications",
    });
  };

  const handleGoLive = () => {
    toast({
      title: "Stream starting...",
      description: "Your stream is being prepared. You'll be live in a moment!",
    });
  };
  
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="container py-6">
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="w-full h-40 sm:h-56 rounded-lg bg-gradient-to-r from-twitch-600 to-twitch-400 relative mb-16">
          <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-12">
            <Avatar className="h-24 w-24 border-4 border-background">
              <AvatarImage src={streamer.avatarUrl} alt={streamer.displayName} />
              <AvatarFallback className="bg-twitch-500 text-2xl">
                {streamer.displayName.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
        
        <h1 className="text-2xl sm:text-3xl font-bold mb-1">{streamer.displayName}</h1>
        <p className="text-muted-foreground mb-2">@{streamer.username}</p>
        
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span className="text-sm">{formatViewCount(streamer.followers)} followers</span>
          </div>
          <Badge variant="outline" className="text-xs">
            Partner
          </Badge>
          {streamer.categories.map((category, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs">
              {category}
            </Badge>
          ))}
        </div>
        
        <div className="max-w-2xl text-center mb-6">
          <p>{streamer.bio}</p>
        </div>
        
        <div className="flex gap-3">
          <Button 
            className={cn(
              "min-w-[120px]",
              isFollowing 
                ? "bg-twitch-500 hover:bg-twitch-600" 
                : "bg-transparent text-twitch-500 border-twitch-500 hover:bg-twitch-500/10"
            )}
            variant={isFollowing ? "default" : "outline"}
            onClick={handleFollow}
          >
            {isFollowing ? "Following" : "Follow"}
          </Button>
          
          <Button 
            variant="outline" 
            className="bg-transparent border-neon-orange text-neon-orange hover:bg-neon-orange/10"
            onClick={handleGoLive}
          >
            Go Live
          </Button>
          
          <Button variant="ghost" size="icon">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="streams" className="max-w-4xl mx-auto">
        <div className="flex justify-center mb-6">
          <TabsList>
            <TabsTrigger value="streams">Past Streams</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="streams" className="space-y-6">
          {pastStreams.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pastStreams.map((stream) => (
                <div 
                  key={stream.id}
                  className="border rounded-lg overflow-hidden group hover:border-twitch-500 transition-colors"
                >
                  <div className="relative aspect-video">
                    <img
                      src={stream.thumbnailUrl}
                      alt={stream.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {stream.duration}
                    </div>
                  </div>
                  
                  <div className="p-3 space-y-2">
                    <h3 className="font-medium text-sm line-clamp-2">{stream.title}</h3>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>{formatViewCount(stream.viewCount)}</span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(stream.streamedAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg">
              <h3 className="text-lg font-medium mb-2">No past streams yet</h3>
              <p className="text-muted-foreground mb-4">
                This channel hasn't streamed recently
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="about">
          <div className="bg-card border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">About {streamer.displayName}</h3>
            <p className="mb-6">{streamer.bio}</p>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-1">Joined</h4>
                <p>January 2018</p>
              </div>
              
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-1">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {streamer.categories.map((category, idx) => (
                    <Badge key={idx} variant="outline">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-1">Social Links</h4>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">Twitter</Button>
                  <Button variant="ghost" size="sm">Instagram</Button>
                  <Button variant="ghost" size="sm">YouTube</Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
