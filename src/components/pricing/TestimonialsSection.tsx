
import React from "react";
import { Star } from "lucide-react";
import {
  Card,
  CardContent
} from "@/components/ui/card";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

const TestimonialsSection = ({ testimonials }: TestimonialsSectionProps) => {
  return (
    <div className="mt-20">
      <div className="text-center mb-12">
        <h3 className="text-2xl font-bold mb-2">Trusted by creators worldwide</h3>
        <p className="text-muted-foreground">Join thousands of satisfied users creating amazing videos</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="bg-accent/50">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-amber-400 fill-amber-400 h-6 w-6" />
                ))}
              </div>
              <p className="text-sm italic mb-4">{testimonial.quote}</p>
              <div className="text-sm font-medium">{testimonial.author}</div>
              <div className="text-xs text-muted-foreground">{testimonial.role}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
