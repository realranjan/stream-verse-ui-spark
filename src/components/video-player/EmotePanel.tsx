
import { useState } from "react";
import { SmilePlus } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { EmoteData } from "./types";
import { toast } from "sonner";

interface EmotePanelProps {
  onEmoteSelect: (emote: EmoteData) => void;
}

const EmotePanel = ({ onEmoteSelect }: EmotePanelProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Mock emote data - in a real app this would come from an API
  const emotes: EmoteData[] = [
    {
      id: "emote1",
      name: "PogChamp",
      imageUrl: "https://static-cdn.jtvnw.net/emoticons/v2/305954156/default/light/3.0",
    },
    {
      id: "emote2",
      name: "LUL",
      imageUrl: "https://static-cdn.jtvnw.net/emoticons/v2/425618/default/light/3.0",
    },
    {
      id: "emote3",
      name: "Kappa",
      imageUrl: "https://static-cdn.jtvnw.net/emoticons/v2/25/default/light/3.0",
    },
    {
      id: "emote4",
      name: "monkaS",
      imageUrl: "https://cdn.betterttv.net/emote/56e9f494fff3cc5c35e5287e/3x",
    },
    {
      id: "emote5",
      name: "KEKW",
      imageUrl: "https://cdn.betterttv.net/emote/5e9c6c187e090362f8b0b9e8/3x",
    },
    {
      id: "emote6",
      name: "HeyGuys",
      imageUrl: "https://static-cdn.jtvnw.net/emoticons/v2/30259/default/light/3.0",
    },
    {
      id: "emote7",
      name: "VoHiYo",
      imageUrl: "https://static-cdn.jtvnw.net/emoticons/v2/81274/default/light/3.0",
    },
    {
      id: "emote8",
      name: "4Head",
      imageUrl: "https://static-cdn.jtvnw.net/emoticons/v2/354/default/light/3.0",
    }
  ];

  const handleEmoteClick = (emote: EmoteData) => {
    onEmoteSelect(emote);
    setIsOpen(false);
    
    // Create a virtual emote effect on the screen
    const emoteElement = document.createElement("img");
    emoteElement.src = emote.imageUrl;
    emoteElement.classList.add("absolute");
    emoteElement.style.width = "40px";
    emoteElement.style.height = "40px";
    emoteElement.style.zIndex = "50";
    emoteElement.style.bottom = "80px";
    emoteElement.style.left = `${Math.random() * 70 + 10}%`;
    emoteElement.style.transform = "translateX(-50%)";
    emoteElement.style.animation = "float-up 4s ease-out forwards";
    
    // Create the animation
    const styleElement = document.createElement("style");
    styleElement.textContent = `
      @keyframes float-up {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(-200px) rotate(10deg); opacity: 0; }
      }
    `;
    document.head.appendChild(styleElement);
    
    // Add to video player
    const videoContainer = document.querySelector(".video-player-container");
    if (videoContainer) {
      videoContainer.appendChild(emoteElement);
      
      // Remove after animation is done
      setTimeout(() => {
        emoteElement.remove();
        styleElement.remove();
      }, 4000);
    }
    
    // Show toast
    toast(`${emote.name} emote sent!`, {
      duration: 1500,
    });
  };

  // Group emotes into categories
  const emoteCategories = {
    popular: emotes.slice(0, 4),
    reactions: emotes.slice(4)
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-white hover:bg-white/10 rounded-sm"
        >
          <SmilePlus className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 bg-background/95 backdrop-blur-sm border-border p-2">
        <div className="p-1">
          <h4 className="text-sm font-medium mb-2">Popular</h4>
          <div className="grid grid-cols-4 gap-1 mb-3">
            {emoteCategories.popular.map((emote) => (
              <button
                key={emote.id}
                className="p-1 rounded hover:bg-accent flex flex-col items-center transition-colors"
                onClick={() => handleEmoteClick(emote)}
              >
                <img
                  src={emote.imageUrl}
                  alt={emote.name}
                  className="w-8 h-8 object-contain"
                />
                <span className="text-[10px] mt-1 text-center leading-none">
                  {emote.name}
                </span>
              </button>
            ))}
          </div>
          
          <h4 className="text-sm font-medium mb-2">Reactions</h4>
          <div className="grid grid-cols-4 gap-1">
            {emoteCategories.reactions.map((emote) => (
              <button
                key={emote.id}
                className="p-1 rounded hover:bg-accent flex flex-col items-center transition-colors"
                onClick={() => handleEmoteClick(emote)}
              >
                <img
                  src={emote.imageUrl}
                  alt={emote.name}
                  className="w-8 h-8 object-contain"
                />
                <span className="text-[10px] mt-1 text-center leading-none">
                  {emote.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default EmotePanel;
