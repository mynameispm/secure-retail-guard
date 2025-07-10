import { Link } from "react-router-dom";
import { HelpCircle, Mail, MessageSquare, Book, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Support = () => {
  const supportOptions = [
    {
      title: "About Us",
      description: "Learn about our mission and the team behind the security framework",
      icon: Users,
      href: "/about",
      color: "bg-primary"
    },
    {
      title: "FAQ",
      description: "Find answers to frequently asked questions",
      icon: HelpCircle,
      href: "/faq",
      color: "bg-secondary"
    },
    {
      title: "Contact",
      description: "Get in touch with our support team",
      icon: Mail,
      href: "/contact",
      color: "bg-accent"
    },
    {
      title: "Documentation",
      description: "Technical documentation and implementation guides",
      icon: Book,
      href: "/how-it-works",
      color: "bg-success"
    }
  ];

  const quickLinks = [
    { title: "Getting Started", href: "/how-it-works" },
    { title: "Device Enrollment", href: "/demo" },
    { title: "Security Features", href: "/how-it-works" },
    { title: "Privacy Policy", href: "#" },
    { title: "Terms of Service", href: "#" },
    { title: "API Documentation", href: "#" }
  ];

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            How Can We
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Help You?
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Find answers, get support, and learn more about our privacy-preserving security framework.
          </p>
        </div>

        {/* Support Options */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {supportOptions.map((option, index) => (
            <Link key={index} to={option.href}>
              <Card className="security-card h-full group cursor-pointer">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className={`w-16 h-16 ${option.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <option.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {option.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {option.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Links */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="security-card">
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
                <CardDescription>
                  Commonly accessed resources and documentation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {quickLinks.map((link, index) => (
                    <Link
                      key={index}
                      to={link.href}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full group-hover:scale-125 transition-transform" />
                      <span className="text-sm font-medium group-hover:text-primary transition-colors">
                        {link.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Status */}
            <Card className="security-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-success" />
                  <span>System Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Security Framework</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full" />
                      <span className="text-xs text-success">Operational</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Authentication API</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full" />
                      <span className="text-xs text-success">Operational</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Device Management</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full" />
                      <span className="text-xs text-success">Operational</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="security-card">
              <CardHeader>
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-primary" />
                  <div>
                    <p className="font-medium">Email Support</p>
                    <p className="text-muted-foreground">support@secureretail.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-4 w-4 text-secondary" />
                  <div>
                    <p className="font-medium">Live Chat</p>
                    <p className="text-muted-foreground">Available 24/7</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center bg-gradient-card rounded-2xl p-12 shadow-security">
          <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our support team is here to assist you with any questions about the security framework.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="security-button">
                Contact Support
              </Button>
            </Link>
            <Link to="/demo">
              <Button variant="outline" size="lg">
                Try Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;