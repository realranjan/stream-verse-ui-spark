export interface Streamer {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  followers: number;
  bio: string;
  categories: string[];
}

export interface Stream {
  id: string;
  streamerId: string;
  title: string;
  thumbnailUrl: string;
  viewerCount: number;
  startedAt: Date;
  isLive: boolean;
  categories: string[];
}

export interface ChatMessage {
  id: string;
  username: string;
  message: string;
  timestamp: Date;
  avatarUrl: string;
  isOwn?: boolean;
  specialType?: 'subscriber' | 'moderator';
}

export interface PastStream {
  id: string;
  title: string;
  thumbnailUrl: string;
  viewCount: number;
  duration: string;
  streamedAt: Date;
}

// Mock Streamers
export const mockStreamers: Streamer[] = [
  {
    id: "streamer-1",
    username: "ninja",
    displayName: "Ninja",
    avatarUrl: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=150&auto=format&fit=crop",
    followers: 18000000,
    bio: "Professional gamer, streamer, and content creator. I play various games including Fortnite, Valorant, and League of Legends.",
    categories: ["Gaming", "FPS", "Battle Royale"]
  },
  {
    id: "streamer-2",
    username: "pokimane",
    displayName: "Pokimane",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    followers: 9000000,
    bio: "Content creator, gamer, and co-founder of OfflineTV. I stream a variety of games and Just Chatting content.",
    categories: ["Gaming", "Just Chatting", "IRL"]
  },
  {
    id: "streamer-3",
    username: "shroud",
    displayName: "Shroud",
    avatarUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=150&auto=format&fit=crop",
    followers: 10000000,
    bio: "Former professional CS:GO player turned full-time streamer. Known for FPS skills and variety gaming content.",
    categories: ["Gaming", "FPS", "Variety"]
  },
  {
    id: "streamer-4",
    username: "amouranth",
    displayName: "Amouranth",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop",
    followers: 6000000,
    bio: "Content creator, cosplayer, and entrepreneur. I stream a variety of content including Just Chatting, ASMR, and gaming.",
    categories: ["Just Chatting", "ASMR", "IRL"]
  },
  {
    id: "streamer-5",
    username: "xqc",
    displayName: "xQc",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
    followers: 11000000,
    bio: "Former professional Overwatch player and full-time variety streamer. Known for high energy streams and gaming content.",
    categories: ["Gaming", "Just Chatting", "Variety"]
  },
  {
    id: "streamer-6",
    username: "valkyrae",
    displayName: "Valkyrae",
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop",
    followers: 3500000,
    bio: "Content creator, co-owner of 100 Thieves, and variety streamer. I primarily play Valorant, Among Us, and other popular games.",
    categories: ["Gaming", "Variety", "FPS"]
  },
];

// Mock Streams
export const mockStreams: Stream[] = [
  {
    id: "stream-1",
    streamerId: "streamer-1",
    title: "Fortnite Tournament Finals - $100K Prize Pool!",
    thumbnailUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
    viewerCount: 126589,
    startedAt: new Date(Date.now() - 3600000 * 2), // 2 hours ago
    isLive: true,
    categories: ["Gaming", "Fortnite", "Tournament"]
  },
  {
    id: "stream-2",
    streamerId: "streamer-2",
    title: "Valorant Ranked with Friends - Road to Radiant",
    thumbnailUrl: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?q=80&w=800&auto=format&fit=crop",
    viewerCount: 45231,
    startedAt: new Date(Date.now() - 3600000 * 1.5), // 1.5 hours ago
    isLive: true,
    categories: ["Gaming", "Valorant", "FPS"]
  },
  {
    id: "stream-3",
    streamerId: "streamer-3",
    title: "CS2 Pro matches review - Tips and Tricks",
    thumbnailUrl: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=800&auto=format&fit=crop",
    viewerCount: 78956,
    startedAt: new Date(Date.now() - 3600000 * 3), // 3 hours ago
    isLive: true,
    categories: ["Gaming", "CSGO", "FPS"]
  },
  {
    id: "stream-4",
    streamerId: "streamer-4",
    title: "Hot Tub Stream - Subscriber Goals & Giveaways",
    thumbnailUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop",
    viewerCount: 32897,
    startedAt: new Date(Date.now() - 3600000 * 1), // 1 hour ago
    isLive: true,
    categories: ["Just Chatting", "IRL"]
  },
  {
    id: "stream-5",
    streamerId: "streamer-5",
    title: "Minecraft Hardcore Mode - Day 100!",
    thumbnailUrl: "https://images.unsplash.com/photo-1640079421264-61f50d5b4439?q=80&w=800&auto=format&fit=crop",
    viewerCount: 98564,
    startedAt: new Date(Date.now() - 3600000 * 5), // 5 hours ago
    isLive: true,
    categories: ["Gaming", "Minecraft"]
  },
  {
    id: "stream-6",
    streamerId: "streamer-6",
    title: "Among Us with OTV & Friends - New Roles Mod!",
    thumbnailUrl: "https://images.unsplash.com/photo-1579403124614-197f69d8187b?q=80&w=800&auto=format&fit=crop",
    viewerCount: 56123,
    startedAt: new Date(Date.now() - 3600000 * 2.5), // 2.5 hours ago
    isLive: true,
    categories: ["Gaming", "Among Us"]
  },
];

