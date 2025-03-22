
import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle
} from "@/components/ui/card";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
}

const FAQSection = ({ faqs }: FAQSectionProps) => {
  return (
    <div className="mt-20">
      <div className="text-center mb-12">
        <h3 className="text-2xl font-bold mb-2">Frequently Asked Questions</h3>
        <p className="text-muted-foreground">Everything you need to know about our plans</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {faqs.map((faq, index) => (
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
  );
};

export default FAQSection;
