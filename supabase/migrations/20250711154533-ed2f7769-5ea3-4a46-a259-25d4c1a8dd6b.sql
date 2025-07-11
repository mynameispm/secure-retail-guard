-- Enable realtime for tables
ALTER TABLE public.community_events REPLICA IDENTITY FULL;
ALTER TABLE public.post_comments REPLICA IDENTITY FULL;
ALTER TABLE public.event_participants REPLICA IDENTITY FULL;
ALTER TABLE public.traditional_recipes REPLICA IDENTITY FULL;
ALTER TABLE public.user_impact REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.community_events;
ALTER PUBLICATION supabase_realtime ADD TABLE public.post_comments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.event_participants;
ALTER PUBLICATION supabase_realtime ADD TABLE public.traditional_recipes;
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_impact;