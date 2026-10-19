import { useLocation, useNavigate } from 'react-router-dom'
import FormStep from '../../components/FormStep.jsx'
import { validateRequired } from '../../utils/validation.js'

const FIELDS = [
  { name: 'address1', label: 'Billing address', autoComplete: 'address-line1', required: true },
  { name: 'address2', label: 'Apartment, suite, etc. (optional)', autoComplete: 'address-line2' },
  { name: 'city', label: 'City', autoComplete: 'address-level2', required: true },
  { name: 'region', label: 'State or region', autoComplete: 'address-level1', required: true },
  { name: 'postal', label: 'Postal code', autoComplete: 'postal-code', required: true },
  { name: 'country', label: 'Country', autoComplete: 'country-name', required: true },
]

// The billing page: where the bill goes. It sets up a new account today and is the page to reuse
// for updating billing information later: the route supplies `next`, `back` and any different
// wording. Demo only: nothing is charged and nothing is saved. No card number is asked for (that
// would need a real payment provider). The email passes through untouched.
export default function Billing({
  next,
  back,
  homeTo,
  heading = 'Add your billing address',
  intro = 'This is a demo. Nothing is charged, and nothing you type here is saved.',
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
      idPrefix="billing"
      fields={FIELDS}
      validate={(values) => validateRequired(FIELDS, values)}
      onValid={() => navigate(next, { state: { email } })}
      submitLabel={submitLabel}
    />
  )
}
