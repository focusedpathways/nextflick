import { useEffect, useId, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { EMAIL_PATTERN, MIN_PASSWORD_LENGTH } from '../../utils/validation.js'
import { advancePick } from '../../utils/recommend.js'
import '../../components/EmailCapture.css'   // the shared field look and the red button
import './LoginForm.css'

const NEEDS_EMAIL = 'Enter your email above and we will send the reset link to it.'

// The login callout's form: email + password + Login. It reuses the Landing form's look
// (the "email-capture" classes: translucent square fields, solid red button) so the two pages
// match; LoginForm.css only adds the stacked layout. Controlled inputs: React state holds
// what is typed. The email starts filled in when it arrives in router state (from the Billing step).
//
// Mocked sign-in (there is no backend and no stored accounts): any well-formed email with a
// password that follows the Password page's rule is accepted and goes on to /browse (the home screen). Only the email
// is passed on, never the password. The Forgot Password / Login row is the shared .cta-actions
// layout (ShowcasePage.css).
//
// "Forgot Password" is mocked too: no email is really sent. It needs a valid email in the field
// (that is where the link would go), reports it to the page through onForgotPassword, and the
// page changes its words. resetSent only changes this button's label to "Resend Link".
export default function LoginForm({ onForgotPassword, resetSent, needsEmail = false }) {
  const [email, setEmail] = useState(useLocation().state?.email ?? '')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState(() => (needsEmail ? { email: NEEDS_EMAIL } : {}))
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const navigate = useNavigate()
  const id = useId()

  // Sent here to reset a password but there is no email to send it to: ask for it
  useEffect(() => {
    if (needsEmail) emailRef.current.focus()
  }, [needsEmail])

  function handleSubmit(event) {
    event.preventDefault()
    const trimmed = email.trim()
    const found = {}
    if (!EMAIL_PATTERN.test(trimmed)) {
      found.email = 'Please enter a valid email address, like name@example.com.'
    }
    if (!password) {
      found.password = 'Please enter your password.'
    } else if (password.length < MIN_PASSWORD_LENGTH) {
      found.password = `Passwords are at least ${MIN_PASSWORD_LENGTH} characters long.`
    }
    setErrors(found)

    if (found.email) {
      emailRef.current.focus()
    } else if (found.password) {
      passwordRef.current.focus()
    } else {
      // TODO (database, later): check the email and password here. When they do not match an
      // account, send the visitor to the 403 page instead:
      //   navigate('/403', { state: { email: trimmed } })
      advancePick()   // a new login means a new featured film on the home screen
      navigate('/browse', { state: { email: trimmed } })
    }
  }

  function handleForgotPassword() {
    const trimmed = email.trim()
    if (!EMAIL_PATTERN.test(trimmed)) {
      setErrors({ email: NEEDS_EMAIL })
      emailRef.current.focus()
      return
    }
    setErrors({})
    onForgotPassword(trimmed)
  }

  return (
    <form className="email-capture email-capture--hero login-form" onSubmit={handleSubmit} noValidate>
      <div className="login-form__field">
        <label htmlFor={`${id}-email`} className="visually-hidden">Email address</label>
        <input
          id={`${id}-email`}
          ref={emailRef}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? `${id}-email-error` : undefined}
        />
        {errors.email && (
          <p id={`${id}-email-error`} className="email-capture__error" role="alert">{errors.email}</p>
        )}
      </div>

      <div className="login-form__field">
        <label htmlFor={`${id}-password`} className="visually-hidden">Password</label>
        <input
          id={`${id}-password`}
          ref={passwordRef}
          type="password"
          autoComplete="current-password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={errors.password ? 'true' : 'false'}
          aria-describedby={errors.password ? `${id}-password-error` : undefined}
        />
        {errors.password && (
          <p id={`${id}-password-error`} className="email-capture__error" role="alert">{errors.password}</p>
        )}
      </div>

      <div className="cta-actions">
        <button type="button" className="cta-link" onClick={handleForgotPassword}>
          {resetSent ? 'Resend Link' : 'Forgot Password'}
        </button>
        <button type="submit" className="email-capture__btn">Login</button>
      </div>
    </form>
  )
}
