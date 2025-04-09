
export interface VideoPlayerProps {
  streamTitle: string;
  streamerName: string;
  streamerAvatar?: string;
  thumbnailUrl: string;
  viewerCount: number;
  categories: string[];
  isLive?: boolean;
  language?: string;
  tags?: string[];
}
