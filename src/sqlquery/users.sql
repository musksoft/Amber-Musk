-- USERS TABLE
drop table if exists users;

create table users (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text unique not null,
  phone text,
  address text,
  created_at timestamptz default now()
);

alter table users enable row level security;

create policy "Users can insert own profile"
on users
for insert
to authenticated
with check (auth.uid() = id);


-- ORDERS TABLE
drop table if exists order_items;
drop table if exists orders;

create table orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  total numeric(10,2) not null,
  status text default 'pending',
  created_at timestamptz default now()
);

alter table orders enable row level security;

-- USER: own orders
create policy "Users can insert orders"
on orders
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can view own orders"
on orders
for select
to authenticated
using (auth.uid() = user_id);

-- ADMIN: can see ALL orders
create policy "Admin can view all orders"
on orders
for select
to authenticated
using (
  auth.jwt() ->> 'email' like '%@ambernmusk.com'
);


-- ORDER ITEMS
create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  product_id integer,
  name text,
  price numeric(10,2),
  quantity integer,
  created_at timestamptz default now()
);

alter table order_items enable row level security;

-- USER: own items
create policy "Users can view own order items"
on order_items
for select
to authenticated
using (
  order_id in (
    select id from orders where user_id = auth.uid()
  )
);

-- ADMIN: all items
create policy "Admin can view all order items"
on order_items
for select
to authenticated
using (
  auth.jwt() ->> 'email' like '%@ambernmusk.com'
);