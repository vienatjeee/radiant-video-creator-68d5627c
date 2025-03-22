
import React from "react";
import { Switch } from "@/components/ui/switch";

interface PricingToggleProps {
  isYearly: boolean;
  setIsYearly: (value: boolean) => void;
}

const PricingToggle = ({ isYearly, setIsYearly }: PricingToggleProps) => {
  return (
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
  );
};

export default PricingToggle;
