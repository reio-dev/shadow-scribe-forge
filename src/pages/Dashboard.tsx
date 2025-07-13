import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { ArrowLeft, ExternalLink, Star, GitBranch, Clock, Users, Code, Github, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";

const Dashboard = () => {
  const { user, isGithubUser } = useAuth();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [repositories, setRepositories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [repoUrl, setRepoUrl] = useState("");

  useEffect(() => {
    if (isGithubUser && user) {
      fetchGitHubRepositories();
    }
  }, [isGithubUser, user]);

  const fetchGitHubRepositories = async () => {
    setLoading(true);
    try {
      // Get GitHub access token from Firebase user
      const credential = user?.providerData.find(p => p.providerId === 'github.com');
      if (!credential) return;

      const response = await fetch('https://api.github.com/user/repos?sort=updated&per_page=10', {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        }
      });

      if (response.ok) {
        const repos = await response.json();
        setRepositories(repos.map((repo: any) => ({
          name: repo.name,
          full_name: repo.full_name,
          language: repo.language || 'Unknown',
          description: repo.description || 'No description available',
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          updatedAt: new Date(repo.updated_at).toLocaleDateString(),
          private: repo.private,
          html_url: repo.html_url
        })));
      }
    } catch (error) {
      console.error('Error fetching repositories:', error);
      toast.error('Failed to fetch repositories');
    } finally {
      setLoading(false);
    }
  };

  const handleEarlyAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Thank you! You've been added to our early access list.");
    setEmail("");
    setIsSubmitting(false);
  };

  const handleCreateDocumentation = (repo: any) => {
    // Navigate to README generator with repository data
    window.location.href = `/readme?repo=${encodeURIComponent(repo.full_name)}&type=github`;
  };

  const handlePublicRepoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoUrl) return;
    
    // Extract repo info from URL
    const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (match) {
      const [, owner, repo] = match;
      window.location.href = `/readme?repo=${encodeURIComponent(`${owner}/${repo}`)}&type=public`;
    } else {
      toast.error('Please enter a valid GitHub repository URL');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container max-w-7xl mx-auto px-4 py-8 mt-16">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.displayName || 'User'}!</h1>
          <p className="text-muted-foreground">
            {isGithubUser 
              ? "Manage your GitHub repositories and generate documentation" 
              : "Enter any public GitHub repository URL to generate documentation"
            }
          </p>
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
            {isGithubUser ? (
              <Card className="bg-surface-elevated border-border-subtle">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Github className="w-5 h-5" />
                    Your GitHub Repositories
                  </CardTitle>
                  <Button variant="outline" size="sm" onClick={fetchGitHubRepositories} disabled={loading}>
                    {loading ? "Loading..." : "Refresh"}
                  </Button>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
                      <p className="mt-2 text-muted-foreground">Loading repositories...</p>
                    </div>
                  ) : repositories.length > 0 ? (
                    <div className="grid gap-4">
                      {repositories.map((repo, index) => (
                        <Card key={index} className="bg-background border-border-subtle p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-lg">{repo.name}</h3>
                                {repo.private && (
                                  <Badge variant="outline" className="text-xs">Private</Badge>
                                )}
                              </div>
                              <Badge variant="secondary" className="text-xs">{repo.language}</Badge>
                            </div>
                            <Button 
                              size="sm" 
                              className="bg-primary hover:bg-primary/90"
                              onClick={() => handleCreateDocumentation(repo)}
                            >
                              <Code className="w-4 h-4 mr-2" />
                              Create Documentation
                            </Button>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{repo.description}</p>
                          
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
                            <a 
                              href={repo.html_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 hover:text-primary"
                            >
                              <ExternalLink className="w-3 h-3" />
                              View on GitHub
                            </a>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Github className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No repositories found</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-surface-elevated border-border-subtle">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Public Repository Documentation
                  </CardTitle>
                  <CardDescription>
                    Enter any public GitHub repository URL to generate comprehensive documentation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePublicRepoSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="repoUrl">GitHub Repository URL</Label>
                      <Input
                        id="repoUrl"
                        type="url"
                        placeholder="https://github.com/username/repository-name"
                        value={repoUrl}
                        onChange={(e) => setRepoUrl(e.target.value)}
                        className="bg-background border-border-subtle"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                      <Code className="w-4 h-4 mr-2" />
                      Generate Documentation
                    </Button>
                  </form>
                  
                  <div className="mt-6 p-4 bg-background rounded-lg border border-border-subtle">
                    <h4 className="font-medium mb-2">Supported Features:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Automatic README generation</li>
                      <li>• Code structure analysis</li>
                      <li>• Technology stack detection</li>
                      <li>• Installation & usage guides</li>
                      <li>• Dynamic badges generation</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}

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
            {/* User Connection */}
            <Card className="bg-surface-elevated border-border-subtle">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    {isGithubUser ? <Github className="w-5 h-5" /> : <Globe className="w-5 h-5" />}
                    {isGithubUser ? 'GitHub Connection' : 'Google Account'}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-500">Connected</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 p-4 bg-background rounded-lg border border-border-subtle">
                  <img 
                    src={user?.photoURL || ''} 
                    alt={user?.displayName || 'User'} 
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="font-medium">{user?.displayName}</div>
                    <div className="text-sm text-muted-foreground">{user?.email}</div>
                  </div>
                </div>
                {isGithubUser && (
                  <div className="mt-4 text-sm text-muted-foreground">
                    You can access and generate documentation for your GitHub repositories above.
                  </div>
                )}
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