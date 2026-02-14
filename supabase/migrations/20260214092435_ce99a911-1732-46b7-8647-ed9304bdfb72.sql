
-- Create orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  items JSONB NOT NULL,
  total_price NUMERIC(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Only allow anonymous inserts (no auth required for placing orders)
CREATE POLICY "Anyone can place an order"
ON public.orders
FOR INSERT
TO anon
WITH CHECK (true);

-- No select/update/delete for anon users - orders are write-only from frontend
-- This prevents data leaks - orders can only be read from the backend/dashboard
