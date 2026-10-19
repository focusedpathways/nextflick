import { useCallback, useEffect, useMemo, useState } from 'react'
import titles from '../data/titles.json'
import { WatchHistoryContext } from './watchHistoryContext.js'

// The titles a member has played and how far they got, shared by every page (the player writes it; the Continue
// Watching rows read it) and kept in this browser, so it survives a reload. Stored under `nextflick:watching` as
// a list of { id, minutes }, most recently played first. There is no account or database yet, so it belongs to
// the browser, not to a person; with a database it would belong to the signed-in member.
// Read it with useWatchHistory() (watchHistoryContext.js).
const STORAGE_KEY = 'nextflick:watching'

// Reading can fail (private window, blocked storage, or something odd stored): start empty then. Entries for
// titles that no longer exist, or with a nonsense number of minutes, are dropped.
function loadEntries() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (!Array.isArray(stored)) return []
    return stored
      .filter((e) => e && titles.some((t) => t.id === e.id) && Number.isFinite(e.minutes) && e.minutes >= 0)
      .map((e) => ({ id: e.id, minutes: e.minutes }))
  } catch {
    return []
  }
}

export function WatchHistoryProvider({ children }) {
  const [entries, setEntries] = useState(loadEntries)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
    } catch {
      // nothing to do: the history just will not survive a reload
    }
  }, [entries])

  // stable functions (the player calls them from timers and effects)
  const record = useCallback(
    (id, minutes) => setEntries((current) => [{ id, minutes }, ...current.filter((e) => e.id !== id)]),
    [],
  )
  const finish = useCallback((id) => setEntries((current) => current.filter((e) => e.id !== id)), [])

  const value = useMemo(
    () => ({
      ids: entries.map((e) => e.id),
      progressOf: (id) => entries.find((e) => e.id === id)?.minutes ?? 0,
      record,
      finish,
    }),
    [entries, record, finish],
  )

  return <WatchHistoryContext.Provider value={value}>{children}</WatchHistoryContext.Provider>
}
