import { useEffect, useState } from 'react'
import { loadTmdbMovie } from '../services/tmdb.js'
import { findFilm, isTmdbId } from '../utils/films.js'

// TMDB films are fetched when a list or a page first needs them (after a reload, My List and the watch history
// only hold ids). useTmdbFilms(ids) fetches the missing ones and returns a number that changes when they arrive:
// a provider adds it to its memo so the pages that read the list re-render with the films filled in.
export function useTmdbFilms(ids) {
  const [version, setVersion] = useState(0)
  const missing = ids.filter((id) => isTmdbId(id) && !findFilm(id)).join(',')

  useEffect(() => {
    if (!missing) return undefined
    let cancelled = false
    Promise.all(missing.split(',').map((id) => loadTmdbMovie(id))).then(() => {
      if (!cancelled) setVersion((v) => v + 1)
    })
    return () => {
      cancelled = true
    }
  }, [missing])

  return version
}

// One film by id, for a page: a catalog title or a TMDB film. Returns the film, null when the id is unknown or the
// TMDB film could not be loaded, or undefined while it is still loading.
export function useFilm(id) {
  const [fetched, setFetched] = useState({ id: null, film: null })
  const isRemote = isTmdbId(id) && !findFilm(id)

  useEffect(() => {
    if (!isRemote) return undefined
    let cancelled = false
    loadTmdbMovie(id).then((film) => {
      if (!cancelled) setFetched({ id, film })
    })
    return () => {
      cancelled = true
    }
  }, [id, isRemote])

  const known = findFilm(id)
  if (known) return known
  if (!isTmdbId(id)) return null
  return fetched.id === id ? fetched.film : undefined
}
