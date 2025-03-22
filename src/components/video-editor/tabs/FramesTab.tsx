
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Loader2, Film, ImagePlus, Lightbulb, Wand2 } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

interface FramesTabProps {
  onGenerateFrames: (params: { 
    prompt: string; 
    numberOfFrames: number; 
    style: string;
    variationStrength?: number;
    autoImprove?: boolean;
  }) => Promise<void>;
  isGeneratingFrames: boolean;
  generatedFrames: string[];
  selectedStyle: string;
  autoGenerateFrames?: boolean;
  toggleAutoGenerateFrames?: (value: boolean) => void;
  frameGenerationSettings?: {
    variationStrength: number;
    autoImprove: boolean;
  };
  updateFrameGenerationSettings?: (settings: {
    variationStrength?: number;
    autoImprove?: boolean;
  }) => void;
}

const FramesTab: React.FC<FramesTabProps> = ({
  onGenerateFrames,
  isGeneratingFrames,
  generatedFrames,
  selectedStyle,
  autoGenerateFrames = false,
  toggleAutoGenerateFrames = () => {},
  frameGenerationSettings = {
    variationStrength: 0.3,
    autoImprove: true
  },
  updateFrameGenerationSettings = () => {}
}) => {
  const [framePrompt, setFramePrompt] = useState("");
  const [numberOfFrames, setNumberOfFrames] = useState(3);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);

  // Simulate progress during generation
  React.useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isGeneratingFrames) {
      setGenerationProgress(0);
      interval = setInterval(() => {
        setGenerationProgress(prev => {
          const newProgress = prev + (100 - prev) * 0.1;
          return newProgress > 95 ? 95 : newProgress;
        });
      }, 500);
    } else if (generatedFrames.length > 0) {
      setGenerationProgress(100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isGeneratingFrames, generatedFrames.length]);

  const handleGenerateFrames = async () => {
    if (!framePrompt.trim()) {
      toast.error("Please enter a prompt for the frames");
      return;
    }

    try {
      await onGenerateFrames({ 
        prompt: framePrompt, 
        numberOfFrames, 
        style: selectedStyle,
        variationStrength: frameGenerationSettings.variationStrength,
        autoImprove: frameGenerationSettings.autoImprove
      });
    } catch (error) {
      console.error("Frame generation error:", error);
      toast.error("Failed to generate frames");
    }
  };
  
  const handleVariationStrengthChange = (values: number[]) => {
    updateFrameGenerationSettings({ variationStrength: values[0] });
  };
  
  const handleAutoImproveChange = (checked: boolean) => {
    updateFrameGenerationSettings({ autoImprove: checked });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">AI Frame Generation</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm">Auto-generate</span>
          <Switch 
            checked={autoGenerateFrames} 
            onCheckedChange={toggleAutoGenerateFrames}
            disabled={isGeneratingFrames}
          />
        </div>
      </div>
      
      {autoGenerateFrames && (
        <div className="bg-accent/20 p-4 rounded-lg border border-accent">
          <div className="flex items-start gap-3">
            <Wand2 className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-medium">Auto Frame Generation Active</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Frames will be automatically generated as you type your main prompt or change style settings.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        <Label htmlFor="frame-prompt" className="text-base font-semibold">
          Frame Description
        </Label>
        <Input
          id="frame-prompt"
          placeholder="Describe the frames you want to generate..."
          value={framePrompt}
          onChange={(e) => setFramePrompt(e.target.value)}
          disabled={isGeneratingFrames}
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-semibold">Number of Frames</Label>
          <span className="text-sm font-medium">{numberOfFrames}</span>
        </div>
        <Slider
          min={1}
          max={10}
          step={1}
          value={[numberOfFrames]}
          onValueChange={(value) => setNumberOfFrames(value[0])}
          disabled={isGeneratingFrames}
        />
        <p className="text-xs text-muted-foreground">
          Each frame will be generated based on your prompt and selected style.
        </p>
      </div>
      
      <div className="space-y-2">
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
        >
          <Label className="text-base font-semibold cursor-pointer">Advanced Settings</Label>
          <Button variant="ghost" size="sm">
            {showAdvancedSettings ? "Hide" : "Show"}
          </Button>
        </div>
        
        {showAdvancedSettings && (
          <div className="space-y-4 p-4 border rounded-md bg-background/50">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm">Variation Strength</Label>
                <span className="text-xs font-medium">{frameGenerationSettings.variationStrength.toFixed(1)}</span>
              </div>
              <Slider
                min={0.1}
                max={1.0}
                step={0.1}
                value={[frameGenerationSettings.variationStrength]}
                onValueChange={handleVariationStrengthChange}
                disabled={isGeneratingFrames}
              />
              <p className="text-xs text-muted-foreground">
                Higher values create more varied frames, lower values keep frames more consistent.
              </p>
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <div>
                <Label className="text-sm">Auto-improve Quality</Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Enhances frame quality with additional AI processing
                </p>
              </div>
              <Switch 
                checked={frameGenerationSettings.autoImprove} 
                onCheckedChange={handleAutoImproveChange}
                disabled={isGeneratingFrames}
              />
            </div>
          </div>
        )}
      </div>

      <div className="pt-3">
        <Button
          onClick={handleGenerateFrames}
          className="w-full"
          disabled={isGeneratingFrames || !framePrompt.trim()}
        >
          {isGeneratingFrames ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Generating Frames...
            </>
          ) : (
            <>
              <Film className="h-4 w-4 mr-2" />
              Generate Video Frames
            </>
          )}
        </Button>
      </div>

      {isGeneratingFrames && (
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-sm">
            <span>Generating frames...</span>
            <span>{Math.round(generationProgress)}%</span>
          </div>
          <Progress value={generationProgress} className="h-2" />
        </div>
      )}

      {generatedFrames.length > 0 && (
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Generated Frames</h3>
            <Badge variant="outline" className="font-normal">
              {generatedFrames.length} frames
            </Badge>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {generatedFrames.map((frame, index) => (
              <Card key={index} className="overflow-hidden border border-border">
                <div className="aspect-video bg-black relative">
                  <img
                    src={frame}
                    alt={`Generated frame ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                    {index + 1}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FramesTab;
