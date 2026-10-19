import BackgroundVideo from './BackgroundVideo.jsx'
import SiteHeader from './SiteHeader.jsx'
import FeaturedRow from './FeaturedRow.jsx'
import Footer from './Footer.jsx'
import './ShowcasePage.css'

// Layout for the dark "showcase" pages (Landing and the login Gateway): the looping video, the
// fixed header, a centered callout over the video, then Featured Films and the footer below
// the fold. Each page only supplies what goes inside the callout (its children), so the two
// pages cannot drift apart. showSignIn=false hides the header's Sign In link (the Gateway IS
// the sign-in page).
export default function ShowcasePage({ children, showSignIn = true }) {
  return (
    <div className="showcase">
      <BackgroundVideo />

      <SiteHeader variant="overlay" showSignIn={showSignIn} />

      <main className="showcase__main">
        <div className="cta-card">{children}</div>
      </main>

      <FeaturedRow />
      <Footer />
    </div>
  )
}
