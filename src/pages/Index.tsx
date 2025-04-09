
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import VideoPlayer from "@/components/VideoPlayer";
import LiveChat from "@/components/LiveChat";
import StreamerCard from "@/components/StreamerCard";
import { getFeaturedStream, getStreamerById, mockStreams, mockStreamers } from "@/data/mock-data";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronRight, Star, Zap, Flame } from "lucide-react";

const Index = () => {
  const isMobile = useIsMobile();
  const [featuredStream, setFeaturedStream] = useState(getFeaturedStream());
  const [featuredStreamer, setFeaturedStreamer] = useState(getStreamerById(featuredStream.streamerId));
  const [recommendedStreams, setRecommendedStreams] = useState(mockStreams.filter(s => s.id !== featuredStream.id).slice(0, 4));
  const [trendingStreamers, setTrendingStreamers] = useState(mockStreamers.slice(0, 3));

  return (
    <div className="pb-6">
      {/* Hero section - Full width */}
      <div className="relative w-full bg-gradient-to-b from-twitch-900 to-background mb-6">
        <div className="container py-6 space-y-2">
          <div className="flex items-center gap-2 animate-slide-down" style={{ animationDelay: '0.1s' }}>
            <Zap className="h-5 w-5 text-twitch-500" />
            <h1 className="text-2xl sm:text-3xl font-bold">Featured Stream</h1>
          </div>
          <p className="text-muted-foreground animate-slide-down" style={{ animationDelay: '0.2s' }}>Watch the hottest stream right now</p>
        </div>
      </div>

      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="lg:col-span-2 animate-pop glass-morphism rounded-lg overflow-hidden shadow-xl">
            <VideoPlayer 
              streamTitle={featuredStream.title}
              streamerName={featuredStreamer?.displayName || "Unknown Streamer"}
              streamerAvatar={featuredStreamer?.avatarUrl}
              thumbnailUrl={featuredStream.thumbnailUrl}
              viewerCount={featuredStream.viewerCount}
              categories={featuredStream.categories}
              isLive={featuredStream.isLive}
            />
          </div>
          
          {!isMobile && (
            <div className="h-[600px] animate-slide-left" style={{ animationDelay: '0.3s' }}>
              <div className="glass-morphism h-full rounded-lg border border-white/10 shadow-lg overflow-hidden">
                <LiveChat />
              </div>
            </div>
          )}
        </div>
        
        {isMobile && (
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline" className="animate-twitch-pulse bg-red-500/10 text-red-500">Live</Badge>
              <h2 className="text-xl font-semibold">Chat</h2>
            </div>
            <div className="h-[400px] glass-morphism rounded-lg overflow-hidden shadow-lg">
              <LiveChat />
            </div>
          </div>
        )}

        <div className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-twitch-500" />
              <h2 className="text-xl font-semibold">Recommended Streams</h2>
            </div>
            
            <Link to="/browse">
              <Button variant="ghost" className="group">
                See All
                <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recommendedStreams.map((stream, index) => {
              const streamer = getStreamerById(stream.streamerId);
              return (
                <StreamerCard
                  key={stream.id}
                  id={stream.id}
                  thumbnailUrl={stream.thumbnailUrl}
                  title={stream.title}
                  streamerName={streamer?.displayName || "Unknown Streamer"}
                  streamerAvatar={streamer?.avatarUrl}
                  viewerCount={stream.viewerCount}
                  isLive={stream.isLive}
                  categories={stream.categories}
                  className="animate-fade-in"
                  style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                />
              );
            })}
          </div>
        </div>

        {/* New Trending Streamers Section */}
        <div className="mb-10 bg-card-gradient rounded-xl p-6 shadow-lg animate-slide-up">
          <div className="flex items-center gap-2 mb-6">
            <Star className="h-5 w-5 text-twitch-500" />
            <h2 className="text-xl font-semibold">Trending Streamers</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {trendingStreamers.map((streamer, index) => (
              <div key={streamer.id} className="flex items-center gap-4 p-4 bg-card/50 rounded-lg border border-white/5 hover:border-twitch-500/50 transition-colors animate-pop" style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
                <div className="relative">
                  <img 
                    src={streamer.avatarUrl} 
                    alt={streamer.displayName}
                    className="h-14 w-14 rounded-full object-cover border-2 border-twitch-500"
                  />
                  <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background animate-pulse"></span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{streamer.displayName}</h3>
                  <p className="text-sm text-muted-foreground truncate">{streamer.followers.toLocaleString()} followers</p>
                </div>
                
                <Button size="sm" variant="outline" className="btn-twitch-outline">Follow</Button>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center glass-morphism rounded-xl p-8 mb-8 animate-fade-in">
          <div className="max-w-md mx-auto">
            <h2 className="text-3xl font-bold mb-3 text-gradient">Start Your Streaming Journey</h2>
            <p className="text-muted-foreground mb-6">Join our community of content creators and share your passion with viewers around the world.</p>
            <Link to="/profile">
              <Button className="bg-twitch-500 hover:bg-twitch-600 shadow-lg shadow-twitch-500/20 animate-bounce-in">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
