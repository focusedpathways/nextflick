# User journey: Password (`/signup`)

**Who:** a visitor who just entered an email on the Landing page (or, in a later flow, a member resetting or changing their password).
**Goal:** set a password.

Code: `src/pages/password/Password.jsx` (the page), `src/components/FormStep.jsx` and `FieldForm.jsx` (layout and form), `src/components/LightPage.jsx` (white layout with header and footer).

## Steps

1. The visitor arrives from Landing with their email already known (it comes in router state; it is not shown on this page).
2. They read "Create a password to start your membership" and "Just a few more steps and you're done! We hate paperwork, too."
3. They type a **Password** and type it again in **Verify password**.
4. They press **Next**. If both checks pass, the app creates their account in Supabase (`supabase.auth.signUp`, via `src/services/auth.js`); the button is dimmed while it works. When the account is created, the app opens `/signup/contact` and carries only the email along.

## Rules the page checks

- The password has at least **8 characters**.
- The two passwords **match**.
- The password is checked here, sent to Supabase to create the account, and then dropped. The app never stores it or passes it to another page.

## What can go wrong

| Situation | What the visitor sees |
|---|---|
| Password shorter than 8 characters | Message under Password: "Use at least 8 characters." Focus moves to the Password field. |
| Password is long enough but Verify does not match | Message under Verify password: "Passwords do not match." Focus moves to the Verify field. |
| Both fields empty and Next pressed | Same as the first row (Password is checked first, so its message shows). |
| Opened directly at `/signup` with no email | The page renders. Next shows "We need your email first. Go to the home page and enter it to begin." and does not create an account. |
| That email already has an account | Above the button: "An account with this email already exists. Try signing in instead." The visitor stays on the page. |
| Supabase says the password is too weak | Above the button: "That password is too weak. Try a longer one with letters and numbers." |
| Too many attempts, sign-ups turned off, or no connection | Above the button: a short matching message (or "We could not create your account. Please try again."). |

## Exits

- Valid password → `/signup/contact` (email only, no password). Where "next" leads is set by the route, not by this page.
- No Back link: this is the first step.
- Sign In (black, top right) → `/login` (the Gateway).
- The header's NextFlick logo → `/`.

## Reuse

The same page serves other journeys by changing the route's props: for example a reset page with "Create a new password" and `next="/login"`, or an account page with "Change your password" and a Save button. See `src/components/FORM_PAGES.md`.

## Open questions

- Should the page show the visitor's email, so they know which account this is for?
- Should the password rule be stronger than "8 characters" (for example, a letter and a number)? Currently 8 characters only.
- For a change-password use, should it also ask for the current password? Not built.

## Junior's notes (carried over unchanged from the old Signup journey)

- As the user, I want to be able to create a password so that my billing information is secure
- As the user, I want to be able to create a password so that my contact information is secure
- As the user, I want to be able to create a password so that my viewing preferences are kept private
- The page should use the email passed to it from the get started CTA on the landing page
- The user should click on the 
