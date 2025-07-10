import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Shield, Lock, Smartphone, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      icon: Shield,
      title: "Context Spoofing Protection",
      description: "Advanced detection prevents location and behavioral spoofing attacks",
    },
    {
      icon: Lock,
      title: "Zero-Knowledge Proofs",
      description: "Verify user authenticity without exposing personal data",
    },
    {
      icon: Smartphone,
      title: "Device-Bound Security",
      description: "Hardware-backed attestation ensures genuine device interactions",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen pt-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-hero">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Shield className="h-4 w-4" />
                <span>Privacy-First Security Framework</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Stop Context Spoofing
                <span className="block bg-gradient-primary bg-clip-text text-transparent">
                  Protect Retail
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-lg">
                Revolutionary zero-knowledge security framework that prevents context spoofing attacks while preserving user privacy in retail environments.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/demo">
                <Button size="lg" className="security-button group">
                  See How It Works
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 pt-8 border-t border-border">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-success" />
                <span className="text-sm text-muted-foreground">Enterprise Ready</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-success" />
                <span className="text-sm text-muted-foreground">Privacy Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-success" />
                <span className="text-sm text-muted-foreground">Zero-Trust Architecture</span>
              </div>
            </div>
          </div>

          {/* Right Column - Interactive Demo */}
          <div className="relative" style={{ animationDelay: '0.3s' }}>
            <div className="security-card p-8 max-w-md mx-auto">
              <div className="text-center space-y-6">
                <div className="relative mx-auto w-20 h-20">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all duration-500 ${
                        index === currentFeature
                          ? 'opacity-100 scale-100'
                          : 'opacity-0 scale-75'
                      }`}
                    >
                      <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center">
                        <feature.icon className="h-10 w-10 text-white" />
                      </div>
                    </div>
                  ))}
                  <div className="absolute -inset-2 bg-primary/20 rounded-3xl blur-xl animate-pulse-secure" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">
                    {features[currentFeature].title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {features[currentFeature].description}
                  </p>
                </div>

                {/* Progress Indicators */}
                <div className="flex justify-center space-x-2">
                  {features.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentFeature ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Security Indicators */}
            <div className="absolute -top-4 -right-4 bg-success/10 text-success px-3 py-1 rounded-full text-xs font-medium animate-float">
              99.9% Secure
            </div>
            <div className="absolute -bottom-4 -left-4 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium animate-float" style={{ animationDelay: '1.5s' }}>
              Privacy First
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;