import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import './SiteHeader.css'

// The top bar, shared by the pages. Logo on the left, Sign In on the right, both on one
// midline with the same side margin (--gutter).
//   variant="overlay": Landing. Fixed over the video, dark gradient, silver logo, red link.
//   variant="light":   Signup and the other light pages. In the page flow, white, a paper-thin
//                      grey line underneath, all-red logo, black link.
export default function SiteHeader({ variant = 'overlay' }) {
  return (
    <header className={`site-header site-header--${variant}`}>
      <nav className="site-header__nav" aria-label="Main">
        <Link to="/" aria-label="NextFlick home">
          <Logo tone={variant === 'light' ? 'red' : 'silver'} />
        </Link>
        <Link to="/login" className="nav-account">Sign In</Link>
      </nav>
    </header>
  )
}
