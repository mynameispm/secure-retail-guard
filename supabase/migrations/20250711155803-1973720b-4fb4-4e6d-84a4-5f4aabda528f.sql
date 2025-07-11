-- Create contact_forms table for contact form submissions
CREATE TABLE public.contact_forms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create faqs table for FAQ management
CREATE TABLE public.faqs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  is_published BOOLEAN NOT NULL DEFAULT true,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create support_tickets table for documentation and support
CREATE TABLE public.support_tickets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  priority TEXT NOT NULL DEFAULT 'medium',
  status TEXT NOT NULL DEFAULT 'open',
  user_id UUID REFERENCES auth.users(id),
  assigned_to UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.contact_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;

-- Contact forms policies
CREATE POLICY "Anyone can create contact forms" 
ON public.contact_forms 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can view their own contact forms" 
ON public.contact_forms 
FOR SELECT 
USING (auth.uid() = user_id OR auth.uid() IS NULL);

CREATE POLICY "Authenticated users can update contact forms" 
ON public.contact_forms 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

-- FAQs policies
CREATE POLICY "Anyone can view published FAQs" 
ON public.faqs 
FOR SELECT 
USING (is_published = true);

CREATE POLICY "Authenticated users can manage FAQs" 
ON public.faqs 
FOR ALL 
USING (auth.uid() IS NOT NULL);

-- Support tickets policies
CREATE POLICY "Users can view their own tickets or all if authenticated" 
ON public.support_tickets 
FOR SELECT 
USING (auth.uid() = user_id OR auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can create support tickets" 
ON public.support_tickets 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);

CREATE POLICY "Users can update their own tickets" 
ON public.support_tickets 
FOR UPDATE 
USING (auth.uid() = user_id OR auth.uid() IS NOT NULL);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_contact_forms_updated_at
BEFORE UPDATE ON public.contact_forms
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_faqs_updated_at
BEFORE UPDATE ON public.faqs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_support_tickets_updated_at
BEFORE UPDATE ON public.support_tickets
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for all tables
ALTER TABLE public.contact_forms REPLICA IDENTITY FULL;
ALTER TABLE public.faqs REPLICA IDENTITY FULL;
ALTER TABLE public.support_tickets REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.contact_forms;
ALTER PUBLICATION supabase_realtime ADD TABLE public.faqs;
ALTER PUBLICATION supabase_realtime ADD TABLE public.support_tickets;

-- Insert some sample FAQs
INSERT INTO public.faqs (question, answer, category, order_index) VALUES
('What is SecureRetail?', 'SecureRetail is a revolutionary zero-knowledge security framework that prevents context spoofing attacks while preserving user privacy in retail environments.', 'general', 1),
('How does context spoofing protection work?', 'Our advanced detection system uses device-bound security and hardware-backed attestation to ensure genuine device interactions, preventing malicious actors from spoofing location and behavioral data.', 'security', 2),
('Is my personal data safe?', 'Yes! We use zero-knowledge proofs to verify user authenticity without exposing personal data. Your privacy is our top priority.', 'privacy', 3),
('What devices are supported?', 'SecureRetail works with all modern smartphones and tablets that support hardware-backed attestation. Our device-bound security ensures maximum protection.', 'compatibility', 4),
('How do I get started?', 'Simply sign up for an account, complete the setup process, and start using our secure framework. Our dashboard provides real-time monitoring and controls.', 'getting-started', 5),
('Is there enterprise support?', 'Yes! We offer comprehensive enterprise support with dedicated account management, custom integrations, and 24/7 technical assistance.', 'enterprise', 6);