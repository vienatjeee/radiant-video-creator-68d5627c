
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { YoutubeIcon } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const SettingsTab: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [youtubeTitle, setYoutubeTitle] = useState("");
  const [youtubeDescription, setYoutubeDescription] = useState("");
  const [youtubePrivacy, setYoutubePrivacy] = useState("unlisted");
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleYoutubeUpload = async () => {
    if (!youtubeTitle) {
      toast.error("Please provide a title for your YouTube video");
      return;
    }

    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      setDialogOpen(false);
      toast.success("Your video has been queued for upload to YouTube", {
        description: "You'll receive a notification when the upload is complete."
      });
      
      // Reset form
      setYoutubeTitle("");
      setYoutubeDescription("");
    }, 3000);
  };

  return (
    <div className="space-y-6">
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
      
      <div className="pt-2 border-t border-border">
        <h3 className="text-sm font-medium mb-3">Share & Upload</h3>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              <YoutubeIcon className="h-4 w-4 mr-2 text-red-500" />
              Upload to YouTube
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Upload to YouTube</DialogTitle>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="yt-title">Video Title</Label>
                <Input 
                  id="yt-title" 
                  value={youtubeTitle} 
                  onChange={(e) => setYoutubeTitle(e.target.value)} 
                  placeholder="Enter video title"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="yt-description">Description</Label>
                <Input 
                  id="yt-description" 
                  value={youtubeDescription} 
                  onChange={(e) => setYoutubeDescription(e.target.value)}
                  placeholder="Enter video description (optional)"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="yt-privacy">Privacy Setting</Label>
                <Select 
                  value={youtubePrivacy} 
                  onValueChange={setYoutubePrivacy}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select privacy setting" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="private">Private</SelectItem>
                    <SelectItem value="unlisted">Unlisted</SelectItem>
                    <SelectItem value="public">Public</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                type="submit" 
                onClick={handleYoutubeUpload}
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <span className="loader mr-2 h-4 w-4 border-2 border-current after:border-2 after:border-primary" />
                    Uploading...
                  </>
                ) : "Upload Video"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SettingsTab;
