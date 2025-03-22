
import React, { useState } from "react";
import { Check, X, CreditCard, Zap, User, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger
} from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

// Define the pricing plans
const pricingPlans = [
  {
    name: "Free",
    monthlyPrice: "$0",
    yearlyPrice: "$0",
    description: "Basic features for personal use",
    features: [
      { name: "5 videos per month", included: true },
      { name: "720p resolution", included: true },
      { name: "Basic templates", included: true },
      { name: "Standard rendering", included: true },
      { name: "Email support", included: false },
      { name: "Priority rendering", included: false },
      { name: "Commercial usage", included: false }
    ],
    popular: false,
    buttonText: "Get Started",
    tier: "free",
    icon: <User className="h-5 w-5 text-muted-foreground" />
  },
  {
    name: "Pro",
    monthlyPrice: "$19.99",
    yearlyPrice: "$199.99",
    yearlySavings: "Save $40",
    description: "Everything in Free plus enhanced features",
    features: [
      { name: "Unlimited videos", included: true },
      { name: "4K resolution", included: true },
      { name: "All templates", included: true },
      { name: "Priority rendering", included: true },
      { name: "Email support", included: true },
      { name: "Commercial usage", included: true },
      { name: "API access", included: false }
    ],
    popular: true,
    buttonText: "Upgrade Now",
    tier: "pro",
    icon: <Zap className="h-5 w-5 text-amber-500" />
  },
  {
    name: "Enterprise",
    monthlyPrice: "$49.99",
    yearlyPrice: "$499.99",
    yearlySavings: "Save $100",
    description: "Advanced features for professional teams",
    features: [
      { name: "Unlimited videos", included: true },
      { name: "8K resolution", included: true },
      { name: "All templates", included: true },
      { name: "Priority rendering", included: true },
      { name: "24/7 support", included: true },
      { name: "Commercial usage", included: true },
      { name: "API access", included: true }
    ],
    popular: false,
    buttonText: "Contact Sales",
    tier: "enterprise",
    icon: <Shield className="h-5 w-5 text-indigo-500" />
  }
];

