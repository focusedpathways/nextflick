import { useLocation, useNavigate } from 'react-router-dom'
import FormStep from '../../components/FormStep.jsx'
import { MIN_PASSWORD_LENGTH } from '../../utils/validation.js'

const FIELDS = [
  { name: 'password', label: 'Password', type: 'password', autoComplete: 'new-password' },
  { name: 'verify', label: 'Verify password', type: 'password', autoComplete: 'new-password' },
]

// Checked in this order: too short first, then the two must match. One message at a time.
function validate({ password, verify }) {
  if (password.length < MIN_PASSWORD_LENGTH) {
    return { password: `Use at least ${MIN_PASSWORD_LENGTH} characters.` }
  }
  if (verify !== password) return { verify: 'Passwords do not match.' }
  return {}
}

// The password page: set a password. It knows nothing about WHERE it sits in a flow; the route
// says what comes next (`next`), where Back goes (`back`) and, if the wording should differ,
// the headline/line/button. The same page serves signing up and, later, resetting or changing a
// password. The password is checked and dropped: never stored, never passed on. Only the email
// (which arrived in router state) goes forward.
export default function Password({
  next,
  back,
  homeTo,
  heading = 'Create a password to start your membership',
  intro = "Just a few more steps and you're done! We hate paperwork, too.",
  submitLabel = 'Next',
}) {
  const navigate = useNavigate()
  const email = useLocation().state?.email

  return (
    <FormStep
      heading={heading}
      intro={intro}
      back={back}
      homeTo={homeTo}
      backState={{ email }}
      idPrefix="password"
      fields={FIELDS}
      validate={validate}
      onValid={() => navigate(next, { state: { email } })}
      submitLabel={submitLabel}
    />
  )
}
