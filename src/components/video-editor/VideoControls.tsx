
import React from "react";
import { Play, Pause, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoControlsProps {
  videoGenerated: boolean;
  isPlaying: boolean;
  togglePlayPause: () => void;
  handleDownload: () => void;
}

const VideoControls: React.FC<VideoControlsProps> = ({
  videoGenerated,
  isPlaying,
  togglePlayPause,
  handleDownload,
}) => {
  if (!videoGenerated) return null;
  
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={handleDownload}>
        <Download className="h-4 w-4 mr-2" />
        Download
      </Button>
      <Button variant="outline" size="sm" onClick={togglePlayPause}>
        {isPlaying ? (
          <><Pause className="h-4 w-4 mr-2" />Pause</>
        ) : (
          <><Play className="h-4 w-4 mr-2" />Play</>
        )}
      </Button>
    </div>
  );
};

export default VideoControls;
