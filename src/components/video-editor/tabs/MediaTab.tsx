
import React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Music, Image } from "lucide-react";

const MediaTab: React.FC = () => {
  return (
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
  );
};

export default MediaTab;
