
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, Clock, Eye, History, Trash2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";

// Mock data for the gallery
const mockVideos = [
  {
    id: "1",
    title: "Summer Vacation Memories",
    thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
    date: "2023-06-15",
    duration: "0:45",
    views: 127,
    creator: "vienna@example.com"
  },
  {
    id: "2",
    title: "City Skyline Timelapse",
    thumbnail: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=800&auto=format&fit=crop",
    date: "2023-07-21",
    duration: "1:20",
    views: 89,
    creator: "user@example.com"
  },
  {
    id: "3",
    title: "Autumn Forest Walk",
    thumbnail: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?q=80&w=800&auto=format&fit=crop",
    date: "2023-10-05",
    duration: "2:10",
    views: 203,
    creator: "vienna@example.com"
  },
  {
    id: "4",
    title: "Mountain Sunrise",
    thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
    date: "2023-08-30",
    duration: "0:55",
    views: 67,
    creator: "user@example.com"
  },
  {
    id: "5",
    title: "Ocean Waves",
    thumbnail: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=800&auto=format&fit=crop",
    date: "2023-09-12",
    duration: "1:45",
    views: 152,
    creator: "vienna@example.com"
  },
  {
    id: "6",
    title: "Desert Sunset",
    thumbnail: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=800&auto=format&fit=crop",
    date: "2023-11-08",
    duration: "1:30",
    views: 94,
    creator: "user@example.com"
  }
];

const Gallery = () => {
  const [activeTab, setActiveTab] = useState("all");
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Filter videos based on active tab
  const filteredVideos = activeTab === "my-videos" && user 
    ? mockVideos.filter(video => video.creator === user.email)
    : mockVideos;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="container mx-auto pt-24 pb-16 px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Video Gallery</h1>
            <p className="text-muted-foreground">Browse your creation history and shared videos</p>
          </div>
          <Button onClick={() => navigate("/video")} className="hidden sm:flex">
            Create New Video
          </Button>
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between mb-6">
            <TabsList>
              <TabsTrigger value="all" className="flex items-center gap-1">
                <History className="h-4 w-4" />
                <span>All Videos</span>
              </TabsTrigger>
              <TabsTrigger value="my-videos" className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>My Videos</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all" className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="my-videos" className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.length > 0 ? (
                filteredVideos.map((video) => (
                  <VideoCard key={video.id} video={video} isOwner={true} />
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                  <div className="bg-gray-100 p-6 rounded-full mb-4">
                    <History className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No videos yet</h3>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    You haven't created any videos yet. Start creating awesome videos with our editor!
                  </p>
                  <Button onClick={() => navigate("/video")}>
                    Create Your First Video
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

interface VideoProps {
  video: {
    id: string;
    title: string;
    thumbnail: string;
    date: string;
    duration: string;
    views: number;
    creator: string;
  };
  isOwner?: boolean;
}

const VideoCard: React.FC<VideoProps> = ({ video, isOwner = false }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium text-lg mb-2 line-clamp-1">{video.title}</h3>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <CalendarIcon className="h-3.5 w-3.5" />
            <span>{formatDate(video.date)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" />
            <span>{video.views} views</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-4 py-3 bg-slate-50 flex justify-between">
        <Button variant="outline" size="sm">
          View
        </Button>
        {isOwner && (
          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-100">
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default Gallery;
