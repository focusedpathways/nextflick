// Form rules shared by more than one page, so each rule lives in exactly one place.

// something@domain.tld: no spaces, one @, a dot in the domain, 2+ letter TLD
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// The shortest password the demo accepts (the Password page sets it, Login checks the same rule)
export const MIN_PASSWORD_LENGTH = 8

// For form pages: { fieldName: message } for every required field that is empty.
// `fields` is the same list the form is drawn from (each entry may have required: true).
export function validateRequired(fields, values) {
  const errors = {}
  for (const field of fields) {
    if (field.required && !values[field.name].trim()) {
      errors[field.name] = 'This field is required.'
    }
  }
  return errors
}
