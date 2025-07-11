import { useState, useEffect } from "react";
import { Search, Plus, Edit, Trash2, Clock, User, Tag, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import { supabase } from "@/integrations/supabase/client";
import { useRealtime } from "@/hooks/useRealtime";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface SupportTicket {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

const Documentation = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<SupportTicket[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<SupportTicket | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "general",
    priority: "medium",
  });
  const { user } = useAuth();
  const { toast } = useToast();

  // Real-time subscription for support tickets
  useRealtime({
    table: 'support_tickets',
    callback: (payload) => {
      if (payload.eventType === 'INSERT') {
        const newTicket = payload.new as SupportTicket;
        setTickets(prev => [newTicket, ...prev]);
        toast({
          title: "New Support Ticket",
          description: `Ticket: ${newTicket.title}`,
        });
      } else if (payload.eventType === 'UPDATE') {
        const updatedTicket = payload.new as SupportTicket;
        setTickets(prev => prev.map(ticket => ticket.id === updatedTicket.id ? updatedTicket : ticket));
      } else if (payload.eventType === 'DELETE') {
        const deletedTicket = payload.old as SupportTicket;
        setTickets(prev => prev.filter(ticket => ticket.id !== deletedTicket.id));
      }
    }
  });

  useEffect(() => {
    if (user) {
      loadTickets();
    }
  }, [user]);

  useEffect(() => {
    filterTickets();
  }, [tickets, searchTerm, selectedCategory, selectedStatus]);

  const loadTickets = async () => {
    try {
      const { data, error } = await supabase
        .from('support_tickets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTickets(data || []);
    } catch (error) {
      console.error('Error loading tickets:', error);
    }
  };

  const filterTickets = () => {
    let filtered = tickets;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(ticket => ticket.category === selectedCategory);
    }

    if (selectedStatus !== "all") {
      filtered = filtered.filter(ticket => ticket.status === selectedStatus);
    }

    if (searchTerm) {
      filtered = filtered.filter(ticket =>
        ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTickets(filtered);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <AlertCircle className="h-4 w-4" />;
      case 'in-progress': return <Clock className="h-4 w-4" />;
      case 'resolved': return <CheckCircle className="h-4 w-4" />;
      case 'closed': return <XCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return "bg-yellow-100 text-yellow-800";
      case 'in-progress': return "bg-blue-100 text-blue-800";
      case 'resolved': return "bg-green-100 text-green-800";
      case 'closed': return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return "bg-green-100 text-green-800";
      case 'medium': return "bg-yellow-100 text-yellow-800";
      case 'high': return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to create support tickets.",
        variant: "destructive",
      });
      return;
    }

    try {
      const submitData = {
        ...formData,
        user_id: user.id,
      };

      if (editingTicket) {
        const { error } = await supabase
          .from('support_tickets')
          .update(submitData)
          .eq('id', editingTicket.id);

        if (error) throw error;
        toast({
          title: "Ticket Updated",
          description: "Support ticket has been updated successfully.",
        });
      } else {
        const { error } = await supabase
          .from('support_tickets')
          .insert([submitData]);

        if (error) throw error;
        toast({
          title: "Ticket Created",
          description: "New support ticket has been created successfully.",
        });
      }

      setFormData({ title: "", description: "", category: "general", priority: "medium" });
      setIsAddDialogOpen(false);
      setEditingTicket(null);
    } catch (error) {
      console.error('Error saving ticket:', error);
      toast({
        title: "Error",
        description: "Failed to save ticket. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (ticket: SupportTicket) => {
    setFormData({
      title: ticket.title,
      description: ticket.description,
      category: ticket.category,
      priority: ticket.priority,
    });
    setEditingTicket(ticket);
    setIsAddDialogOpen(true);
  };

  const handleStatusUpdate = async (ticketId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('support_tickets')
        .update({ status: newStatus })
        .eq('id', ticketId);

      if (error) throw error;
      toast({
        title: "Status Updated",
        description: `Ticket status updated to ${newStatus}.`,
      });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Failed to update status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const documentationSections = [
    {
      title: "Getting Started",
      content: "Learn how to integrate SecureRetail into your existing systems with our comprehensive setup guide."
    },
    {
      title: "API Documentation",
      content: "Complete API reference with examples for all endpoints and authentication methods."
    },
    {
      title: "Security Best Practices",
      content: "Guidelines for maintaining optimal security posture with SecureRetail implementation."
    },
    {
      title: "Troubleshooting",
      content: "Common issues and their solutions to help you resolve problems quickly."
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
              Documentation & <span className="bg-gradient-primary bg-clip-text text-transparent">Support</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Access comprehensive documentation, submit support tickets, and get help from our expert team.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="documentation" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="documentation">Documentation</TabsTrigger>
                <TabsTrigger value="support">Support Tickets</TabsTrigger>
              </TabsList>

              <TabsContent value="documentation" className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {documentationSections.map((section, index) => (
                    <Card key={index} className="security-card">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Tag className="h-5 w-5 text-primary mr-2" />
                          {section.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">{section.content}</p>
                        <Button size="sm" variant="outline">
                          Read More
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="support" className="space-y-6">
                {user ? (
                  <>
                    {/* Filters and Actions */}
                    <div className="space-y-4">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search tickets..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                          <SelectTrigger className="w-full md:w-48">
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="general">General</SelectItem>
                            <SelectItem value="technical">Technical</SelectItem>
                            <SelectItem value="billing">Billing</SelectItem>
                            <SelectItem value="security">Security</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                          <SelectTrigger className="w-full md:w-48">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="open">Open</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex justify-end">
                        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                          <DialogTrigger asChild>
                            <Button className="security-button">
                              <Plus className="h-4 w-4 mr-2" />
                              New Ticket
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>
                                {editingTicket ? "Edit Ticket" : "Create New Support Ticket"}
                              </DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium mb-2">Title</label>
                                <Input
                                  value={formData.title}
                                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                                  placeholder="Brief description of the issue..."
                                  required
                                />
                              </div>
                              <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium mb-2">Category</label>
                                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="general">General</SelectItem>
                                      <SelectItem value="technical">Technical</SelectItem>
                                      <SelectItem value="billing">Billing</SelectItem>
                                      <SelectItem value="security">Security</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium mb-2">Priority</label>
                                  <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="low">Low</SelectItem>
                                      <SelectItem value="medium">Medium</SelectItem>
                                      <SelectItem value="high">High</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-2">Description</label>
                                <Textarea
                                  value={formData.description}
                                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                                  placeholder="Detailed description of the issue..."
                                  rows={6}
                                  required
                                />
                              </div>
                              <div className="flex justify-end space-x-2">
                                <Button type="button" variant="outline" onClick={() => {
                                  setIsAddDialogOpen(false);
                                  setEditingTicket(null);
                                  setFormData({ title: "", description: "", category: "general", priority: "medium" });
                                }}>
                                  Cancel
                                </Button>
                                <Button type="submit" className="security-button">
                                  {editingTicket ? "Update" : "Create"} Ticket
                                </Button>
                              </div>
                            </form>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>

                    {/* Tickets List */}
                    <div className="space-y-4">
                      {filteredTickets.length === 0 ? (
                        <div className="text-center py-12">
                          <p className="text-muted-foreground">No support tickets found.</p>
                        </div>
                      ) : (
                        filteredTickets.map((ticket) => (
                          <Card key={ticket.id} className="security-card">
                            <CardContent className="p-6">
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                  <h3 className="text-lg font-semibold mb-2">{ticket.title}</h3>
                                  <div className="flex items-center space-x-4 mb-3">
                                    <Badge className={getStatusColor(ticket.status)}>
                                      {getStatusIcon(ticket.status)}
                                      <span className="ml-1">{ticket.status.replace('-', ' ')}</span>
                                    </Badge>
                                    <Badge className={getPriorityColor(ticket.priority)}>
                                      {ticket.priority}
                                    </Badge>
                                    <Badge variant="outline">
                                      {ticket.category}
                                    </Badge>
                                  </div>
                                  <p className="text-muted-foreground mb-4">{ticket.description}</p>
                                  <div className="flex items-center text-sm text-muted-foreground">
                                    <Clock className="h-4 w-4 mr-1" />
                                    Created: {new Date(ticket.created_at).toLocaleDateString()}
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Select onValueChange={(value) => handleStatusUpdate(ticket.id, value)}>
                                    <SelectTrigger className="w-32">
                                      <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="open">Open</SelectItem>
                                      <SelectItem value="in-progress">In Progress</SelectItem>
                                      <SelectItem value="resolved">Resolved</SelectItem>
                                      <SelectItem value="closed">Closed</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleEdit(ticket)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      )}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">Please sign in to access support tickets.</p>
                    <Button asChild>
                      <a href="/auth">Sign In</a>
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Documentation;