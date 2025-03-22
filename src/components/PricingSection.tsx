
import React from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    description: "Basic features for personal use",
    features: [
      { name: "5 videos per month", included: true },
      { name: "720p resolution", included: true },
      { name: "Basic templates", included: true },
      { name: "Standard rendering", included: true },
      { name: "Email support", included: false },
      { name: "Priority rendering", included: false },
      { name: "Commercial usage", included: false },
    ],
    popular: false,
    buttonText: "Get Started",
    tier: "free"
  },
  {
    name: "Pro",
    price: "$19.99",
    period: "monthly",
    description: "Everything in Free plus enhanced features",
    features: [
      { name: "Unlimited videos", included: true },
      { name: "4K resolution", included: true },
      { name: "All templates", included: true },
      { name: "Priority rendering", included: true },
      { name: "Email support", included: true },
      { name: "Commercial usage", included: true },
      { name: "API access", included: false },
    ],
    popular: true,
    buttonText: "Upgrade Now",
    tier: "pro"
  },
  {
    name: "Enterprise",
    price: "$49.99",
    period: "monthly",
    description: "Advanced features for professional teams",
    features: [
      { name: "Unlimited videos", included: true },
      { name: "8K resolution", included: true },
      { name: "All templates", included: true },
      { name: "Priority rendering", included: true },
      { name: "24/7 support", included: true },
      { name: "Commercial usage", included: true },
      { name: "API access", included: true },
    ],
    popular: false,
    buttonText: "Contact Sales",
    tier: "enterprise"
  }
];

const PricingSection = () => {
  const { user, updateSubscription } = useAuth();

  const handleUpgrade = (tier: string) => {
    if (!user) {
      toast.info("Please sign in to upgrade your subscription");
      return;
    }
    
    // If it's the free tier, just update
    if (tier === "free") {
      updateSubscription(tier);
      toast.success("Your subscription has been updated");
      return;
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent, tier: string) => {
    e.preventDefault();
    updateSubscription(tier);
    toast.success("Your subscription has been upgraded successfully!");
  };

  return (
    <section className="py-20 px-6 bg-background" id="pricing">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Choose the perfect plan for your needs. No hidden fees. Cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative rounded-xl border bg-card p-6 shadow-sm transition-all ${
                plan.popular ? "border-primary ring-2 ring-primary ring-opacity-60" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <div className="mt-2 flex items-baseline">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && <span className="ml-1 text-muted-foreground">/{plan.period}</span>}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
              </div>
              
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    {feature.included ? (
                      <Check className="h-4 w-4 text-green-500 mr-3" />
                    ) : (
                      <X className="h-4 w-4 text-muted-foreground mr-3" />
                    )}
                    <span className={feature.included ? "" : "text-muted-foreground"}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>

              {plan.tier === "free" ? (
                <Button 
                  className="w-full" 
                  variant={plan.popular ? "default" : "outline"}
                  asChild
                >
                  <Link to={user ? "/video" : "/sign-up"}>{plan.buttonText}</Link>
                </Button>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full" 
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.buttonText}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Upgrade to {plan.name}</DialogTitle>
                      <DialogDescription>
                        Enter your payment details to upgrade your subscription.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <form onSubmit={(e) => handlePaymentSubmit(e, plan.tier)} className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input id="cardName" placeholder="John Smith" required />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" required />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="123" required />
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <Button type="submit" className="w-full">Subscribe - {plan.price}/{plan.period}</Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
