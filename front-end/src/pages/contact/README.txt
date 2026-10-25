CONTACT PAGE (folder: src/pages/contact/)
=========================================

What this is
  Name, email and phone. In the sign-up flow it is the second step. Route: /signup/contact
  Flow: Landing (email) -> Password -> Contact -> Billing -> Gateway /login
  A standalone module: the same page can update contact details later (see src/components/FORM_PAGES.md).

What is in this folder
  README.txt        this file, a quick orientation
  USER_JOURNEY.md   the visitor's path through the page: steps, errors, exits
  Contact.jsx       the page: the three fields, their rules, what happens when valid

Shared pieces (src/components/)
  FormStep, FieldForm, LightPage, SiteHeader, Footer, Logo; src/utils/validation.js (EMAIL_PATTERN, validateRequired)

The page in one paragraph
  Same white layout as the Password page. "How can we reach you?", "This is a demo. Nothing you type
  here is saved.", then Full name, Email (already filled in from Landing) and Phone number, a red
  square "Next" button, and a Back link.

Rules
  - Full name, Email and Phone are all required.
  - Email must look like name@domain.tld. Phone needs at least 7 digits (spaces and dashes are fine).
  - Each problem shows under its field; focus moves to the first bad one.
  - Nothing is saved. If the email was edited, the edited address is the one carried forward.

Props (set by the route in App.jsx)
  next (required), back, homeTo (where the logo goes; Landing unless the route says /browse), heading,
  intro, submitLabel. Defaults are the sign-up wording.

Try it
  cd para-netflix
  npm run dev          then open http://localhost:5173/signup/contact

More detail: USER_JOURNEY.md here, src/components/FORM_PAGES.md, and the roadmap in README.txt at the root.
