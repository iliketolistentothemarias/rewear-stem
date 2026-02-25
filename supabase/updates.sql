-- ReWear Database Updates for Seller/Buyer Marketplace

-- 1. Updates to the items table
ALTER TABLE public.items ADD COLUMN seller_id uuid REFERENCES public.users(id);
ALTER TABLE public.items ADD COLUMN condition text;
-- (Values like 'Like New', 'Good', 'Fair', 'Needs TLC')

-- 2. New table for Offers
CREATE TABLE public.offers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id uuid REFERENCES public.items(id) NOT NULL,
  buyer_id uuid REFERENCES public.users(id) NOT NULL,
  offer_amount text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. New table for Notifications
CREATE TABLE public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id) NOT NULL,
  title text NOT NULL,
  message text,
  is_read boolean DEFAULT false,
  related_entity_id uuid, -- Could link to an item_id or offer_id
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Enable Row Level Security and Public Access for demo
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on offers" ON public.offers FOR SELECT USING (true);
CREATE POLICY "Allow public insert on offers" ON public.offers FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on offers" ON public.offers FOR UPDATE USING (true);

CREATE POLICY "Allow public read access on notifications" ON public.notifications FOR SELECT USING (true);
CREATE POLICY "Allow public insert on notifications" ON public.notifications FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on notifications" ON public.notifications FOR UPDATE USING (true);
