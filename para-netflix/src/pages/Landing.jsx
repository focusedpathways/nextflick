import { Link } from 'react-router-dom'
import BackgroundVideo from '../components/BackgroundVideo.jsx'
import Logo from '../components/Logo.jsx'
import EmailCapture from '../components/EmailCapture.jsx'
import FeaturedRow from '../components/FeaturedRow.jsx'
import Footer from '../components/Footer.jsx'
import './Landing.css'

export default function Landing() {
  return (
    <div className="landing">
      <BackgroundVideo />

      <header className="landing-header">
        <nav className="landing-nav" aria-label="Main">
          <Link to="/" aria-label="NextFlick home">
            <Logo />
          </Link>
          <Link to="/login" className="nav-account">Sign In</Link>
        </nav>
      </header>

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
