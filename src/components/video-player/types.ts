
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

export interface StreamMarker {
  position: number;
  label: string;
  type?: 'highlight' | 'clip' | 'custom';
  color?: string;
}

export interface QualityOption {
  label: string;
  value: string;
}

export interface ClipData {
  id: string;
  startTime: number;
  endTime: number;
  title: string;
  createdAt: Date;
}

export interface EmoteData {
  id: string;
  name: string;
  imageUrl: string;
}
