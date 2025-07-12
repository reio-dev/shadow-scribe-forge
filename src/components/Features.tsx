import React from 'react';
import { Github, Zap, Clock } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Github,
      title: "Compatible with All Public GitHub Repos",
      description: "Connect and generate documentation for any public repository with ease."
    },
    {
      icon: Zap,
      title: "Lightning-Fast README Generation",
      description: "Get professional documentation in seconds using advanced AI technology."
    },
    {
      icon: Clock,
      title: "Full Documentation Coming Soon",
      description: "Complete code documentation features are in development and coming to you soon."
    }
  ];

  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-8 bg-gradient-card rounded-2xl border border-border-subtle hover:border-primary/20 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;