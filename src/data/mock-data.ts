export interface Streamer {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  followers: number;
  bio: string;
  categories: string[];
  achievements?: Achievement[];
  socialLinks?: SocialLink[];
  stats?: StreamerStats;
}

export interface Achievement {
  id: string;
  title: string;
  icon: string;
  description: string;
  earnedAt: Date;
}

export interface SocialLink {
  platform: 'twitter' | 'instagram' | 'youtube' | 'tiktok' | 'discord';
  url: string;
  username: string;
}

export interface StreamerStats {
  totalViewCount: number;
  avgViewers: number;
  peakViewers: number;
  subscriberCount: number;
  streamHours: number;
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
  language?: string;
  tags?: string[];
  gameInfo?: GameInfo;
}

export interface GameInfo {
  name: string;
  coverUrl: string;
  genre: string[];
}

export interface ChatMessage {
  id: string;
  username: string;
  message: string;
  timestamp: Date;
  avatarUrl: string;
  isOwn?: boolean;
  specialType?: 'subscriber' | 'moderator';
  tier?: 1 | 2 | 3;
  subscriptionMonths?: number;
}

export interface PastStream {
  id: string;
  title: string;
  thumbnailUrl: string;
  viewCount: number;
  duration: string;
  streamedAt: Date;
  highlights?: StreamHighlight[];
}

export interface StreamHighlight {
  id: string;
  title: string;
  timestampInSeconds: number;
  thumbnailUrl?: string;
}

