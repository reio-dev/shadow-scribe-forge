import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-gradient-end/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 bg-surface-elevated/50 backdrop-blur-md rounded-full border border-border-subtle mb-8">
              <Sparkles className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm text-text-secondary">AI-Powered Documentation</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              <span className="text-foreground">Instant,</span>
              <br />
              <span className="text-foreground">Professional</span>
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Code Documentation.
              </span>
            </h1>

            <p className="text-xl text-text-secondary mb-8 max-w-2xl">
              Document Smarter, Not Harder - All with a single click.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button variant="hero" size="xl" className="group">
                Start Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="glass" size="xl">
                Watch Demo
              </Button>
            </div>

            <p className="text-text-secondary">
              Harness the power of AI to create professional docs for your GitHub projects instantly.
            </p>
          </div>

          {/* Right Content - Preview */}
          <div className="animate-slide-up">
            <div className="relative">
              <div className="bg-surface-elevated rounded-2xl border border-border-subtle shadow-card p-6 animate-glow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full">
                    ✨ Generating...
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="text-sm font-medium text-foreground">Preview</div>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div className="flex items-center">
                      <span className="text-primary mr-2">✓</span>
                      Generating README...
                    </div>
                    <div className="flex items-center">
                      <span className="text-primary mr-2">✓</span>
                      Analyzing your repository structure...
                    </div>
                    <div className="flex items-center">
                      <span className="text-primary mr-2">✓</span>
                      Discovering project metadata and dependencies...
                    </div>
                    <div className="flex items-center">
                      <span className="text-primary mr-2">⏳</span>
                      Identifying programming languages in your codebase...
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;