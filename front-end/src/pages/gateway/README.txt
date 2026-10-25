GATEWAY PAGE (folder: src/pages/gateway/)
=========================================

What this is
  The sign-in page. Route: /login
  You arrive here (1) after creating an account (the Billing step) or (2) by clicking
  Sign In in the Landing page's header.
  Flow: Billing -> Gateway -> Browse (/browse, the home screen; a "coming soon" stand-in until built)
        (Who's Watching is skipped for now)
        Landing "Sign In" -> Gateway

What is in this folder
  README.txt        this file, a quick orientation
  USER_JOURNEY.md   the visitor's path through the page: steps, errors, exits
  Gateway.jsx       the page: the shared showcase layout + a "Welcome back" callout
  LoginForm.jsx     the email + password form (controlled inputs, validation, navigation)
  LoginForm.css     stacks the two fields (the Forgot Password / Login row is the shared .cta-actions
                    layout in src/components/ShowcasePage.css)

Reuse (DRY): the page is the Landing page's layout, not a copy of it
  src/components/ShowcasePage.jsx/.css   the video, fixed header, centered callout, Featured Films
                                         and footer. Landing and Gateway both render it and only
                                         supply what goes inside the callout.
  src/components/EmailCapture.css        the field look and the solid red button. LoginForm uses the
                                         same classes, so "Login" matches "Get Started".
  src/utils/validation.js                EMAIL_PATTERN and MIN_PASSWORD_LENGTH, shared with Landing,
                                         Password, Contact and Billing (one rule, one place).
  SiteHeader has a showSignIn prop; the Gateway turns it off (you are already on the sign-in page).

The page in one paragraph
  Same dark video page as Landing. The callout (640px, no box) says "Welcome back to NextFlick" /
  "Sign in to pick up where you left off.", then an Email field, a Password field and a full-width
  half-width solid red LOGIN button (right-aligned with the fields) with a plain white "Forgot
  Password" button under the left half. The header has the logo only (no Sign In). Featured Films and the
  footer sit below, as on Landing.

Rules (mocked: no backend, no stored accounts)
  - Email must look like name@domain.tld. Password: at least 8 characters (the Password page's rule).
  - Each problem shows an inline message under its field; focus moves to the first bad field.
  - Any valid pair is accepted (there is nothing to check it against) and goes to /browse with
    only the email in router state. The password is never stored or passed on.
  - Forgot Password (mocked, no email is really sent): needs a valid email in the field. Then the
    headline becomes "Check your email", the line says the reset link went to that address, and the
    button becomes "Resend Link" (the line then says "We sent the link again to ..."). With no
    valid email it shows the email error and nothing changes.
    Lifting state up: Gateway.jsx owns the reset state (it writes the headline and line);
    LoginForm reports the request through onForgotPassword and gets resetSent back.
  - Arriving from the 403 page's Forgot Password link (state.forgot): with a usable email the page
    opens already on "Check your email"; without one it shows the email error and focuses the field.
  - The email arrives filled in when you come from the Billing step; blank from Landing's link.

Try it
  cd para-netflix
  npm run dev          then open http://localhost:5173/login

More detail: USER_JOURNEY.md in this folder, and the roadmap in README.txt at the project root.
