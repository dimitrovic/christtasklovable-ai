
-- Create a table to track daily message usage per user
CREATE TABLE public.user_message_usage (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  message_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, date)
);

-- Add Row Level Security (RLS)
ALTER TABLE public.user_message_usage ENABLE ROW LEVEL SECURITY;

-- Create policy that allows users to view their own usage
CREATE POLICY "Users can view their own message usage" 
  ON public.user_message_usage 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy that allows users to update their own usage
CREATE POLICY "Users can update their own message usage" 
  ON public.user_message_usage 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create policy that allows users to insert their own usage
CREATE POLICY "Users can insert their own message usage" 
  ON public.user_message_usage 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create an index for better performance
CREATE INDEX idx_user_message_usage_user_date ON public.user_message_usage(user_id, date);
