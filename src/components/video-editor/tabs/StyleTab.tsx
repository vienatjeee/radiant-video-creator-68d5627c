
import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const StyleTab: React.FC = () => {
  return (
    <div className="space-y-4">
      <div>
        <Label>Visual style</Label>
        <div className="grid grid-cols-3 gap-3 mt-1.5">
          {["Vibrant", "Muted", "Dramatic", "Vintage", "Minimalist", "Dark"].map((style) => (
            <div
              key={style}
              className="aspect-video flex items-center justify-center rounded-lg border border-border bg-background hover:bg-accent/50 cursor-pointer transition-colors"
            >
              <span className="text-sm">{style}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <Label>Text overlay</Label>
        <div className="flex items-center space-x-2 mt-1.5">
          <Switch id="text-overlay" />
          <Label htmlFor="text-overlay">Enable text overlay</Label>
        </div>
        <Input className="mt-3" placeholder="Text to display..." disabled />
      </div>
      
      <div>
        <Label>Transitions</Label>
        <Select defaultValue="fade">
          <SelectTrigger className="mt-1.5">
            <SelectValue placeholder="Select transition type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fade">Fade</SelectItem>
            <SelectItem value="slide">Slide</SelectItem>
            <SelectItem value="zoom">Zoom</SelectItem>
            <SelectItem value="wipe">Wipe</SelectItem>
            <SelectItem value="none">None</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default StyleTab;
