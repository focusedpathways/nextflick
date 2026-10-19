-- Applied to the NextFlick project as migration "user_preferences_text_ids_and_watch_progress".
-- Film ids in titles.json are text ("top-gun-maverick"), and Continue Watching keeps the minute reached.
alter table public.user_preferences
  alter column watchlist type text[] using watchlist::text[],
  alter column watched  type jsonb   using to_jsonb(watched);
