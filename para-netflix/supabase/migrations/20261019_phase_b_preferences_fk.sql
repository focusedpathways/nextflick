-- Phase B: each user_preferences row must belong to a real public.users row.
alter table public.user_preferences
  alter column user_id drop default;

alter table public.user_preferences
  add constraint user_preferences_user_id_fkey
  foreign key (user_id) references public.users(id) on delete cascade;
