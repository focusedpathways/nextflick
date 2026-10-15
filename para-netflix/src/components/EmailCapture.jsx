import { useId, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './EmailCapture.css'

// something@domain.tld: no spaces, one @, a dot in the domain, 2+ letter TLD
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// The "enter your email, Get Started" form. Used twice on the Landing page (the hero
// callout and the footer), so validation lives here once. A valid email goes to /signup
// and is passed along in router state. `variant` only changes the look: "hero" is
// translucent over the video, "footer" is solid like the rest of the page below the fold.
export default function EmailCapture({ variant = 'hero' }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const id = useId()   // unique ids, because two of these forms are on the same page

  function handleSubmit(event) {
    event.preventDefault()
    const trimmed = email.trim()
    if (!EMAIL_PATTERN.test(trimmed)) {
      setError('Please enter a valid email address, like name@example.com.')
      return
    }
    setError('')
    navigate('/signup', { state: { email: trimmed } })
  }

  return (
    <form className={`email-capture email-capture--${variant}`} onSubmit={handleSubmit} noValidate>
      <div className="email-capture__row">
        <label htmlFor={`${id}-email`} className="visually-hidden">Email address</label>
        <input
          id={`${id}-email`}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <button type="submit" className="email-capture__btn">
          Get Started <span aria-hidden="true">&rarr;</span>
        </button>
      </div>

      {error && (
        <p id={`${id}-error`} className="email-capture__error" role="alert">{error}</p>
      )}
    </form>
  )
}
