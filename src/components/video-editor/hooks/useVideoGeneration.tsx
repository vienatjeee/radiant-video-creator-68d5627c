
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const useVideoGeneration = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoGenerated, setVideoGenerated] = useState(false);
  const [duration, setDuration] = useState(15);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedMusic, setSelectedMusic] = useState("Ambient");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);

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
  
  const handleMediaUpload = (file: File | null) => {
    if (generatedVideoUrl && generatedVideoUrl.startsWith('blob:')) {
      URL.revokeObjectURL(generatedVideoUrl);
    }
    
    setMediaFile(file);
    
    if (file && videoGenerated) {
      try {
        const newUrl = URL.createObjectURL(file);
        setGeneratedVideoUrl(newUrl);
      } catch (err) {
        console.error("Error creating object URL:", err);
        toast.error("Failed to process uploaded media");
      }
    }
  };

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt to generate your video");
      return;
    }

    if (generatedVideoUrl && generatedVideoUrl.startsWith('blob:')) {
      URL.revokeObjectURL(generatedVideoUrl);
    }

    setIsGenerating(true);
    setIsPlaying(false);
    
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
        toast.success("Your video has been generated successfully!");
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
    handleMediaUpload,
    handleGenerate,
    togglePlayPause,
    handleDownload
  };
};
