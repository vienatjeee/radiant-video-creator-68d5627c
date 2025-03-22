
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VideoEditor from "@/components/VideoEditor";

const VideoCreator = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Video Creator</h1>
            <p className="text-muted-foreground text-lg">
              Create stunning videos with the power of AI. Just describe what you want and let the magic happen.
            </p>
          </div>
          
          <div className="h-[700px]">
            <VideoEditor />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VideoCreator;
