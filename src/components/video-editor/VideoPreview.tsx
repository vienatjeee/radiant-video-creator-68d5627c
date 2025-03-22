
import React, { useState, useEffect } from "react";
import { Download, Pause, Play, Video, AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";

interface VideoPreviewProps {
  videoGenerated: boolean;
  isGenerating: boolean;
  generatedVideoUrl: string;
  videoRef: React.RefObject<HTMLVideoElement>;
  isPlaying: boolean;
  togglePlayPause: () => void;
  handleDownload: () => void;
  textOverlay?: { enabled: boolean; text: string };
}

const VideoPreview: React.FC<VideoPreviewProps> = ({
  videoGenerated,
  isGenerating,
  generatedVideoUrl,
  videoRef,
  isPlaying,
  togglePlayPause,
  handleDownload,
  textOverlay = { enabled: false, text: "" }
}) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Reset error state when video URL changes
  useEffect(() => {
    if (generatedVideoUrl) {
      setError(null);
      setIsLoading(true);
    }
  }, [generatedVideoUrl]);

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const target = e.target as HTMLVideoElement;
    console.error("Video error:", target.error);
    setError(`Failed to load video: ${target.error?.message || 'Unknown error'}`);
    setIsLoading(false);
    toast.error("Video playback error", {
      description: "There was a problem playing your video."
    });
  };

  const handleVideoLoading = () => {
    setIsLoading(true);
    setError(null);
  };

  const handleVideoLoaded = () => {
    setIsLoading(false);
    setError(null);
    console.log("Video loaded successfully");
  };

  const retryVideoLoad = () => {
    if (!videoRef.current) return;
    
    setError(null);
    setIsLoading(true);
    
    // Reset the video source to trigger a reload
    const currentSrc = videoRef.current.src;
    videoRef.current.src = "";
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.src = currentSrc;
        videoRef.current.load();
      }
    }, 100);
  };

  return (
    <div className="flex-1 bg-black/5 backdrop-blur-sm rounded-2xl border border-border overflow-hidden flex flex-col">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h3 className="font-medium">Preview</h3>
        
        <div className="flex items-center gap-2">
          {videoGenerated && !isLoading && (
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          )}
          {videoGenerated && !error && !isLoading && (
            <Button variant="outline" size="sm" onClick={togglePlayPause}>
              {isPlaying ? (
                <><Pause className="h-4 w-4 mr-2" />Pause</>
              ) : (
                <><Play className="h-4 w-4 mr-2" />Play</>
              )}
            </Button>
          )}
          {error && (
            <Button variant="outline" size="sm" onClick={retryVideoLoad}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          )}
        </div>
      </div>
      
      <div className="relative flex-1 flex items-center justify-center bg-black/90">
        {videoGenerated ? (
          <>
            <div className="relative w-full h-full">
              <video 
                ref={videoRef}
                src={generatedVideoUrl}
                className={`w-full h-full object-contain ${error ? 'hidden' : ''}`}
                controls={false}
                preload="auto"
                onError={handleVideoError}
                onLoadStart={handleVideoLoading}
                onLoadedData={handleVideoLoaded}
                onEnded={() => isPlaying && togglePlayPause()}
                onPause={() => isPlaying && togglePlayPause()}
                onPlay={() => !isPlaying && togglePlayPause()}
              />
              
              {/* Text overlay */}
              {textOverlay?.enabled && textOverlay.text && !error && !isLoading && (
                <div className="absolute bottom-8 left-0 right-0 text-center">
                  <div className="inline-block bg-black/50 backdrop-blur-sm px-6 py-3 rounded-lg">
                    <p className="text-white font-medium text-xl">{textOverlay.text}</p>
                  </div>
                </div>
              )}
            </div>
            
            {error && (
              <div className="text-center p-6">
                <Alert variant="destructive" className="max-w-md mx-auto bg-destructive/10 border border-destructive">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  <AlertDescription className="mt-2">
                    {error}
                  </AlertDescription>
                </Alert>
                <p className="text-white/70 mt-4">
                  Try refreshing or using a different video format.
                </p>
              </div>
            )}

            {isLoading && !error && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="flex flex-col items-center gap-2">
                  <span className="loader h-10 w-10 border-[3px]" />
                  <p className="text-white/70 text-sm">Loading video...</p>
                </div>
              </div>
            )}
          </>
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
