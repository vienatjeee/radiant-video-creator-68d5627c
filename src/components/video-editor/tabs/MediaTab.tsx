
import React, { useCallback, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Music, FileVideo, ImageIcon, Upload, X, FileImage, ScanLine } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

interface MediaTabProps {
  onMediaUpload?: (file: File | null) => void;
  selectedMusic: string;
  setSelectedMusic: (genre: string) => void;
  isAnalyzing?: boolean;
  analyzedTags?: string[];
}

const MediaTab: React.FC<MediaTabProps> = ({ 
  onMediaUpload,
  selectedMusic, 
  setSelectedMusic,
  isAnalyzing = false,
  analyzedTags = []
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<"image" | "video" | null>(null);

  const musicGenres = [
    "Ambient", "Electronic", "Cinematic", 
    "Upbeat", "Dramatic", "None"
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (file: File) => {
    // Check file type
    if (file.type.startsWith('image/')) {
      setFileType("image");
    } else if (file.type.startsWith('video/')) {
      setFileType("video");
    } else {
      toast.error("Unsupported file format", {
        description: "Please upload an image (JPG, PNG, etc.) or video file (MP4, WebM, MOV, etc.)"
      });
      return;
    }
    
    // Check file size (limit to 100MB)
    if (file.size > 100 * 1024 * 1024) {
      toast.error("File too large", {
        description: "Maximum file size is 100MB"
      });
      return;
    }
    
    setUploadedFile(file);
    onMediaUpload && onMediaUpload(file);
    toast.success(`${fileType === "image" ? "Image" : "Video"} uploaded successfully!`);
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setFileType(null);
    onMediaUpload && onMediaUpload(null);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold mb-3">Upload Media</h3>
        <div className="space-y-4">
          {!uploadedFile ? (
            <div
              className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
                dragActive ? "border-primary bg-primary/5" : "border-border"
              }`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center gap-3 text-center">
                <div className="p-3 rounded-full bg-primary/10">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <p className="font-medium">
                  Drag and drop your media here or click to browse
                </p>
                <p className="text-sm text-muted-foreground">
                  Supported formats: JPG, PNG, MP4, WebM, MOV, AVI (max 100MB)
                </p>
                <div className="flex gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const input = document.getElementById("image-upload");
                      if (input) input.click();
                    }}
                  >
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Select Image
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const input = document.getElementById("video-upload");
                      if (input) input.click();
                    }}
                  >
                    <FileVideo className="h-4 w-4 mr-2" />
                    Select Video
                  </Button>
                </div>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileInput}
                />
                <input
                  id="video-upload"
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={handleFileInput}
                />
              </div>
            </div>
          ) : (
            <div className="border rounded-lg p-4 bg-accent/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-primary/10">
                    {fileType === "image" ? (
                      <FileImage className="h-5 w-5 text-primary" />
                    ) : (
                      <FileVideo className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-medium truncate">{uploadedFile.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB - {fileType === "image" ? "Image" : "Video"}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleRemoveFile}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {isAnalyzing && (
                <div className="mt-3">
                  <div className="flex items-center gap-2 mb-2">
                    <ScanLine className="h-4 w-4 animate-pulse text-primary" />
                    <span className="text-sm font-medium">Analyzing content...</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
              )}

              {analyzedTags && analyzedTags.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-medium mb-2">Detected content:</p>
                  <div className="flex flex-wrap gap-2">
                    {analyzedTags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base font-semibold">Background Music</Label>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {musicGenres.map((genre) => (
            <Button
              key={genre}
              variant={selectedMusic === genre ? "default" : "outline"}
              className="justify-start"
              onClick={() => setSelectedMusic(genre)}
            >
              <Music className="h-4 w-4 mr-2" />
              {genre}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MediaTab;
