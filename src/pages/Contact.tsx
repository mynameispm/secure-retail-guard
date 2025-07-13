
import { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageCircle, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_forms')
        .insert([{
          ...formData,
          user_id: user?.id || null,
        }]);

      if (error) throw error;

      toast({
        title: "Message Sent Successfully",
        description: "We'll get back to you within 24 hours.",
      });

      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-hero">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Contact <span className="bg-gradient-primary bg-clip-text text-transparent">Us</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions about SecureRetail? We're here to help. Reach out to our expert team 
              for support, demos, or partnership opportunities.
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              <Card className="security-card text-center">
                <CardContent className="p-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                    <Mail className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Email Us</h3>
                  <p className="text-muted-foreground mb-4">
                    Get in touch for support, sales, or general inquiries
                  </p>
                  <a 
                    href="mailto:secureretail2005@gmail.com" 
                    className="text-primary hover:underline font-medium"
                  >
                    secureretail2005@gmail.com
                  </a>
                </CardContent>
              </Card>

              <Card className="security-card text-center">
                <CardContent className="p-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                    <Phone className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Call Us</h3>
                  <p className="text-muted-foreground mb-4">
                    Speak directly with our security experts
                  </p>
                  <p className="text-primary font-medium">+1 (555) 123-4567</p>
                </CardContent>
              </Card>

              <Card className="security-card text-center">
                <CardContent className="p-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                    <MapPin className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Visit Us</h3>
                  <p className="text-muted-foreground mb-4">
                    Our headquarters in the heart of Silicon Valley
                  </p>
                  <p className="text-primary font-medium">
                    123 Security Blvd<br />
                    San Francisco, CA 94102
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl font-bold mb-6">Send us a message</h2>
                <p className="text-muted-foreground mb-8">
                  Fill out the form below and we'll get back to you as soon as possible. 
                  For urgent security matters, please call us directly.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Response Time</p>
                      <p className="text-sm text-muted-foreground">Within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Expert Support</p>
                      <p className="text-sm text-muted-foreground">Direct access to our security team</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Personalized Solutions</p>
                      <p className="text-sm text-muted-foreground">Tailored security recommendations</p>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="security-card">
                <CardHeader>
                  <CardTitle>Contact Form</CardTitle>
                  <CardDescription>
                    We'll respond to your inquiry within 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Name *</label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email *</label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Subject *</label>
                      <Input
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What can we help you with?"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Message *</label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us more about your inquiry..."
                        rows={6}
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full security-button"
                      disabled={isSubmitting}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-muted-foreground">
                Quick answers to common questions about SecureRetail
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="security-card">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">How quickly can SecureRetail be deployed?</h3>
                  <p className="text-muted-foreground text-sm">
                    Our zero-knowledge security framework can be deployed in as little as 48 hours 
                    for most retail environments, with full integration typically completed within a week.
                  </p>
                </CardContent>
              </Card>
              <Card className="security-card">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">What makes SecureRetail different?</h3>
                  <p className="text-muted-foreground text-sm">
                    Unlike traditional security systems, SecureRetail uses zero-knowledge proofs to 
                    verify authenticity without compromising user privacy or storing sensitive data.
                  </p>
                </CardContent>
              </Card>
              <Card className="security-card">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Do you offer 24/7 support?</h3>
                  <p className="text-muted-foreground text-sm">
                    Yes, our enterprise customers receive 24/7 monitoring and support from our 
                    dedicated security operations center with guaranteed response times.
                  </p>
                </CardContent>
              </Card>
              <Card className="security-card">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Is SecureRetail compliant with regulations?</h3>
                  <p className="text-muted-foreground text-sm">
                    SecureRetail is designed to meet GDPR, CCPA, and other privacy regulations, 
                    with built-in compliance features and regular security audits.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
