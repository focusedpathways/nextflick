import { Link, useLocation } from 'react-router-dom'
import ShowcasePage from '../../components/ShowcasePage.jsx'
import '../../components/EmailCapture.css'   // the shared solid red button look
import './Forbidden.css'

// Error 403 (route /403): shown when a sign-in is refused because the email or password is
// wrong. Same layout as the Landing page and the Gateway (ShowcasePage), with an error callout.
// Try Again goes back to /login and hands back the email that was typed, so it is still filled
// in. Forgot Password goes to the same page but asks it to open straight in its "reset link
// sent" view (state.forgot). The password is never carried (it is not kept anywhere).
export default function Forbidden() {
  const email = useLocation().state?.email

  return (
    <ShowcasePage showSignIn={false}>
      <p className="forbidden__code">Error 403</p>
      <h1>Wrong email or password</h1>
      <p>We couldn&apos;t sign you in with those details. Check them and try again.</p>

      <div className="cta-actions">
        <Link to="/login" state={{ email, forgot: true }} className="cta-link">Forgot Password</Link>
        <Link to="/login" state={email ? { email } : undefined} className="email-capture__btn">
          Try Again
        </Link>
      </div>
    </ShowcasePage>
  )
}
