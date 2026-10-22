import { supabase } from './db.js'

// The signed-in member's row in public.user_preferences (the sign-up trigger creates it; the "prefs: read own" and
// "prefs: update own" policies only allow their own row). Columns used: watchlist (My List: film ids, newest first)
// and watched (Continue Watching: [{ id, minutes }], most recent first).

// Returns { watchlist, watched } (either may be null when never saved), or null when it could not be read.
export async function loadPreferences(userId) {
  const { data, error } = await supabase
    .from('user_preferences')
    .select('watchlist, watched')
    .eq('user_id', userId)
    .maybeSingle()
  if (error || !data) {
    console.error('Could not load preferences', error)
    return null
  }
  return data
}

// Saves one column (watchlist or watched) of the member's row.
export async function savePreference(userId, column, value) {
  const { error } = await supabase.from('user_preferences').update({ [column]: value }).eq('user_id', userId)
  if (error) console.error(`Could not save ${column}`, error)
}
