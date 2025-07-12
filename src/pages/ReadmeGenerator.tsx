import { useState } from "react";
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
import { ArrowLeft, Copy, Download, FileText, Settings, Sparkles, Eye, Edit, Code, Star, GitBranch } from "lucide-react";
import { Link } from "react-router-dom";

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
  const [projectData, setProjectData] = useState<ProjectData>({
    name: "Reflexa-ai",
    description: "Reflexa is a modern journaling application that combines the power of AI with emotional tracking to provide personalized insights and reflections.",
    language: "TypeScript",
    framework: "React",
    features: [],
    installation: "",
    usage: "",
    contributing: false,
    license: "MIT"
  });

  const [activeTab, setActiveTab] = useState("preview");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReadme, setGeneratedReadme] = useState("");
  const [email, setEmail] = useState("");

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

  const handleInputChange = (field: keyof ProjectData, value: any) => {
    setProjectData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateReadme = async () => {
    setIsGenerating(true);
    
    try {
      const prompt = `Generate a comprehensive README.md file for a project with the following details:
      
      Project Name: ${projectData.name}
      Description: ${projectData.description}
      Programming Language: ${projectData.language}
      Framework: ${projectData.framework}
      
      Please include:
      - Professional project title with badges from shields.io
      - Detailed description and features
      - Table of contents
      - Installation instructions
      - Usage examples
      - Technology stack with shields.io badges
      - Contributing guidelines if requested
      - License information
      
      Use proper Markdown formatting and include shields.io badges for:
      - Language (${projectData.language})
      - Framework (${projectData.framework})
      - License (${projectData.license})
      - Last commit, stars, and other dynamic badges
      
      Make it professional and comprehensive.`;

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
      {/* Header */}
      <header className="border-b border-border-subtle bg-surface-elevated/50 backdrop-blur-md">
        <div className="container max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" />
              Dashboard
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={copyToClipboard} disabled={!generatedReadme}>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
            <Button variant="outline" size="sm" onClick={downloadReadme} disabled={!generatedReadme}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </header>

      <div className="container max-w-7xl mx-auto px-4 py-8">
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
                <CardDescription>{projectData.description}</CardDescription>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    0
                  </div>
                  <div className="flex items-center gap-1">
                    <GitBranch className="w-3 h-3" />
                    0
                  </div>
                  <span>Updated 1d ago</span>
                </div>
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
                  <CardHeader className="border-b border-border-subtle">
                    <CardTitle className="text-lg">README Preview</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    {generatedReadme ? (
                      <div className="prose prose-invert max-w-none">
                        <pre className="whitespace-pre-wrap text-sm text-foreground font-mono">
                          {generatedReadme}
                        </pre>
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