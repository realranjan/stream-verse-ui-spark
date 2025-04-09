
import { useState } from "react";
import { Check, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { QualityOption } from "./types";
import { Badge } from "@/components/ui/badge";

interface QualitySelectorProps {
  currentQuality: string;
  setQuality: (quality: string) => void;
}

const QualitySelector = ({
  currentQuality,
  setQuality,
}: QualitySelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const availableQualities: QualityOption[] = [
    { label: "Auto", value: "auto" },
    { label: "1080p", value: "1080p" },
    { label: "720p", value: "720p" },
    { label: "480p", value: "480p" },
    { label: "360p", value: "360p" },
    { label: "160p", value: "160p" },
  ];

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-white hover:bg-white/10 rounded-sm"
        >
          <Settings className="h-4 w-4" />
          <span className="sr-only">Stream settings</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48 bg-background/95 backdrop-blur-sm border-border"
      >
        <DropdownMenuLabel className="flex items-center gap-1">
          <Settings className="h-3.5 w-3.5" />
          Quality
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {availableQualities.map((option) => (
          <DropdownMenuItem
            key={option.value}
            className="flex items-center justify-between cursor-pointer"
            onClick={() => {
              setQuality(option.value);
              setIsOpen(false);
            }}
          >
            <span>{option.label}</span>
            {currentQuality === option.value && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          {currentQuality === "auto" ? (
            <span className="flex items-center gap-1">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                Auto
              </Badge>
              <span>Adapts to your connection</span>
            </span>
          ) : (
            <span>Current: {currentQuality}</span>
          )}
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default QualitySelector;
