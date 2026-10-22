# User journey: Billing (`/signup/billing`)

**Who:** a visitor who has just given their contact details (or, in a later flow, a member updating their billing information).
**Goal:** say where the bill goes, and finish setting up the account.

Code: `src/pages/billing/Billing.jsx` (the page and its rule), `src/components/FormStep.jsx` and `FieldForm.jsx`.

**Demo only.** Nothing is charged, and nothing is saved. Values live in the page's memory and are lost when the visitor leaves.

## Steps

1. The visitor arrives from the Contact page.
2. They read "Add your billing address" and "This is a demo. Nothing is charged, and nothing you type here is saved."
3. They fill in the fields:
   - **Billing address** (required)
   - **Apartment, suite, etc.** (optional)
   - **City** (required)
   - **State or region** (required)
   - **Postal code** (required)
   - **Country** (required)
4. They press **Next**. If everything is fine, the app opens the Gateway (`/login`) with the email carried along, so the new member can sign in.

## What can go wrong

| Situation | What the visitor sees |
|---|---|
| A required field is empty | "This field is required." under that field. Focus moves to the first bad field. |
| Opened directly at `/signup/billing` | The page works; the email is simply not carried on. |

## Exits

- Valid form → `/login` (the Gateway), email only in router state. Where "next" leads is set by the route.
- **Back** (under the form) → `/signup/contact`, carrying the email.
- Sign In (black, top right) → `/login`. The logo → `/`.

## Reuse

The same page updates billing information: mount it at another route with `heading="Update your billing address"`, `submitLabel="Save"` and `next` pointing back to the account area. See `src/components/FORM_PAGES.md`.

## Open questions

- Should there be a card number step? It would need a real payment provider; out of scope for the demo.
- Should the page show a "Billing information" summary of the saved address when updating? Not built (nothing is saved).
