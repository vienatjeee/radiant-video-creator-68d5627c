
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

const SettingsTab: React.FC = () => {
  return (
    <div className="space-y-4">
      <div>
        <Label>Output format</Label>
        <Select defaultValue="mp4">
          <SelectTrigger className="mt-1.5">
            <SelectValue placeholder="Select video format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mp4">MP4</SelectItem>
            <SelectItem value="mov">MOV</SelectItem>
            <SelectItem value="webm">WebM</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label>Resolution</Label>
        <Select defaultValue="1080p">
          <SelectTrigger className="mt-1.5">
            <SelectValue placeholder="Select resolution" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="720p">HD (720p)</SelectItem>
            <SelectItem value="1080p">Full HD (1080p)</SelectItem>
            <SelectItem value="4k">4K</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label>Quality settings</Label>
        <div className="mt-1.5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm">Quality</span>
            <span className="text-sm font-medium">High</span>
          </div>
          <Slider defaultValue={[75]} max={100} step={25} />
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch id="auto-enhance" defaultChecked />
        <Label htmlFor="auto-enhance">Auto-enhance video</Label>
      </div>
    </div>
  );
};

export default SettingsTab;
