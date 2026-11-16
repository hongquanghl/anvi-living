-- ====================================================================
-- SCHEMA: Mindful Living & Wellness Portal (Wanderlust Clone)
-- Target: PostgreSQL / Supabase with Row Level Security (RLS)
-- Times: timestamptz (UTC), Money: integer cents
-- ====================================================================

-- 1. Profiles & Users
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text,
  avatar_url text,
  role text not null default 'member' check (role in ('member', 'instructor', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. Instructors & Talents
create table public.instructors (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete set null,
  name text not null,
  slug text not null unique,
  bio text,
  profile_image text,
  instagram text,
  specialties text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index idx_instructors_slug on public.instructors(slug);

-- 3. Events & Festivals
create table public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  subtitle text,
  description text,
  location_name text not null,
  address text,
  city text not null,
  country text not null default 'Vietnam',
  start_date timestamptz not null,
  end_date timestamptz not null,
  cover_image text,
  banner_image text,
  category text not null default 'festival' check (category in ('festival', '108', 'retreat', 'workshop')),
  status text not null default 'upcoming' check (status in ('upcoming', 'ongoing', 'completed', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint valid_event_dates check (end_date >= start_date)
);
create index idx_events_start_date on public.events(start_date);
create index idx_events_slug on public.events(slug);
create index idx_events_category on public.events(category);

-- 4. Ticket Tiers for Events
create table public.ticket_tiers (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  name text not null,
  price_cents integer not null check (price_cents >= 0),
  currency text not null default 'VND',
  quota integer not null check (quota >= 0),
  sold_count integer not null default 0 check (sold_count <= quota),
  perks text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index idx_ticket_tiers_event_id on public.ticket_tiers(event_id);

-- 5. Class Videos (Wanderlust TV)
create table public.class_videos (
  id uuid primary key default gen_random_uuid(),
  instructor_id uuid references public.instructors(id) on delete set null,
  title text not null,
  slug text not null unique,
  description text,
  video_url text not null,
  duration_seconds integer not null default 0,
  level text not null default 'all_levels' check (level in ('all_levels', 'beginner', 'intermediate', 'advanced')),
  style text not null default 'vinyasa' check (style in ('vinyasa', 'yin', 'hatha', 'meditation', 'breathwork', 'sound_bath')),
  thumbnail_url text,
  is_featured boolean not null default false,
  is_premium boolean not null default true,
  view_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index idx_class_videos_slug on public.class_videos(slug);
create index idx_class_videos_style on public.class_videos(style);
create index idx_class_videos_level on public.class_videos(level);

-- 6. Saved Classes (Watchlist / Favorites)
create table public.saved_classes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  class_id uuid not null references public.class_videos(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, class_id)
);
create index idx_saved_classes_user on public.saved_classes(user_id);

-- 7. Editorial Articles (Journal)
create table public.articles (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references public.profiles(id) on delete set null,
  title text not null,
  slug text not null unique,
  excerpt text,
  content_markdown text not null,
  cover_image text,
  category text not null default 'wellness' check (category in ('wellness', 'yoga', 'mindfulness', 'nutrition', 'community')),
  read_time_minutes integer not null default 5,
  is_published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index idx_articles_slug on public.articles(slug);
create index idx_articles_published_at on public.articles(published_at);

-- 8. Products & Gear (Shop)
create table public.products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  price_cents integer not null check (price_cents >= 0),
  compare_at_price_cents integer,
  currency text not null default 'VND',
  category text not null default 'gear' check (category in ('gear', 'apparel', 'supplements', 'accessories')),
  images jsonb not null default '[]'::jsonb,
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  sku text,
  is_available boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index idx_products_slug on public.products(slug);
create index idx_products_category on public.products(category);

-- 9. Orders
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  user_id uuid references public.profiles(id) on delete set null,
  order_type text not null check (order_type in ('ticket', 'product', 'subscription')),
  total_amount_cents integer not null check (total_amount_cents >= 0),
  currency text not null default 'VND',
  status text not null default 'pending' check (status in ('pending', 'paid', 'fulfilled', 'cancelled', 'refunded')),
  customer_name text not null,
  customer_email text not null,
  customer_phone text,
  shipping_address jsonb not null default '{}'::jsonb,
  payment_intent_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index idx_orders_user_id on public.orders(user_id);
create index idx_orders_number on public.orders(order_number);

-- 10. Order Items
create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  item_type text not null check (item_type in ('ticket', 'product', 'subscription')),
  reference_id uuid not null, -- references ticket_tiers.id, products.id, etc.
  quantity integer not null check (quantity > 0),
  unit_price_cents integer not null check (unit_price_cents >= 0),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index idx_order_items_order on public.order_items(order_id);

-- 11. Newsletter Subscribers
create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  status text not null default 'subscribed' check (status in ('subscribed', 'unsubscribed')),
  source text not null default 'footer',
  subscribed_at timestamptz not null default now()
);
create index idx_newsletter_email on public.newsletter_subscribers(email);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

alter table public.profiles enable row level security;
alter table public.instructors enable row level security;
alter table public.events enable row level security;
alter table public.ticket_tiers enable row level security;
alter table public.class_videos enable row level security;
alter table public.saved_classes enable row level security;
alter table public.articles enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.newsletter_subscribers enable row level security;

-- Public read policies (Everyone can view catalog)
create policy "Public read published events" on public.events for select using (status != 'cancelled');
create policy "Public read active ticket tiers" on public.ticket_tiers for select using (is_active = true);
create policy "Public read instructors" on public.instructors for select using (true);
create policy "Public read videos" on public.class_videos for select using (true);
create policy "Public read published articles" on public.articles for select using (is_published = true);
create policy "Public read available products" on public.products for select using (is_available = true);

-- User-specific policies
create policy "Users can read own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can manage own saved classes" on public.saved_classes for all using (auth.uid() = user_id);
create policy "Users can read own orders" on public.orders for select using (auth.uid() = user_id or user_id is null);
create policy "Users can read own order items" on public.order_items for select using (
  exists (select 1 from public.orders where orders.id = order_items.order_id and (orders.user_id = auth.uid() or orders.user_id is null))
);
