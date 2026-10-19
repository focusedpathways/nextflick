# User journey: Error 403, wrong email or password (`/403`)

**Who:** a visitor whose sign-in was refused.
**Goal:** understand what went wrong and try again.

Code: `src/pages/forbidden/Forbidden.jsx` (the page), `src/components/ShowcasePage.jsx` (the layout shared with Landing and the Gateway).

## How they get here

Intended: the visitor presses **Login** on the Gateway (`/login`) with an email and password that do not match an account, and the app sends them to `/403` with the email in router state.

**Not wired yet, on purpose.** Login is a demo with no stored accounts, so every well-formed email and 8+ character password signs in and nothing is ever refused. Today the page is reachable only by typing `/403`. The junior will connect a database later; the connection point is marked with a TODO in `LoginForm.jsx` (`handleSubmit`): when the check fails, `navigate('/403', { state: { email } })`.

## Steps

1. The visitor sees the same video page as Landing and the Gateway, with a callout: a small **ERROR 403** label, the headline "Wrong email or password", and "We couldn't sign you in with those details. Check them and try again."
2. They press **Try Again** (solid red, right half). The app opens `/login`, with the email they typed already filled in (when it was passed along). The password field is empty.
3. They fix the details and press Login again.

## Forgot password from here

1. They press **Forgot Password** (plain white text, left half).
2. The app opens `/login` with the typed email and a request to start the reset.
3. If the email is known, the page opens already on "Check your email", saying the reset link was sent to it, with a **Resend Link** button. (Demo: no email is really sent.)
4. If no email is known (for example `/403` was opened by hand), the page opens normally, shows "Enter your email above and we will send the reset link to it." and puts the cursor in the Email field. Once they type an email and press Forgot Password, they get the same "Check your email" view.

## Other ways out

- The NextFlick logo in the header: goes to `/` (Landing).
- Below the fold: Featured Films (posters do nothing yet) and the footer, whose email form starts the signup flow at `/signup`.

## What can go wrong

| Situation | What the visitor sees |
|---|---|
| Opened directly at `/403` with no email | The page works. Try Again opens `/login` with the email field empty; Forgot Password opens it asking for an email. |

There is no Sign In link in the header on this page, because Try Again already leads to the sign-in page.

## Exits

- Try Again → `/login` (email in router state when known, never the password).
- Forgot Password → `/login`, showing the reset view (see above).
- Logo → `/`.

## Open questions

- Decided: login keeps accepting every well-formed pair until a database is connected downstream. The page waits, ready to connect.
- Should a real 403 also cover pages that need a login (for example `/browse` when signed out)? Not decided.
- Should "Back to home" return somewhere on the page? It was replaced by Forgot Password at the junior's request; the logo still goes home.
