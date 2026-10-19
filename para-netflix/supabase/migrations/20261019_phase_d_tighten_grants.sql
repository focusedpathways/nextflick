-- Phase D: least-privilege table grants for the four application tables.

-- 1. anon (signed-out visitors): no access to application tables.
revoke all on public.users, public.user_preferences,
              public.billing_profiles, public.content
  from anon;

-- 2. authenticated: remove the powerful privileges nobody needs.
revoke truncate, trigger, references on public.users, public.user_preferences,
                                        public.billing_profiles, public.content
  from authenticated;
