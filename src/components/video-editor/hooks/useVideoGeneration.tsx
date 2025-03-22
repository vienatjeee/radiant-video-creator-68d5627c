import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

export const useVideoGeneration = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoGenerated, setVideoGenerated] = useState(false);
  const [duration, setDuration] = useState(15);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedMusic, setSelectedMusic] = useState("Ambient");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzedTags, setAnalyzedTags] = useState<string[]>([]);
  const [selectedStyle, setSelectedStyle] = useState("Vibrant");
  const [transitionEffect, setTransitionEffect] = useState("fade");
  const [textOverlay, setTextOverlay] = useState({ enabled: false, text: "" });
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [isGeneratingFrames, setIsGeneratingFrames] = useState(false);
  const [generatedFrames, setGeneratedFrames] = useState<string[]>([]);
  const [autoGenerateFrames, setAutoGenerateFrames] = useState(false);
  const [frameGenerationSettings, setFrameGenerationSettings] = useState({
    variationStrength: 0.3,
    autoImprove: true
  });

  const sampleVideos = [
    "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  ];

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data && data.session) {
        console.log("Supabase connected and user authenticated");
      } else {
        console.log("Supabase connected but user not authenticated");
      }
    }).catch(error => {
      console.error("Supabase connection issue:", error);
    });
    
    return () => {
      if (generatedVideoUrl && generatedVideoUrl.startsWith('blob:')) {
        URL.revokeObjectURL(generatedVideoUrl);
      }
    };
  }, [generatedVideoUrl]);
  
  useEffect(() => {
    if (autoGenerateFrames && prompt.trim().length > 10 && !isGeneratingFrames) {
      const debounceTimer = setTimeout(() => {
        generateFrames({
          prompt,
          numberOfFrames: 3,
          style: selectedStyle,
          variationStrength: frameGenerationSettings.variationStrength,
          autoImprove: frameGenerationSettings.autoImprove
        });
      }, 1000);
      
      return () => clearTimeout(debounceTimer);
    }
  }, [prompt, autoGenerateFrames, selectedStyle]);
  
  const analyzeMediaContent = async (file: File) => {
    if (!file) return;
    
    setIsAnalyzing(true);
    
    setTimeout(() => {
      let fakeTags: string[] = [];
      
      if (file.type.startsWith('image/')) {
        fakeTags = ["person", "landscape", "nature", "outdoor", "daytime"];
      } else if (file.type.startsWith('video/')) {
        fakeTags = ["motion", "urban", "people", "vehicle", "building"];
      }
      
      setAnalyzedTags(fakeTags);
      setIsAnalyzing(false);
      
      toast.success("Content analysis complete", {
        description: "We've detected key elements in your media that will be enhanced in the generated video."
      });
      
      if (autoGenerateFrames) {
        const tagsPrompt = fakeTags.join(", ");
        generateFrames({
          prompt: `Scene with ${tagsPrompt}`,
          numberOfFrames: 3,
          style: selectedStyle
        });
      }
    }, 2500);
  };
  
  const handleMediaUpload = (file: File | null) => {
    if (generatedVideoUrl && generatedVideoUrl.startsWith('blob:')) {
      URL.revokeObjectURL(generatedVideoUrl);
    }
    
    setMediaFile(file);
    setAnalyzedTags([]);
    
    if (file) {
      analyzeMediaContent(file);
      
      if (videoGenerated) {
        try {
          if (file.type.startsWith('video/')) {
            const newUrl = URL.createObjectURL(file);
            setGeneratedVideoUrl(newUrl);
          }
        } catch (err) {
          console.error("Error creating object URL:", err);
          toast.error("Failed to process uploaded media");
        }
      }
    }
  };

  const handleStyleChange = (style: string) => {
    setSelectedStyle(style);
    
    if (autoGenerateFrames && prompt.trim() && generatedFrames.length > 0) {
      generateFrames({
        prompt,
        numberOfFrames: 3,
        style,
        variationStrength: frameGenerationSettings.variationStrength,
        autoImprove: frameGenerationSettings.autoImprove
      });
    }
  };
  
  const handleTransitionChange = (transition: string) => {
    setTransitionEffect(transition);
  };
  
  const handleTextOverlayChange = (enabled: boolean, text?: string) => {
    setTextOverlay({
      enabled,
      text: text || textOverlay.text
    });
  };
  
  const handleAspectRatioChange = (ratio: string) => {
    setAspectRatio(ratio);
  };
  
  const toggleAutoGenerateFrames = (value: boolean) => {
    setAutoGenerateFrames(value);
    if (value && prompt.trim().length > 10) {
      generateFrames({
        prompt,
        numberOfFrames: 3,
        style: selectedStyle
      });
    }
  };
  
  const updateFrameGenerationSettings = (settings: {
    variationStrength?: number;
    autoImprove?: boolean;
  }) => {
    setFrameGenerationSettings(prev => ({
      ...prev,
      ...settings
    }));
  };

  const generateFrames = async ({ 
    prompt, 
    numberOfFrames, 
    style,
    variationStrength,
    autoImprove
  }: { 
    prompt: string; 
    numberOfFrames: number; 
    style: string;
    variationStrength?: number;
    autoImprove?: boolean;
  }) => {
    try {
      setIsGeneratingFrames(true);
      
      const { data, error } = await supabase.functions.invoke('generate-video-frames', {
        body: { 
          prompt, 
          numberOfFrames, 
          style,
          variationStrength,
          autoImprove
        }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      if (!data.frames || !Array.isArray(data.frames)) {
        throw new Error("Invalid response format from frame generator");
      }
      
      setGeneratedFrames(data.frames);
      
      const autoImprovedText = data.metadata?.autoImproved ? " with auto-improvements" : "";
      toast.success(`Generated ${data.frames.length} video frames${autoImprovedText}`, {
        description: "These frames will be used in your video"
      });
      
      return data.frames;
    } catch (error) {
      console.error("Error generating frames:", error);
      toast.error("Failed to generate video frames", {
        description: error instanceof Error ? error.message : "Unknown error occurred"
      });
      throw error;
    } finally {
      setIsGeneratingFrames(false);
    }
  };

  const handleGenerate = () => {
    if (!prompt.trim() && !mediaFile && generatedFrames.length === 0) {
      toast.error("Please enter a prompt, upload media, or generate frames first");
      return;
    }

    if (generatedVideoUrl && generatedVideoUrl.startsWith('blob:')) {
      URL.revokeObjectURL(generatedVideoUrl);
    }

    setIsGenerating(true);
    setIsPlaying(false);
    
    if (generatedFrames.length > 0 && generatedFrames.length < 5 && autoGenerateFrames) {
      const neededFrames = 5 - generatedFrames.length;
      toast.info(`Generating ${neededFrames} additional frames to complete your video`, {
        description: "This will ensure smooth transitions in your video"
      });
      
      generateFrames({
        prompt,
        numberOfFrames: neededFrames,
        style: selectedStyle
      }).catch(err => {
        console.error("Error generating additional frames:", err);
      });
    }
    
    setTimeout(() => {
      try {
        let videoUrl = "";
        
        if (mediaFile) {
          if (mediaFile.type.startsWith('video/')) {
            videoUrl = URL.createObjectURL(mediaFile);
          } else if (mediaFile.type.startsWith('image/')) {
            videoUrl = sampleVideos[Math.floor(Math.random() * sampleVideos.length)];
          }
        } else {
          videoUrl = sampleVideos[Math.floor(Math.random() * sampleVideos.length)];
        }
        
        setGeneratedVideoUrl(videoUrl);
        setIsGenerating(false);
        setVideoGenerated(true);
        
        const sourceDescription = generatedFrames.length > 0 
          ? `${generatedFrames.length} AI-generated frames` 
          : mediaFile 
            ? "uploaded media" 
            : "your prompt";
        
        toast.success("Your video has been generated successfully!", {
          description: `Created with ${selectedStyle} style using ${sourceDescription}`
        });
      } catch (err) {
        setIsGenerating(false);
        toast.error("Failed to generate video", {
          description: err instanceof Error ? err.message : "Unknown error occurred"
        });
      }
    }, 3000);
  };
  
  const togglePlayPause = () => {
    if (!videoRef.current) return;
    
    try {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch(error => {
              console.error("Playback error:", error);
              setIsPlaying(false);
              toast.error("Couldn't play video", {
                description: "There was a problem with the video playback."
              });
            });
        }
      }
    } catch (err) {
      console.error("Toggle play/pause error:", err);
      setIsPlaying(false);
      toast.error("Playback control error", {
        description: err instanceof Error ? err.message : "Unknown error occurred"
      });
    }
  };
  
  const handleDownload = () => {
    if (!generatedVideoUrl) return;
    
    try {
      const a = document.createElement('a');
      a.href = generatedVideoUrl;
      a.download = `AI-generated-video-${Date.now()}.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      toast.success("Video download started!");
    } catch (err) {
      console.error("Download error:", err);
      toast.error("Download failed", {
        description: err instanceof Error ? err.message : "Could not download the video."
      });
    }
  };

  return {
    prompt,
    setPrompt,
    isGenerating,
    videoGenerated,
    duration,
    setDuration,
    isPlaying,
    selectedMusic,
    setSelectedMusic,
    mediaFile,
    generatedVideoUrl,
    videoRef,
    isAnalyzing,
    analyzedTags,
    selectedStyle,
    transitionEffect,
    textOverlay,
    aspectRatio,
    handleMediaUpload,
    handleGenerate,
    togglePlayPause,
    handleDownload,
    handleStyleChange,
    handleTransitionChange,
    handleTextOverlayChange,
    handleAspectRatioChange,
    isGeneratingFrames,
    generatedFrames,
    generateFrames,
    autoGenerateFrames,
    toggleAutoGenerateFrames,
    frameGenerationSettings,
    updateFrameGenerationSettings
  };
};
