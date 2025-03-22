
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
}

const PromptTab: React.FC<PromptTabProps> = ({ prompt, setPrompt, duration, setDuration }) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="prompt">Describe your video</Label>
        <Textarea
          id="prompt"
          placeholder="Describe the video you want to create..."
          className="mt-1.5 h-32 resize-none"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
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
        <Select defaultValue="16:9">
          <SelectTrigger id="aspect" className="mt-1.5">
            <SelectValue placeholder="Select aspect ratio" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="16:9">Landscape (16:9)</SelectItem>
            <SelectItem value="9:16">Portrait (9:16)</SelectItem>
            <SelectItem value="1:1">Square (1:1)</SelectItem>
            <SelectItem value="4:5">Instagram (4:5)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PromptTab;
