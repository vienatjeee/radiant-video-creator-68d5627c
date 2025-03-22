
import React, { useCallback, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Music, Image, Upload, X, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
  const [fileError, setFileError] = useState<string | null>(null);

  const musicGenres = [
    "Ambient", "Electronic", "Cinematic", 
    "Upbeat", "Dramatic", "Inspirational"
  ];

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  }, []);

  const validateFile = (file: File): boolean => {
    setFileError(null);
    
    // Check if it's a video file
    if (file.type.startsWith('video/')) {
      // Check for supported video formats
      const supportedFormats = ['video/mp4', 'video/webm', 'video/ogg'];
      if (!supportedFormats.includes(file.type)) {
        setFileError(`Unsupported video format: ${file.type}. Please use MP4, WebM, or Ogg.`);
        return false;
      }
      
      // Check file size (limit to 100MB for example)
      if (file.size > 100 * 1024 * 1024) {
        setFileError("Video file is too large. Maximum size is 100MB.");
        return false;
      }
    } 
    // Check if it's an image file
    else if (file.type.startsWith('image/')) {
      // Check for supported image formats
      const supportedFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!supportedFormats.includes(file.type)) {
        setFileError(`Unsupported image format: ${file.type}. Please use JPEG, PNG, GIF, or WebP.`);
        return false;
      }
      
      // Check file size (limit to 10MB for example)
      if (file.size > 10 * 1024 * 1024) {
        setFileError("Image file is too large. Maximum size is 10MB.");
        return false;
      }
    } 
    // Not an accepted file type
    else {
      setFileError("Please upload a video or image file.");
      return false;
    }
    
    return true;
  };

  const handleFile = useCallback((file: File) => {
    if (validateFile(file)) {
      setUploadedFile(file);
      if (onMediaUpload) {
        onMediaUpload(file);
      }
      toast.success("Media uploaded successfully", {
        description: `File "${file.name}" is ready to use`
      });
    } else {
      toast.error("Invalid file", {
        description: fileError || "The file could not be uploaded"
      });
    }
  }, [onMediaUpload, fileError]);

  const removeUploadedFile = useCallback(() => {
    setUploadedFile(null);
    setFileError(null);
    // If we want to notify the parent that the file was removed
    if (onMediaUpload) {
      onMediaUpload(null);
    }
  }, [onMediaUpload]);

  return (
    <div className="space-y-4">
      <div>
        <Label>Background music</Label>
        <div className="grid grid-cols-2 gap-3 mt-1.5">
          {musicGenres.map((genre) => (
            <div
              key={genre}
              className={`flex items-center justify-center gap-2 p-3 rounded-lg border ${
                selectedMusic === genre 
                  ? "border-primary bg-primary/10" 
                  : "border-border bg-background hover:bg-accent/50"
              } cursor-pointer transition-colors`}
              onClick={() => setSelectedMusic(genre)}
            >
              <Music className={`h-4 w-4 ${selectedMusic === genre ? "text-primary" : ""}`} />
              <span className={`text-sm ${selectedMusic === genre ? "font-medium" : ""}`}>{genre}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <Label>Upload media (optional)</Label>
        {fileError && (
          <Alert variant="destructive" className="my-2 bg-destructive/10 border border-destructive">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <AlertDescription className="ml-2 text-sm">
              {fileError}
            </AlertDescription>
          </Alert>
        )}
        
        {!uploadedFile ? (
          <div 
            className={`mt-1.5 border-2 ${dragActive ? "border-primary border-solid" : "border-dashed"} 
            border-border rounded-lg p-6 text-center transition-colors
            ${dragActive ? "bg-primary/5" : ""}`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center">
              <Upload className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-2">
                Drag and drop or click to upload
              </p>
              <p className="text-xs text-muted-foreground mb-3">
                Supported formats: MP4, WebM, Ogg, JPEG, PNG, GIF, WebP
              </p>
              <label htmlFor="file-upload">
                <Button variant="outline" size="sm" className="cursor-pointer" asChild>
                  <span>Browse files</span>
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  accept="video/mp4,video/webm,video/ogg,image/jpeg,image/png,image/gif,image/webp"
                  className="hidden"
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>
        ) : (
          <div className="mt-1.5 rounded-lg border border-border bg-background/50 p-3 flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-hidden">
              {uploadedFile.type.startsWith('video/') ? (
                <div className="h-10 w-10 flex items-center justify-center bg-black/80 rounded">
                  <Video className="h-5 w-5 text-white/80" />
                </div>
              ) : (
                <img 
                  className="h-10 w-10 object-cover rounded" 
                  src={URL.createObjectURL(uploadedFile)} 
                  alt="Uploaded" 
                  onError={() => setFileError("Failed to preview image")}
                />
              )}
              <div className="truncate">
                <p className="text-sm font-medium truncate">{uploadedFile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {uploadedFile.type} • {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
              onClick={removeUploadedFile}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Remove file</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaTab;
