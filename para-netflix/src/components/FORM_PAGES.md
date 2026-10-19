# Form pages: how Password, Contact and Billing are built

The account forms are three separate, reusable pages. Each is a small file that says only what it
asks for; the look and the form logic are shared.

```
App.jsx route  ->  Password / Contact / Billing  ->  FormStep  ->  LightPage + FieldForm
(the flow)         (what to ask, the rules)         (layout)       (header/footer, the inputs)
```

| Piece | File | Job |
|---|---|---|
| `LightPage` | `components/LightPage.jsx/.css` | White page: header with a thin grey line, centered content, grey footer filling the bottom third |
| `FormStep` | `components/FormStep.jsx/.css` | One step on that page: headline, a line of text, the form, an optional Back link |
| `FieldForm` | `components/FieldForm.jsx/.css` | Draws a form from a list of fields. Owns the typed values, the errors, "focus the first bad field" and the submit button |
| `validation.js` | `utils/validation.js` | The rules shared across pages: `EMAIL_PATTERN`, `MIN_PASSWORD_LENGTH`, `validateRequired` |
| `Password`, `Contact`, `Billing` | `pages/<name>/` | A field list, the page's own rules, and what happens when the form is valid |

## The pages do not know where they sit

A page never says "after me comes X". The route does, through props:

| Prop | Meaning | Default |
|---|---|---|
| `next` (required) | where to go when the form is valid | none |
| `back` | where the Back link goes; no link when missing | none |
| `heading`, `intro` | the words above the form | the wording for signing up |
| `submitLabel` | the button's label | `Next` |
| `homeTo` | where the header logo goes (it carries the email, like Back) | `/` (Landing) |

Signing up is set in `App.jsx`:

```jsx
<Route path="/signup"         element={<Password next="/signup/contact" />} />
<Route path="/signup/contact" element={<Contact  next="/signup/billing" back="/signup" />} />
<Route path="/signup/billing" element={<Billing  next="/login" back="/signup/contact" />} />
```

Reusing a page elsewhere is one more route with different props, for example (later, in the
account area):

```jsx
<Route path="/account/billing" element={
  <Billing next="/account" back="/account" heading="Update your billing address" submitLabel="Save" />
} />
<Route path="/reset-password" element={
  <Password next="/login" heading="Create a new password" intro="Choose a password you have not used before." submitLabel="Save password" />
} />
```

## Rules of the road

- **Only the email travels** between steps, in router state. The password is checked and dropped.
  Names, phone numbers and addresses are not forwarded or stored either (demo, no backend).
- **Back keeps the email**, so a step is still filled in when you come back to it.
- **Adding a page** (for example, viewing preferences): write a field list and a `validate`
  function, render `FormStep`, and add a route. No new CSS is needed.
- The look is in one place: `FieldForm.css` (fields 50px tall, 1px `#8c8c8c` border, square
  corners; red 56px square submit button) and `LightPage.css` (the 440px centered column).

## The account dropdown

These pages are the items in the account menu at the header's top right on the home screen
(`src/components/MemberHeader.jsx`). They are mounted again in `App.jsx` at `/account/password`,
`/account/contact` and `/account/billing`, with "Change/Update ..." wording, a Save button and
`next`/`back`/`homeTo` pointing to `/browse` (so on these pages the logo leads home, not to Landing). The pages themselves did not change.

Still missing: `AuthContext` (to know who is signed in and to protect these routes). Until then they
show the white sign-up header with "Sign In".
