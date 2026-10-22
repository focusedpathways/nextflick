# NextFlick + Supabase: current state, risks, and fixes

Status: LOCAL CLASSROOM DEVELOPMENT ONLY. Do not deploy or share the URL publicly in this state.
Written for the authentication lesson. Nothing here has been committed or pushed.

## What is connected
- Feature: My List (the + button on a film's More Info pop-up; shown on /my-nextflick).
- `src/services/db.js`: Supabase client (publishable key from `.env`), `loadMyList()`, `saveMyList(ids)`.
- `src/context/MyListProvider.jsx`: loads from Supabase on start, saves to Supabase and localStorage on every change; falls back to localStorage if Supabase fails.
- Storage: table `public.user_preferences`, column `watchlist` (text[]), one row per browser.
- Identity: a random UUID in localStorage (`nextflick:device-id`) used as `user_id`. This is NOT authentication.

## Changes made to the database (all unapproved-in-advance except where noted)
1. Migration `add_user_preferences_rls_policies` (approved): three owner-only policies using `auth.uid()`.
2. Migration `update_user_preferences_rls_for_device_id`: dropped those and created `user_preferences_allow_all`, `user_preferences_insert_all`, `user_preferences_update_all` (all `true`). NOT approved.
3. Migration `remove_user_preferences_fk_for_demo`: dropped `user_preferences_user_id_fkey`. NOT approved.
4. Migration `fix_watchlist_column_type`: `watchlist` int8[] -> text[]. NOT approved.
5. One test row exists (watchlist `["top-gun-maverick"]`) created by testing. No pre-existing rows were modified (the table had 0 rows).

Original state for reverting: FK `user_preferences.user_id -> users.id`; `watchlist` was `int8[]`; RLS enabled with NO policies.

## Risks
| # | Risk | Severity | Why |
|---|------|----------|-----|
| 1 | Allow-all RLS policies | High if deployed | Anyone with the publishable key (it ships in the JS bundle) can read, insert and overwrite ANY row, including other users' lists. No DELETE policy, so deletes are blocked. |
| 2 | Device ID is not identity | Medium | The id is a client-chosen value. Anyone who learns another id can read and write that row. Clearing site data loses the list. |
| 3 | FK to `users` removed | Medium | Rows can reference users that do not exist; orphaned data, no cascade cleanup. |
| 4 | `watchlist` is now text[] | Low | Stores film slugs (matches `titles.json`) but no longer matches the `content` table's bigint ids. Needs a decision when `content` is wired in. |
| 5 | Sensitive tables | Contained | `users` and `billing_profiles` still have RLS enabled with NO policies, so the anon key cannot read them. Keep it that way until policies exist. |
| 6 | `.env` values appeared in an AI session transcript | Low | Only the URL and publishable key, which are public by design. Gitignored and untracked. Rotate the key if it worries you (Dashboard > Settings > API Keys). |
| 7 | Silent failures | Low | `db.js` logs errors and falls back to localStorage, so a broken Supabase connection can look like it works. Check the console. |

Confirmed OK: no service-role/secret key in `src` or `.env`; `.env` is gitignored and not tracked.

## Recommended fixes (for the authentication lesson)
1. Dashboard > Authentication > Sign In / Providers: enable Anonymous sign-ins (the earlier 422 on `/auth/v1/signup` suggests they were off) or implement real email/password sign-in via `AuthContext`.
2. Replace the allow-all policies with owner-only ones:
   ```sql
   drop policy "user_preferences_allow_all" on public.user_preferences;
   drop policy "user_preferences_insert_all" on public.user_preferences;
   drop policy "user_preferences_update_all" on public.user_preferences;
   create policy "own select" on public.user_preferences for select using (auth.uid() = user_id);
   create policy "own insert" on public.user_preferences for insert with check (auth.uid() = user_id);
   create policy "own update" on public.user_preferences for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
   ```
3. Resolve the FK. Either (a) sign users up properly so a `public.users` row exists per `auth.uid()` (with a trigger on `auth.users`) and restore the FK, or (b) use a new `my_list(user_id uuid default auth.uid(), content_id text, primary key (user_id, content_id))` table with owner-only RLS, and put the FK on `auth.users(id)`.
4. In `db.js`, replace `getDeviceId()` with `(await supabase.auth.getUser()).data.user.id`, and delete the `nextflick:device-id` code.
5. Decide on the watchlist id type (slug text vs. `content.id` bigint) and keep one.
6. Delete the test row, or let the new policies orphan it.
7. Run Supabase advisors (security) after the policy change.

## Is it safe right now?
Yes for local classroom development, with these conditions:
- Run only with `npm run dev` on localhost; do not deploy, tunnel or share the URL.
- Store only throwaway data (film slugs). Do not put names, emails, phones or addresses in `user_preferences`.
- Do not add policies to `users` or `billing_profiles`.
- No, it is NOT safe to deploy or demo publicly until fixes 1 to 4 are done.

## How to test it yourself
1. `npm run dev`, open /browse, press More Info, press + (it becomes a check).
2. Open /my-nextflick: the film is in My List. Refresh: it stays.
3. In the Supabase dashboard Table Editor, `user_preferences` shows the row.
4. To prove it comes from Supabase rather than localStorage: clear only the `nextflick:my-list` key in DevTools > Application > Local Storage and reload; the list still loads (the `nextflick:device-id` key must stay).
