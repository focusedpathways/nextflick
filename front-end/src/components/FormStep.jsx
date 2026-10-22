import { Link } from 'react-router-dom'
import LightPage from './LightPage.jsx'
import FieldForm from './FieldForm.jsx'
import './FormStep.css'

// One step of the account forms on the white layout: headline, a line of explanation, the form,
// and an optional Back link. The Password, Contact and Billing pages are each a FormStep with
// their own fields, so the look lives here once and a page only decides what it asks for.
//   back / backState   where Back goes (and what it carries); no Back link when `back` is missing
//   homeTo             where the header logo goes (Landing by default; '/browse' once signed in);
//                      it carries the same state as Back (the email)
//   ...form            everything else goes to FieldForm (idPrefix, fields, validate, onValid ...)
export default function FormStep({ heading, intro, back, backState, homeTo, ...form }) {
  return (
    <LightPage homeTo={homeTo} homeState={backState}>
      <div className="light-column">
        <h1>{heading}</h1>
        <p>{intro}</p>

        <FieldForm {...form} />

        {back && (
          <Link to={back} state={backState} className="form-step__back">Back</Link>
        )}
      </div>
    </LightPage>
  )
}
