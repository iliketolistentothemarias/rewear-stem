-- ReWear Database Schema

-- Users table (handling points/credits)
create table public.users (
  id uuid primary key default gen_random_uuid(),
  username text unique not null,
  points integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Items table (for Buy, Sell, Donate, Repurpose)
create table public.items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  store_name text,
  price text not null, -- Stored as text (e.g., "$15.00" or "Donation")
  type text not null check (type in ('buy', 'sell', 'donate', 'repurpose')),
  image_url text,
  is_verified boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Thrift Stores table (for Map)
create table public.thrift_stores (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  address text not null,
  lat double precision not null,
  lng double precision not null,
  type text default 'eco-friendly',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS) policies
-- Note: For the MVP, we are allowing read/write to all authenticated/anon users so the frontend can work simply.
alter table public.users enable row level security;
alter table public.items enable row level security;
alter table public.thrift_stores enable row level security;

create policy "Allow public read access on users" on public.users for select using (true);
create policy "Allow public insert on users" on public.users for insert with check (true);
create policy "Allow public update on users" on public.users for update using (true);

create policy "Allow public read access on items" on public.items for select using (true);
create policy "Allow public insert on items" on public.items for insert with check (true);

create policy "Allow public read access on thrift_stores" on public.thrift_stores for select using (true);
create policy "Allow public insert on thrift_stores" on public.thrift_stores for insert with check (true);
