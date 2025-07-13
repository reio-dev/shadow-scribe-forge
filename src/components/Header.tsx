import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, LogOut, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <FileText className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">GitDocify</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-text-secondary hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-text-secondary hover:text-foreground transition-colors">
              Pricing
            </a>
            <a href="#faq" className="text-text-secondary hover:text-foreground transition-colors">
              FAQ
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <Button variant="ghost" size="sm" className="hidden sm:flex" asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
                <Button variant="ghost" size="sm" className="hidden sm:flex" asChild>
                  <Link to="/readme">Generator</Link>
                </Button>
                <div className="flex items-center space-x-2">
                  <img 
                    src={user.photoURL || ''} 
                    alt={user.displayName || 'User'} 
                    className="h-8 w-8 rounded-full"
                  />
                  <Button variant="ghost" size="sm" onClick={signOut}>
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : location.pathname !== '/login' ? (
              <>
                <Button variant="ghost" size="sm" className="hidden sm:flex" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button variant="hero" size="sm" asChild>
                  <Link to="/login">Get Started</Link>
                </Button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;