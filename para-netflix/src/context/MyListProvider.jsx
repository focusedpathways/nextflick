import { useEffect, useMemo, useState } from 'react'
import titles from '../data/titles.json'
import { MyListContext } from './myListContext.js'
import { loadMyList, saveMyList } from '../services/db.js'

// "My List": the films a member added with the + button on a film's More Info pop-up, shared by every page
// (the pop-up adds and removes; My NextFlick shows them) and kept in Supabase (with localStorage fallback).
// Only film ids are stored (array, newest first). Synced via Supabase when available; falls back to localStorage
// if Supabase is unavailable. Read it with useMyList() (myListContext.js).
const STORAGE_KEY = 'nextflick:my-list'

// Ids of films that no longer exist are dropped.
function validateIds(ids) {
  return Array.isArray(ids) ? ids.filter((id) => titles.some((t) => t.id === id)) : []
}

// Load from localStorage as fallback.
function loadFromLocalStorage() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return validateIds(stored)
  } catch {
    return []
  }
}

export function MyListProvider({ children }) {
  const [ids, setIds] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Load My List from Supabase on mount, with fallback to localStorage.
  useEffect(() => {
    async function initializeList() {
      try {
        const dbIds = await loadMyList()
        if (dbIds !== null) {
          // Supabase returned data (empty array or populated)
          setIds(validateIds(dbIds))
        } else {
          // Supabase failed; fall back to localStorage
          setIds(loadFromLocalStorage())
        }
      } catch {
        setIds(loadFromLocalStorage())
      } finally {
        setIsLoading(false)
      }
    }

    initializeList()
  }, [])

  // Sync My List to Supabase and localStorage on changes.
  useEffect(() => {
    if (isLoading) return // Wait until initial load completes

    // Always save to localStorage as a fallback
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
    } catch {
      // nothing to do
    }

    // Try to save to Supabase (async, don't block UI)
    saveMyList(ids).catch(() => {
      // Supabase save failed, but localStorage succeeded, so we're OK
    })
  }, [ids, isLoading])

  const value = useMemo(
    () => ({
      ids,
      films: ids.map((id) => titles.find((t) => t.id === id)).filter(Boolean),
      has: (id) => ids.includes(id),
      toggle: (id) =>
        setIds((current) => (current.includes(id) ? current.filter((x) => x !== id) : [id, ...current])),
    }),
    [ids],
  )

  return <MyListContext.Provider value={value}>{children}</MyListContext.Provider>
}
