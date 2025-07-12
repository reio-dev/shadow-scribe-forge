import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: "Free Trial",
      subtitle: "Try the Basics",
      price: "$0",
      period: "",
      description: "Limited to 1 generation",
      features: [
        "1 README Generation",
        "Basic AI agent",
        "Public repos only",
        "No credit card required"
      ],
      cta: "Start Free Trial",
      popular: false,
      variant: "outline" as const
    },
    {
      name: "Starter Pack",
      subtitle: "Perfect for Quick Wins",
      price: "$3.99",
      period: "",
      description: "One-time payment",
      features: [
        "10 README Generations",
        "Public & private repos",
        "Customize with Add-Ons",
        "Easy Markdown Export"
      ],
      cta: "Get Starter Pack",
      popular: true,
      variant: "hero" as const
    },
    {
      name: "Monthly",
      subtitle: "All Features, Monthly Renewal",
      price: "$14.99",
      period: "/month",
      description: "Cancel anytime",
      features: [
        "Up to 50 READMEs/Month",
        "Most Advanced AI Agent",
        "Full Project Analysis",
        "Public & Private"
      ],
      cta: "Start Monthly Plan",
      popular: false,
      variant: "outline" as const
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 bg-surface-elevated/50 backdrop-blur-md rounded-full border border-border-subtle mb-6">
            <span className="text-sm text-primary font-medium">LIMITED TIME OFFER</span>
          </div>
          <div className="text-text-secondary mb-2">Valid until Jul. 15</div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative p-8 rounded-2xl border transition-all duration-300 animate-slide-up ${
                plan.popular 
                  ? 'border-primary bg-gradient-card shadow-card scale-105' 
                  : 'border-border-subtle bg-gradient-card hover:border-primary/20'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="px-4 py-1 bg-gradient-primary text-primary-foreground text-sm font-medium rounded-full">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-text-secondary mb-4">{plan.subtitle}</p>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-text-secondary">{plan.period}</span>
                </div>
                <p className="text-text-secondary">{plan.description}</p>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span className="text-text-secondary">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                variant={plan.variant} 
                size="lg" 
                className="w-full group"
              >
                {plan.cta}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;