import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Shield, 
  Smartphone, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  ArrowRight,
  QrCode,
  Eye,
  Lock,
  FileCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const Demo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [isComplete, setIsComplete] = useState(false);

  const demoSteps = [
    {
      id: 0,
      title: "Device Enrollment",
      description: "Scanning QR code for secure device registration",
      icon: QrCode,
      status: "idle"
    },
    {
      id: 1,
      title: "Context Verification",
      description: "Analyzing sensor data and user context",
      icon: Eye,
      status: "idle"
    },
    {
      id: 2,
      title: "Zero-Knowledge Proof",
      description: "Generating privacy-preserving authentication proof",
      icon: Lock,
      status: "idle"
    },
    {
      id: 3,
      title: "Token Issuance",
      description: "Creating secure access token",
      icon: FileCheck,
      status: "idle"
    }
  ];

  const [steps, setSteps] = useState(demoSteps);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isProcessing && countdown > 0) {
      interval = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0 && isProcessing) {
      setIsProcessing(false);
      setIsComplete(true);
      // Update final step to complete
      setSteps(prev => prev.map((step, index) => 
        index === 3 ? { ...step, status: 'complete' } : step
      ));
    }
    return () => clearInterval(interval);
  }, [isProcessing, countdown]);

  const startDemo = () => {
    setIsProcessing(true);
    setIsComplete(false);
    setCountdown(30);
    setCurrentStep(0);
    
    // Simulate step progression
    const stepDurations = [3, 8, 15, 4]; // seconds for each step
    let totalTime = 0;
    
    stepDurations.forEach((duration, index) => {
      setTimeout(() => {
        setCurrentStep(index);
        setSteps(prev => prev.map((step, stepIndex) => ({
          ...step,
          status: stepIndex === index ? 'processing' : 
                  stepIndex < index ? 'complete' : 'idle'
        })));
      }, totalTime * 1000);
      totalTime += duration;
    });
  };

  const resetDemo = () => {
    setIsProcessing(false);
    setIsComplete(false);
    setCurrentStep(0);
    setCountdown(30);
    setSteps(demoSteps);
  };

  const getStepIcon = (step: typeof demoSteps[0]) => {
    if (step.status === 'complete') return CheckCircle;
    if (step.status === 'processing') return Clock;
    return step.icon;
  };

  const getStepIconColor = (step: typeof demoSteps[0]) => {
    if (step.status === 'complete') return 'text-success';
    if (step.status === 'processing') return 'text-primary';
    return 'text-muted-foreground';
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Interactive Security
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Framework Demo
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience our privacy-preserving security framework in action. This simulation demonstrates 
            the complete authentication flow in a controlled retail environment.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Demo Interface */}
          <div className="space-y-6">
            <Card className="security-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Smartphone className="h-6 w-6 text-primary" />
                  <span>Simulated Device</span>
                </CardTitle>
                <CardDescription>
                  Retail security authentication simulation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Mock Phone Interface */}
                <div className="relative mx-auto w-64 h-96 bg-card border-4 border-border rounded-3xl p-4 shadow-lg">
                  <div className="w-full h-full bg-muted rounded-2xl p-4 flex flex-col items-center justify-center space-y-4">
                    {!isProcessing && !isComplete && (
                      <div className="text-center space-y-4">
                        <div className="w-24 h-24 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto">
                          <QrCode className="h-12 w-12 text-white" />
                        </div>
                        <h3 className="font-semibold">Ready to Authenticate</h3>
                        <p className="text-sm text-muted-foreground">
                          Tap below to start the secure enrollment process
                        </p>
                      </div>
                    )}
                    
                    {isProcessing && (
                      <div className="text-center space-y-4">
                        <div className="relative">
                          <div className="w-24 h-24 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto">
                            <Shield className="h-12 w-12 text-white animate-pulse" />
                          </div>
                          <div className="absolute -inset-2 bg-primary/20 rounded-3xl blur-xl animate-pulse-secure" />
                        </div>
                        <h3 className="font-semibold">Processing Authentication</h3>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-gradient-primary h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${((30 - countdown) / 30) * 100}%` }}
                          />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {countdown}s remaining
                        </p>
                      </div>
                    )}
                    
                    {isComplete && (
                      <div className="text-center space-y-4">
                        <div className="w-24 h-24 bg-success rounded-2xl flex items-center justify-center mx-auto">
                          <CheckCircle className="h-12 w-12 text-white" />
                        </div>
                        <h3 className="font-semibold text-success">Authentication Complete!</h3>
                        <p className="text-sm text-muted-foreground">
                          Secure token issued successfully
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="flex flex-col space-y-3">
                  {!isProcessing && !isComplete && (
                    <Button 
                      onClick={startDemo}
                      size="lg" 
                      className="security-button w-full"
                    >
                      Start Demo Authentication
                    </Button>
                  )}
                  
                  {isComplete && (
                    <div className="space-y-3">
                      <Button 
                        onClick={resetDemo}
                        variant="outline" 
                        size="lg" 
                        className="w-full"
                      >
                        Try Again
                      </Button>
                      <Link to="/dashboard">
                        <Button 
                          size="lg" 
                          className="security-button w-full group"
                        >
                          Go to Dashboard
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Process Steps */}
          <div className="space-y-6">
            <Card className="security-card">
              <CardHeader>
                <CardTitle>Authentication Process</CardTitle>
                <CardDescription>
                  Live progress of the security framework steps
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {steps.map((step, index) => {
                    const Icon = getStepIcon(step);
                    return (
                      <div
                        key={step.id}
                        className={`flex items-start space-x-4 p-4 rounded-lg transition-all duration-300 ${
                          step.status === 'processing' ? 'bg-primary/5 border border-primary/20' :
                          step.status === 'complete' ? 'bg-success/5 border border-success/20' :
                          'bg-muted/30'
                        }`}
                      >
                        <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                          step.status === 'complete' ? 'bg-success' :
                          step.status === 'processing' ? 'bg-primary' :
                          'bg-muted'
                        }`}>
                          <Icon className={`h-5 w-5 ${
                            step.status === 'complete' || step.status === 'processing' 
                              ? 'text-white' 
                              : 'text-muted-foreground'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{step.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{step.description}</p>
                          {step.status === 'processing' && (
                            <div className="mt-2">
                              <Progress value={((30 - countdown) / 30) * 100} className="h-1" />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Demo Info */}
            <Card className="security-card">
              <CardHeader>
                <CardTitle className="text-sm">Demo Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4 text-warning" />
                  <span className="text-muted-foreground">
                    This is a simulated environment for demonstration purposes
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">
                    No real data is collected or transmitted
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Lock className="h-4 w-4 text-success" />
                  <span className="text-muted-foreground">
                    All security processes are authentic to production
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-16 text-center bg-gradient-card rounded-2xl p-12 shadow-security">
          <h2 className="text-2xl font-bold mb-4">Ready to Implement?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contact our team to learn how to integrate this security framework into your retail environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="security-button">
                Explore Dashboard
              </Button>
            </Link>
            <Link to="/support">
              <Button variant="outline" size="lg">
                Get Support
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;