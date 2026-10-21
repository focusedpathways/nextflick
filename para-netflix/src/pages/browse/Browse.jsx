import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import MemberPage from '../../components/MemberPage.jsx'
import Hero from './Hero.jsx'
import ThumbnailRow from '../../components/ThumbnailRow.jsx'
import { useWatchHistory } from '../../context/watchHistoryContext.js'
import { loadLiveMovies, loadTmdbMovie } from '../../services/tmdb.js'
import { continueWatching, lovedPicks, mostRewatched } from '../../utils/recommend.js'

// What the home page shows, from the address (so it survives a reload and works with the Back button):
//   type  /browse (everything), ?type=show (only TV shows) or ?type=movie (only movies); anything else means
//         everything. The header's Shows and Movies tabs are links to those addresses.
//   q     the header's search text (?q=top): only titles whose name contains it, upper or lower case alike.
//         It combines with type (?type=show&q=the). The search field writes it as the member types.
const TYPE_FROM_ADDRESS = { show: 'show', movie: 'movie' }
const TAB_FOR_TYPE = { all: 'Home', show: 'Shows', movie: 'Movies' }

function matchesSearch(film, query) {
  return film.title.toLowerCase().includes(query.toLowerCase())
}

// Browse: the member's home screen (route /browse): the hero, then three rows of thumbnails, all of them showing
// only the chosen kind of title. While searching, the hero is hidden so the matching titles sit right under the
// search field. The header, the footer and the More Info pop-up come from the shared MemberPage shell (the same
// one My NextFlick uses). The rows' films come from utils/recommend.js (stand-ins for database queries).
export default function Browse() {
  const [params] = useSearchParams()
  const type = TYPE_FROM_ADDRESS[params.get('type')] ?? 'all'
  const query = (params.get('q') ?? '').trim()
  const { ids: played } = useWatchHistory()   // what the member has played: it leads Continue Watching
  // Live TMDB movies (undefined = still loading, null = could not be loaded). Loaded once when the page opens.
  const [live, setLive] = useState(undefined)
  useEffect(() => {
    let cancelled = false   // a page closed before the answer came back must not update state
    loadLiveMovies().then((movies) => {
      if (!cancelled) setLive(movies)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const rows = [
    { heading: 'Most Rewatched', films: mostRewatched(type) },
    { heading: 'Continue Watching', films: continueWatching(type, played) },
    { heading: "We Think You'll Love These", films: lovedPicks(type) },
  ]
    .map((row) => (query ? { ...row, films: row.films.filter((film) => matchesSearch(film, query)) } : row))
    .filter((row) => row.films.length > 0)   // never show a heading with nothing under it

  return (
    <MemberPage current={TAB_FOR_TYPE[type]}>
      {({ openMoreInfo, playFilm }) => (
        <>
          {/* key: a different filter starts the hero afresh, on a title of the right kind */}
          {!query && <Hero key={type} type={type} onMoreInfo={openMoreInfo} onPlay={playFilm} />}

          <div className={query ? 'member-rows' : 'member-rows member-rows--below-hero'}>
            {rows.map((row) => (
              <ThumbnailRow key={row.heading} heading={row.heading} films={row.films} onSelect={openMoreInfo} />
            ))}
            {/* Live TMDB row: movies only (hidden under Shows) and not while searching. A press fetches the film's
                details first (genres, cast, rating, runtime), then opens the same More Info pop-up as every row. */}
            {!query && type !== 'show' && (
              <ThumbnailRow
                heading="Live from TMDB (preview)"
                films={live ?? []}
                onSelect={(film) => loadTmdbMovie(film.id).then((full) => full && openMoreInfo(full))}
                emptyMessage={
                  live === undefined
                    ? 'Loading live movies...'
                    : live === null
                      ? 'Live TMDB movies are unavailable right now.'
                      : 'No live movies to show.'
                }
              />
            )}
            {query && rows.length === 0 && (
              <ThumbnailRow heading="Search" films={[]} emptyMessage={`No titles match "${query}".`} />
            )}
          </div>
        </>
      )}
    </MemberPage>
  )
}
