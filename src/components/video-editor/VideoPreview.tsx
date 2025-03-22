
import React from "react";
import { Download, Pause, Play, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoPreviewProps {
  videoGenerated: boolean;
  isGenerating: boolean;
  generatedVideoUrl: string;
  videoRef: React.RefObject<HTMLVideoElement>;
  isPlaying: boolean;
  togglePlayPause: () => void;
  handleDownload: () => void;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({
  videoGenerated,
  isGenerating,
  generatedVideoUrl,
  videoRef,
  isPlaying,
  togglePlayPause,
  handleDownload,
}) => {
  return (
    <div className="flex-1 bg-black/5 backdrop-blur-sm rounded-2xl border border-border overflow-hidden flex flex-col">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h3 className="font-medium">Preview</h3>
        
        <div className="flex items-center gap-2">
          {videoGenerated && (
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          )}
          {videoGenerated && (
            <Button variant="outline" size="sm" onClick={togglePlayPause}>
              {isPlaying ? (
                <><Pause className="h-4 w-4 mr-2" />Pause</>
              ) : (
                <><Play className="h-4 w-4 mr-2" />Play</>
              )}
            </Button>
          )}
        </div>
      </div>
      
      <div className="relative flex-1 flex items-center justify-center bg-black/90">
        {videoGenerated ? (
          <video 
            ref={videoRef}
            src={generatedVideoUrl}
            className="w-full h-full object-contain"
            controls={false}
            onEnded={() => isPlaying && togglePlayPause()}
            onPause={() => isPlaying && togglePlayPause()}
            onPlay={() => !isPlaying && togglePlayPause()}
          />
        ) : (
          <div className="text-center p-6">
            <div className="flex flex-col items-center justify-center gap-4">
              <Video className="h-12 w-12 text-white/30" />
              <p className="text-white/70">
                {isGenerating ? "Generating your video..." : "Configure your video and click Generate"}
              </p>
            </div>
          </div>
        )}
        
        {isGenerating && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">
              <span className="loader h-12 w-12 border-[3px]" />
              <p className="text-white font-medium animate-pulse">Creating your masterpiece...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPreview;
