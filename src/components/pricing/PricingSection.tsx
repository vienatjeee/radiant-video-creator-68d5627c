
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import PricingToggle from "./PricingToggle";
import PricingCard from "./PricingCard";
import TestimonialsSection from "./TestimonialsSection";
import FAQSection from "./FAQSection";
import { pricingPlans, testimonials, faqs } from "./pricingData";

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
          <PricingToggle isYearly={isYearly} setIsYearly={setIsYearly} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={index}
              plan={plan}
              isYearly={isYearly}
              selectedPlan={selectedPlan}
              setSelectedPlan={setSelectedPlan}
              handleUpgrade={handleUpgrade}
              handlePaymentSubmit={handlePaymentSubmit}
            />
          ))}
        </div>

        {/* Testimonials section */}
        <TestimonialsSection testimonials={testimonials} />

        {/* FAQ Section */}
        <FAQSection faqs={faqs} />
      </div>
    </section>
  );
};

export default PricingSection;