export const mockStreamers: Streamer[] = [
  {
    id: "streamer-1",
    username: "ninja",
    displayName: "Ninja",
    avatarUrl: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=150&auto=format&fit=crop",
    followers: 18000000,
    bio: "Professional gamer, streamer, and content creator. I play various games including Fortnite, Valorant, and League of Legends.",
    categories: ["Gaming", "FPS", "Battle Royale"],
    achievements: [
      {
        id: "ach-1",
        title: "100K Follower Milestone",
        icon: "🏆",
        description: "Reached 100,000 followers on StreamVerse",
        earnedAt: new Date(2022, 3, 15)
      },
      {
        id: "ach-2",
        title: "Esports Champion",
        icon: "🎮",
        description: "Won a major Fortnite tournament",
        earnedAt: new Date(2023, 6, 22)
      }
    ],
    socialLinks: [
      {
        platform: "twitter",
        url: "https://twitter.com/ninja",
        username: "@ninja"
      },
      {
        platform: "instagram",
        url: "https://instagram.com/ninja",
        username: "ninja"
      }
    ],
    stats: {
      totalViewCount: 275000000,
      avgViewers: 42000,
      peakViewers: 120000,
      subscriberCount: 32000,
      streamHours: 4500
    }
  },
  {
    id: "streamer-2",
    username: "pokimane",
    displayName: "Pokimane",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    followers: 9000000,
    bio: "Content creator, gamer, and co-founder of OfflineTV. I stream a variety of games and Just Chatting content.",
    categories: ["Gaming", "Just Chatting", "IRL"],
    achievements: [
      {
        id: "ach-1",
        title: "Rising Star",
        icon: "⭐",
        description: "One of the fastest growing channels on the platform",
        earnedAt: new Date(2022, 2, 10)
      }
    ],
    socialLinks: [
      {
        platform: "twitter",
        url: "https://twitter.com/pokimane",
        username: "@pokimane"
      },
      {
        platform: "youtube",
        url: "https://youtube.com/pokimane",
        username: "Pokimane"
      }
    ],
    stats: {
      totalViewCount: 120000000,
      avgViewers: 28000,
      peakViewers: 85000,
      subscriberCount: 18000,
      streamHours: 3200
    }
  },
  {
    id: "streamer-3",
    username: "shroud",
    displayName: "Shroud",
    avatarUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=150&auto=format&fit=crop",
    followers: 10000000,
    bio: "Former professional CS:GO player turned full-time streamer. Known for FPS skills and variety gaming content.",
    categories: ["Gaming", "FPS", "Variety"],
    achievements: [
      {
        id: "ach-1",
        title: "FPS Legend",
        icon: "🎯",
        description: "Recognized for exceptional first-person shooter skills",
        earnedAt: new Date(2021, 8, 5)
      },
      {
        id: "ach-2",
        title: "Marathon Streamer",
        icon: "⏱️",
        description: "Completed a 24-hour charity stream",
        earnedAt: new Date(2023, 1, 18)
      }
    ],
    stats: {
      totalViewCount: 180000000,
      avgViewers: 35000,
      peakViewers: 95000,
      subscriberCount: 25000,
      streamHours: 5100
    }
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

export const mockStreams: Stream[] = [
  {
    id: "stream-1",
    streamerId: "streamer-1",
    title: "Fortnite Tournament Finals - $100K Prize Pool! 🏆 #esports #competitive",
    thumbnailUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
    viewerCount: 126589,
    startedAt: new Date(Date.now() - 3600000 * 2), // 2 hours ago
    isLive: true,
    categories: ["Gaming", "Fortnite", "Tournament"],
    language: "English",
    tags: ["Competitive", "Tournament", "Esports", "Season X"],
    gameInfo: {
      name: "Fortnite",
      coverUrl: "https://images.unsplash.com/photo-1589241062272-c0a000072dfa?q=80&w=100&auto=format&fit=crop",
      genre: ["Battle Royale", "Third-person Shooter"]
    }
  },
  {
    id: "stream-2",
    streamerId: "streamer-2",
    title: "Valorant Ranked with Friends - Road to Radiant ✨ !commands !socials",
    thumbnailUrl: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?q=80&w=800&auto=format&fit=crop",
    viewerCount: 45231,
    startedAt: new Date(Date.now() - 3600000 * 1.5), // 1.5 hours ago
    isLive: true,
    categories: ["Gaming", "Valorant", "FPS"],
    language: "English",
    tags: ["Ranked", "Competitive", "Squad Stream", "FPS"],
    gameInfo: {
      name: "Valorant",
      coverUrl: "https://images.unsplash.com/photo-1594394489098-74fcfa2627fb?q=80&w=100&auto=format&fit=crop",
      genre: ["Tactical Shooter", "FPS"]
    }
  },
  {
    id: "stream-3",
    streamerId: "streamer-3",
    title: "CS2 Pro matches review - Tips and Tricks 🔥 Master the meta!",
    thumbnailUrl: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=800&auto=format&fit=crop",
    viewerCount: 78956,
    startedAt: new Date(Date.now() - 3600000 * 3), // 3 hours ago
    isLive: true,
    categories: ["Gaming", "CSGO", "FPS"],
    language: "English",
    tags: ["Pro Tips", "Tutorial", "Gameplay Analysis", "Esports"],
    gameInfo: {
      name: "Counter-Strike 2",
      coverUrl: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?q=80&w=100&auto=format&fit=crop",
      genre: ["Tactical Shooter", "FPS"]
    }
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

export const mockChatMessages: ChatMessage[] = [
  {
    id: "msg-1",
    username: "StreamViewer123",
    message: "Hi everyone! Just joined the stream 👋 How's it going?",
    timestamp: new Date(Date.now() - 60000 * 10), // 10 mins ago
    avatarUrl: ""
  },
  {
    id: "msg-2",
    username: "GamingFan42",
    message: "That gameplay was insane! 🔥 How did you pull off that move?",
    timestamp: new Date(Date.now() - 60000 * 8), // 8 mins ago
    avatarUrl: "",
    specialType: "subscriber"
  },
  {
    id: "msg-3",
    username: "TwitchPrime_Sub",
    message: "Just used my Prime sub! Keep up the good work! ✨",
    timestamp: new Date(Date.now() - 60000 * 6), // 6 mins ago
    avatarUrl: "",
    specialType: "subscriber",
    tier: 1,
    subscriptionMonths: 3
  },
  {
    id: "msg-4",
    username: "Mod_Helper",
    message: "Remember to follow the chat rules everyone! Let's keep it friendly 😊",
    timestamp: new Date(Date.now() - 60000 * 4), // 4 mins ago
    avatarUrl: "",
    specialType: "moderator"
  },
  {
    id: "msg-5",
    username: "NewFollower99",
    message: "First time watching your stream, loving it so far! ❤️ Instant follow!",
    timestamp: new Date(Date.now() - 60000 * 2), // 2 mins ago
    avatarUrl: ""
  },
  {
    id: "msg-6",
    username: "ChillGamer",
    message: "Who else is watching from Europe? It's 3 AM here but worth it!",
    timestamp: new Date(Date.now() - 60000 * 1.5), // 1.5 mins ago
    avatarUrl: ""
  },
  {
    id: "msg-7",
    username: "ProPlayer123",
    message: "The new update is pretty balanced IMO. What do you think?",
    timestamp: new Date(Date.now() - 60000 * 1), // 1 min ago
    avatarUrl: "",
    specialType: "subscriber",
    tier: 2,
    subscriptionMonths: 12
  },
  {
    id: "msg-8",
    username: "StreamerFanatic",
    message: "POGGERS! That was epic! Clip that someone!",
    timestamp: new Date(Date.now() - 60000 * 0.5), // 30 secs ago
    avatarUrl: ""
  }
];

export const mockPastStreams: PastStream[] = [
  {
    id: "past-1",
    title: "Beating Elden Ring Without Taking Damage - FINAL BOSS",
    thumbnailUrl: "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?q=80&w=800&auto=format&fit=crop",
    viewCount: 542689,
    duration: "8:45:12",
    streamedAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
    highlights: [
      {
        id: "highlight-1",
        title: "Perfect Dodge Against Final Boss",
        timestampInSeconds: 28912,
        thumbnailUrl: "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?q=80&w=400&auto=format&fit=crop"
      },
      {
        id: "highlight-2",
        title: "Epic Victory Moment",
        timestampInSeconds: 31480,
        thumbnailUrl: "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?q=80&w=400&auto=format&fit=crop"
      }
    ]
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

export const getStreamerById = (id: string): Streamer | undefined => {
  return mockStreamers.find(streamer => streamer.id === id);
};

export const getStreamsByStreamerId = (streamerId: string): Stream[] => {
  return mockStreams.filter(stream => stream.streamerId === streamerId);
};

export const getStreamById = (id: string): Stream | undefined => {
  return mockStreams.find(stream => stream.id === id);
};

export const getFeaturedStream = (): Stream => {
  return [...mockStreams].sort((a, b) => b.viewerCount - a.viewerCount)[0];
};

export const formatViewCount = (count: number): string => {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + 'M';
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'K';
  }
  return count.toString();
};

export const getRandomStreams = (count: number, excludeIds: string[] = []): Stream[] => {
  const filteredStreams = mockStreams.filter(stream => !excludeIds.includes(stream.id));
  const shuffled = [...filteredStreams].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

export const getTrendingStreamers = (count: number): Streamer[] => {
  const shuffled = [...mockStreamers].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, shuffled.length));
};
