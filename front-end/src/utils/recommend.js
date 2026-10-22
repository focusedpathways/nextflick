import titles from '../data/titles.json'
import { findFilm } from './films.js'

// Stand-in for a recommender. There is no viewer data and no backend yet, so this just walks the
// films in a fixed order, one step on EACH LOGIN: the hero on the home screen shows a different film
// every time the viewer signs in, and keeps it until the next login. When a database exists, this is
// the one file to replace: keep the same three functions, but choose from the viewer's history.
//
//   rankPicks()    the films, best pick first (the order the hero's refresh button follows)
//   currentPick()  the film the hero starts on (the one chosen at the last login)
//   advancePick()  called once per login: moves on to the next film and remembers it
//
// Most of them take a `type`: 'all' (the default), 'movie' or 'show' (junior: the Shows and Movies tabs filter
// the home page). The lists below keep ONE order for every title (movies and shows mixed); a type just keeps
// the matching ones, so each filtered row is the same list with the other kind taken out.
//   mostRewatched(), continueWatching(type, playedIds), lovedPicks()
//                  the three rows under the hero (also stand-ins: fixed lists today, database
//                  queries later; each returns an array of films)
//   topTen()       the Top 10 (Landing's Featured Films and the hero's ranking chip)
//   moreLike(film) the films most like this one (the More Info pop-up's "More Like This")
const STAND_IN_ORDER = [
  'top-gun-maverick',
  'the-wild-robot',
  'brooklyn-nine-nine',
  'f1',
  'planet-earth-ii',
  'paddington-in-peru',
  'friday-night-lights',
  'the-martian',
  'twisters',
  'cosmos',
  'the-prince-of-egypt',
  'ford-v-ferrari',
  'parks-and-recreation',
  'hidden-figures',
  'national-treasure',
  'the-amazing-race',
  'the-king-of-kings',
  'apollo-13',
  'macgyver',
  'the-secret-life-of-walter-mitty',
  'remember-the-titans',
  'psych',
  'david',
  'back-to-the-future',
  'soul-surfer',
  'monk',
  'the-greatest-showman',
  'interstellar',
  'mythbusters',
  'free-solo',
  'downton-abbey',
  'i-can-only-imagine',
  'sully',
  'miracle',
  'angel-and-the-badman',
  'war-room',
  'chariots-of-fire',
]

const STORAGE_KEY = 'nextflick:featured'   // the id of the film chosen at the last login

// 'all' keeps everything; 'movie' / 'show' keep only that kind (`type` in titles.json)
export const ofType = (films, type = 'all') => (type === 'all' ? films : films.filter((t) => t.type === type))

export function rankPicks(type = 'all') {
  const listed = STAND_IN_ORDER.map((id) => titles.find((t) => t.id === id)).filter(Boolean)
  const unlisted = titles.filter((t) => !STAND_IN_ORDER.includes(t.id))   // new films go last
  return ofType([...listed, ...unlisted], type)
}

// Storage can be missing or blocked (private windows), so every use is wrapped
function remembered() {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

// With a type, it is the first title of that kind at or after the remembered one (wrapping round), so even when
// only shows (or only movies) are being shown, the hero still changes from one login to the next.
export function currentPick(type = 'all') {
  const all = rankPicks()
  const start = Math.max(0, all.findIndex((t) => t.id === remembered()))
  for (let i = 0; i < all.length; i++) {
    const candidate = all[(start + i) % all.length]
    if (type === 'all' || candidate.type === type) return candidate
  }
  return all[0]
}

export function advancePick() {
  const ranked = rankPicks()
  const at = ranked.findIndex((t) => t.id === remembered())
  const next = ranked[(at + 1) % ranked.length]   // not found (-1) starts at the first film
  try {
    localStorage.setItem(STORAGE_KEY, next.id)
  } catch {
    // nothing to do: the hero will simply start on the first film
  }
  return next
}

// ---- the rows under the hero ----

const REWATCHED_ORDER = [
  'back-to-the-future',
  'brooklyn-nine-nine',
  'top-gun-maverick',
  'parks-and-recreation',
  'apollo-13',
  'friday-night-lights',
  'remember-the-titans',
  'psych',
  'national-treasure',
  'the-martian',
  'monk',
  'paddington-in-peru',
  'interstellar',
  'macgyver',
  'the-greatest-showman',
  'the-wild-robot',
  'mythbusters',
  'miracle',
  'downton-abbey',
  'chariots-of-fire',
]

const CONTINUE_ORDER = [
  'f1',
  'brooklyn-nine-nine',
  'twisters',
  'planet-earth-ii',
  'hidden-figures',
  'friday-night-lights',
  'david',
  'the-amazing-race',
  'free-solo',
  'cosmos',
  'sully',
  'psych',
]

// Catalog titles, or TMDB films the visit has fetched (the watch history can hold both)
const byIds = (ids) => ids.map((id) => findFilm(id)).filter(Boolean)

export function mostRewatched(type = 'all') {
  return ofType(byIds(REWATCHED_ORDER), type)
}

// Continue Watching: the titles the member really played come first (`playedIds`, most recently played first: the
// watch history, see context/WatchHistoryProvider.jsx), then the stand-in list as filler so a brand-new demo is not
// empty, with no title twice. The pages pass the history in, so this file stays plain JavaScript (no React).
export function continueWatching(type = 'all', playedIds = []) {
  const played = byIds(playedIds)
  const filler = byIds(CONTINUE_ORDER).filter((t) => !playedIds.includes(t.id))
  return ofType([...played, ...filler], type)
}

// "We think you'll love these": the next 15 best picks, without the title the hero is already showing
export function lovedPicks(type = 'all') {
  const heroId = currentPick(type).id
  return rankPicks(type).filter((t) => t.id !== heroId).slice(0, 15)
}

// The Top 10: the first ten films in titles.json, in that order (Landing's Featured Films row and the
// hero's "No. N in Top 10" chip). Films added later go after them, so they are not in the Top 10.
export function topTen() {
  return titles.slice(0, 10)
}

// "More like this": the titles of the SAME KIND (a show's list is shows, a movie's is movies) that share the most
// genres with `film`, most shared first; ties keep the stand-in ranking order, so the result is always the same
// for the same film. A database would use real similarity (viewers who watched this also watched ...).
export function moreLike(film, count = 6) {
  const shared = (t) => t.genres.filter((g) => film.genres.includes(g)).length
  const sameKind = rankPicks(film.type)
  // enough of the same kind? use only those; if a kind is ever too small, fill up from the other kind
  const pool = sameKind.length > count ? sameKind : rankPicks()
  return pool
    .filter((t) => t.id !== film.id)
    .map((t, order) => ({ t, shared: shared(t), order }))
    .sort((a, b) => b.shared - a.shared || a.order - b.order)
    .slice(0, count)
    .map(({ t }) => t)
}
