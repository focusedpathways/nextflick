import { useCallback, useEffect, useRef, useState } from 'react'
import { useAuth } from './authContext.js'
import { loadPreferences, savePreference } from '../services/preferences.js'

function readLocal(key) {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch {
    return null
  }
}

function writeLocal(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // storage blocked: the value just will not survive a reload
  }
}

// One saved preference (My List, watch history) that belongs to whoever is using the app:
// signed in -> the `column` of the member's own user_preferences row; signed out -> this browser's localStorage
// (`storageKey`). It reloads when the member changes (sign in / sign out). `clean` turns whatever was stored into
// a valid value (it must be a function defined outside components, so it never changes).
// Returns [value, update], where update(fn) works like a state setter given a function.
export function useSyncedPreference(column, storageKey, clean) {
  const { userId, loading } = useAuth()
  // owner: the user id the value belongs to (null = signed out, undefined = not loaded yet).
  // canSave is false until loaded, and stays false if the account's row could not be read, so a failed load
  // never overwrites what is saved.
  const [state, setState] = useState(() => ({ owner: undefined, value: clean(readLocal(storageKey)), canSave: false }))
  const loaded = useRef(null)

  useEffect(() => {
    if (loading) return
    let cancelled = false
    const load = userId
      ? loadPreferences(userId).then((prefs) => ({ owner: userId, value: clean(prefs?.[column]), canSave: prefs !== null }))
      : Promise.resolve({ owner: null, value: clean(readLocal(storageKey)), canSave: true })
    load.then((next) => {
      if (cancelled) return
      loaded.current = next
      setState(next)
    })
    return () => {
      cancelled = true
    }
  }, [userId, loading, column, storageKey, clean])

  // Save every change (not the value that was just loaded)
  useEffect(() => {
    if (!state.canSave || state === loaded.current) return
    if (state.owner === null) writeLocal(storageKey, state.value)
    else savePreference(state.owner, column, state.value)
  }, [state, column, storageKey])

  const update = useCallback((fn) => setState((current) => ({ ...current, value: fn(current.value) })), [])
  return [state.value, update]
}
