import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import ShowcasePage from '../../components/ShowcasePage.jsx'
import LoginForm from './LoginForm.jsx'
import { EMAIL_PATTERN } from '../../utils/validation.js'

// Gateway (route /login): where a member signs in. It is the Landing page's layout
// (ShowcasePage: video, header, Featured Films, footer) with a login callout in place of the
// "Join now" one, and without the header's Sign In link (you are already on the sign-in page).
// You arrive here after creating an account (Billing step) or from Landing's Sign In link.
//
// "Lifting state up": the headline and line above the form change when a reset link is
// requested, but the request happens inside LoginForm. So the state lives here, in their
// common parent. Gateway owns `reset` and decides the words; LoginForm only reports the
// request (onForgotPassword) and learns whether one was made (resetSent).
export default function Gateway() {
  // Arriving from the 403 page's Forgot Password link: state.forgot is true, and state.email
  // is the email that was typed.
  const { email: arrivedEmail = '', forgot = false } = useLocation().state ?? {}
  const arrivedWithEmail = forgot && EMAIL_PATTERN.test(arrivedEmail.trim())

  // null until a reset link is requested; then { email, count } (count: how many times).
  // It starts already filled in when we arrive with Forgot Password and a usable email.
  const [reset, setReset] = useState(() =>
    arrivedWithEmail ? { email: arrivedEmail.trim(), count: 1 } : null,
  )

  function handleForgotPassword(email) {
    setReset((current) => ({ email, count: (current?.count ?? 0) + 1 }))
  }

  return (
    <ShowcasePage showSignIn={false}>
      {reset ? (
        <>
          <h1>Check your email</h1>
          <p role="status">
            {reset.count > 1 ? 'We sent the link again to' : 'We sent a password reset link to'}{' '}
            <strong>{reset.email}</strong>. Open it to choose a new password, then sign in here.
          </p>
        </>
      ) : (
        <>
          <h1>Welcome back to NextFlick</h1>
          <p>Sign in to pick up where you left off.</p>
        </>
      )}
      <LoginForm
        onForgotPassword={handleForgotPassword}
        resetSent={reset !== null}
        needsEmail={forgot && !arrivedWithEmail}
      />
    </ShowcasePage>
  )
}
