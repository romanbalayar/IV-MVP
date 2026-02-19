-- ============================================
-- IV Live & Share - Supabase Database Schema
-- Run this in your Supabase SQL Editor
-- ============================================

-- 1. Profiles table (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique,
  display_name text,
  avatar_url text,
  is_host boolean default false,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone"
  on public.profiles for select using (true);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert with check (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, display_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'username',
    new.raw_user_meta_data->>'display_name',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=' || coalesce(new.raw_user_meta_data->>'username', new.id::text)
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- 2. Shows table
create table public.shows (
  id uuid primary key default gen_random_uuid(),
  host_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  description text,
  cover_image_url text,
  category text default 'Other',
  show_date timestamptz not null,
  ticket_price integer not null default 0,
  total_tickets integer default 100,
  youtube_url text,
  is_live boolean default false,
  is_featured boolean default false,
  created_at timestamptz default now()
);

alter table public.shows enable row level security;

create policy "Shows are viewable by everyone"
  on public.shows for select using (true);

create policy "Hosts can create shows"
  on public.shows for insert with check (auth.uid() = host_id);

create policy "Hosts can update own shows"
  on public.shows for update using (auth.uid() = host_id);

create policy "Hosts can delete own shows"
  on public.shows for delete using (auth.uid() = host_id);


-- 3. Tickets table
create table public.tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  show_id uuid references public.shows(id) on delete cascade not null,
  stripe_session_id text,
  stripe_payment_intent text,
  amount_paid integer not null default 0,
  purchased_at timestamptz default now(),
  unique(user_id, show_id)
);

alter table public.tickets enable row level security;

create policy "Users can view own tickets"
  on public.tickets for select using (auth.uid() = user_id);

create policy "Service role can insert tickets"
  on public.tickets for insert with check (true);

-- View for show with host info (convenient join)
create or replace view public.shows_with_host as
select
  s.*,
  p.username as host_username,
  p.display_name as host_display_name,
  p.avatar_url as host_avatar_url,
  (select count(*) from public.tickets t where t.show_id = s.id) as tickets_sold
from public.shows s
join public.profiles p on s.host_id = p.id;
