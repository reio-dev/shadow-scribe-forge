import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-24 bg-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ready to Streamline Your Project's Documentation?
          </h2>
          
          <div className="mb-8">
            <Button variant="hero" size="xl" className="group">
              Sign Up for Free
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          <p className="text-text-secondary text-lg">
            Give it a try for free!
          </p>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;