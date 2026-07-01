create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text not null,
  address text not null,
  city text not null,
  state text not null,
  pincode text not null,
  payment_method text not null default 'UPI',
  items jsonb not null default '[]'::jsonb,
  subtotal integer not null default 0,
  shipping integer not null default 40,
  total integer not null default 0,
  status text not null default 'Confirmed',
  receipt_file text,
  estimated_delivery_date timestamptz not null default now() + interval '7 days',
  created_at timestamptz not null default now()
);

alter table orders enable row level security;

create policy "Allow inserts for public orders"
  on orders
  for insert
  to anon
  with check (true);

create policy "Allow reads for public orders"
  on orders
  for select
  to anon
  using (true);

create policy "Allow updates for public orders"
  on orders
  for update
  to anon
  with check (true)
  using (true);
