
import { User, Zap, Shield } from "lucide-react";
import { PricingPlan } from "./PricingCard";
import React from "react";

// Define the pricing plans
export const pricingPlans: PricingPlan[] = [
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
    icon: React.createElement(User, { className: "h-5 w-5 text-muted-foreground" })
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
    icon: React.createElement(Zap, { className: "h-5 w-5 text-amber-500" })
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
    icon: React.createElement(Shield, { className: "h-5 w-5 text-indigo-500" })
  }
];

export const testimonials = [
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
];

export const faqs = [
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
];
