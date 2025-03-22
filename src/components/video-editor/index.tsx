
import React, { useState } from "react";
import VideoPreview from "./VideoPreview";
import EditorTabs from "./EditorTabs";
import { useVideoGeneration } from "./hooks/useVideoGeneration";

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
    generatedVideoUrl,
    videoRef,
    handleMediaUpload,
    handleGenerate,
    togglePlayPause,
    handleDownload
  } = useVideoGeneration();
  
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
      />
    </div>
  );
};

export default VideoEditor;
