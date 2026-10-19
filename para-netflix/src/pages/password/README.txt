PASSWORD PAGE (folder: src/pages/password/)
===========================================

What this is
  Set a password. In the sign-up flow it is the first step. Route: /signup
  Flow: Landing (email) -> Password -> Contact -> Billing -> Gateway /login -> Browse (home)
  It is a standalone module: the same page can reset or change a password later (see
  src/components/FORM_PAGES.md for how a route reuses it with different wording and a different next page).

What is in this folder
  README.txt        this file, a quick orientation
  USER_JOURNEY.md   the visitor's path through the page: steps, errors, exits
  Password.jsx      the page: two password fields, the password rule, what happens when valid

Shared pieces (src/components/)
  FormStep, FieldForm, LightPage, SiteHeader, Footer, Logo; src/utils/validation.js (MIN_PASSWORD_LENGTH)

The page in one paragraph
  White page, thin grey line under the header, all-red logo, black Sign In. In the middle (440px
  column): "Create a password to start your membership", "Just a few more steps and you're done! We hate
  paperwork, too.", a Password and a Verify password field, and a red square "Next" button. The lower
  third of the screen is grey (the same grey as the header line) and holds the footer.

Rules
  - Password: at least 8 characters, and both fields must match. One message at a time, under the field,
    and focus moves to it.
  - The password is never stored or passed on. Only the email moves to the next step.

Props (set by the route in App.jsx)
  next (required), back, homeTo (where the logo goes; Landing unless the route says /browse), heading,
  intro, submitLabel. Defaults are the sign-up wording.

Try it
  cd para-netflix
  npm run dev          then open http://localhost:5173/signup

More detail: USER_JOURNEY.md here, src/components/FORM_PAGES.md, and the roadmap in README.txt at the root.
