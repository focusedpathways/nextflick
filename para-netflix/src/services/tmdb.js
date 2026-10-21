import { supabase } from './db.js'
import { checkTmdbMovie } from '../utils/contentFilter.js'
import { findFilm, rememberFilm } from '../utils/films.js'

// Live movies from TMDB, fetched through the Supabase Edge Function `tmdb-movies`. The TMDB token lives in that
// function (a Supabase secret), never in the browser. The function passes TMDB's own responses through, so this
// file turns them into the same film shape titles.json uses (see utils/films.js).
//   GET          the popular list: every movie in it becomes a BASIC film (poster, title, year, summary, genres)
//   POST { id }  one movie's details: upgrades it to a FULL film (adds cast, rating, running time)
// When the details call fails, the basic film is used, so a thumbnail always opens its More Info pop-up.

const POSTER = 'https://image.tmdb.org/t/p/w500'   // TMDB's public poster CDN: no key needed
const MAX_MOVIES = 15
const DEFAULT_RUNTIME = 120   // the demo player needs a length; the pop-up hides it while it is a guess

// TMDB's fixed list of movie genres (the popular list only gives their ids)
const GENRES = {
  28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama',
  10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance',
  878: 'Science Fiction', 10770: 'TV Movie', 53: 'Thriller', 10752: 'War', 37: 'Western',
}

let livePromise = null   // one request for the popular list per visit (Browse and the fallback share it)

// Returns the basic films for the Browse row, or null when the function could not be reached.
export function loadLiveMovies() {
  if (!livePromise) {
    livePromise = fetchLiveMovies().then((films) => {
      if (!films) livePromise = null   // failed: let the next caller try again
      return films
    })
  }
  return livePromise
}

async function fetchLiveMovies() {
  const { data, error } = await supabase.functions.invoke('tmdb-movies', { method: 'GET' })
  if (error || !data?.results) {
    console.error('Could not load live TMDB movies', error)
    return null
  }
  const films = data.results
    .filter((movie) => movie.poster_path)   // a thumbnail needs a picture
    .filter((movie) => checkTmdbMovie(movie).ok)   // nothing overly sexualized, horror or occult (contentFilter.js)
    .slice(0, MAX_MOVIES)
    .map(toBasicFilm)
  films.forEach((film) => {
    if (!findFilm(film.id)) rememberFilm(film)   // never replace a full film with a basic one
  })
  return films
}

// One movie in the same shape as titles.json. Returns the full film when the details call works, else the basic
// film from the popular list, else null.
export async function loadTmdbMovie(id) {
  const known = findFilm(id)
  if (known && !known.basic) return known
  const { data, error } = await supabase.functions.invoke('tmdb-movies', {
    method: 'POST',
    body: { id: id.replace('tmdb-', '') },
  })
  if (!error && data?.id) {
    // the same rule as the row (a film saved before the filter existed may still be in My List or the history)
    if (!checkTmdbMovie({ ...data, genre_ids: (data.genres ?? []).map((g) => g.id) }).ok) return null
    const film = toFullFilm(data)
    rememberFilm(film)
    return film
  }
  console.error(`Could not load details for TMDB movie ${id}; using the popular list instead`, error)
  if (known) return known
  await loadLiveMovies()   // after a reload the list may not be loaded yet
  return findFilm(id) ?? null
}

function toBasicFilm(movie) {
  return {
    id: `tmdb-${movie.id}`,   // prefix keeps these ids apart from titles.json
    type: 'movie',
    basic: true,
    title: movie.title,
    genres: (movie.genre_ids ?? []).map((g) => GENRES[g]).filter(Boolean).slice(0, 3),
    year: movie.release_date?.slice(0, 4) ?? '',
    runtime: DEFAULT_RUNTIME,
    runtimeKnown: false,
    rating: '',
    cast: [],
    synopsis: movie.overview ?? '',
    image: POSTER + movie.poster_path,
  }
}

// The rating is the US certification (e.g. PG-13) when TMDB has one.
function toFullFilm(movie) {
  const us = movie.release_dates?.results?.find((r) => r.iso_3166_1 === 'US')
  const certification = us?.release_dates?.map((r) => r.certification).find(Boolean)
  return {
    id: `tmdb-${movie.id}`,
    type: 'movie',
    title: movie.title,
    genres: (movie.genres ?? []).map((g) => g.name).slice(0, 3),
    year: movie.release_date?.slice(0, 4) ?? '',
    runtime: movie.runtime || DEFAULT_RUNTIME,
    runtimeKnown: Boolean(movie.runtime),
    rating: certification || 'NR',
    cast: (movie.credits?.cast ?? []).slice(0, 3).map((person) => person.name),
    synopsis: movie.overview ?? '',
    image: POSTER + movie.poster_path,
  }
}
