
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Image, LayoutGrid, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import PromptTab from "./tabs/PromptTab";
import MediaTab from "./tabs/MediaTab";
import StyleTab from "./tabs/StyleTab";
import SettingsTab from "./tabs/SettingsTab";

interface EditorTabsProps {
  tab: string;
  setTab: (value: string) => void;
  prompt: string;
  setPrompt: (value: string) => void;
  duration: number;
  setDuration: (value: number) => void;
  selectedMusic: string;
  setSelectedMusic: (value: string) => void;
  onMediaUpload: (file: File | null) => void;
  handleGenerate: () => void;
  isGenerating: boolean;
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
  isGenerating
}) => {
  return (
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
            onMediaUpload={onMediaUpload}
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
  );
};

export default EditorTabs;
