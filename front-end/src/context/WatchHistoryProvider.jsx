import { useCallback, useMemo } from 'react'
import { isKnownId } from '../utils/films.js'
import { WatchHistoryContext } from './watchHistoryContext.js'
import { useSyncedPreference } from './useSyncedPreference.js'
import { useTmdbFilms } from './useTmdbFilms.js'

// The titles a member has played and how far they got, shared by every page (the player writes it; the Continue
// Watching rows read it). A list of { id, minutes }, most recently played first: in the signed-in member's
// user_preferences.watched, or in this browser (`nextflick:watching`) when signed out (useSyncedPreference).
// Read it with useWatchHistory() (watchHistoryContext.js).
const STORAGE_KEY = 'nextflick:watching'

// Entries for titles that no longer exist, or with a nonsense number of minutes, are dropped.
function cleanEntries(stored) {
  if (!Array.isArray(stored)) return []
  return stored
    .filter((e) => e && isKnownId(e.id) && Number.isFinite(e.minutes) && e.minutes >= 0)
    .map((e) => ({ id: e.id, minutes: e.minutes }))
}

export function WatchHistoryProvider({ children }) {
  const [entries, updateEntries] = useSyncedPreference('watched', STORAGE_KEY, cleanEntries)
  const filmsVersion = useTmdbFilms(entries.map((e) => e.id))   // Continue Watching needs the TMDB films' details

  // stable functions (the player calls them from timers and effects)
  const record = useCallback(
    (id, minutes) => updateEntries((current) => [{ id, minutes }, ...current.filter((e) => e.id !== id)]),
    [updateEntries],
  )
  const finish = useCallback((id) => updateEntries((current) => current.filter((e) => e.id !== id)), [updateEntries])

  const value = useMemo(
    () => ({
      ids: entries.map((e) => e.id),
      progressOf: (id) => entries.find((e) => e.id === id)?.minutes ?? 0,
      filmsVersion,   // changes when TMDB films arrive, so Continue Watching re-renders with them
      record,
      finish,
    }),
    [entries, record, finish, filmsVersion],
  )

  return <WatchHistoryContext.Provider value={value}>{children}</WatchHistoryContext.Provider>
}
