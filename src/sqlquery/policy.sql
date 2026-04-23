-- ================= PRODUCTS TABLE =================
drop table if exists products;

create table products (
  id bigint generated always as identity primary key,
  name text not null,
  brand text,
  price numeric(10,2),
  size text,
  image text,
  description text,

  concentration text,
  gender text,

  top_notes text[],
  heart_notes text[],
  base_notes text[],

  longevity int,
  sillage int,

  in_stock boolean default true,
  trending boolean default false,

  created_at timestamptz default now()
);

alter table products enable row level security;

-- PUBLIC: everyone can view products
create policy "Anyone can view products"
on products
for select
to anon, authenticated
using (true);

-- ADMIN: can insert
create policy "Admin can insert products"
on products
for insert
to authenticated
with check (
  auth.jwt() ->> 'email' like '%@ambernmusk.com'
);

-- ADMIN: can update
create policy "Admin can update products"
on products
for update
to authenticated
using (
  auth.jwt() ->> 'email' like '%@ambernmusk.com'
);

-- ADMIN: can delete
create policy "Admin can delete products"
on products
for delete
to authenticated
using (
  auth.jwt() ->> 'email' like '%@ambernmusk.com'
);

create policy "Admin insert products"
on products
for insert
to authenticated
with check (
  auth.jwt() ->> 'email' like '%@ambernmusk.com'
);

create policy "Admin can update orders"
on orders
for update
to authenticated
using (
  auth.jwt() ->> 'email' like '%@ambernmusk.com'
);