import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { ArrowLeft, ExternalLink, Star, GitBranch, Clock, Users, Code } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEarlyAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Thank you! You've been added to our early access list.");
    setEmail("");
    setIsSubmitting(false);
  };

  const repositories = [
    {
      name: "minimal-portfolio",
      language: "JavaScript",
      description: "A minimal, interactive portfolio website built with React, Vite, and GSAP...",
      stars: 0,
      forks: 0,
      updatedAt: "1d ago"
    },
    {
      name: "Reflexa-ai",
      language: "TypeScript", 
      description: "Reflexa is a modern journaling application that combines the power...",
      stars: 0,
      forks: 0,
      updatedAt: "1d ago"
    },
    {
      name: "Bentolio",
      language: "JavaScript",
      description: "Bentolio is a visually engaging personal portfolio website designed to showca...",
      stars: 4,
      forks: 0,
      updatedAt: "4d ago"
    },
    {
      name: "CaesarCrypt",
      language: "Python",
      description: "The CaesarCrypt web application provides an interactive and education...",
      stars: 1,
      forks: 0,
      updatedAt: "6w ago"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border-subtle bg-surface-elevated/50 backdrop-blur-md">
        <div className="container max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">GitDocify</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <ExternalLink className="w-4 h-4 mr-2" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="mb-8">
          <Button variant="ghost" size="sm" className="mb-4">
            <Users className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Account Section */}
            <Card className="bg-surface-elevated border-border-subtle">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Your Account</CardTitle>
                </div>
                <Button variant="outline" size="sm">Manage Account</Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-3">
                    <GitBranch className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium">Trial Status</div>
                      <div className="text-sm text-muted-foreground">Generations</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="default" className="mb-2">Active</Badge>
                    <div className="text-sm font-medium">1/1</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Usage resets with upgrade
                  </div>
                  <Button variant="hero" size="sm">
                    Upgrade
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Repositories Section */}
            <Card className="bg-surface-elevated border-border-subtle">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl">Your Repositories</CardTitle>
                <Button variant="outline" size="sm">
                  <GitBranch className="w-4 h-4 mr-2" />
                  Enable Private Repositories
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {repositories.map((repo, index) => (
                    <Card key={index} className="bg-background border-border-subtle p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{repo.name}</h3>
                          <Badge variant="secondary" className="text-xs">{repo.language}</Badge>
                        </div>
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                          <Code className="w-4 h-4 mr-2" />
                          Create Documentation
                        </Button>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">{repo.description}</p>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          {repo.stars}
                        </div>
                        <div className="flex items-center gap-1">
                          <GitBranch className="w-3 h-3" />
                          {repo.forks}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {repo.updatedAt}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Coming Soon Section */}
            <Card className="bg-surface-elevated border-border-subtle">
              <CardContent className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">Coming Soon: Full Code Documentation</h3>
                <p className="text-muted-foreground">
                  We're working on bringing you comprehensive code documentation features. Stay tuned for updates!
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* GitHub Connection */}
            <Card className="bg-surface-elevated border-border-subtle">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Github Connection</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-500">Connected</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 p-4 bg-background rounded-lg border border-border-subtle">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">A</span>
                  </div>
                  <div>
                    <div className="font-medium">@Adityaj08</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Premium Early Access */}
            <Card className="bg-surface-elevated border-border-subtle">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CardTitle>Premium Features</CardTitle>
                  <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                    BETA
                  </Badge>
                </div>
                <CardDescription>
                  Get early access to premium documentation features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-gradient-primary hover:opacity-90">
                      Join Early Access
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-surface-elevated border-border-subtle">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        Premium Early Access
                        <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                          BETA
                        </Badge>
                      </DialogTitle>
                      <DialogDescription>
                        Be among the first to access advanced documentation features including custom templates, 
                        API documentation generation, and priority support.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <form onSubmit={handleEarlyAccess} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="bg-background border-border-subtle"
                        />
                      </div>
                      
                      <div className="bg-background rounded-lg p-4 border border-border-subtle">
                        <h4 className="font-medium mb-2">Premium Features Include:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Custom README templates</li>
                          <li>• API documentation generation</li>
                          <li>• Advanced code analysis</li>
                          <li>• Priority support</li>
                          <li>• White-label options</li>
                        </ul>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-primary hover:opacity-90"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Joining..." : "Join Early Access List"}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;