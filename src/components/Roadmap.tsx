import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, ArrowRight } from 'lucide-react';

const Roadmap = () => {
  const phases = [
    {
      title: "Phase 1: README Generation",
      status: "completed",
      description: "Available now - Create professional README files instantly.",
      icon: CheckCircle
    },
    {
      title: "Phase 2: Full Code Documentation",
      status: "coming-soon",
      description: "Coming soon - Comprehensive documentation for classes, functions, and more.",
      icon: Clock
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Code Documentation is Next
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Our roadmap to complete code documentation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {phases.map((phase, index) => (
            <div 
              key={index}
              className="p-8 bg-gradient-card rounded-2xl border border-border-subtle animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-center mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  phase.status === 'completed' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-primary/20 text-primary'
                }`}>
                  <phase.icon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-foreground">
                    {phase.title}
                  </h3>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    phase.status === 'completed'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-primary/20 text-primary'
                  }`}>
                    {phase.status === 'completed' ? 'Available Now' : 'Coming Soon'}
                  </span>
                </div>
              </div>
              <p className="text-text-secondary leading-relaxed">
                {phase.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center animate-fade-in">
          <h3 className="text-2xl font-semibold text-foreground mb-4">
            Join us early
          </h3>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Create your account now and be among the first to access full documentation features when they launch.
          </p>
          <Button variant="hero" size="lg">
            Create Account
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;