import React, { useState, useRef, useCallback, useEffect } from "react";
import { toast } from "sonner";
import VideoPreview from "./VideoPreview";
import PromptTab from "./tabs/PromptTab";
import MediaTab from "./tabs/MediaTab";
import StyleTab from "./tabs/StyleTab";
import SettingsTab from "./tabs/SettingsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Wand2, Sparkles, Image, LayoutGrid, Settings } from "lucide-react";

const VideoEditor = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [tab, setTab] = useState("prompt");
  const [videoGenerated, setVideoGenerated] = useState(false);
  const [duration, setDuration] = useState(15);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedMusic, setSelectedMusic] = useState("Ambient");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const sampleVideos = [
    "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  ];

  useEffect(() => {
    return () => {
      if (generatedVideoUrl && generatedVideoUrl.startsWith('blob:')) {
        URL.revokeObjectURL(generatedVideoUrl);
      }
    };
  }, [generatedVideoUrl]);
  
  const handleMediaUpload = useCallback((file: File | null) => {
    if (generatedVideoUrl && generatedVideoUrl.startsWith('blob:')) {
      URL.revokeObjectURL(generatedVideoUrl);
    }
    
    setMediaFile(file);
    
    if (file && videoGenerated) {
      try {
        const newUrl = URL.createObjectURL(file);
        setGeneratedVideoUrl(newUrl);
      } catch (err) {
        console.error("Error creating object URL:", err);
        toast.error("Failed to process uploaded media");
      }
    }
  }, [generatedVideoUrl, videoGenerated]);

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt to generate your video");
      return;
    }

    if (generatedVideoUrl && generatedVideoUrl.startsWith('blob:')) {
      URL.revokeObjectURL(generatedVideoUrl);
    }

    setIsGenerating(true);
    setIsPlaying(false);
    
    setTimeout(() => {
      try {
        let videoUrl = "";
        
        if (mediaFile) {
          if (mediaFile.type.startsWith('video/')) {
            videoUrl = URL.createObjectURL(mediaFile);
          } else if (mediaFile.type.startsWith('image/')) {
            videoUrl = sampleVideos[Math.floor(Math.random() * sampleVideos.length)];
          }
        } else {
          videoUrl = sampleVideos[Math.floor(Math.random() * sampleVideos.length)];
        }
        
        setGeneratedVideoUrl(videoUrl);
        setIsGenerating(false);
        setVideoGenerated(true);
        toast.success("Your video has been generated successfully!");
      } catch (err) {
        setIsGenerating(false);
        toast.error("Failed to generate video", {
          description: err instanceof Error ? err.message : "Unknown error occurred"
        });
      }
    }, 3000);
  };
  
  const togglePlayPause = () => {
    if (!videoRef.current) return;
    
    try {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch(error => {
              console.error("Playback error:", error);
              setIsPlaying(false);
              toast.error("Couldn't play video", {
                description: "There was a problem with the video playback."
              });
            });
        }
      }
    } catch (err) {
      console.error("Toggle play/pause error:", err);
      setIsPlaying(false);
      toast.error("Playback control error", {
        description: err instanceof Error ? err.message : "Unknown error occurred"
      });
    }
  };
  
  const handleDownload = () => {
    if (!generatedVideoUrl) return;
    
    try {
      const a = document.createElement('a');
      a.href = generatedVideoUrl;
      a.download = `AI-generated-video-${Date.now()}.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      toast.success("Video download started!");
    } catch (err) {
      console.error("Download error:", err);
      toast.error("Download failed", {
        description: err instanceof Error ? err.message : "Could not download the video."
      });
    }
  };
  
  return (
    <div className="flex flex-col lg:flex-row h-full w-full gap-6">
      <div className="w-full lg:w-1/3 flex flex-col bg-white/50 backdrop-blur-md rounded-2xl border border-border shadow-sm">
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <div className="p-4 border-b border-border">
            <TabsList className="w-full grid grid-cols-4">
              <TabsTrigger value="prompt" className="rounded-lg">
                <Sparkles className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Prompt</span>
              </TabsTrigger>
              <TabsTrigger value="media" className="rounded-lg">
                <Image className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Media</span>
              </TabsTrigger>
              <TabsTrigger value="style" className="rounded-lg">
                <LayoutGrid className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Style</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="rounded-lg">
                <Settings className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Settings</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="p-4 flex-1 overflow-y-auto">
            <TabsContent value="prompt" className="mt-0 h-full">
              <PromptTab 
                prompt={prompt} 
                setPrompt={setPrompt} 
                duration={duration} 
                setDuration={setDuration} 
              />
            </TabsContent>
            
            <TabsContent value="media" className="mt-0">
              <MediaTab 
                onMediaUpload={handleMediaUpload}
                selectedMusic={selectedMusic}
                setSelectedMusic={setSelectedMusic}
              />
            </TabsContent>
            
            <TabsContent value="style" className="mt-0">
              <StyleTab />
            </TabsContent>
            
            <TabsContent value="settings" className="mt-0">
              <SettingsTab />
            </TabsContent>
          </div>
          
          <div className="p-4 border-t border-border">
            <Button 
              className="w-full group"
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <span className="loader mr-2 h-5 w-5 border-2 border-current after:border-2 after:border-primary" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                  Generate Video
                </>
              )}
            </Button>
          </div>
        </Tabs>
      </div>
      
      <VideoPreview 
        videoGenerated={videoGenerated}
        isGenerating={isGenerating}
        generatedVideoUrl={generatedVideoUrl}
        videoRef={videoRef}
        isPlaying={isPlaying}
        togglePlayPause={togglePlayPause}
        handleDownload={handleDownload}
      />
    </div>
  );
};

export default VideoEditor;
