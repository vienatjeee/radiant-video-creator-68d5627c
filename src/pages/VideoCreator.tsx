
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VideoEditor from "@/components/video-editor";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, Heart, DollarSign, Coffee, ShieldAlert, Crown } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const VideoCreator = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const subscriptionTier = user?.subscription || 'free';

  const handleDonation = () => {
    window.open("https://www.paypal.com/ncp/payment/BBRQQNZ3Q4S9J", "_blank");
    toast.success("Thank you for your donation!", {
      description: "Your support helps us improve this application."
    });
  };

  const subscriptionInfo = {
    free: {
      color: "text-slate-500",
      label: "Free Plan",
      description: "5 videos per month, 720p resolution",
      upgradeText: "Upgrade for unlimited videos"
    },
    pro: {
      color: "text-blue-500",
      label: "Pro Plan",
      description: "Unlimited videos, 4K resolution, priority rendering",
      upgradeText: "You're on the Pro plan"
    },
    enterprise: {
      color: "text-purple-500",
      label: "Enterprise Plan",
      description: "All features unlocked, 8K resolution, 24/7 support",
      upgradeText: "You're on the Enterprise plan"
    }
  };

  const currentPlan = subscriptionInfo[subscriptionTier];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 px-6 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Video Creator</h1>
                <p className="text-muted-foreground text-lg">
                  Create stunning videos with the power of AI. Just describe what you want and let the magic happen.
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                {user && (
                  <div className="flex items-center gap-2 bg-accent/40 rounded-md px-3 py-1.5 mr-2">
                    <Crown className={`h-4 w-4 ${currentPlan.color}`} />
                    <span className="text-sm font-medium">{currentPlan.label}</span>
                    {subscriptionTier === 'free' && (
                      <Button variant="link" size="sm" className="h-auto p-0 text-xs" asChild>
                        <Link to="/#pricing">Upgrade</Link>
                      </Button>
                    )}
                  </div>
                )}
                
                {isAdmin && (
                  <Button variant="outline" className="gap-2">
                    <ShieldAlert className="h-4 w-4 text-yellow-500" />
                    Admin Mode
                  </Button>
                )}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Heart className="h-4 w-4 text-red-500" />
                      Support Us
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Support This Project</DialogTitle>
                      <DialogDescription>
                        Your donations help us continue developing and improving this application.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="py-4">
                      <div className="flex flex-col gap-4">
                        <Button onClick={handleDonation} className="gap-2">
                          <Coffee className="h-4 w-4" />
                          Donate via PayPal
                        </Button>
                        
                        <div className="text-xs text-muted-foreground mt-2">
                          PayPal Link: <a href="https://www.paypal.com/ncp/payment/BBRQQNZ3Q4S9J" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://www.paypal.com/ncp/payment/BBRQQNZ3Q4S9J</a>
                        </div>
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button variant="outline" onClick={() => window.open("https://www.paypal.com/ncp/payment/BBRQQNZ3Q4S9J", "_blank")}>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open PayPal
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            
            {subscriptionTier === 'free' && (
              <div className="bg-accent/20 border border-border rounded-md p-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 w-8 h-8 text-primary flex items-center justify-center">
                    <Crown className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">Free Plan Limitations</p>
                    <p className="text-sm text-muted-foreground mb-2">
                      You're currently on the Free plan, which includes up to 5 videos per month at 720p resolution.
                    </p>
                    <Button variant="link" className="h-auto p-0" asChild>
                      <Link to="/#pricing">Upgrade for unlimited videos and 4K resolution →</Link>
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {isAdmin ? (
              <div className="bg-accent/20 border border-border rounded-md p-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-secondary w-8 h-8 text-secondary-foreground flex items-center justify-center font-semibold">VW</div>
                  <div>
                    <p className="font-medium">Vienna Wierks</p>
                    <p className="text-sm text-muted-foreground">Admin & Creator</p>
                    <p className="text-sm mt-2">
                      Thank you for using this application! If you find it useful, please consider supporting the project with a donation.
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
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
