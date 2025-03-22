
import React, { useState, useRef } from "react";
import { toast } from "sonner";
import VideoControls from "./VideoControls";
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
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Sample video URLs for demo purposes
  const sampleVideos = [
    "https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-the-coast-of-a-greek-city-2413-large.mp4"
  ];
  
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState("");
  
  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt to generate your video");
      return;
    }

    setIsGenerating(true);
    
    // Simulate video generation
    setTimeout(() => {
      // Select a random sample video for demonstration
      const randomVideo = sampleVideos[Math.floor(Math.random() * sampleVideos.length)];
      setGeneratedVideoUrl(randomVideo);
      setIsGenerating(false);
      setVideoGenerated(true);
      toast.success("Your video has been generated successfully!");
    }, 3000);
  };
  
  const togglePlayPause = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    
    setIsPlaying(!isPlaying);
  };
  
  const handleDownload = () => {
    if (!generatedVideoUrl) return;
    
    // Create a temporary anchor element to trigger download
    const a = document.createElement('a');
    a.href = generatedVideoUrl;
    a.download = `AI-generated-video-${Date.now()}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast.success("Video download started!");
  };
  
  return (
    <div className="flex flex-col lg:flex-row h-full w-full gap-6">
      {/* Editor Panel */}
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
              <MediaTab />
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
      
      {/* Preview Panel */}
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
