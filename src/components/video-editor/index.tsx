
import React, { useState } from "react";
import VideoPreview from "./VideoPreview";
import EditorTabs from "./EditorTabs";
import { useVideoGeneration } from "./hooks/useVideoGeneration";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

const VideoEditor = () => {
  const [tab, setTab] = useState("prompt");
  
  const {
    prompt,
    setPrompt,
    isGenerating,
    videoGenerated,
    duration,
    setDuration,
    isPlaying,
    selectedMusic,
    setSelectedMusic,
    isAnalyzing,
    analyzedTags,
    selectedStyle,
    transitionEffect,
    textOverlay,
    aspectRatio,
    generatedVideoUrl,
    videoRef,
    handleMediaUpload,
    handleGenerate,
    togglePlayPause,
    handleDownload,
    handleStyleChange,
    handleTransitionChange,
    handleTextOverlayChange,
    handleAspectRatioChange,
    // New frame generation properties
    isGeneratingFrames,
    generatedFrames,
    generateFrames
  } = useVideoGeneration();
  
  // Check if the Replicate API key is configured
  const checkApiKeyConfiguration = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('generate-video-frames', {
        body: { checkConfig: true }
      });
      
      if (error || (data && data.error)) {
        console.warn("API Key configuration issue:", error || data.error);
        toast.warning("Replicate API key may not be configured", {
          description: "Frame generation might not work correctly. Contact the administrator.",
          duration: 5000,
        });
      }
    } catch (err) {
      console.error("Configuration check error:", err);
    }
  };
  
  React.useEffect(() => {
    // Check API key configuration on component mount
    checkApiKeyConfiguration();
  }, []);
  
  return (
    <div className="flex flex-col lg:flex-row h-full w-full gap-6">
      <div className="w-full lg:w-1/3 flex flex-col bg-white/50 backdrop-blur-md rounded-2xl border border-border shadow-sm">
        <EditorTabs
          tab={tab}
          setTab={setTab}
          prompt={prompt}
          setPrompt={setPrompt}
          duration={duration}
          setDuration={setDuration}
          selectedMusic={selectedMusic}
          setSelectedMusic={setSelectedMusic}
          onMediaUpload={handleMediaUpload}
          handleGenerate={handleGenerate}
          isGenerating={isGenerating}
          isAnalyzing={isAnalyzing}
          analyzedTags={analyzedTags}
          aspectRatio={aspectRatio}
          setAspectRatio={handleAspectRatioChange}
          onStyleChange={handleStyleChange}
          onTransitionChange={handleTransitionChange}
          onTextOverlayChange={handleTextOverlayChange}
          // Add frame generation props
          isGeneratingFrames={isGeneratingFrames}
          generatedFrames={generatedFrames}
          generateFrames={generateFrames}
        />
      </div>
      
      <VideoPreview 
        videoGenerated={videoGenerated}
        isGenerating={isGenerating}
        generatedVideoUrl={generatedVideoUrl}
        videoRef={videoRef}
        isPlaying={isPlaying}
        togglePlayPause={togglePlayPause}
        handleDownload={handleDownload}
        textOverlay={textOverlay}
      />
    </div>
  );
};

export default VideoEditor;
