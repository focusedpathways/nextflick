import { useCallback, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import MemberHeader from './MemberHeader.jsx'
import Footer from './Footer.jsx'
import MoreInfo from './moreinfo/MoreInfo.jsx'
import './MemberPage.css'

// The shell of every page a signed-in member sees (Browse = Home, and My NextFlick): the header, the
// page's own content, the Landing page's footer, and the More Info pop-up.
//   current   which tab of the header is the page we are on ('Home' or 'My NextFlick')
//   children  the page's content, as a FUNCTION that is given { openMoreInfo, playFilm }: call
//             openMoreInfo(film) to open the pop-up for a film (the hero's More Info button and every thumbnail
//             do), or playFilm(film) to go to the watch page for it (the Play buttons do).
//
// Which film's pop-up is open (null = closed) is kept HERE, the common parent of everything that can
// open it. The pop-up stays open while its More Like This cards switch films (onSelectFilm).
// Not protected yet: that arrives with AuthContext.
export default function MemberPage({ current, children }) {
  const email = useLocation().state?.email
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)
  const closeMoreInfo = useCallback(() => setSelected(null), [])

  // Play: the demo player is a page of its own (/watch/:id). The email goes along so the page we come back to
  // still knows who is signed in.
  const playFilm = (film) => navigate(`/watch/${film.id}`, { state: email ? { email } : undefined })

  return (
    <div className="member-page">
      <MemberHeader current={current} email={email} />

      <main className="member-page__main">{children({ openMoreInfo: setSelected, playFilm })}</main>

      {/* The Landing page's footer, without its "create or restart your membership" email prompt:
          whoever is here is already signed in. */}
      <Footer showSignup={false} />

      {selected && <MoreInfo film={selected} onSelectFilm={setSelected} onPlay={playFilm} onClose={closeMoreInfo} />}
    </div>
  )
}
