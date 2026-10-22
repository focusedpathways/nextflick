# User journey: Contact (`/signup/contact`)

**Who:** a visitor who has just set a password (or, in a later flow, a member updating their contact details).
**Goal:** tell NextFlick how to reach them.

Code: `src/pages/contact/Contact.jsx` (the page and its rules), `src/components/FormStep.jsx` and `FieldForm.jsx`.

**Demo only.** Nothing is saved. Values live in the page's memory and are lost when the visitor leaves.

## Steps

1. The visitor arrives from the Password page. The **Email** field is already filled in with the address they typed on Landing.
2. They read "How can we reach you?" and "This is a demo. Nothing you type here is saved."
3. They fill in **Full name** and **Phone number**, and change the email if it is wrong.
4. They press **Next**. If everything is fine, the app opens `/signup/billing` and carries the email along (the edited one, if they changed it).

## What can go wrong

| Situation | What the visitor sees |
|---|---|
| A field is empty | "This field is required." under that field. Focus moves to the first bad field. |
| Email is not shaped like `name@domain.tld` | "Enter an email like name@example.com." |
| Phone has fewer than 7 digits | "Enter a phone number with at least 7 digits." (Digits only are counted, so spaces and dashes are fine.) |
| Opened directly at `/signup/contact` with no email | The page works, with the email field empty. |

## Exits

- Valid form → `/signup/billing` (email only in router state). Where "next" leads is set by the route.
- **Back** (under the form) → `/signup`. The email is carried back, so it is not lost.
- Sign In (black, top right) → `/login`. The logo → `/`.

## Reuse

The same page can update contact details: mount it at another route with `heading="Update your contact details"`, `submitLabel="Save"` and `next` pointing back to the account area. See `src/components/FORM_PAGES.md`.

## Open questions

- Should Phone be optional? Currently required, as it was on the old combined form.
- Should the page show which fields are required? Currently only the error tells them.
- Order of the sign-up steps (Password, Contact, Billing) was my default; the route in `App.jsx` can reorder them.
