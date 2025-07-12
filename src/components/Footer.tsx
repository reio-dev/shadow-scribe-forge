import React from 'react';
import { FileText, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-surface border-t border-border-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <FileText className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">GitDocify</span>
            </div>
            <p className="text-text-secondary max-w-md mb-6">
              AI-powered documentation generation for GitHub repositories. 
              Create professional README files and comprehensive code documentation instantly.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-surface-elevated rounded-lg text-text-secondary hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-surface-elevated rounded-lg text-text-secondary hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-surface-elevated rounded-lg text-text-secondary hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-text-secondary hover:text-foreground transition-colors">Features</a></li>
              <li><a href="#" className="text-text-secondary hover:text-foreground transition-colors">Pricing</a></li>
              <li><a href="#" className="text-text-secondary hover:text-foreground transition-colors">API</a></li>
              <li><a href="#" className="text-text-secondary hover:text-foreground transition-colors">Documentation</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-text-secondary hover:text-foreground transition-colors">Help Center</a></li>
              <li><a href="#" className="text-text-secondary hover:text-foreground transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-text-secondary hover:text-foreground transition-colors">Status</a></li>
              <li><a href="#" className="text-text-secondary hover:text-foreground transition-colors">Community</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border-subtle mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-text-secondary text-sm">
            © 2024 GitDocify. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-text-secondary hover:text-foreground text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-text-secondary hover:text-foreground text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-text-secondary hover:text-foreground text-sm transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;