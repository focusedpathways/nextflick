import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import './SiteHeader.css'

// The top bar, shared by the pages. Logo on the left, Sign In on the right, both on one
// midline with the same side margin (--gutter).
//   variant="overlay": Landing. Fixed over the video, dark gradient, silver logo, red link.
//   variant="light":   Password, Contact, Billing (the light form pages). In the page flow, white, a paper-thin
//                      grey line underneath, all-red logo, black link.
// showSignIn=false drops the Sign In link (the Gateway, which is the sign-in page).
// homeTo: where the logo goes. Landing ('/') is the default; pages on the signed-in side of the
// Gateway pass '/browse' so the logo always leads to the home screen. homeState is what it carries
// along (the signed-in email), so the next page still knows who is signed in.
export default function SiteHeader({ variant = 'overlay', showSignIn = true, homeTo = '/', homeState }) {
  return (
    <header className={`site-header site-header--${variant}`}>
      <nav className="site-header__nav" aria-label="Main">
        <Link to={homeTo} state={homeState} aria-label="NextFlick home">
          <Logo tone={variant === 'light' ? 'red' : 'silver'} />
        </Link>
        {showSignIn && <Link to="/login" className="nav-account">Sign In</Link>}
      </nav>
    </header>
  )
}
