import { useMemo } from 'react'
import titles from '../data/titles.json'
import { MyListContext } from './myListContext.js'
import { useSyncedPreference } from './useSyncedPreference.js'

// "My List": the films a member added with the + button on a film's More Info pop-up, shared by every page
// (the pop-up adds and removes; My NextFlick shows them). Only film ids are kept (newest first): in the signed-in
// member's user_preferences.watchlist, or in this browser (`nextflick:my-list`) when signed out
// (useSyncedPreference). Read it with useMyList() (myListContext.js).
const STORAGE_KEY = 'nextflick:my-list'

// Ids of films that no longer exist are dropped.
function cleanIds(ids) {
  return Array.isArray(ids) ? ids.filter((id) => titles.some((t) => t.id === id)) : []
}

export function MyListProvider({ children }) {
  const [ids, updateIds] = useSyncedPreference('watchlist', STORAGE_KEY, cleanIds)

  const value = useMemo(
    () => ({
      ids,
      films: ids.map((id) => titles.find((t) => t.id === id)).filter(Boolean),
      has: (id) => ids.includes(id),
      toggle: (id) =>
        updateIds((current) => (current.includes(id) ? current.filter((x) => x !== id) : [id, ...current])),
    }),
    [ids, updateIds],
  )

  return <MyListContext.Provider value={value}>{children}</MyListContext.Provider>
}
