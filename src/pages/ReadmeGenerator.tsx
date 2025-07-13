import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { ArrowLeft, Copy, Download, FileText, Settings, Sparkles, Eye, Edit, Code, Star, GitBranch, Loader2 } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";

interface ProjectData {
  name: string;
  description: string;
  language: string;
  framework: string;
  features: string[];
  installation: string;
  usage: string;
  contributing: boolean;
  license: string;
}

const ReadmeGenerator = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const repoParam = searchParams.get('repo');
  const typeParam = searchParams.get('type');

  const [projectData, setProjectData] = useState<ProjectData>({
    name: "Project Name",
    description: "Project description will be loaded from repository analysis",
    language: "JavaScript",
    framework: "React",
    features: [],
    installation: "",
    usage: "",
    contributing: false,
    license: "MIT"
  });

  const [activeTab, setActiveTab] = useState("preview");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [generatedReadme, setGeneratedReadme] = useState("");
  const [email, setEmail] = useState("");
  const [repoData, setRepoData] = useState<any>(null);

  // Premium sections state
  const [premiumSections, setPremiumSections] = useState({
    features: false,
    projectStructure: false,
    projectIndex: false,
    roadmap: false,
    contribution: false,
    license: false,
    acknowledgements: false
  });

  // Styling options
  const [headerAlignment, setHeaderAlignment] = useState("center");
  const [tocStyle, setTocStyle] = useState("bullets");
  const [generateLogo, setGenerateLogo] = useState(false);
  const [addEmojis, setAddEmojis] = useState(false);

  useEffect(() => {
    if (repoParam) {
      analyzeRepository();
    }
  }, [repoParam]);

  const analyzeRepository = async () => {
    if (!repoParam) return;
    
    setIsAnalyzing(true);
    try {
      // Fetch repository info
      const repoResponse = await fetch(`https://api.github.com/repos/${repoParam}`);
      if (!repoResponse.ok) throw new Error('Repository not found');
      
      const repoInfo = await repoResponse.json();
      
      // Fetch repository contents recursively
      const contentsResponse = await fetch(`https://api.github.com/repos/${repoParam}/contents`);
      const contents = contentsResponse.ok ? await contentsResponse.json() : [];
      
      // Fetch package.json if exists
      let packageJson = null;
      try {
        const packageResponse = await fetch(`https://api.github.com/repos/${repoParam}/contents/package.json`);
        if (packageResponse.ok) {
          const packageData = await packageResponse.json();
          packageJson = JSON.parse(atob(packageData.content));
        }
      } catch (e) {
        // package.json doesn't exist or is not accessible
      }

      // Analyze the repository structure and content
      const analysis = await analyzeRepositoryContent(repoInfo, contents, packageJson);
      
      setRepoData(repoInfo);
      setProjectData({
        name: repoInfo.name,
        description: repoInfo.description || "No description available",
        language: repoInfo.language || "Unknown",
        framework: analysis.framework,
        features: analysis.features,
        installation: analysis.installation,
        usage: analysis.usage,
        contributing: !!repoInfo.has_issues,
        license: repoInfo.license?.name || "MIT"
      });
      
      toast.success("Repository analyzed successfully!");
    } catch (error) {
      console.error('Error analyzing repository:', error);
      toast.error("Failed to analyze repository. Please check the URL and try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const analyzeRepositoryContent = async (repoInfo: any, contents: any[], packageJson: any) => {
    let framework = "Unknown";
    let features = [];
    let installation = "";
    let usage = "";

    // Detect framework from package.json dependencies
    if (packageJson?.dependencies) {
      if (packageJson.dependencies.react) framework = "React";
      else if (packageJson.dependencies.vue) framework = "Vue.js";
      else if (packageJson.dependencies.angular || packageJson.dependencies["@angular/core"]) framework = "Angular";
      else if (packageJson.dependencies.next) framework = "Next.js";
      else if (packageJson.dependencies.nuxt) framework = "Nuxt.js";
      else if (packageJson.dependencies.express) framework = "Express.js";
      else if (packageJson.dependencies.fastify) framework = "Fastify";
    }

    // Generate installation instructions
    if (packageJson) {
      installation = `\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\``;
    }

    // Generate basic usage from scripts
    if (packageJson?.scripts) {
      const startScript = packageJson.scripts.start || packageJson.scripts.dev || packageJson.scripts.serve;
      if (startScript) {
        usage = `\`\`\`bash
npm start
# or
npm run dev
\`\`\``;
      }
    }

    return { framework, features, installation, usage };
  };

  const handleInputChange = (field: keyof ProjectData, value: any) => {
    setProjectData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateReadme = async () => {
    setIsGenerating(true);
    
    try {
      const repoOwner = repoParam?.split('/')[0] || 'user';
      const repoName = repoParam?.split('/')[1] || projectData.name;
      
      const prompt = `Generate a comprehensive and professional README.md file for the GitHub repository "${repoParam || projectData.name}" with the following details:
      
      Project Name: ${projectData.name}
      Description: ${projectData.description}
      Programming Language: ${projectData.language}
      Framework: ${projectData.framework}
      Repository URL: ${repoParam ? `https://github.com/${repoParam}` : ''}
      Stars: ${repoData?.stargazers_count || 0}
      Forks: ${repoData?.forks_count || 0}
      License: ${projectData.license}
      
      Please include these sections with proper markdown formatting:
      
      1. **Header Section with Badges**: Include shields.io badges for:
         - GitHub stars: ![GitHub stars](https://img.shields.io/github/stars/${repoOwner}/${repoName}?style=social)
         - GitHub forks: ![GitHub forks](https://img.shields.io/github/forks/${repoOwner}/${repoName}?style=social)
         - License: ![License](https://img.shields.io/github/license/${repoOwner}/${repoName})
         - Language: ![Language](https://img.shields.io/github/languages/top/${repoOwner}/${repoName})
         - Last commit: ![Last commit](https://img.shields.io/github/last-commit/${repoOwner}/${repoName})
         - Issues: ![Issues](https://img.shields.io/github/issues/${repoOwner}/${repoName})
         - Pull Requests: ![PRs](https://img.shields.io/github/issues-pr/${repoOwner}/${repoName})
      
      2. **Table of Contents** - Interactive navigation
      3. **About the Project** - Detailed description with key features
      4. **Built With** - Technology stack with framework badges
      5. **Getting Started** - Prerequisites and installation
      6. **Usage** - Code examples and screenshots
      7. **Roadmap** - Future features and improvements
      8. **Contributing** - Guidelines for contributors
      9. **License** - License information
      10. **Contact** - How to reach the maintainers
      11. **Acknowledgments** - Credits and thanks
      
      Requirements:
      - Use proper markdown syntax with headers, code blocks, and formatting
      - Include multiple shields.io badges for professional appearance
      - Add emojis to section headers for visual appeal
      - Make it comprehensive and professional looking
      - Include code examples with syntax highlighting
      - Add installation instructions with multiple package managers (npm, yarn, pnpm)
      - Include usage examples with actual code snippets
      - Make the content engaging and informative
      
      Make it look like a top-tier open source project README with all the bells and whistles!`;

      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': 'AIzaSyD6lXCcY6nqgbwaiJU7RVUMm7Zm5Eh773Y'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate README');
      }

      const data = await response.json();
      const readme = data.candidates?.[0]?.content?.parts?.[0]?.text || "Failed to generate README";
      
      setGeneratedReadme(readme);
      setActiveTab("preview");
      toast.success("README generated successfully!");
      
    } catch (error) {
      console.error('Error generating README:', error);
      toast.error("Failed to generate README. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedReadme);
    toast.success("README copied to clipboard!");
  };

  const downloadReadme = () => {
    const blob = new Blob([generatedReadme], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("README downloaded!");
  };

  const handleEarlyAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success("Thank you! You've been added to our premium early access list.");
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {isAnalyzing && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <Card className="bg-surface-elevated border-border-subtle p-8">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Analyzing Repository</h3>
              <p className="text-muted-foreground">
                Scanning {repoParam} for project structure, dependencies, and content...
              </p>
            </div>
          </Card>
        </div>
      )}

      <div className="container max-w-7xl mx-auto px-4 py-8 mt-16">
        {repoParam && (
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">README Generator</h1>
              <p className="text-muted-foreground">
                Generating documentation for <code className="bg-surface-elevated px-2 py-1 rounded">{repoParam}</code>
              </p>
            </div>
            <Link to="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
          </div>
        )}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Configuration */}
          <div className="space-y-6">
            {/* Project Info */}
            <Card className="bg-surface-elevated border-border-subtle">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg">{projectData.name}</CardTitle>
                  <Badge variant="secondary">{projectData.language}</Badge>
                </div>
                <CardDescription className="line-clamp-3">{projectData.description}</CardDescription>
                {repoData && (
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      {repoData.stargazers_count}
                    </div>
                    <div className="flex items-center gap-1">
                      <GitBranch className="w-3 h-3" />
                      {repoData.forks_count}
                    </div>
                    <span>Updated {new Date(repoData.updated_at).toLocaleDateString()}</span>
                  </div>
                )}
              </CardHeader>
            </Card>

            {/* Generate Button */}
            <Button 
              onClick={generateReadme} 
              disabled={isGenerating}
              className="w-full bg-primary hover:bg-primary/90 h-12 text-base"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                  Generating README...
                </>
              ) : (
                <>
                  <FileText className="w-5 h-5 mr-2" />
                  Generate README
                </>
              )}
            </Button>

            {/* Customize README */}
            <Card className="bg-surface-elevated border-border-subtle">
              <CardHeader>
                <CardTitle className="text-lg">Customize README</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Default Sections */}
                <div>
                  <h4 className="font-medium mb-3">Default Sections</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    These sections are always included in your README
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        <span className="text-sm">Header</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        <span className="text-sm">Table of Contents</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        <span className="text-sm">Overview</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Settings className="w-4 h-4" />
                        <span className="text-sm">Quickstart</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Styling Options */}
                <div>
                  <h4 className="font-medium mb-3">Styling</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Customize the visual appearance of your README
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm">Header Alignment</Label>
                      <div className="flex gap-2 mt-2">
                        {["left", "center", "right"].map((align) => (
                          <Button
                            key={align}
                            variant={headerAlignment === align ? "default" : "outline"}
                            size="sm"
                            onClick={() => setHeaderAlignment(align)}
                            className="flex-1 capitalize"
                          >
                            {align}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm">Table of Contents Style</Label>
                      <Select value={tocStyle} onValueChange={setTocStyle}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bullets">• Bullets</SelectItem>
                          <SelectItem value="numbers">1. Numbers</SelectItem>
                          <SelectItem value="dashes">- Dashes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Generate Logo</Label>
                        <Switch checked={generateLogo} onCheckedChange={setGenerateLogo} />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Add Emojis to Headings</Label>
                        <Switch checked={addEmojis} onCheckedChange={setAddEmojis} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Premium Sections */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <h4 className="font-medium">Premium Sections</h4>
                    <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                      BETA
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Additional sections to enhance your README
                  </p>
                  
                  <div className="space-y-3">
                    {Object.entries(premiumSections).map(([key, enabled]) => (
                      <div key={key} className="flex items-center justify-between opacity-50">
                        <div className="flex items-center gap-2">
                          <Settings className="w-4 h-4" />
                          <span className="text-sm capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                        </div>
                        <Switch checked={enabled} disabled />
                      </div>
                    ))}
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full mt-4" size="sm">
                        <Sparkles className="w-4 h-4 mr-2" />
                        Unlock Premium
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-surface-elevated border-border-subtle">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          Premium Sections
                          <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                            BETA
                          </Badge>
                        </DialogTitle>
                        <DialogDescription>
                          Get early access to premium README sections and advanced customization options.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <form onSubmit={handleEarlyAccess} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="premium-email">Email Address</Label>
                          <Input
                            id="premium-email"
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="bg-background border-border-subtle"
                          />
                        </div>
                        
                        <div className="bg-background rounded-lg p-4 border border-border-subtle">
                          <h4 className="font-medium mb-2">Premium Sections Include:</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• ✨ Features showcase</li>
                            <li>• 🏗️ Project structure</li>
                            <li>• 📋 Project index</li>
                            <li>• 🗺️ Roadmap timeline</li>
                            <li>• 🤝 Contribution guidelines</li>
                            <li>• 📄 License details</li>
                            <li>• 🙏 Acknowledgements</li>
                          </ul>
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full bg-gradient-primary hover:opacity-90"
                        >
                          Join Premium Early Access
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="bg-surface-elevated border border-border-subtle">
                <TabsTrigger value="preview" className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Preview
                </TabsTrigger>
                <TabsTrigger value="edit" className="flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  Edit
                </TabsTrigger>
              </TabsList>

              <TabsContent value="preview" className="space-y-0">
                <Card className="bg-surface-elevated border-border-subtle min-h-[600px]">
                  <CardHeader className="border-b border-border-subtle flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">README Preview</CardTitle>
                    {generatedReadme && (
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={copyToClipboard}>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </Button>
                        <Button variant="outline" size="sm" onClick={downloadReadme}>
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="p-6">
                    {generatedReadme ? (
                      <div className="prose prose-slate dark:prose-invert max-w-none">
                        <div 
                          className="markdown-content text-sm"
                          dangerouslySetInnerHTML={{ 
                            __html: generatedReadme
                              .replace(/### /g, '<h3>')
                              .replace(/## /g, '<h2>')
                              .replace(/# /g, '<h1>')
                              .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-surface-elevated p-4 rounded-lg overflow-x-auto"><code>$2</code></pre>')
                              .replace(/`([^`]+)`/g, '<code class="bg-surface-elevated px-1 py-0.5 rounded text-xs">$1</code>')
                              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                              .replace(/\*(.*?)\*/g, '<em>$1</em>')
                              .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2" class="max-w-full h-auto rounded-lg"/>')
                              .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">$1</a>')
                              .replace(/\n/g, '<br/>')
                          }} 
                        />
                      </div>
                    ) : (
                      <div className="text-center py-20 text-muted-foreground">
                        <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>Click "Generate README" to see your documentation preview</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="edit" className="space-y-0">
                <Card className="bg-surface-elevated border-border-subtle min-h-[600px]">
                  <CardHeader className="border-b border-border-subtle">
                    <CardTitle className="text-lg">Edit README</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <Textarea
                      value={generatedReadme}
                      onChange={(e) => setGeneratedReadme(e.target.value)}
                      placeholder="Your generated README will appear here for editing..."
                      className="min-h-[500px] font-mono text-sm bg-background border-border-subtle"
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadmeGenerator;