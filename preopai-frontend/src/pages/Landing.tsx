import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Activity, Brain, FileText, Users } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">PreOpAI</h1>
            </div>
            <Link to="/dashboard">
              <Button>Enter Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-5xl font-bold text-foreground">
              AI-Powered Peri-Operative Care
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Streamline pre-operative assessments with intelligent triage and anaesthesia planning. 
              Helping nurses make faster, data-driven decisions.
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="text-lg px-8">
                Get Started
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8">
              Learn More
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="bg-card p-6 rounded-lg border shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Patient Management</h3>
              <p className="text-muted-foreground">
                Efficiently manage patient records and pre-operative forms in one centralized system.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg border shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <Brain className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">AI Assessment</h3>
              <p className="text-muted-foreground">
                Generate intelligent anaesthesia plans based on comprehensive medical history analysis.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg border shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Quick Triage</h3>
              <p className="text-muted-foreground">
                Rapid risk assessment with color-coded indicators for immediate prioritization.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
