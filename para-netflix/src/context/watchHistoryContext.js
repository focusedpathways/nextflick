import { createContext, useContext } from 'react'

// The shared watch history (see WatchHistoryProvider.jsx for what it holds). Kept apart from the provider
// component so each file exports only one kind of thing (components in one, the hook in the other).
export const WatchHistoryContext = createContext(null)

//   ids            the ids of the titles that were played, most recently played first
//   progressOf(id) how many minutes of that title were watched (0 if it was never played)
//   record(id, m)  note that `m` minutes of the title were watched; it moves to the front
//   finish(id)     the title was watched to the end: take it out (a finished title is no longer "continue")
export function useWatchHistory() {
  const context = useContext(WatchHistoryContext)
  if (!context) throw new Error('useWatchHistory must be used inside <WatchHistoryProvider>')
  return context
}
