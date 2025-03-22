
import React from "react";
import { cn } from "@/lib/utils";
import { Wand2, Film, Clock, Sparkles, Share2, Sliders } from "lucide-react";

const features = [
  {
    icon: <Wand2 className="h-6 w-6" />,
    title: "AI-Powered Creation",
    description: "Let our advanced AI algorithms transform your ideas into stunning videos with minimal effort."
  },
  {
    icon: <Film className="h-6 w-6" />,
    title: "Professional Templates",
    description: "Choose from dozens of professionally designed templates for any occasion or purpose."
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Save Time",
    description: "Create videos in minutes instead of hours. Focus on your message, not the technical details."
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "Premium Effects",
    description: "Access a library of premium effects, transitions, and animations to enhance your videos."
  },
  {
    icon: <Share2 className="h-6 w-6" />,
    title: "Easy Sharing",
    description: "Share your creations directly to social media or download in multiple formats."
  },
  {
    icon: <Sliders className="h-6 w-6" />,
    title: "Complete Control",
    description: "Fine-tune every aspect of your video while maintaining the simplicity of AI assistance."
  }
];

const FeatureSection = () => {
  return (
    <section className="section-padding px-6 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Powerful Features, Effortless Creation
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to create professional-quality videos without the steep learning curve.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
      
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl opacity-60" />
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-accent/20 rounded-full blur-3xl opacity-60" />
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, index }) => {
  return (
    <div 
      className={cn(
        "glass-card rounded-2xl p-6 transition-all duration-300 hover:shadow-md hover:bg-white/60 group",
        "animate-scale-in"
      )}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="rounded-xl bg-primary/10 text-primary w-12 h-12 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/15">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default FeatureSection;
