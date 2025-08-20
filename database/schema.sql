
create extension if not exists "pgcrypto";

create table if not exists public.users (
    id uuid primary key default gen_random_uuid(),
    email text unique not null,
    password text not null, -- hashed password
    name text not null,
    created_at timestamptz default now()
);

create table if not exists public.folders (
    id serial primary key,
    name text not null,
    parent_id int references public.folders(id) on delete cascade,
    user_id uuid references public.users(id) on delete cascade,
    created_at timestamptz default now()
);

create table if not exists public.files (
    id serial primary key,
    name text not null,
    url text not null, -- Supabase Storage or public link
    folder_id int references public.folders(id) on delete cascade,
    user_id uuid references public.users(id) on delete cascade,
    size bigint,
    type text,
    created_at timestamptz default now()
);

create table if not exists public.shares (
    id serial primary key,
    item_type text check (item_type in ('file', 'folder')) not null,
    item_id int not null,
    shared_with uuid references public.users(id) on delete cascade,
    permission text check (permission in ('view', 'edit')) default 'view',
    created_at timestamptz default now()
);
