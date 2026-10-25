BILLING PAGE (folder: src/pages/billing/)
=========================================

What this is
  The billing address. In the sign-up flow it is the last step before signing in. Route: /signup/billing
  Flow: Landing (email) -> Password -> Contact -> Billing -> Gateway /login
  A standalone module: the same page updates billing information later (see src/components/FORM_PAGES.md).

What is in this folder
  README.txt        this file, a quick orientation
  USER_JOURNEY.md   the visitor's path through the page: steps, errors, exits
  Billing.jsx       the page: the six address fields, their rule, what happens when valid

Shared pieces (src/components/)
  FormStep, FieldForm, LightPage, SiteHeader, Footer, Logo; src/utils/validation.js (validateRequired)

The page in one paragraph
  Same white layout as the other form pages. "Add your billing address", "This is a demo. Nothing is
  charged, and nothing you type here is saved.", then Billing address, Apartment/suite (optional),
  City, State or region, Postal code and Country, a red square "Next" button, and a Back link.

Rules
  - Every field is required except Apartment, suite, etc.
  - Each problem shows under its field ("This field is required."); focus moves to the first bad one.
  - Nothing is charged and nothing is saved. No card number is asked for: that needs a real payment
    provider and is out of scope for the demo.

Props (set by the route in App.jsx)
  next (required), back, homeTo (where the logo goes; Landing unless the route says /browse), heading,
  intro, submitLabel. Defaults are the sign-up wording.

Try it
  cd para-netflix
  npm run dev          then open http://localhost:5173/signup/billing

More detail: USER_JOURNEY.md here, src/components/FORM_PAGES.md, and the roadmap in README.txt at the root.
