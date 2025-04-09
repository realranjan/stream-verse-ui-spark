
import { useState, useEffect } from "react";
import { Minimize, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface PictureInPictureProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  fallbackRef: React.RefObject<HTMLDivElement>;
}

const PictureInPicture = ({
  videoRef,
  fallbackRef,
}: PictureInPictureProps) => {
  const [isPipActive, setIsPipActive] = useState(false);

  useEffect(() => {
    const handlePipChange = () => {
      setIsPipActive(document.pictureInPictureElement !== null);
    };

    document.addEventListener("enterpictureinpicture", handlePipChange);
    document.addEventListener("leavepictureinpicture", handlePipChange);

    return () => {
      document.removeEventListener("enterpictureinpicture", handlePipChange);
      document.removeEventListener("leavepictureinpicture", handlePipChange);
    };
  }, []);

  const togglePictureInPicture = async () => {
    try {
      if (!videoRef.current) {
        // Create a temporary video element if no video exists
        // This is for demonstration - in a real app, you'd have a real video element
        const tempVideo = document.createElement('video');
        tempVideo.srcObject = await navigator.mediaDevices.getUserMedia({ video: true });
        tempVideo.muted = true;
        tempVideo.play();
        
        await tempVideo.requestPictureInPicture();
        tempVideo.addEventListener('leavepictureinpicture', () => {
          tempVideo.srcObject = null;
        });
      } else if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else if (videoRef.current) {
        await videoRef.current.requestPictureInPicture();
      }
    } catch (error) {
      console.error("Picture-in-Picture failed:", error);
      toast.error("Picture-in-Picture failed", {
        description: "Your browser may not support this feature"
      });
      
      // Fallback - simulate PiP with CSS
      if (fallbackRef.current) {
        if (isPipActive) {
          fallbackRef.current.classList.remove('fixed', 'bottom-4', 'right-4', 'w-80', 'h-auto', 'z-50', 'shadow-lg');
          setIsPipActive(false);
        } else {
          fallbackRef.current.classList.add('fixed', 'bottom-4', 'right-4', 'w-80', 'h-auto', 'z-50', 'shadow-lg');
          setIsPipActive(true);
        }
      }
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 text-white hover:bg-white/10 rounded-sm"
      onClick={togglePictureInPicture}
    >
      {isPipActive ? (
        <Minimize className="h-4 w-4" />
      ) : (
        <Maximize className="h-4 w-4" />
      )}
      <span className="sr-only">
        {isPipActive ? "Exit Picture-in-Picture" : "Picture-in-Picture"}
      </span>
    </Button>
  );
};

export default PictureInPicture;
