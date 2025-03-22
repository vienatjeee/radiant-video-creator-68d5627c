
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Loader2, Film, ImagePlus } from "lucide-react";
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

interface FramesTabProps {
  onGenerateFrames: (params: { prompt: string; numberOfFrames: number; style: string }) => Promise<void>;
  isGeneratingFrames: boolean;
  generatedFrames: string[];
  selectedStyle: string;
}

const FramesTab: React.FC<FramesTabProps> = ({
  onGenerateFrames,
  isGeneratingFrames,
  generatedFrames,
  selectedStyle,
}) => {
  const [framePrompt, setFramePrompt] = useState("");
  const [numberOfFrames, setNumberOfFrames] = useState(3);
  const [generationProgress, setGenerationProgress] = useState(0);

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
        style: selectedStyle 
      });
    } catch (error) {
      console.error("Frame generation error:", error);
      toast.error("Failed to generate frames");
    }
  };

  return (
    <div className="space-y-6">
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
          max={5}
          step={1}
          value={[numberOfFrames]}
          onValueChange={(value) => setNumberOfFrames(value[0])}
          disabled={isGeneratingFrames}
        />
        <p className="text-xs text-muted-foreground">
          Each frame will be generated based on your prompt and selected style.
        </p>
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
