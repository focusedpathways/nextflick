import { useSearchParams } from 'react-router-dom'
import MemberPage from '../../components/MemberPage.jsx'
import Hero from './Hero.jsx'
import ThumbnailRow from '../../components/ThumbnailRow.jsx'
import { useWatchHistory } from '../../context/watchHistoryContext.js'
import { continueWatching, lovedPicks, mostRewatched } from '../../utils/recommend.js'

// Which kind of title the home page shows, from the address: /browse (everything), /browse?type=show (only TV
// shows) or /browse?type=movie (only movies). Anything else means everything. The header's Shows and Movies
// tabs are links to those addresses, so the filter survives a reload and works with the Back button.
const TYPE_FROM_ADDRESS = { show: 'show', movie: 'movie' }
const TAB_FOR_TYPE = { all: 'Home', show: 'Shows', movie: 'Movies' }

// Browse: the member's home screen (route /browse): the hero, then three rows of thumbnails, all of them showing
// only the chosen kind of title. The header, the footer and the More Info pop-up come from the shared MemberPage
// shell (the same one My NextFlick uses). The rows' films come from utils/recommend.js (stand-ins for database
// queries).
export default function Browse() {
  const [params] = useSearchParams()
  const type = TYPE_FROM_ADDRESS[params.get('type')] ?? 'all'
  const { ids: played } = useWatchHistory()   // what the member has played: it leads Continue Watching

  const rows = [
    { heading: 'Most Rewatched', films: mostRewatched(type) },
    { heading: 'Continue Watching', films: continueWatching(type, played) },
    { heading: "We Think You'll Love These", films: lovedPicks(type) },
  ].filter((row) => row.films.length > 0)   // never show a heading with nothing under it

  return (
    <MemberPage current={TAB_FOR_TYPE[type]}>
      {({ openMoreInfo, playFilm }) => (
        <>
          {/* key: a different filter starts the hero afresh, on a title of the right kind */}
          <Hero key={type} type={type} onMoreInfo={openMoreInfo} onPlay={playFilm} />

          <div className="member-rows member-rows--below-hero">
            {rows.map((row) => (
              <ThumbnailRow key={row.heading} heading={row.heading} films={row.films} onSelect={openMoreInfo} />
            ))}
          </div>
        </>
      )}
    </MemberPage>
  )
}