// Mock Chat Messages
export const mockChatMessages: ChatMessage[] = [
  {
    id: "msg-1",
    username: "StreamViewer123",
    message: "Hi everyone! Just joined the stream 👋",
    timestamp: new Date(Date.now() - 60000 * 10), // 10 mins ago
    avatarUrl: ""
  },
  {
    id: "msg-2",
    username: "GamingFan42",
    message: "That gameplay was insane! 🔥",
    timestamp: new Date(Date.now() - 60000 * 8), // 8 mins ago
    avatarUrl: ""
  },
  {
    id: "msg-3",
    username: "TwitchPrime_Sub",
    message: "Just used my Prime sub! Keep up the good work!",
    timestamp: new Date(Date.now() - 60000 * 6), // 6 mins ago
    avatarUrl: ""
  },
  {
    id: "msg-4",
    username: "Mod_Helper",
    message: "Remember to follow the chat rules everyone!",
    timestamp: new Date(Date.now() - 60000 * 4), // 4 mins ago
    avatarUrl: ""
  },
  {
    id: "msg-5",
    username: "NewFollower99",
    message: "First time watching your stream, loving it so far! ❤️",
    timestamp: new Date(Date.now() - 60000 * 2), // 2 mins ago
    avatarUrl: ""
  }
];

// Mock Past Streams
export const mockPastStreams: PastStream[] = [
  {
    id: "past-1",
    title: "Beating Elden Ring Without Taking Damage",
    thumbnailUrl: "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?q=80&w=800&auto=format&fit=crop",
    viewCount: 542689,
    duration: "8:45:12",
    streamedAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
  },
  {
    id: "past-2",
    title: "Reacting to E3 Announcements - The Future of Gaming!",
    thumbnailUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop",
    viewCount: 345123,
    duration: "4:32:17",
    streamedAt: new Date(Date.now() - 86400000 * 4), // 4 days ago
  },
  {
    id: "past-3",
    title: "Ranked Valorant - From Bronze to Diamond Challenge",
    thumbnailUrl: "https://images.unsplash.com/photo-1580327344181-c1163234e5a0?q=80&w=800&auto=format&fit=crop",
    viewCount: 256478,
    duration: "6:12:45",
    streamedAt: new Date(Date.now() - 86400000 * 7), // 7 days ago
  },
  {
    id: "past-4",
    title: "Cooking Stream - Making Grandmother's Secret Recipe",
    thumbnailUrl: "https://images.unsplash.com/photo-1556911073-a517e752729c?q=80&w=800&auto=format&fit=crop",
    viewCount: 128756,
    duration: "2:47:34",
    streamedAt: new Date(Date.now() - 86400000 * 10), // 10 days ago
  },
  {
    id: "past-5",
    title: "Just Chatting - Life Updates and Q&A",
    thumbnailUrl: "https://images.unsplash.com/photo-1541178735695-4c1b3839adcd?q=80&w=800&auto=format&fit=crop",
    viewCount: 198423,
    duration: "3:15:28",
    streamedAt: new Date(Date.now() - 86400000 * 14), // 14 days ago
  },
  {
    id: "past-6",
    title: "Charity Stream for Animal Shelters - 24 Hour Challenge",
    thumbnailUrl: "https://images.unsplash.com/photo-1608096299210-db7e38487075?q=80&w=800&auto=format&fit=crop",
    viewCount: 487932,
    duration: "24:00:00",
    streamedAt: new Date(Date.now() - 86400000 * 21), // 21 days ago
  }
];

// Helper function to get streamer by ID
export const getStreamerById = (id: string): Streamer | undefined => {
  return mockStreamers.find(streamer => streamer.id === id);
};

// Helper function to get streams by streamer ID
export const getStreamsByStreamerId = (streamerId: string): Stream[] => {
  return mockStreams.filter(stream => stream.streamerId === streamerId);
};

// Helper function to get stream by ID
export const getStreamById = (id: string): Stream | undefined => {
  return mockStreams.find(stream => stream.id === id);
};

// Helper function to get main featured stream
export const getFeaturedStream = (): Stream => {
  // Get stream with most viewers
  return [...mockStreams].sort((a, b) => b.viewerCount - a.viewerCount)[0];
};

// Helper to format view counts
export const formatViewCount = (count: number): string => {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + 'M';
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'K';
  }
  return count.toString();
};
