
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Scissors, X, Check, Timer } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { ClipData } from "./types";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface ClipCreatorProps {
  progress: number;
  duration: number;
  isLive: boolean;
  thumbnailUrl: string;
  streamTitle: string;
}

const ClipCreator = ({
  progress,
  duration,
  isLive,
  thumbnailUrl,
  streamTitle,
}: ClipCreatorProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [clipStart, setClipStart] = useState(Math.max(0, progress - 15));
  const [clipEnd, setClipEnd] = useState(progress);
  const [clipTitle, setClipTitle] = useState(`${streamTitle} - Clip`);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleCreateClip = () => {
    // In a real application, you would save this clip to a database
    const clipData: ClipData = {
      id: `clip-${Date.now()}`,
      startTime: clipStart,
      endTime: clipEnd,
      title: clipTitle,
      createdAt: new Date(),
    };
    
    console.log("Clip created:", clipData);
    
    toast.success("Clip created successfully!", {
      description: "Your clip has been saved",
      action: {
        label: "View",
        onClick: () => console.log("View clip", clipData),
      },
    });
    
    setIsSheetOpen(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const clipDuration = clipEnd - clipStart;

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-white hover:bg-white/10 rounded-sm relative"
          onClick={() => setIsCreating(true)}
        >
          <Scissors className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] p-0">
        <div className="p-6">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Scissors className="h-5 w-5 text-primary" />
              Create a Clip
            </SheetTitle>
          </SheetHeader>
          
          <div className="mt-6 space-y-6">
            <div className="relative aspect-video rounded-md overflow-hidden border border-border">
              <img 
                src={thumbnailUrl} 
                alt={clipTitle}
                className="w-full h-full object-cover" 
              />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
                <Badge className="bg-primary">
                  <Timer className="h-3 w-3 mr-1" />
                  {formatTime(clipDuration)}
                </Badge>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Clip Title</label>
                <Input
                  value={clipTitle}
                  onChange={(e) => setClipTitle(e.target.value)}
                  placeholder="Give your clip a title"
                  className="bg-background"
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="font-medium">Clip Time Range</span>
                  <span className="text-muted-foreground">
                    {formatTime(clipStart)} - {formatTime(clipEnd)} ({formatTime(clipDuration)})
                  </span>
                </div>
                
                <div className="px-2 pt-4">
                  <Slider
                    defaultValue={[clipStart, clipEnd]}
                    min={0}
                    max={isLive ? progress : duration}
                    step={1}
                    onValueChange={([start, end]) => {
                      setClipStart(start);
                      setClipEnd(end);
                    }}
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Description (optional)</label>
                <Textarea 
                  placeholder="Add a description for this clip" 
                  className="bg-background resize-none h-20"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsSheetOpen(false)}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleCreateClip}>
                <Check className="h-4 w-4 mr-2" />
                Create Clip
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ClipCreator;
