
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Paintbrush, Type, Wand2 } from "lucide-react";

interface StyleTabProps {
  onStyleChange?: (style: string) => void;
  onTransitionChange?: (transition: string) => void;
  onTextOverlayChange?: (enabled: boolean, text?: string) => void;
}

const StyleTab: React.FC<StyleTabProps> = ({ 
  onStyleChange,
  onTransitionChange,
  onTextOverlayChange
}) => {
  const [textOverlayEnabled, setTextOverlayEnabled] = useState(false);
  const [textOverlay, setTextOverlay] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("Vibrant");
  const [transitionType, setTransitionType] = useState("fade");
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [textSize, setTextSize] = useState(24);
  
  const handleStyleSelect = (style: string) => {
    setSelectedStyle(style);
    onStyleChange && onStyleChange(style);
  };
  
  const handleTransitionChange = (transition: string) => {
    setTransitionType(transition);
    onTransitionChange && onTransitionChange(transition);
  };
  
  const handleTextOverlayToggle = (checked: boolean) => {
    setTextOverlayEnabled(checked);
    onTextOverlayChange && onTextOverlayChange(checked, textOverlay);
  };
  
  const handleTextOverlayChange = (text: string) => {
    setTextOverlay(text);
    if (textOverlayEnabled) {
      onTextOverlayChange && onTextOverlayChange(textOverlayEnabled, text);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-semibold">Visual style</Label>
        <div className="grid grid-cols-3 gap-3 mt-3">
          {["Vibrant", "Muted", "Dramatic", "Vintage", "Minimalist", "Dark"].map((style) => (
            <div
              key={style}
              className={`aspect-video flex items-center justify-center rounded-lg border cursor-pointer transition-colors ${
                selectedStyle === style 
                  ? "border-primary bg-primary/10" 
                  : "border-border bg-background hover:bg-accent/50"
              }`}
              onClick={() => handleStyleSelect(style)}
            >
              <span className="text-sm font-medium">{style}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <Label className="text-base font-semibold">Style Presets</Label>
        <RadioGroup defaultValue="cinematic" className="grid grid-cols-2 gap-2 mt-3">
          <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-accent/50 cursor-pointer">
            <RadioGroupItem value="cinematic" id="cinematic" />
            <Label htmlFor="cinematic" className="cursor-pointer font-normal">Cinematic</Label>
          </div>
          <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-accent/50 cursor-pointer">
            <RadioGroupItem value="documentary" id="documentary" />
            <Label htmlFor="documentary" className="cursor-pointer font-normal">Documentary</Label>
          </div>
          <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-accent/50 cursor-pointer">
            <RadioGroupItem value="social" id="social" />
            <Label htmlFor="social" className="cursor-pointer font-normal">Social Media</Label>
          </div>
          <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-accent/50 cursor-pointer">
            <RadioGroupItem value="abstract" id="abstract" />
            <Label htmlFor="abstract" className="cursor-pointer font-normal">Abstract</Label>
          </div>
        </RadioGroup>
      </div>
      
      <div>
        <Label className="text-base font-semibold">Color Adjustments</Label>
        <div className="space-y-3 mt-3">
          <div>
            <div className="flex justify-between">
              <Label htmlFor="brightness" className="text-sm">Brightness</Label>
              <span className="text-xs text-muted-foreground">75%</span>
            </div>
            <Slider defaultValue={[75]} max={100} step={1} className="mt-1" />
          </div>
          <div>
            <div className="flex justify-between">
              <Label htmlFor="contrast" className="text-sm">Contrast</Label>
              <span className="text-xs text-muted-foreground">50%</span>
            </div>
            <Slider defaultValue={[50]} max={100} step={1} className="mt-1" />
          </div>
          <div>
            <div className="flex justify-between">
              <Label htmlFor="saturation" className="text-sm">Saturation</Label>
              <span className="text-xs text-muted-foreground">60%</span>
            </div>
            <Slider defaultValue={[60]} max={100} step={1} className="mt-1" />
          </div>
        </div>
      </div>
      
      <div>
        <div className="flex items-center justify-between">
          <Label className="text-base font-semibold">Text overlay</Label>
          <Switch 
            id="text-overlay" 
            checked={textOverlayEnabled}
            onCheckedChange={handleTextOverlayToggle}
          />
        </div>
        
        {textOverlayEnabled && (
          <div className="space-y-3 mt-3">
            <Input 
              placeholder="Text to display..." 
              value={textOverlay}
              onChange={(e) => handleTextOverlayChange(e.target.value)}
            />
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="text-color" className="text-sm">Text Color</Label>
                <div className="flex mt-1 gap-2">
                  <div className="w-8 h-8 rounded border overflow-hidden">
                    <input 
                      type="color" 
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-10 h-10 -m-1" 
                    />
                  </div>
                  <Input 
                    value={textColor} 
                    onChange={(e) => setTextColor(e.target.value)} 
                    className="flex-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="text-size" className="text-sm">Text Size</Label>
                <div className="flex mt-1 gap-2 items-center">
                  <Slider 
                    value={[textSize]} 
                    min={12} 
                    max={48} 
                    step={1} 
                    className="flex-1" 
                    onValueChange={(val) => setTextSize(val[0])}
                  />
                  <span className="text-sm w-8 text-right">{textSize}</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 mt-2">
              <Button size="sm" variant="outline" className="text-xs">
                <Type className="h-3 w-3 mr-1" />
                Top
              </Button>
              <Button size="sm" variant="outline" className="text-xs">
                <Type className="h-3 w-3 mr-1" />
                Middle
              </Button>
              <Button size="sm" variant="outline" className="text-xs">
                <Type className="h-3 w-3 mr-1" />
                Bottom
              </Button>
            </div>
          </div>
        )}
      </div>
      
      <div>
        <Label className="text-base font-semibold">Transitions</Label>
        <Select 
          value={transitionType}
          onValueChange={handleTransitionChange}
        >
          <SelectTrigger className="mt-3">
            <SelectValue placeholder="Select transition type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fade">Fade</SelectItem>
            <SelectItem value="slide">Slide</SelectItem>
            <SelectItem value="zoom">Zoom</SelectItem>
            <SelectItem value="wipe">Wipe</SelectItem>
            <SelectItem value="dissolve">Dissolve</SelectItem>
            <SelectItem value="none">None</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Button variant="outline" className="w-full gap-2 mt-4">
          <Wand2 className="h-4 w-4" />
          Apply Style to Video
        </Button>
      </div>
    </div>
  );
};

export default StyleTab;
