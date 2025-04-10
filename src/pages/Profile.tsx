import { useState, useEffect } from "react";
import { Eye, Calendar, Users, Share2, Zap, Trophy, Star, ExternalLink, Music, Heart, AtSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatViewCount, mockStreamers, mockPastStreams } from "@/data/mock-data";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [activeTab, setActiveTab] = useState("streams");
  const { toast } = useToast();
  
  // Using first streamer from mock data
  const streamer = mockStreamers[0];
  const pastStreams = mockPastStreams;
  
  // Trigger random glitch effects for Y2K aesthetic
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitchEffect(true);
        setTimeout(() => setGlitchEffect(false), 300);
      }
    }, 5000);
    
    return () => clearInterval(glitchInterval);
  }, []);
  
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
    <div className="container py-6 relative">
      {/* Decorative background elements */}
      <div className="absolute top-12 right-12 w-32 h-32 rounded-full bg-neon-blue/20 blur-3xl -z-10"></div>
      <div className="absolute bottom-24 left-12 w-40 h-40 rounded-full bg-neon-pink/20 blur-3xl -z-10"></div>
      
      <div 
        className={cn(
          "flex flex-col items-center justify-center mb-8 relative",
          glitchEffect && "animate-glitch"
        )}
      >
        {/* Enhanced profile banner with Y2K elements */}
        <div className="w-full h-40 sm:h-56 rounded-lg bg-cyber-gradient relative mb-20 neo-brutalism overflow-hidden">
          {/* VHS scan lines effect */}
          <div className="absolute inset-0 bg-scan-lines opacity-30 mix-blend-overlay"></div>
          
          {/* Decorative elements */}
          <div className="absolute top-4 right-4 text-white/80 font-mono text-sm flex items-center">
            <span className="animate-text-rainbow mr-2">ONLINE</span>
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
          </div>
          
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <Badge variant="outline" className="bg-black/40 backdrop-blur-sm border-neon-green text-neon-green">
              Level 42
            </Badge>
            <Badge variant="outline" className="bg-black/40 backdrop-blur-sm border-neon-yellow text-neon-yellow flex gap-1 items-center">
              <Trophy className="h-3 w-3" />
              <span>PRO</span>
            </Badge>
          </div>
          
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 z-10">
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-black bg-black shadow-[5px_5px_0px_0px_rgba(0,0,0,0.8)]">
                <AvatarImage 
                  src={streamer.avatarUrl} 
                  alt={streamer.displayName}
                  className="object-cover w-full h-full"
                />
                <AvatarFallback className="bg-neon-pink text-2xl font-bold">
                  {streamer.displayName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              {/* Decorative corner elements */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-neon-blue"></div>
              <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-neon-pink"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-neon-green"></div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-neon-yellow"></div>
              
              {/* Live indicator for streamers */}
              {Math.random() > 0.5 && (
                <div className="absolute -top-2 -right-2 bg-black py-1 px-2 rounded-full border-2 border-neon-pink text-white text-xs font-bold flex items-center gap-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]">
                  <div className="h-2 w-2 rounded-full bg-neon-pink animate-pulse"></div>
                  <span>LIVE</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <h1 className={cn(
          "text-3xl sm:text-4xl font-bold mb-1",
          "text-gradient-pink-blue"
        )}>
          {streamer.displayName}
        </h1>
        
        <p className="text-muted-foreground mb-2 flex items-center gap-1">
          <AtSign className="h-4 w-4 text-neon-blue" />
          <span className="font-mono">{streamer.username}</span>
        </p>
        
        <div className="flex items-center flex-wrap gap-3 mb-4 justify-center">
          <div className="flex items-center gap-1 bg-black/10 backdrop-blur-sm px-3 py-1 rounded-full">
            <Users className="h-4 w-4 text-neon-pink" />
            <span className="text-sm font-mono">{formatViewCount(streamer.followers)} followers</span>
          </div>
          
          <Badge variant="outline" className="bg-black/10 backdrop-blur-sm border-neon-blue text-neon-blue font-bold">
            Partner
          </Badge>
          
          {streamer.categories.map((category, idx) => (
            <Badge 
              key={idx} 
              variant="secondary" 
              className="bg-black/10 backdrop-blur-sm border-2 border-neon-green text-neon-green font-bold"
            >
              {category}
            </Badge>
          ))}
        </div>
        
        <div className="max-w-2xl text-center mb-6 p-4 bg-black/5 backdrop-blur-sm rounded-lg border-2 border-black neo-brutalism">
          <p>{streamer.bio}</p>
        </div>
        
        <div className="flex gap-3">
          <Button 
            className={cn(
              "min-w-[120px] font-bold border-4 border-black",
              isFollowing 
                ? "bg-neon-pink hover:bg-neon-pink/80 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]" 
                : "bg-transparent text-neon-pink border-neon-pink hover:bg-neon-pink/10 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]",
                "transition-all hover:translate-y-1 hover:translate-x-1 hover:shadow-none"
            )}
            variant={isFollowing ? "default" : "outline"}
            onClick={handleFollow}
          >
            <span className="mr-2">{isFollowing ? "Following" : "Follow"}</span>
            <Heart className={cn(
              "h-4 w-4",
              isFollowing && "fill-current animate-heartbeat"
            )} />
          </Button>
          
          <Button 
            variant="outline" 
            className="bg-transparent border-4 border-neon-green text-neon-green hover:bg-neon-green/10 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] transition-all hover:translate-y-1 hover:translate-x-1 hover:shadow-none"
            onClick={handleGoLive}
          >
            <Zap className="h-4 w-4 mr-2" />
            Go Live
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            className="border-4 border-black bg-neon-blue text-black hover:bg-neon-blue/80 rounded-full h-10 w-10 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] transition-all hover:translate-y-1 hover:translate-x-1 hover:shadow-none"
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <Tabs 
        defaultValue="streams" 
        className="max-w-4xl mx-auto"
        onValueChange={setActiveTab}
      >
        <div className="flex justify-center mb-6">
          <TabsList className="border-4 border-black p-1 bg-white dark:bg-black">
            <TabsTrigger 
              value="streams"
              className={cn(
                "data-[state=active]:bg-neon-pink data-[state=active]:text-black font-bold",
                "transition-all duration-300"
              )}
            >
              Past Streams
            </TabsTrigger>
            <TabsTrigger 
              value="about"
              className={cn(
                "data-[state=active]:bg-neon-blue data-[state=active]:text-black font-bold",
                "transition-all duration-300"
              )}
            >
              About
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent 
          value="streams" 
          className={cn(
            "space-y-6",
            "animate-fade-in"
          )}
        >
          {pastStreams.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pastStreams.map((stream, index) => (
                <div 
                  key={stream.id}
                  className="border-4 border-black relative overflow-hidden bg-white dark:bg-black neo-brutalism card-3d-effect"
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                  onMouseEnter={() => setHoveredCardId(stream.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={stream.thumbnailUrl}
                      alt={stream.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      onError={(e) => {
                        // Fallback for broken image links
                        const target = e.target as HTMLImageElement;
                        target.onerror = null; // Prevent infinite loop
                        target.src = 'https://images.unsplash.com/photo-1633988354540-d3717188169e?q=80&w=800&auto=format&fit=crop'; // Fallback image
                      }}
                      loading="lazy" // Optimize loading performance
                    />
                    
                    {/* Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-60"></div>
                    <div className="absolute inset-0 bg-scan-lines opacity-30 mix-blend-overlay pointer-events-none"></div>
                    
                    {/* Category Badge - Top Left */}
                    <div className="absolute top-2 left-2 z-10">
                      <div className="bg-black/80 backdrop-blur-sm text-neon-yellow text-xs px-2 py-1 rounded border-2 border-neon-yellow font-mono">
                        {streamer.categories[index % streamer.categories.length]}
                      </div>
                    </div>
                    
                    {/* Duration Badge - Bottom Right */}
                    <div className="absolute bottom-2 right-2 z-10">
                      <div className="bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded border-2 border-neon-green font-mono">
                        {stream.duration}
                      </div>
                    </div>
                    
                    {/* Trending Badge - Top Right (only for some) */}
                    {index % 3 === 0 && (
                      <div className="absolute top-2 right-2 z-10">
                        <div className="bg-black/80 backdrop-blur-sm text-neon-pink text-xs px-2 py-1 rounded border-2 border-neon-pink font-mono flex items-center gap-1">
                          <div className="h-2 w-2 bg-neon-pink rounded-full"></div>
                          <span>Trending</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-3 space-y-2">
                    <h3 className="font-bold text-sm line-clamp-2 hover:text-gradient-pink-blue transition-colors">{stream.title}</h3>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1 bg-black/10 px-2 py-1 rounded-full">
                        <Eye className="h-3 w-3 text-neon-pink" />
                        <span className="font-mono">{formatViewCount(stream.viewCount)}</span>
                      </div>
                      
                      <div className="flex items-center gap-1 bg-black/10 px-2 py-1 rounded-full">
                        <Calendar className="h-3 w-3 text-neon-blue" />
                        <span className="font-mono">{formatDate(stream.streamedAt)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative corner elements that show on hover */}
                  <div className={cn(
                    "absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-neon-pink -translate-x-1 -translate-y-1 opacity-0 transition-all duration-300",
                    hoveredCardId === stream.id && "opacity-100 translate-x-0 translate-y-0 animate-slide-in-tl"
                  )}></div>
                  <div className={cn(
                    "absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-neon-blue translate-x-1 -translate-y-1 opacity-0 transition-all duration-300",
                    hoveredCardId === stream.id && "opacity-100 translate-x-0 translate-y-0 animate-slide-in-tr"
                  )}></div>
                  <div className={cn(
                    "absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-neon-yellow -translate-x-1 translate-y-1 opacity-0 transition-all duration-300",
                    hoveredCardId === stream.id && "opacity-100 translate-x-0 translate-y-0 animate-slide-in-bl"
                  )}></div>
                  <div className={cn(
                    "absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-neon-green translate-x-1 translate-y-1 opacity-0 transition-all duration-300",
                    hoveredCardId === stream.id && "opacity-100 translate-x-0 translate-y-0 animate-slide-in-br"
                  )}></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border-4 border-black neo-brutalism">
              <h3 className="text-lg font-bold mb-2">No past streams yet</h3>
              <p className="text-muted-foreground mb-4">
                This channel hasn't streamed recently
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent 
          value="about"
          className={cn(
            "animate-fade-in"
          )}
        >
          <div className="border-4 border-black neo-brutalism p-6 bg-white dark:bg-black">
            <h3 className="text-xl font-bold mb-4 text-gradient-blue-green">About {streamer.displayName}</h3>
            <p className="mb-6">{streamer.bio}</p>
            
            <div className="space-y-8">
              <div className="p-4 border-2 border-black bg-black/5 rounded-lg neo-brutalism">
                <h4 className="font-bold text-sm text-neon-pink mb-2 flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Joined
                </h4>
                <p className="font-mono">January 2018</p>
              </div>
              
              <div className="p-4 border-2 border-black bg-black/5 rounded-lg neo-brutalism">
                <h4 className="font-bold text-sm text-neon-green mb-2 flex items-center">
                  <Star className="h-4 w-4 mr-2" />
                  Categories
                </h4>
                <div className="flex flex-wrap gap-2">
                  {streamer.categories.map((category, idx) => (
                    <Badge 
                      key={idx} 
                      variant="outline"
                      className="border-2 border-neon-blue text-neon-blue bg-black/20 hover:bg-black/30 transition-colors font-bold"
                    >
                      {category === "Gaming" && <Zap className="h-3.5 w-3.5 mr-1" />}
                      {category === "FPS" && <Zap className="h-3.5 w-3.5 mr-1" />}
                      {category === "Music" && <Music className="h-3.5 w-3.5 mr-1" />}
                      {category === "Battle Royale" && <Trophy className="h-3.5 w-3.5 mr-1" />}
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="p-4 border-2 border-black bg-black/5 rounded-lg neo-brutalism">
                <h4 className="font-bold text-sm text-neon-yellow mb-2 flex items-center">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Social Links
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="border-2 border-neon-pink text-neon-pink font-bold hover:bg-neon-pink/10"
                  >
                    Twitter
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="border-2 border-neon-blue text-neon-blue font-bold hover:bg-neon-blue/10"
                  >
                    Instagram
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="border-2 border-neon-green text-neon-green font-bold hover:bg-neon-green/10"
                  >
                    YouTube
                  </Button>
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
