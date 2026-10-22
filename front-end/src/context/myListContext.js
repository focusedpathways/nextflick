import { createContext, useContext } from 'react'

// The shared My List (see MyListProvider.jsx for what it holds). Kept apart from the provider component so each
// file exports only one kind of thing (components in one, the hook in the other).
export const MyListContext = createContext(null)

// ids     the films' ids, newest first      films   the same as film objects (from titles.json)
// has(id) is this film in the list?         toggle(id)  add it (at the front) or take it out
export function useMyList() {
  const context = useContext(MyListContext)
  if (!context) throw new Error('useMyList must be used inside <MyListProvider>')
  return context
}
