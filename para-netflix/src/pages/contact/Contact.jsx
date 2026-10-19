import { useLocation, useNavigate } from 'react-router-dom'
import FormStep from '../../components/FormStep.jsx'
import { EMAIL_PATTERN, validateRequired } from '../../utils/validation.js'

const FIELDS = [
  { name: 'fullName', label: 'Full name', autoComplete: 'name', required: true },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', required: true },
  { name: 'phone', label: 'Phone number', type: 'tel', autoComplete: 'tel', required: true },
]

function validate(values) {
  const errors = validateRequired(FIELDS, values)
  if (!errors.email && !EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Enter an email like name@example.com.'
  }
  if (!errors.phone && values.phone.replace(/\D/g, '').length < 7) {
    errors.phone = 'Enter a phone number with at least 7 digits.'
  }
  return errors
}

// The contact page: name, email, phone. Like the other form pages it does not know its place in a
// flow: the route supplies `next`, `back` and any different wording, so the same page can set up
// a new account or update contact details later. The email starts filled in from router state
// (typed on Landing) and, if edited, the edited address goes forward.
//   onSubmit  optional ({ name, phone }) => Promise<{ error }>; the routes give saveContact, which saves
//             them to the member's account. A message in `error` is shown instead of moving on.
//             The email is not saved here: it stays the address the member signs in with.
export default function Contact({
  next,
  back,
  homeTo,
  heading = 'How can we reach you?',
  intro = 'We will use these details to reach you about your account.',
  submitLabel = 'Next',
  onSubmit,
}) {
  const navigate = useNavigate()
  const email = useLocation().state?.email ?? ''

  async function handleValid(values) {
    if (onSubmit) {
      const { error } = await onSubmit({ name: values.fullName.trim(), phone: values.phone.trim() })
      if (error) return { form: error }
    }
    navigate(next, { state: { email: values.email.trim() } })
  }

  return (
    <FormStep
      heading={heading}
      intro={intro}
      back={back}
      homeTo={homeTo}
      backState={{ email }}
      idPrefix="contact"
      fields={FIELDS}
      initialValues={{ email }}
      validate={validate}
      onValid={handleValid}
      submitLabel={submitLabel}
    />
  )
}
