create extension if not exists pgcrypto;

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_phone text not null,
  customer_email text not null,
  delivery_address text not null,
  packaging_status text not null default 'not_required' check (packaging_status in ('not_required', 'optional_available', 'selected')),
  subtotal_vnd integer not null check (subtotal_vnd >= 0),
  estimated_total_vnd integer not null check (estimated_total_vnd >= 0),
  notes text,
  status text not null default 'received' check (status in ('received', 'processing', 'completed', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (estimated_total_vnd = subtotal_vnd)
);

alter table orders add column if not exists packaging_status text not null default 'not_required';
update orders
set estimated_total_vnd = subtotal_vnd
where estimated_total_vnd is distinct from subtotal_vnd;
alter table orders drop constraint if exists orders_check;
alter table orders add constraint orders_check check (estimated_total_vnd = subtotal_vnd);
alter table orders drop constraint if exists orders_packaging_status_check;
alter table orders add constraint orders_packaging_status_check check (packaging_status in ('not_required', 'optional_available', 'selected'));
alter table orders drop column if exists packaging_id;
alter table orders drop column if exists packaging_name;
alter table orders drop column if exists packaging_fee_vnd;

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id text not null,
  sku text not null,
  product_name text not null,
  unit text not null,
  unit_price_vnd integer not null check (unit_price_vnd >= 0),
  packaging_id text,
  packaging_family_name text,
  packaging_variant_name text,
  packaging_name text,
  packaging_fee_vnd integer not null default 0 check (packaging_fee_vnd >= 0),
  quantity integer not null check (quantity between 1 and 99),
  subtotal_vnd integer not null check (subtotal_vnd >= 0),
  created_at timestamptz not null default now(),
  check (subtotal_vnd = (unit_price_vnd + packaging_fee_vnd) * quantity)
);

alter table order_items add column if not exists packaging_id text;
alter table order_items add column if not exists packaging_family_name text;
alter table order_items add column if not exists packaging_variant_name text;
alter table order_items add column if not exists packaging_name text;
alter table order_items add column if not exists packaging_fee_vnd integer not null default 0;
alter table order_items drop constraint if exists order_items_check;
alter table order_items add constraint order_items_check check (subtotal_vnd = (unit_price_vnd + packaging_fee_vnd) * quantity);

create table if not exists contact_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text not null,
  message text not null,
  status text not null default 'received' check (status in ('received', 'reviewed', 'closed')),
  created_at timestamptz not null default now()
);

create index if not exists idx_orders_created_at on orders(created_at desc);
create index if not exists idx_orders_status_created_at on orders(status, created_at desc);
create index if not exists idx_orders_customer_phone on orders(customer_phone);
create index if not exists idx_order_items_order_id on order_items(order_id);
create index if not exists idx_contact_requests_created_at on contact_requests(created_at desc);
create index if not exists idx_contact_requests_status_created_at on contact_requests(status, created_at desc);
