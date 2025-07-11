-- Enable RLS on all tables that don't have it yet
ALTER TABLE public.community_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.eco_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.traditional_recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_impact ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recycling_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recycling_centers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sustainable_businesses ENABLE ROW LEVEL SECURITY;

-- Community Events Policies (public view, authenticated users can create/manage their own)
CREATE POLICY "Anyone can view community events" 
ON public.community_events 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create events" 
ON public.community_events 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = organizer_id);

CREATE POLICY "Users can update their own events" 
ON public.community_events 
FOR UPDATE 
USING (auth.uid() = organizer_id);

CREATE POLICY "Users can delete their own events" 
ON public.community_events 
FOR DELETE 
USING (auth.uid() = organizer_id);

-- Post Comments Policies (public view, authenticated users can create/manage their own)
CREATE POLICY "Anyone can view comments" 
ON public.post_comments 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create comments" 
ON public.post_comments 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);

CREATE POLICY "Users can update their own comments" 
ON public.post_comments 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments" 
ON public.post_comments 
FOR DELETE 
USING (auth.uid() = user_id);

-- Eco Challenges Policies (public view - these are system-wide challenges)
CREATE POLICY "Anyone can view eco challenges" 
ON public.eco_challenges 
FOR SELECT 
USING (true);

-- User Challenges Policies (users can only see/manage their own challenges)
CREATE POLICY "Users can view their own challenges" 
ON public.user_challenges 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own challenges" 
ON public.user_challenges 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);

CREATE POLICY "Users can update their own challenges" 
ON public.user_challenges 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own challenges" 
ON public.user_challenges 
FOR DELETE 
USING (auth.uid() = user_id);

-- Event Participants Policies (users can see all participants but only manage their own participation)
CREATE POLICY "Anyone can view event participants" 
ON public.event_participants 
FOR SELECT 
USING (true);

CREATE POLICY "Users can join events" 
ON public.event_participants 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);

CREATE POLICY "Users can leave events" 
ON public.event_participants 
FOR DELETE 
USING (auth.uid() = user_id);

-- Traditional Recipes Policies (public view, authenticated users can create/manage their own)
CREATE POLICY "Anyone can view traditional recipes" 
ON public.traditional_recipes 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create recipes" 
ON public.traditional_recipes 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = submitted_by);

CREATE POLICY "Users can update their own recipes" 
ON public.traditional_recipes 
FOR UPDATE 
USING (auth.uid() = submitted_by);

CREATE POLICY "Users can delete their own recipes" 
ON public.traditional_recipes 
FOR DELETE 
USING (auth.uid() = submitted_by);

-- User Impact Policies (users can only see/manage their own impact data)
CREATE POLICY "Users can view their own impact" 
ON public.user_impact 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own impact" 
ON public.user_impact 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Recycling Items Policies (public view - informational data)
CREATE POLICY "Anyone can view recycling items" 
ON public.recycling_items 
FOR SELECT 
USING (true);

-- Recycling Centers Policies (public view - location data)
CREATE POLICY "Anyone can view recycling centers" 
ON public.recycling_centers 
FOR SELECT 
USING (true);

-- Sustainable Businesses Policies (public view - directory data)
CREATE POLICY "Anyone can view sustainable businesses" 
ON public.sustainable_businesses 
FOR SELECT 
USING (true);