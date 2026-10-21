import { useMemo } from 'react'
import { findFilm, isKnownId } from '../utils/films.js'
import { MyListContext } from './myListContext.js'
import { useSyncedPreference } from './useSyncedPreference.js'
import { useTmdbFilms } from './useTmdbFilms.js'

// "My List": the films a member added with the + button on a film's More Info pop-up, shared by every page
// (the pop-up adds and removes; My NextFlick shows them). Only film ids are kept (newest first): in the signed-in
// member's user_preferences.watchlist, or in this browser (`nextflick:my-list`) when signed out
// (useSyncedPreference). Read it with useMyList() (myListContext.js).
const STORAGE_KEY = 'nextflick:my-list'

// Ids of films that no longer exist are dropped. TMDB films (tmdb-<number>) are kept and fetched when needed.
function cleanIds(ids) {
  return Array.isArray(ids) ? ids.filter(isKnownId) : []
}

export function MyListProvider({ children }) {
  const [ids, updateIds] = useSyncedPreference('watchlist', STORAGE_KEY, cleanIds)
  const filmsVersion = useTmdbFilms(ids)   // changes when a TMDB film in the list has been fetched

  const value = useMemo(
    () => ({
      ids,
      films: ids.map((id) => findFilm(id)).filter(Boolean),
      filmsVersion,   // changes when TMDB films arrive, so pages re-render with them
      has: (id) => ids.includes(id),
      toggle: (id) =>
        updateIds((current) => (current.includes(id) ? current.filter((x) => x !== id) : [id, ...current])),
    }),
    [ids, updateIds, filmsVersion],
  )

  return <MyListContext.Provider value={value}>{children}</MyListContext.Provider>
}
