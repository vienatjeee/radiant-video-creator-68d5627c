
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface PromptTabProps {
  prompt: string;
  setPrompt: (value: string) => void;
  duration: number;
  setDuration: (value: number) => void;
  aspectRatio?: string;
  setAspectRatio?: (value: string) => void;
}

const PromptTab: React.FC<PromptTabProps> = ({ 
  prompt, 
  setPrompt, 
  duration, 
  setDuration,
  aspectRatio = "16:9",
  setAspectRatio 
}) => {
  const promptTemplates = [
    "A cinematic journey through [location] with [mood] atmosphere",
    "A documentary-style exploration of [subject]",
    "[action] in slow motion with dramatic lighting",
    "A day in the life of [character] with [style] aesthetics"
  ];

  const handleApplyTemplate = (template: string) => {
    setPrompt(template);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="prompt">Describe your video</Label>
        <div className="relative">
          <Textarea
            id="prompt"
            placeholder="Describe the video you want to create..."
            className="mt-1.5 h-32 resize-none pr-24"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          {prompt.length > 0 && (
            <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-background px-1.5 py-0.5 rounded border">
              {prompt.length} chars
            </div>
          )}
        </div>
        
        <div className="mt-2">
          <Label htmlFor="templates" className="text-sm">Templates</Label>
          <div className="grid grid-cols-1 gap-1 mt-1">
            {promptTemplates.map((template, index) => (
              <button
                key={index}
                className="text-xs text-left bg-accent/30 hover:bg-accent/50 rounded px-2 py-1.5 transition-colors"
                onClick={() => handleApplyTemplate(template)}
              >
                {template}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div>
        <Label htmlFor="style">Video style</Label>
        <Select defaultValue="cinematic">
          <SelectTrigger id="style" className="mt-1.5">
            <SelectValue placeholder="Select style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cinematic">Cinematic</SelectItem>
            <SelectItem value="animated">Animated</SelectItem>
            <SelectItem value="documentary">Documentary</SelectItem>
            <SelectItem value="vintage">Vintage</SelectItem>
            <SelectItem value="minimalist">Minimalist</SelectItem>
            <SelectItem value="social">Social Media</SelectItem>
            <SelectItem value="vlog">Vlog Style</SelectItem>
            <SelectItem value="corporate">Corporate</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="duration">Duration (up to 10 minutes)</Label>
        <div className="flex items-center gap-4 mt-1.5">
          <Slider
            id="duration"
            defaultValue={[15]}
            value={[duration]}
            max={600}
            step={15}
            className="flex-1"
            onValueChange={(value) => setDuration(value[0])}
          />
          <span className="text-sm font-medium w-16">
            {duration >= 60 ? 
              `${Math.floor(duration / 60)}m ${duration % 60}s` : 
              `${duration}s`}
          </span>
        </div>
      </div>
      
      <div>
        <Label htmlFor="aspect">Aspect ratio</Label>
        <Select 
          value={aspectRatio} 
          onValueChange={(value) => setAspectRatio && setAspectRatio(value)}
        >
          <SelectTrigger id="aspect" className="mt-1.5">
            <SelectValue placeholder="Select aspect ratio" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="16:9">Landscape (16:9)</SelectItem>
            <SelectItem value="9:16">Portrait (9:16)</SelectItem>
            <SelectItem value="1:1">Square (1:1)</SelectItem>
            <SelectItem value="4:5">Instagram (4:5)</SelectItem>
            <SelectItem value="2.35:1">Cinematic (2.35:1)</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="grid grid-cols-5 gap-1 mt-2">
          <div className={`aspect-video border rounded flex items-center justify-center ${aspectRatio === "16:9" ? "border-primary bg-primary/5" : "border-border"}`}>
            16:9
          </div>
          <div className={`aspect-[9/16] border rounded flex items-center justify-center ${aspectRatio === "9:16" ? "border-primary bg-primary/5" : "border-border"}`}>
            9:16
          </div>
          <div className={`aspect-square border rounded flex items-center justify-center ${aspectRatio === "1:1" ? "border-primary bg-primary/5" : "border-border"}`}>
            1:1
          </div>
          <div className={`aspect-[4/5] border rounded flex items-center justify-center ${aspectRatio === "4:5" ? "border-primary bg-primary/5" : "border-border"}`}>
            4:5
          </div>
          <div className={`aspect-[2.35/1] border rounded flex items-center justify-center ${aspectRatio === "2.35:1" ? "border-primary bg-primary/5" : "border-border"}`}>
            2.35:1
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptTab;
