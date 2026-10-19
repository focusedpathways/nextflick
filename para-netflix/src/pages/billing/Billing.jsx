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
// wording. Nothing is charged, and no card number is asked for (that would need a real payment
// provider). The email passes through untouched.
//   onSubmit  optional (address) => Promise<{ error }>; the routes give saveBilling. `address` uses the
//             billing_profiles column names (the form's own field names are translated below).
export default function Billing({
  next,
  back,
  homeTo,
  heading = 'Add your billing address',
  intro = 'This is a demo: nothing is charged. We keep the address with your account.',
  submitLabel = 'Next',
  onSubmit,
}) {
  const navigate = useNavigate()
  const email = useLocation().state?.email

  async function handleValid(values) {
    if (onSubmit) {
      const { error } = await onSubmit({
        street: values.address1.trim(),
        apartment: values.address2.trim() || null,
        city: values.city.trim(),
        state: values.region.trim(),
        zip: values.postal.trim(),
        country: values.country.trim(),
      })
      if (error) return { form: error }
    }
    navigate(next, { state: { email } })
  }

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
      onValid={handleValid}
      submitLabel={submitLabel}
    />
  )
}