const PricingSection = () => {
  const { user, updateSubscription } = useAuth();
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleUpgrade = (tier: string) => {
    if (!user) {
      toast.info("Please sign in to upgrade your subscription");
      return;
    }

    // If it's the free tier, just update
    if (tier === "free") {
      updateSubscription(tier, "monthly");
      toast.success("Your subscription has been updated");
      return;
    }
    
    // Set the selected plan for the payment dialog
    setSelectedPlan(tier);
  };

  const handlePaymentSubmit = (e: React.FormEvent, tier: string) => {
    e.preventDefault();
    updateSubscription(tier, isYearly ? "yearly" : "monthly");
    toast.success("Your subscription has been upgraded successfully!");
    setSelectedPlan(null); // Close dialog
  };

  return (
    <section className="py-20 px-6 bg-background" id="pricing">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Choose the perfect plan for your needs. No hidden fees. Cancel
            anytime.
          </p>
          
          {/* Monthly/Yearly toggle */}
          <div className="flex items-center justify-center mt-8 space-x-3">
            <span className={`text-sm font-medium ${!isYearly ? "text-primary" : "text-muted-foreground"}`}>
              Monthly
            </span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
            />
            <span className={`text-sm font-medium ${isYearly ? "text-primary" : "text-muted-foreground"}`}>
              Yearly <span className="text-xs text-green-500 font-medium">Save up to 20%</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className={`h-full ${
                plan.popular ? "border-primary shadow-lg shadow-primary/10" : ""
              }`}
            >
              <CardHeader className="pb-3">
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-medium">
                    Most Popular
                  </div>
                )}
                <div className="flex items-center gap-2">
                  {plan.icon}
                  <CardTitle>{plan.name}</CardTitle>
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="mb-4">
                  <div className="text-3xl font-bold">
                    {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    <span className="text-sm font-normal text-muted-foreground ml-1">
                      /{isYearly ? "year" : "month"}
                    </span>
                  </div>
                  {plan.yearlySavings && isYearly && (
                    <p className="text-green-500 text-sm font-medium mt-1">
                      {plan.yearlySavings}
                    </p>
                  )}
                </div>

                <ul className="space-y-3 text-sm">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center gap-3"
                    >
                      {feature.included ? (
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      ) : (
                        <X className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      )}
                      <span
                        className={feature.included ? "" : "text-muted-foreground"}
                      >
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                {plan.tier === "free" ? (
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                    asChild
                  >
                    <Link to={user ? "/video" : "/sign-up"}>
                      {plan.buttonText}
                    </Link>
                  </Button>
                ) : (
                  <Dialog open={selectedPlan === plan.tier} onOpenChange={(open) => !open && setSelectedPlan(null)}>
                    <DialogTrigger asChild>
                      <Button
                        className="w-full"
                        variant={plan.popular ? "default" : "outline"}
                        onClick={() => handleUpgrade(plan.tier)}
                      >
                        {plan.buttonText}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Upgrade to {plan.name}</DialogTitle>
                        <DialogDescription>
                          Enter your payment details to start your {isYearly ? "yearly" : "monthly"} subscription.
                        </DialogDescription>
                      </DialogHeader>

                      <form
                        onSubmit={(e) => handlePaymentSubmit(e, plan.tier)}
                        className="space-y-4 py-4"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input id="cardName" placeholder="John Smith" required />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <div className="relative">
                            <Input 
                              id="cardNumber" 
                              placeholder="1234 5678 9012 3456" 
                              required 
                              className="pl-10"
                            />
                            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          </div>
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

                        <div className="border-t pt-4 mt-4">
                          <div className="flex justify-between mb-2">
                            <span>Subtotal</span>
                            <span>{isYearly ? plan.yearlyPrice : plan.monthlyPrice}</span>
                          </div>
                          {isYearly && plan.yearlySavings && (
                            <div className="flex justify-between mb-2 text-green-500 text-sm">
                              <span>Savings</span>
                              <span>{plan.yearlySavings}</span>
                            </div>
                          )}
                          <div className="flex justify-between font-medium">
                            <span>Total</span>
                            <span>{isYearly ? plan.yearlyPrice : plan.monthlyPrice}</span>
                          </div>
                        </div>

                        <div className="mt-6">
                          <Button type="submit" className="w-full">
                            Subscribe - {isYearly ? plan.yearlyPrice : plan.monthlyPrice}/{isYearly ? "year" : "month"}
                          </Button>
                          <p className="text-xs text-center mt-2 text-muted-foreground">
                            You can cancel anytime. No hidden fees.
                          </p>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Testimonials section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-2">Trusted by creators worldwide</h3>
            <p className="text-muted-foreground">Join thousands of satisfied users creating amazing videos</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "This platform transformed how I create content. The Pro plan is worth every penny!",
                author: "Alex Chen",
                role: "Content Creator"
              },
              {
                quote: "As a marketing agency, the Enterprise plan gives us everything we need for our clients.",
                author: "Sarah Johnson",
                role: "Marketing Director"
              },
              {
                quote: "Started with Free, upgraded to Pro. The difference is night and day!",
                author: "Miguel Rodriguez",
                role: "YouTuber"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="bg-accent/50">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <Star className="text-amber-400 fill-amber-400 h-6 w-6" />
                    <Star className="text-amber-400 fill-amber-400 h-6 w-6" />
                    <Star className="text-amber-400 fill-amber-400 h-6 w-6" />
                    <Star className="text-amber-400 fill-amber-400 h-6 w-6" />
                    <Star className="text-amber-400 fill-amber-400 h-6 w-6" />
                  </div>
                  <p className="text-sm italic mb-4">{testimonial.quote}</p>
                  <div className="text-sm font-medium">{testimonial.author}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-2">Frequently Asked Questions</h3>
            <p className="text-muted-foreground">Everything you need to know about our plans</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "Can I change plans later?",
                answer: "Yes! You can upgrade, downgrade, or cancel your subscription at any time from your account settings."
              },
              {
                question: "Is there a free trial?",
                answer: "We offer a free tier with limited features so you can test the platform before committing to a paid plan."
              },
              {
                question: "How does billing work?",
                answer: "You'll be billed either monthly or yearly, depending on your choice. All plans renew automatically."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, PayPal, and bank transfers for Enterprise customers."
              }
            ].map((faq, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
