# User journey: Gateway, sign in (`/login`)

**Who:** a member who just finished creating an account, or a returning visitor who clicked Sign In on the Landing page.
**Goal:** sign in with an email and a password.

Code: `src/pages/gateway/Gateway.jsx` (the page), `src/pages/gateway/LoginForm.jsx` (the form),
`src/components/ShowcasePage.jsx` (the layout shared with Landing).

## Steps

1. The visitor arrives from one of three places:
   - **Billing step (the last step of signing up):** the email they used to sign up is already filled in.
   - **Landing's Sign In link:** the email field is empty.
   - **The 403 page's Forgot Password link:** the page opens on "Check your email" for the typed email (or asks for an email if none came along).
2. They see the same video page as Landing, with the callout "Welcome back to NextFlick" and "Sign in to pick up where you left off."
3. They type an **Email address** and a **Password**, then press **Login** (solid red like Landing's Get Started, half the width of the fields, aligned to their right edge).
4. If both are valid, the app opens `/browse` (the home screen) and carries only the email along. (Who's Watching is skipped for now.)

## Forgot password

1. Under the left half of the form, white text: **Forgot Password**.
2. They type their email (if it is empty or invalid, they get the email error and nothing else changes), then press it.
3. The headline becomes "Check your email" and the line says a reset link was sent to that address and to open it, choose a new password, then sign in here. (Demo: no email is really sent.)
4. The button becomes **Resend Link**. Pressing it again changes the line to "We sent the link again to ...".
5. The login fields stay on the page, so they can sign in as soon as they have a password.

## What can go wrong

| Situation | What the visitor sees |
|---|---|
| Email empty or not shaped like `name@domain.tld` | "Please enter a valid email address, like name@example.com." Focus moves to Email. |
| Password empty | "Please enter your password." |
| Forgot Password pressed with no valid email | "Enter your email above and we will send the reset link to it." Focus moves to Email. |
| Password shorter than 8 characters | "Passwords are at least 8 characters long." |
| Both are wrong | Both messages show; focus goes to Email first. |
| Email has spaces around it | Trimmed before checking, so it is accepted. |

This is a demo with no accounts to check against, so any well-formed email and an 8+ character password signs in.

## The header

The header shows the logo only. There is no Sign In link here, because this is the sign-in page. The logo goes back to `/`.

## Exits

- Valid login → `/browse` (the home screen; not built yet, so a "coming soon" stand-in shows).
- Logo → `/` (Landing).
- Below the fold: Featured Films (posters do nothing yet) and the footer with the "create or restart your membership" email form, which starts the signup flow at `/signup`.

## Open questions

- Should there be a "Remember me" box? Not built.
- Should the reset link lead to a real page (set a new password)? Not built; the link is only described.
- Should a wrong password ever be rejected? Needs stored accounts (localStorage) to be meaningful.
- Should the footer's signup prompt stay on this page?
