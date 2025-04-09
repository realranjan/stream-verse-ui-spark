
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import VideoPlayer from "@/components/video-player";
import LiveChat from "@/components/LiveChat";
import StreamerCard from "@/components/StreamerCard";
import { getStreamById, getStreamerById, mockStreams } from "@/data/mock-data";
import { useIsMobile } from "@/hooks/use-mobile";

const StreamPage = () => {
  const { streamId } = useParams<{ streamId: string }>();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const [stream, setStream] = useState(getStreamById(streamId || ""));
  const [streamer, setStreamer] = useState(
    stream ? getStreamerById(stream.streamerId) : undefined
  );
  const [recommendedStreams, setRecommendedStreams] = useState(
    mockStreams.filter((s) => s.id !== streamId).slice(0, 3)
  );

  // If stream doesn't exist, redirect to browse page
  useEffect(() => {
    if (!stream) {
      navigate("/browse");
    }
  }, [stream, navigate]);

  if (!stream || !streamer) {
    return null;
  }

  return (
    <div className="container py-6">
      <Button
        variant="ghost"
        className="mb-4 -ml-2 flex items-center gap-1"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft className="h-4 w-4" />
        Back
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <VideoPlayer
            streamTitle={stream.title}
            streamerName={streamer.displayName}
            streamerAvatar={streamer.avatarUrl}
            thumbnailUrl={stream.thumbnailUrl}
            viewerCount={stream.viewerCount}
            categories={stream.categories}
            isLive={stream.isLive}
          />
          
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">About the Streamer</h2>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="font-medium">{streamer.displayName}</div>
                <div className="text-sm text-muted-foreground">
                  {streamer.followers.toLocaleString()} followers
                </div>
              </div>
              <p>{streamer.bio}</p>
            </div>
          </div>
        </div>

        {/* Chat section - Desktop */}
        {!isMobile && (
          <div className="h-[600px]">
            <LiveChat />
          </div>
        )}
      </div>

      {/* Chat section - Mobile */}
      {isMobile && (
        <div className="my-6">
          <h2 className="text-lg font-semibold mb-3">Live Chat</h2>
          <div className="h-[400px] border rounded-lg">
            <LiveChat />
          </div>
        </div>
      )}

      {/* Recommended streams */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">You Might Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendedStreams.map((recStream) => {
            const recStreamer = getStreamerById(recStream.streamerId);
            return (
              <StreamerCard
                key={recStream.id}
                id={recStream.id}
                thumbnailUrl={recStream.thumbnailUrl}
                title={recStream.title}
                streamerName={recStreamer?.displayName || "Unknown Streamer"}
                streamerAvatar={recStreamer?.avatarUrl}
                viewerCount={recStream.viewerCount}
                isLive={recStream.isLive}
                categories={recStream.categories}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StreamPage;
