import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useRealtime } from '@/hooks/useRealtime';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface CommunityEvent {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  location: string | null;
  max_participants: number | null;
  current_participants: number | null;
  organizer_id: string | null;
  created_at: string | null;
  image_url: string | null;
}

const CommunityEvents = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CommunityEvent | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    event_date: '',
    location: '',
    max_participants: '',
  });

  // Real-time subscriptions
  useRealtime({
    table: 'community_events',
    onInsert: (payload) => {
      setEvents(prev => [payload.new, ...prev]);
      toast.success('New event added!');
    },
    onUpdate: (payload) => {
      setEvents(prev => prev.map(event => 
        event.id === payload.new.id ? payload.new : event
      ));
      toast.success('Event updated!');
    },
    onDelete: (payload) => {
      setEvents(prev => prev.filter(event => event.id !== payload.old.id));
      toast.success('Event deleted!');
    },
  });

  // Load events
  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('community_events')
        .select('*')
        .order('event_date', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error: any) {
      toast.error('Failed to load events: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const eventData = {
        title: formData.title,
        description: formData.description || null,
        event_date: formData.event_date,
        location: formData.location || null,
        max_participants: formData.max_participants ? parseInt(formData.max_participants) : null,
        organizer_id: user.id,
      };

      if (editingEvent) {
        const { error } = await supabase
          .from('community_events')
          .update(eventData)
          .eq('id', editingEvent.id);

        if (error) throw error;
        toast.success('Event updated successfully!');
      } else {
        const { error } = await supabase
          .from('community_events')
          .insert([eventData]);

        if (error) throw error;
        toast.success('Event created successfully!');
      }

      setIsDialogOpen(false);
      setEditingEvent(null);
      setFormData({
        title: '',
        description: '',
        event_date: '',
        location: '',
        max_participants: '',
      });
    } catch (error: any) {
      toast.error('Failed to save event: ' + error.message);
    }
  };

  const handleEdit = (event: CommunityEvent) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description || '',
      event_date: event.event_date.split('T')[0], // Format for date input
      location: event.location || '',
      max_participants: event.max_participants?.toString() || '',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (eventId: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;

    try {
      const { error } = await supabase
        .from('community_events')
        .delete()
        .eq('id', eventId);

      if (error) throw error;
    } catch (error: any) {
      toast.error('Failed to delete event: ' + error.message);
    }
  };

  const joinEvent = async (eventId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('event_participants')
        .insert([{
          event_id: eventId,
          user_id: user.id,
        }]);

      if (error) throw error;
      toast.success('Successfully joined the event!');
    } catch (error: any) {
      toast.error('Failed to join event: ' + error.message);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading events...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Community Events</h2>
          <p className="text-muted-foreground">
            Discover and organize community events
          </p>
        </div>
        
        {user && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="security-button">
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                  {editingEvent ? 'Edit Event' : 'Create New Event'}
                </DialogTitle>
                <DialogDescription>
                  {editingEvent ? 'Update event details' : 'Fill in the details for your community event'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event_date">Event Date</Label>
                  <Input
                    id="event_date"
                    type="datetime-local"
                    value={formData.event_date}
                    onChange={(e) => setFormData(prev => ({ ...prev, event_date: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max_participants">Max Participants</Label>
                  <Input
                    id="max_participants"
                    type="number"
                    value={formData.max_participants}
                    onChange={(e) => setFormData(prev => ({ ...prev, max_participants: e.target.value }))}
                  />
                </div>
                <Button type="submit" className="w-full security-button">
                  {editingEvent ? 'Update Event' : 'Create Event'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Card key={event.id} className="security-card">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{event.title}</CardTitle>
                {user && user.id === event.organizer_id && (
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(event)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(event.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
              {event.description && (
                <CardDescription>{event.description}</CardDescription>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2" />
                {format(new Date(event.event_date), 'PPp')}
              </div>
              
              {event.location && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  {event.location}
                </div>
              )}
              
              {event.max_participants && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="h-4 w-4 mr-2" />
                  {event.current_participants || 0} / {event.max_participants}
                </div>
              )}

              <div className="flex justify-between items-center pt-4">
                <Badge variant="secondary">
                  {new Date(event.event_date) > new Date() ? 'Upcoming' : 'Past'}
                </Badge>
                
                {user && user.id !== event.organizer_id && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => joinEvent(event.id)}
                  >
                    Join Event
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold">No events yet</h3>
          <p className="text-muted-foreground mb-4">
            Be the first to create a community event!
          </p>
          {user && (
            <Button onClick={() => setIsDialogOpen(true)} className="security-button">
              <Plus className="h-4 w-4 mr-2" />
              Create First Event
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default CommunityEvents;