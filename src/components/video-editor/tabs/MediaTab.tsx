
import React, { useCallback, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Music, FileVideo, Upload, X } from "lucide-react";
import { toast } from "sonner";

interface MediaTabProps {
  onMediaUpload?: (file: File | null) => void;
  selectedMusic: string;
  setSelectedMusic: (genre: string) => void;
}

const MediaTab: React.FC<MediaTabProps> = ({ 
  onMediaUpload,
  selectedMusic, 
  setSelectedMusic 
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

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
    // Check if file is a video
    if (!file.type.startsWith('video/')) {
      toast.error("Unsupported file format", {
        description: "Please upload a video file (MP4, WebM, MOV, etc.)"
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
    toast.success("Media uploaded successfully!");
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
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
                  Supported formats: MP4, WebM, MOV, AVI (max 100MB)
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => document.getElementById("file-upload")?.click()}
                >
                  <FileVideo className="h-4 w-4 mr-2" />
                  Select Video
                </Button>
                <input
                  id="file-upload"
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
                    <FileVideo className="h-5 w-5 text-primary" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-medium truncate">{uploadedFile.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
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
