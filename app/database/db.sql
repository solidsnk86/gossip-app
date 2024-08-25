-- Creamos una tabla pública para el perfil de susuario
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  website text,

  constraint username_length check (char_length(username) >= 3)
);
-- Configurar el Row Level Security (RLS)
-- Ver en https://supabase.com/docs/guides/auth/row-level-security para más detalles.
alter table profiles
  enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check ((select auth.uid()) = id);

create policy "Users can update own profile." on profiles
  for update using ((select auth.uid()) = id);

-- Este disparador crea automáticamente una entrada de perfil cuando un nuevo usuario se registra a través de Supabase Auth.
-- Ver https://supabase.com/docs/guides/auth/managing-user-data#using-triggers para más detalles.
create function public.handle_new_user()
returns trigger
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Configuramos el Storage (Almacenamiento)
insert into storage.buckets (id, name)
  values ('avatars', 'avatars');

-- Configuramos el acceso de control para el Storage.
-- Ver https://supabase.com/docs/guides/storage#policy-examples para más detalles.
create policy "Avatar images are publicly accessible." on storage.objects
  for select using (bucket_id = 'avatars');

create policy "Anyone can upload an avatar." on storage.objects
  for insert with check (bucket_id = 'avatars');