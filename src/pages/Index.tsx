
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";
import PricingSection from "@/components/PricingSection";
import { Button } from "@/components/ui/button";
import { ChevronRight, CheckCircle2, Video, Music, Wand2 } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <HeroSection />
        
        <FeatureSection />
        
        {/* How It Works Section */}
        <section className="section-padding px-6 bg-accent/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">How It Works</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Creating beautiful videos has never been easier. Our AI-powered platform takes care of the heavy lifting.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  icon: <Video className="h-6 w-6" />,
                  title: "Describe Your Vision",
                  description: "Enter a prompt describing the video you want to create. Be as detailed or as brief as you like."
                },
                {
                  icon: <Wand2 className="h-6 w-6" />,
                  title: "AI Magic",
                  description: "Our advanced AI analyzes your prompt and generates a video that matches your description."
                },
                {
                  icon: <Music className="h-6 w-6" />,
                  title: "Customize & Export",
                  description: "Fine-tune your video with easy controls, add music, text, and effects, then export and share."
                }
              ].map((step, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-border relative",
                    "animate-slide-up overflow-hidden"
                  )}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/5 rounded-full" />
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent/10 rounded-full" />
                  
                  <div className="relative z-10">
                    <div className="rounded-full bg-primary/10 text-primary w-12 h-12 flex items-center justify-center mb-4">
                      {step.icon}
                    </div>
                    
                    <span className="inline-block bg-secondary text-secondary-foreground text-sm rounded-full px-2.5 py-0.5 mb-2">
                      Step {index + 1}
                    </span>
                    
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Button asChild size="lg" className="px-8 py-6 text-lg group">
                <Link to="/video">
                  Start Creating
                  <ChevronRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Add the new pricing section here */}
        <PricingSection />
        
        {/* CTA Section */}
        <section className="section-padding px-6 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-primary/90 to-primary p-8 md:p-12 text-white text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to create your first video?</h2>
                <p className="opacity-90 mb-6 text-lg">
                  Join thousands of creators who are already using Melody to bring their ideas to life.
                </p>
                <ul className="mb-8 inline-block text-left">
                  {["No credit card required", "5 free videos per month", "Cancel anytime"].map((feature, index) => (
                    <li key={index} className="flex items-center mb-2">
                      <CheckCircle2 className="h-5 w-5 mr-2 text-white" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Button 
                asChild 
                size="lg" 
                variant="secondary" 
                className="px-8 py-6 text-lg shadow-lg group whitespace-nowrap bg-white text-primary hover:bg-white/90"
              >
                <Link to="/video">
                  Get Started Free
                  <ChevronRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
