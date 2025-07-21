-- Create profiles table for extended user information
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'client',
  phone TEXT,
  address JSONB,
  shopify_customer_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  parent_id UUID REFERENCES public.categories(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create products table (enhanced)
CREATE TABLE IF NOT EXISTS public.products_new (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'EUR',
  images TEXT[] NOT NULL DEFAULT '{}',
  category_id UUID REFERENCES public.categories(id),
  vendor_id UUID,
  shopify_product_id TEXT UNIQUE,
  stock INTEGER NOT NULL DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  country_origin TEXT,
  shipping_countries TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create orders table (enhanced)
CREATE TABLE IF NOT EXISTS public.orders_new (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  total DECIMAL(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'EUR',
  status TEXT NOT NULL DEFAULT 'pending',
  payment_method TEXT,
  payment_status TEXT DEFAULT 'pending',
  shipping_address JSONB NOT NULL,
  billing_address JSONB,
  tracking_number TEXT,
  tracking_url TEXT,
  shopify_order_id TEXT UNIQUE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create order_items table (enhanced)
CREATE TABLE IF NOT EXISTS public.order_items_new (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders_new(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products_new(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products_new(id) ON DELETE CASCADE,
  user_id UUID,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  verified_purchase BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create crypto_tokens table for IKB economy
CREATE TABLE IF NOT EXISTS public.crypto_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  token_type TEXT NOT NULL DEFAULT 'IKB',
  amount DECIMAL(18,8) NOT NULL DEFAULT 0,
  staked_amount DECIMAL(18,8) DEFAULT 0,
  rewards_earned DECIMAL(18,8) DEFAULT 0,
  last_reward_claim TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create gamification tables
CREATE TABLE IF NOT EXISTS public.user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  achievement_type TEXT NOT NULL,
  achievement_name TEXT NOT NULL,
  points_earned INTEGER DEFAULT 0,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products_new ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders_new ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items_new ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crypto_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can read own profile" ON public.profiles
  FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- RLS Policies for categories (public read)
CREATE POLICY "Anyone can read categories" ON public.categories
  FOR SELECT USING (true);

-- RLS Policies for products
CREATE POLICY "Anyone can read active products" ON public.products_new
  FOR SELECT USING (status = 'active');

CREATE POLICY "Vendors can manage own products" ON public.products_new
  FOR ALL USING (auth.uid()::text = vendor_id::text);

CREATE POLICY "Admins can manage all products" ON public.products_new
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE user_id::text = auth.uid()::text AND role = 'admin'
    )
  );

-- RLS Policies for orders
CREATE POLICY "Users can read own orders" ON public.orders_new
  FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Admins can read all orders" ON public.orders_new
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE user_id::text = auth.uid()::text AND role IN ('admin', 'vendeur')
    )
  );

-- RLS Policies for order_items
CREATE POLICY "Users can read own order items" ON public.order_items_new
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.orders_new 
      WHERE id = order_items_new.order_id AND user_id::text = auth.uid()::text
    )
  );

-- RLS Policies for reviews
CREATE POLICY "Anyone can read reviews" ON public.reviews
  FOR SELECT USING (true);

CREATE POLICY "Users can create reviews" ON public.reviews
  FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- RLS Policies for crypto_tokens
CREATE POLICY "Users can read own tokens" ON public.crypto_tokens
  FOR SELECT USING (auth.uid()::text = user_id::text);

-- RLS Policies for achievements
CREATE POLICY "Users can read own achievements" ON public.user_achievements
  FOR SELECT USING (auth.uid()::text = user_id::text);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products_new
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders_new
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default categories
INSERT INTO public.categories (name, description) VALUES
('Électronique', 'Produits électroniques et gadgets'),
('Mode', 'Vêtements et accessoires'),
('Maison & Jardin', 'Articles pour la maison et le jardin'),
('Sport & Loisirs', 'Équipements sportifs et loisirs'),
('Beauté & Santé', 'Produits de beauté et de santé')
ON CONFLICT DO NOTHING;