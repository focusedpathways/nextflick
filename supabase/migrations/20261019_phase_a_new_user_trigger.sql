-- Phase A: every new Supabase Auth account gets its own public.users row
-- and its own user_preferences row.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.users (id, email, name, phone)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'name', ''),
    coalesce(new.raw_user_meta_data ->> 'phone', '')
  );

  insert into public.user_preferences (user_id)
  values (new.id);

  return new;
end;
$$;

-- Only the trigger should run this function, not API callers.
revoke execute on function public.handle_new_user() from public, anon, authenticated;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
