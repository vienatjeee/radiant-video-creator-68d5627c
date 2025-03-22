
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Wand2, Play, Download, Settings, Image, Music, Video, Sparkles, LayoutGrid, Layers, Type } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const VideoEditor = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [tab, setTab] = useState("prompt");
  const [videoGenerated, setVideoGenerated] = useState(false);
  
  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt to generate your video");
      return;
    }

    setIsGenerating(true);
    
    // Simulate video generation
    setTimeout(() => {
      setIsGenerating(false);
      setVideoGenerated(true);
      toast.success("Your video has been generated successfully!");
    }, 3000);
  };
  
  return (
    <div className="flex flex-col lg:flex-row h-full w-full gap-6">
      {/* Editor Panel */}
      <div className="w-full lg:w-1/3 flex flex-col bg-white/50 backdrop-blur-md rounded-2xl border border-border shadow-sm">
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
                  <Label htmlFor="duration">Duration</Label>
                  <div className="flex items-center gap-4 mt-1.5">
                    <Slider
                      id="duration"
                      defaultValue={[15]}
                      max={60}
                      step={5}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium w-12">15s</span>
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
            </TabsContent>
            
            <TabsContent value="media" className="mt-0">
              <div className="space-y-4">
                <div>
                  <Label>Background music</Label>
                  <div className="grid grid-cols-2 gap-3 mt-1.5">
                    {["Ambient", "Electronic", "Cinematic", "Upbeat", "Dramatic", "Inspirational"].map((genre) => (
                      <div
                        key={genre}
                        className="flex items-center justify-center gap-2 p-3 rounded-lg border border-border bg-background hover:bg-accent/50 cursor-pointer transition-colors"
                      >
                        <Music className="h-4 w-4" />
                        <span className="text-sm">{genre}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label>Upload media (optional)</Label>
                  <div className="mt-1.5 border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <div className="flex flex-col items-center">
                      <Image className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">Drag and drop or click to upload</p>
                      <Button variant="outline" size="sm">Browse files</Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="style" className="mt-0">
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
            </TabsContent>
            
            <TabsContent value="settings" className="mt-0">
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
      </div>
      
      {/* Preview Panel */}
      <div className="flex-1 bg-black/5 backdrop-blur-sm rounded-2xl border border-border overflow-hidden flex flex-col">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="font-medium">Preview</h3>
          
          <div className="flex items-center gap-2">
            {videoGenerated && (
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            )}
            {videoGenerated && (
              <Button variant="outline" size="sm">
                <Play className="h-4 w-4 mr-2" />
                Play
              </Button>
            )}
          </div>
        </div>
        
        <div className="relative flex-1 flex items-center justify-center bg-black/90">
          {videoGenerated ? (
            <img 
              src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
              alt="Generated video preview"
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="text-center p-6">
              <div className="flex flex-col items-center justify-center gap-4">
                <Video className="h-12 w-12 text-white/30" />
                <p className="text-white/70">
                  {isGenerating ? "Generating your video..." : "Configure your video and click Generate"}
                </p>
              </div>
            </div>
          )}
          
          {isGenerating && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-4">
                <span className="loader h-12 w-12 border-[3px]" />
                <p className="text-white font-medium animate-pulse">Creating your masterpiece...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoEditor;
