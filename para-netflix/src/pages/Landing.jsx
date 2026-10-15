import BackgroundVideo from '../components/BackgroundVideo.jsx'
import SiteHeader from '../components/SiteHeader.jsx'
import EmailCapture from '../components/EmailCapture.jsx'
import FeaturedRow from '../components/FeaturedRow.jsx'
import Footer from '../components/Footer.jsx'
import './Landing.css'

export default function Landing() {
  return (
    <div className="landing">
      <BackgroundVideo />

      <SiteHeader variant="overlay" />

      <main className="landing-main">
        <div className="cta-card">
          <h1>Join now for the best access to your favorite shows and movies</h1>
          <p>Ready to watch? Enter your email to get started.</p>
          <EmailCapture variant="hero" />
        </div>
      </main>

      <FeaturedRow />
      <Footer />
    </div>
  )
}
