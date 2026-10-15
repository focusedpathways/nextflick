import { useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import LightPage from '../components/LightPage.jsx'
import './Signup.css'

const MIN_LENGTH = 8

// Signup, the password step: Landing (email) -> this page (password) -> payment -> profiles.
// The email arrives from the Landing form in router state. The password is checked here and
// then dropped: this demo never stores or forwards it (only the email goes on).
export default function Signup() {
  const [password, setPassword] = useState('')
  const [verify, setVerify] = useState('')
  const [errors, setErrors] = useState({})
  const passwordRef = useRef(null)
  const verifyRef = useRef(null)
  const navigate = useNavigate()
  const email = useLocation().state?.email

  function handleSubmit(event) {
    event.preventDefault()
    const next = {}
    if (password.length < MIN_LENGTH) {
      next.password = `Use at least ${MIN_LENGTH} characters.`
    } else if (verify !== password) {
      next.verify = 'Passwords do not match.'
    }
    setErrors(next)

    if (next.password) {
      passwordRef.current.focus()
    } else if (next.verify) {
      verifyRef.current.focus()
    } else {
      navigate('/signup/payment', { state: { email } })
    }
  }

  return (
    <LightPage>
      <div className="light-column">
        <h1>Create a password to start your membership</h1>
        <p>Just a few more steps and you&apos;re done! We hate paperwork, too.</p>

        <form className="signup-form" onSubmit={handleSubmit} noValidate>
          <div className="signup-field">
            <label htmlFor="signup-password" className="visually-hidden">Password</label>
            <input
              id="signup-password"
              ref={passwordRef}
              type="password"
              autoComplete="new-password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-invalid={errors.password ? 'true' : 'false'}
              aria-describedby={errors.password ? 'signup-password-error' : undefined}
            />
            {errors.password && (
              <p id="signup-password-error" className="signup-error" role="alert">{errors.password}</p>
            )}
          </div>

          <div className="signup-field">
            <label htmlFor="signup-verify" className="visually-hidden">Verify password</label>
            <input
              id="signup-verify"
              ref={verifyRef}
              type="password"
              autoComplete="new-password"
              placeholder="Verify password"
              value={verify}
              onChange={(e) => setVerify(e.target.value)}
              aria-invalid={errors.verify ? 'true' : 'false'}
              aria-describedby={errors.verify ? 'signup-verify-error' : undefined}
            />
            {errors.verify && (
              <p id="signup-verify-error" className="signup-error" role="alert">{errors.verify}</p>
            )}
          </div>

          <button type="submit" className="signup-next">Next</button>
        </form>
      </div>
    </LightPage>
  )
}
