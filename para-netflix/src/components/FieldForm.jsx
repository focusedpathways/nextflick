import { useState } from 'react'
import './FieldForm.css'

// A form drawn from a list of fields: the Password, Contact and Billing pages are all this
// component with a different list. It owns what the page should not repeat: the values (controlled
// inputs), the errors, "focus the first bad field", and the submit button.
//
//   idPrefix      keeps element ids unique per page (e.g. "contact" -> id "contact-email")
//   fields        [{ name, label, type?, autoComplete?, required? }] in the order shown
//   initialValues { name: 'starting text' } for fields that start filled in
//   validate      (values) => { name: 'message' }; an empty object means everything is fine
//   onValid       (values) => runs once, only when validate found nothing wrong
export default function FieldForm({
  idPrefix,
  fields,
  initialValues = {},
  validate,
  onValid,
  submitLabel = 'Next',
}) {
  const [values, setValues] = useState(() =>
    Object.fromEntries(fields.map((f) => [f.name, initialValues[f.name] ?? ''])),
  )
  const [errors, setErrors] = useState({})
  const idOf = (name) => `${idPrefix}-${name}`

  function handleSubmit(event) {
    event.preventDefault()
    const found = validate(values)
    setErrors(found)
    const firstBad = fields.find((f) => found[f.name])
    if (firstBad) {
      document.getElementById(idOf(firstBad.name)).focus()
    } else {
      onValid(values)
    }
  }

  return (
    <form className="field-form" onSubmit={handleSubmit} noValidate>
      {fields.map((field) => {
        const id = idOf(field.name)
        const errorId = `${id}-error`
        return (
          <div className="field-form__field" key={field.name}>
            <label htmlFor={id} className="visually-hidden">{field.label}</label>
            <input
              id={id}
              type={field.type ?? 'text'}
              autoComplete={field.autoComplete}
              placeholder={field.label}
              value={values[field.name]}
              onChange={(e) => setValues((current) => ({ ...current, [field.name]: e.target.value }))}
              aria-invalid={errors[field.name] ? 'true' : 'false'}
              aria-describedby={errors[field.name] ? errorId : undefined}
            />
            {errors[field.name] && (
              <p id={errorId} className="field-form__error" role="alert">{errors[field.name]}</p>
            )}
          </div>
        )
      })}

      <button type="submit" className="field-form__submit">{submitLabel}</button>
    </form>
  )
}
