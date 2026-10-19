// 118 -> "1h 58m", 120 -> "2h", 45 -> "45m"
export function formatRuntime(minutes) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return [h && `${h}h`, m && `${m}m`].filter(Boolean).join(' ')
}

// "Movie" or "Show": what kind of title this is (`type` in src/data/titles.json is 'movie' or 'show')
export const typeLabel = (film) => (film.type === 'show' ? 'Show' : 'Movie')

// How long a title is: a movie's running time (2h 10m), a show's number of seasons (5 Seasons)
export function formatLength(film) {
  if (film.type === 'show') return `${film.seasons} ${film.seasons === 1 ? 'Season' : 'Seasons'}`
  return formatRuntime(film.runtime)
}
