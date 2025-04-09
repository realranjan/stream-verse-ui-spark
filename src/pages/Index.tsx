
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import VideoPlayer from "@/components/VideoPlayer";
import LiveChat from "@/components/LiveChat";
import StreamerCard from "@/components/StreamerCard";
import { getFeaturedStream, getStreamerById, mockStreams, mockStreamers } from "@/data/mock-data";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();
  const [featuredStream, setFeaturedStream] = useState(getFeaturedStream());
  const [featuredStreamer, setFeaturedStreamer] = useState(getStreamerById(featuredStream.streamerId));
  const [recommendedStreams, setRecommendedStreams] = useState(mockStreams.filter(s => s.id !== featuredStream.id).slice(0, 4));

  return (
    <div className="container py-6">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Featured Stream</h1>
        <p className="text-muted-foreground">Watch the hottest stream right now</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        <div className="lg:col-span-2">
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
          <div className="h-[600px]">
            <LiveChat />
          </div>
        )}
      </div>
      
      {isMobile && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span>Live Chat</span>
            <Badge variant="outline" className="animate-pulse">Live</Badge>
          </h2>
          <div className="h-[400px] border rounded-lg">
            <LiveChat />
          </div>
        </div>
      )}

      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Recommended Streams</h2>
          <Link to="/browse">
            <Button variant="ghost">See All</Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recommendedStreams.map((stream) => {
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
              />
            );
          })}
        </div>
      </div>

      <div className="text-center bg-card border rounded-xl p-6 mb-8 animate-fade-in">
        <h2 className="text-2xl font-bold mb-2 text-gradient">Want to Start Streaming?</h2>
        <p className="text-muted-foreground mb-4">Join our community of content creators and start your streaming journey today.</p>
        <Link to="/profile">
          <Button className="bg-twitch-500 hover:bg-twitch-600">Get Started</Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
