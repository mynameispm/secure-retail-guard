import { Shield, Users, Award, Target, CheckCircle, Globe, Lock, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";

const About = () => {
  const stats = [
    { label: "Years of Experience", value: "10+", icon: Award },
    { label: "Companies Protected", value: "500+", icon: Shield },
    { label: "Security Experts", value: "50+", icon: Users },
    { label: "Global Reach", value: "25+", icon: Globe },
  ];

  const values = [
    {
      icon: Lock,
      title: "Privacy First",
      description: "We believe privacy is a fundamental right. Our zero-knowledge approach ensures your data stays yours."
    },
    {
      icon: Shield,
      title: "Security Excellence", 
      description: "We maintain the highest security standards with continuous monitoring and improvement."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We push boundaries with cutting-edge technology to stay ahead of emerging threats."
    },
    {
      icon: Users,
      title: "Customer Success",
      description: "Your success is our success. We're committed to providing exceptional service and support."
    }
  ];

  const team = [
    {
      name: "Alex Johnson",
      role: "CEO & Founder",
      bio: "Former cybersecurity expert at Fortune 500 companies with 15+ years in retail security.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Sarah Chen",
      role: "CTO",
      bio: "PhD in Cryptography, former researcher at MIT specializing in zero-knowledge proofs.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Security",
      bio: "20+ years in enterprise security, former NSA analyst and security consultant.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Emily Davis",
      role: "VP of Engineering",
      bio: "Expert in distributed systems and real-time security frameworks with 12+ years experience.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-hero">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About <span className="bg-gradient-primary bg-clip-text text-transparent">SecureRetail</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              We're on a mission to revolutionize retail security by preventing context spoofing attacks 
              while preserving user privacy through cutting-edge zero-knowledge technology.
            </p>
            <div className="flex justify-center">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Shield className="h-4 w-4" />
                <span>Trusted by 500+ Companies Worldwide</span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Founded in 2025, SecureRetail emerged from a simple observation: traditional security 
                    systems were failing to protect against sophisticated context spoofing attacks in retail 
                    environments.
                  </p>
                  <p>
                    Our founders, coming from backgrounds in cryptography, cybersecurity, and retail technology, 
                    recognized the need for a new approach—one that could verify user authenticity without 
                    compromising privacy.
                  </p>
                  <p>
                    Today, we're proud to protect hundreds of retailers worldwide with our innovative 
                    zero-knowledge security framework, preventing millions of dollars in fraud while 
                    preserving user privacy.
                  </p>
                </div>
              </div>
              <div className="relative">
                <Card className="security-card">
                  <CardContent className="p-8">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-success" />
                        <span className="text-sm">Zero-Knowledge Architecture</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-success" />
                        <span className="text-sm">Hardware-Backed Security</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-success" />
                        <span className="text-sm">Real-time Threat Detection</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-success" />
                        <span className="text-sm">Privacy-Compliant Framework</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              <Card className="security-card">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <Target className="h-8 w-8 text-primary" />
                    <h3 className="text-2xl font-bold">Our Mission</h3>
                  </div>
                  <p className="text-muted-foreground">
                    To eliminate context spoofing attacks in retail environments while preserving user privacy 
                    through innovative zero-knowledge security technologies. We believe security and privacy 
                    should work together, not against each other.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="security-card">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <Globe className="h-8 w-8 text-primary" />
                    <h3 className="text-2xl font-bold">Our Vision</h3>
                  </div>
                  <p className="text-muted-foreground">
                    A world where every retail transaction is secure, private, and trustworthy. We envision 
                    a future where consumers can shop with confidence, knowing their personal data is protected 
                    while retailers are safeguarded against fraud.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="security-card h-full">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                The experts behind SecureRetail's innovative security solutions
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="security-card text-center">
                  <CardContent className="p-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                    <p className="text-primary text-sm font-medium mb-3">{member.role}</p>
                    <p className="text-xs text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
