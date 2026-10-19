-- Phase C: replace temporary development RLS with authenticated-user policies.

-- 1. Make sure RLS is on for all four application tables.
alter table public.users            enable row level security;
alter table public.user_preferences enable row level security;
alter table public.billing_profiles enable row level security;
alter table public.content          enable row level security;

-- 2. Remove all seven temporary policies.
drop policy if exists "user_preferences_allow_all"  on public.user_preferences;
drop policy if exists "user_preferences_insert_all" on public.user_preferences;
drop policy if exists "user_preferences_update_all" on public.user_preferences;
drop policy if exists "dev_anon_delete_own_user"    on public.users;
drop policy if exists "dev_anon_insert_users"       on public.users;
drop policy if exists "dev_anon_select_own_user"    on public.users;
drop policy if exists "dev_anon_update_own_user"    on public.users;

-- 3. Owner columns default to the signed-in user.
alter table public.user_preferences alter column user_id set default auth.uid();
alter table public.billing_profiles alter column user_id set default auth.uid();

-- 4. users: a member can read and edit only their own profile.
create policy "users: read own"
  on public.users for select to authenticated
  using (id = (select auth.uid()));

create policy "users: update own"
  on public.users for update to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

-- 5. user_preferences: own record only.
create policy "prefs: read own"
  on public.user_preferences for select to authenticated
  using (user_id = (select auth.uid()));

create policy "prefs: insert own"
  on public.user_preferences for insert to authenticated
  with check (user_id = (select auth.uid()));

create policy "prefs: update own"
  on public.user_preferences for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

-- 6. billing_profiles: own record only.
create policy "billing: read own"
  on public.billing_profiles for select to authenticated
  using (user_id = (select auth.uid()));

create policy "billing: insert own"
  on public.billing_profiles for insert to authenticated
  with check (user_id = (select auth.uid()));

create policy "billing: update own"
  on public.billing_profiles for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

-- 7. content: shared, read-only catalog for signed-in members.
create policy "content: authenticated read"
  on public.content for select to authenticated
  using (true);
