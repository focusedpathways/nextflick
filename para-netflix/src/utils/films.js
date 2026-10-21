import titles from '../data/titles.json'

// Films from TMDB have ids like 'tmdb-550' and are not in titles.json. They are fetched when first needed
// (services/tmdb.js) and kept here for the rest of the visit, so every page looks a film up the same way.
const TMDB_ID = /^tmdb-\d+$/
const fetched = new Map()

export const isTmdbId = (id) => TMDB_ID.test(id)

// True for a catalog title or any TMDB id (the stored lists use this to decide what to keep)
export const isKnownId = (id) => titles.some((t) => t.id === id) || isTmdbId(id)

export function rememberFilm(film) {
  fetched.set(film.id, film)
}

// The film for an id, or undefined when it is a TMDB film that has not been fetched yet
export function findFilm(id) {
  return titles.find((t) => t.id === id) ?? fetched.get(id)
}
