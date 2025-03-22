
import React from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CreditCard } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

export interface PricingFeature {
  name: string;
  included: boolean;
}

export interface PricingPlan {
  name: string;
  monthlyPrice: string;
  yearlyPrice: string;
  yearlySavings?: string;
  description: string;
  features: PricingFeature[];
  popular: boolean;
  buttonText: string;
  tier: string;
  icon: React.ReactNode;
}

interface PricingCardProps {
  plan: PricingPlan;
  isYearly: boolean;
  selectedPlan: string | null;
  setSelectedPlan: (tier: string | null) => void;
  handleUpgrade: (tier: string) => void;
  handlePaymentSubmit: (e: React.FormEvent, tier: string) => void;
}

const PricingCard = ({
  plan,
  isYearly,
  selectedPlan,
  setSelectedPlan,
  handleUpgrade,
  handlePaymentSubmit
}: PricingCardProps) => {
  return (
    <Card
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
            <Link to={"/sign-up"}>
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
  );
};

export default PricingCard;
