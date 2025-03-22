
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      
      const moveX = (x - 0.5) * 20;
      const moveY = (y - 0.5) * 20;
      
      container.style.setProperty("--x", `${moveX}px`);
      container.style.setProperty("--y", `${moveY}px`);
    };
    
    container.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden h-screen flex flex-col items-center justify-center px-6 pt-20 pb-20 text-center bg-gradient-to-b from-background to-accent/20"
      style={{ "--x": "0px", "--y": "0px" } as React.CSSProperties}
    >
      <div className="absolute inset-0 z-0 opacity-70">
        <div 
          className="absolute top-[calc(50%+var(--y)*0.5)] left-[calc(50%+var(--x)*0.5)] -translate-x-1/2 -translate-y-1/2 w-[60%] aspect-square rounded-full bg-blue-400/20 blur-[120px]"
          style={{ transform: `translate(-50%, -50%) translate(calc(var(--x) * 0.5), calc(var(--y) * 0.5))` }}
        />
        <div 
          className="absolute top-[calc(40%+var(--y)*-0.5)] left-[calc(60%+var(--x)*-0.5)] -translate-x-1/2 -translate-y-1/2 w-[40%] aspect-square rounded-full bg-violet-400/20 blur-[100px]"
          style={{ transform: `translate(-50%, -50%) translate(calc(var(--x) * -0.5), calc(var(--y) * -0.5))` }}
        />
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto animate-slide-up" style={{ animationDelay: "0.2s" }}>
        <div className="inline-block mb-6">
          <div className="flex items-center text-sm rounded-full px-3 py-1 bg-accent border border-accent/50 text-accent-foreground/80 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2" />
            <span>Introducing Melody — AI Video Creator</span>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
          Create stunning videos <br />
          <span className="text-primary">powered by AI</span>
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Transform your ideas into captivating videos with just a few clicks. No experience needed. Let AI do the heavy lifting.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="px-8 py-6 text-lg group">
            <Link to="/video">
              Create a Video
              <ChevronRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg">
            <Link to="/gallery">View Examples</Link>
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-10" />
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-pulse-soft">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="text-muted-foreground"
        >
          <path d="M12 5v14" />
          <path d="m19 12-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
