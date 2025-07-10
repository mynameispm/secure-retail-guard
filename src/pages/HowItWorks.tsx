import { useState } from "react";
import * as React from "react";
import { Link } from "react-router-dom";
import { 
  Shield, 
  Lock, 
  Smartphone, 
  Users, 
  CheckCircle, 
  ArrowRight,
  Eye,
  FileCheck,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 0,
      title: "Device Enrollment",
      description: "Secure device registration with hardware attestation",
      icon: Smartphone,
      details: [
        "Hardware-backed key generation",
        "Biometric binding for enhanced security",
        "Device fingerprinting and validation",
        "QR code secure enrollment process"
      ]
    },
    {
      id: 1,
      title: "Context Verification",
      description: "Multi-sensor fusion validates authentic user context",
      icon: Eye,
      details: [
        "Location-based context validation",
        "Behavioral pattern analysis",
        "Multi-modal sensor fusion",
        "Real-time anomaly detection"
      ]
    },
    {
      id: 2,
      title: "Zero-Knowledge Proof",
      description: "Privacy-preserving authentication without data exposure",
      icon: Lock,
      details: [
        "Cryptographic proof generation",
        "No personal data transmission",
        "Mathematical verification",
        "GDPR and privacy compliant"
      ]
    },
    {
      id: 3,
      title: "Token Issuance",
      description: "Secure, time-bound tokens for authorized transactions",
      icon: FileCheck,
      details: [
        "Time-limited access tokens",
        "Cryptographically signed proofs",
        "Non-repudiable transactions",
        "Audit trail generation"
      ]
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Anti-Spoofing Protection",
      description: "Prevents context manipulation and location spoofing attacks"
    },
    {
      icon: Lock,
      title: "Privacy Preservation",
      description: "Zero-knowledge proofs ensure personal data never leaves your device"
    },
    {
      icon: Zap,
      title: "Real-Time Verification",
      description: "Instant authentication with sub-second response times"
    },
    {
      icon: Users,
      title: "Enterprise Scale",
      description: "Designed for high-volume retail environments"
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            How Our Security
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Framework Works
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive walkthrough of our privacy-preserving, anti-context-spoofing security framework 
            designed specifically for retail environments.
          </p>
        </div>

        {/* Step-by-Step Process */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-center mb-12">Security Process Flow</h2>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Step Navigation */}
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`security-card cursor-pointer transition-all duration-300 ${
                    activeStep === index ? 'ring-2 ring-primary shadow-glow' : ''
                  }`}
                  onClick={() => setActiveStep(index)}
                >
                  <div className="flex items-start space-x-4 p-6">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                      activeStep === index 
                        ? 'bg-gradient-primary text-white' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <step.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                    <div className={`text-2xl font-bold transition-colors ${
                      activeStep === index ? 'text-primary' : 'text-muted'
                    }`}>
                      {index + 1}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Step Details */}
            <div className="lg:sticky lg:top-24">
              <Card className="security-card">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center">
                      {steps[activeStep] && (
                        React.createElement(steps[activeStep].icon, { className: "h-8 w-8 text-white" })
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{steps[activeStep]?.title}</CardTitle>
                      <CardDescription>{steps[activeStep]?.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {steps[activeStep]?.details.map((detail, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                        <span className="text-sm">{detail}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-12">Key Benefits</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="security-card text-center">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-card rounded-2xl p-12 shadow-security">
          <h2 className="text-2xl font-bold mb-4">Ready to Experience It?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Try our interactive demo to see how the security framework works in a simulated retail environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/demo">
              <Button size="lg" className="security-button group">
                Try Interactive Demo
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" size="lg">
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;