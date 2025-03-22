
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Sparkles, Upload, Sliders, TextIcon, Film } from "lucide-react";
import PromptTab from "./tabs/PromptTab";
import MediaTab from "./tabs/MediaTab";
import StyleTab from "./tabs/StyleTab";
import SettingsTab from "./tabs/SettingsTab";
import FramesTab from "./tabs/FramesTab";

interface EditorTabsProps {
  tab: string;
  setTab: (tab: string) => void;
  prompt: string;
  setPrompt: (prompt: string) => void;
  duration: number;
  setDuration: (duration: number) => void;
  selectedMusic: string;
  setSelectedMusic: (music: string) => void;
  onMediaUpload: (file: File | null) => void;
  handleGenerate: () => void;
  isGenerating: boolean;
  isAnalyzing?: boolean;
  analyzedTags?: string[];
  aspectRatio: string;
  setAspectRatio: (ratio: string) => void;
  onStyleChange: (style: string) => void;
  onTransitionChange: (transition: string) => void;
  onTextOverlayChange: (enabled: boolean, text?: string) => void;
  // Add props for frame generation
  isGeneratingFrames?: boolean;
  generatedFrames?: string[];
  generateFrames?: (params: { prompt: string; numberOfFrames: number; style: string }) => Promise<void>;
}

const EditorTabs: React.FC<EditorTabsProps> = ({
  tab,
  setTab,
  prompt,
  setPrompt,
  duration,
  setDuration,
  selectedMusic,
  setSelectedMusic,
  onMediaUpload,
  handleGenerate,
  isGenerating,
  isAnalyzing = false,
  analyzedTags = [],
  aspectRatio,
  setAspectRatio,
  onStyleChange,
  onTransitionChange,
  onTextOverlayChange,
  // New props
  isGeneratingFrames = false,
  generatedFrames = [],
  generateFrames
}) => {
  return (
    <>
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="prompt" className="flex flex-col py-2 h-auto">
            <Sparkles className="h-4 w-4 mb-1" />
            <span className="text-xs">Prompt</span>
          </TabsTrigger>
          <TabsTrigger value="media" className="flex flex-col py-2 h-auto">
            <Upload className="h-4 w-4 mb-1" />
            <span className="text-xs">Media</span>
          </TabsTrigger>
          <TabsTrigger value="frames" className="flex flex-col py-2 h-auto">
            <Film className="h-4 w-4 mb-1" />
            <span className="text-xs">Frames</span>
          </TabsTrigger>
          <TabsTrigger value="style" className="flex flex-col py-2 h-auto">
            <TextIcon className="h-4 w-4 mb-1" />
            <span className="text-xs">Style</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex flex-col py-2 h-auto">
            <Sliders className="h-4 w-4 mb-1" />
            <span className="text-xs">Settings</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="prompt" className="p-4">
          <PromptTab 
            prompt={prompt} 
            setPrompt={setPrompt} 
            duration={duration}
            setDuration={setDuration}
          />
        </TabsContent>
        
        <TabsContent value="media" className="p-4">
          <MediaTab 
            onMediaUpload={onMediaUpload}
            selectedMusic={selectedMusic}
            setSelectedMusic={setSelectedMusic}
            isAnalyzing={isAnalyzing}
            analyzedTags={analyzedTags}
          />
        </TabsContent>

        <TabsContent value="frames" className="p-4">
          {generateFrames && (
            <FramesTab
              onGenerateFrames={generateFrames}
              isGeneratingFrames={isGeneratingFrames}
              generatedFrames={generatedFrames}
              selectedStyle={tab === "style" ? "Vibrant" : ""}
            />
          )}
        </TabsContent>
        
        <TabsContent value="style" className="p-4">
          <StyleTab
            onStyleChange={onStyleChange}
            onTransitionChange={onTransitionChange}
            onTextOverlayChange={onTextOverlayChange}
          />
        </TabsContent>
        
        <TabsContent value="settings" className="p-4">
          <SettingsTab 
            aspectRatio={aspectRatio}
            setAspectRatio={setAspectRatio}
          />
        </TabsContent>
      </Tabs>
      
      <div className="p-4 mt-auto border-t">
        <Button 
          onClick={handleGenerate}
          className="w-full" 
          size="lg"
          disabled={isGenerating}
        >
          {isGenerating ? "Generating..." : "Generate Video"}
        </Button>
        <p className="text-xs text-center text-muted-foreground mt-2">
          {generatedFrames && generatedFrames.length > 0 
            ? `Using ${generatedFrames.length} AI-generated frames` 
            : "Generate a video using AI"}
        </p>
      </div>
    </>
  );
};

export default EditorTabs;
