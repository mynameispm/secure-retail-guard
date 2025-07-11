import { useState, useEffect } from "react";
import { Search, ChevronDown, ChevronUp, Plus, Edit, Trash2, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import { supabase } from "@/integrations/supabase/client";
import { useRealtime } from "@/hooks/useRealtime";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  is_published: boolean;
  order_index: number;
  created_at: string;
}

const FAQ = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [filteredFaqs, setFilteredFaqs] = useState<FAQ[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "general",
  });
  const { user } = useAuth();
  const { toast } = useToast();

  // Real-time subscription for FAQs
  useRealtime({
    table: 'faqs',
    callback: (payload) => {
      if (payload.eventType === 'INSERT') {
        const newFaq = payload.new as FAQ;
        setFaqs(prev => [...prev, newFaq].sort((a, b) => a.order_index - b.order_index));
      } else if (payload.eventType === 'UPDATE') {
        const updatedFaq = payload.new as FAQ;
        setFaqs(prev => prev.map(faq => faq.id === updatedFaq.id ? updatedFaq : faq));
      } else if (payload.eventType === 'DELETE') {
        const deletedFaq = payload.old as FAQ;
        setFaqs(prev => prev.filter(faq => faq.id !== deletedFaq.id));
      }
    }
  });

  useEffect(() => {
    loadFaqs();
  }, []);

  useEffect(() => {
    filterFaqs();
  }, [faqs, searchTerm, selectedCategory]);

  const loadFaqs = async () => {
    try {
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .eq('is_published', true)
        .order('order_index', { ascending: true });

      if (error) throw error;
      setFaqs(data || []);
    } catch (error) {
      console.error('Error loading FAQs:', error);
    }
  };

  const filterFaqs = () => {
    let filtered = faqs;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(faq => faq.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredFaqs(filtered);
  };

  const getCategories = () => {
    const categories = [...new Set(faqs.map(faq => faq.category))];
    return categories;
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      general: "bg-blue-100 text-blue-800",
      security: "bg-red-100 text-red-800",
      privacy: "bg-green-100 text-green-800",
      compatibility: "bg-yellow-100 text-yellow-800",
      "getting-started": "bg-purple-100 text-purple-800",
      enterprise: "bg-gray-100 text-gray-800",
    };
    return colors[category] || "bg-blue-100 text-blue-800";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to add FAQs.",
        variant: "destructive",
      });
      return;
    }

    try {
      const submitData = {
        ...formData,
        created_by: user.id,
        order_index: faqs.length + 1,
      };

      if (editingFaq) {
        const { error } = await supabase
          .from('faqs')
          .update(submitData)
          .eq('id', editingFaq.id);

        if (error) throw error;
        toast({
          title: "FAQ Updated",
          description: "The FAQ has been updated successfully.",
        });
      } else {
        const { error } = await supabase
          .from('faqs')
          .insert([submitData]);

        if (error) throw error;
        toast({
          title: "FAQ Added",
          description: "New FAQ has been added successfully.",
        });
      }

      setFormData({ question: "", answer: "", category: "general" });
      setIsAddDialogOpen(false);
      setEditingFaq(null);
    } catch (error) {
      console.error('Error saving FAQ:', error);
      toast({
        title: "Error",
        description: "Failed to save FAQ. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (faq: FAQ) => {
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
    });
    setEditingFaq(faq);
    setIsAddDialogOpen(true);
  };

  const handleDelete = async (faqId: string) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;

    try {
      const { error } = await supabase
        .from('faqs')
        .delete()
        .eq('id', faqId);

      if (error) throw error;
      toast({
        title: "FAQ Deleted",
        description: "The FAQ has been deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      toast({
        title: "Error",
        description: "Failed to delete FAQ. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-hero">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Frequently Asked <span className="bg-gradient-primary bg-clip-text text-transparent">Questions</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about SecureRetail's security framework, 
              implementation, and features.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Search and Filter */}
            <div className="mb-12 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search FAQs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory("all")}
                >
                  All Categories
                </Button>
                {getCategories().map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                  </Button>
                ))}
              </div>

              {user && (
                <div className="flex justify-end">
                  <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="security-button">
                        <Plus className="h-4 w-4 mr-2" />
                        Add FAQ
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          {editingFaq ? "Edit FAQ" : "Add New FAQ"}
                        </DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Question</label>
                          <Input
                            value={formData.question}
                            onChange={(e) => setFormData({...formData, question: e.target.value})}
                            placeholder="Enter the question..."
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Answer</label>
                          <Textarea
                            value={formData.answer}
                            onChange={(e) => setFormData({...formData, answer: e.target.value})}
                            placeholder="Enter the answer..."
                            rows={4}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Category</label>
                          <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="general">General</SelectItem>
                              <SelectItem value="security">Security</SelectItem>
                              <SelectItem value="privacy">Privacy</SelectItem>
                              <SelectItem value="compatibility">Compatibility</SelectItem>
                              <SelectItem value="getting-started">Getting Started</SelectItem>
                              <SelectItem value="enterprise">Enterprise</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button type="button" variant="outline" onClick={() => {
                            setIsAddDialogOpen(false);
                            setEditingFaq(null);
                            setFormData({ question: "", answer: "", category: "general" });
                          }}>
                            Cancel
                          </Button>
                          <Button type="submit" className="security-button">
                            {editingFaq ? "Update" : "Add"} FAQ
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>

            {/* FAQ List */}
            <div className="space-y-4">
              {filteredFaqs.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No FAQs found matching your criteria.</p>
                </div>
              ) : (
                filteredFaqs.map((faq) => (
                  <Card key={faq.id} className="security-card">
                    <CardContent className="p-0">
                      <button
                        className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-primary"
                        onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold">{faq.question}</h3>
                              <Badge className={getCategoryColor(faq.category)}>
                                <Tag className="h-3 w-3 mr-1" />
                                {faq.category.replace('-', ' ')}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {user && (
                              <>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEdit(faq);
                                  }}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(faq.id);
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                            {expandedFaq === faq.id ? (
                              <ChevronUp className="h-5 w-5 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-muted-foreground" />
                            )}
                          </div>
                        </div>
                      </button>
                      
                      {expandedFaq === faq.id && (
                        <div className="px-6 pb-6">
                          <div className="border-t border-border pt-4">
                            <p className="text-muted-foreground leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FAQ;