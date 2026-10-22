import MemberPage from '../../components/MemberPage.jsx'
import ThumbnailRow from '../../components/ThumbnailRow.jsx'
import { useMyList } from '../../context/myListContext.js'
import { useWatchHistory } from '../../context/watchHistoryContext.js'
import { continueWatching } from '../../utils/recommend.js'

// My NextFlick (route /my-nextflick): the member's own page. The same header and footer as the home screen
// (from MemberPage; the "My NextFlick" tab wears the filled pill), then the Continue Watching row (the very
// same row as on the home screen), then "My List": the films the member added with the + button on their
// More Info pop-up, newest first, shown as a wrapping grid so all of them are visible.
export default function MyNextFlick() {
  const { films } = useMyList()
  const { ids: played } = useWatchHistory()   // what the member has played: it leads Continue Watching

  return (
    <MemberPage current="My NextFlick">
      {({ openMoreInfo }) => (
        <div className="member-rows">
          <ThumbnailRow heading="Continue Watching" films={continueWatching('all', played)} onSelect={openMoreInfo} />
          <ThumbnailRow
            heading="My List"
            films={films}
            wrap
            onSelect={openMoreInfo}
            emptyMessage="Nothing here yet. Press the + button on a film's More Info page to add it to My List."
          />
        </div>
      )}
    </MemberPage>
  )
}
