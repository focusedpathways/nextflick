ERROR 403 PAGE (folder: src/pages/forbidden/)
=============================================

What this is
  The "Wrong email or password" error page. Route: /403
  It is where a refused sign-in belongs. Its two actions: Try Again -> /login, Forgot Password -> /login opened in its "reset link sent" view.

STATUS: built and ready to connect. Reachable at /403, but nothing sends visitors to it yet, on purpose
  (junior's decision): login is mocked and accepts any well-formed email + 8+ character password, so no
  sign-in is ever "wrong". The junior will connect databases downstream; until then the page just has
  to exist.
  TO CONNECT (later): in src/pages/gateway/LoginForm.jsx, handleSubmit, where the real credential
  check goes (marked with a TODO), call navigate('/403', { state: { email } }) when the pair does not
  match an account. Nothing in this page needs to change.

What is in this folder
  README.txt        this file, a quick orientation
  USER_JOURNEY.md   how a visitor reaches the page and where they go from it
  Forbidden.jsx     the page: the shared showcase layout + the error callout
  Forbidden.css     the small "ERROR 403" label and the spacing under the text

Reuse (DRY): nothing is copied from the Gateway or Landing
  src/components/ShowcasePage.jsx/.css   video, header, callout, Featured Films, footer. The shared
                                         .cta-actions row (white text action at the left, red button
                                         filling the right half) and .cta-link now live here, and the
                                         Gateway's Forgot Password / Login row uses them too.
  src/components/EmailCapture.css        the solid red button look (Try Again is a <Link> with it)
  SiteHeader showSignIn={false}          no Sign In link, as on the Gateway

The page in one paragraph
  Same dark video page as Landing and the Gateway. The callout (640px, no box): a small muted
  "ERROR 403" label, the headline "Wrong email or password", the line "We couldn't sign you in with
  those details. Check them and try again.", then two halves: "Forgot Password" in plain white text at
  the left and a solid red TRY AGAIN button filling the right half (right-aligned with the text
  above). Featured Films and the footer sit below, as on the other two pages.

Behavior
  - Try Again opens /login. If the email that was typed is passed along in router state
    (state.email), the Gateway shows it already filled in. The password is never carried.
  - Forgot Password opens /login with state { email, forgot: true }. The Gateway (there is no
    separate forgot-password page; that flow is the Gateway's "Check your email" view) then opens
    already showing "Check your email" for that address, with the button as "Resend Link". If no
    usable email came along, it opens normally with the email error and the cursor in the Email
    field. Opened by hand at /403 there is no email, so you get that second case.
  - The label is muted silver, not red: red is reserved for actions.

Try it
  cd para-netflix
  npm run dev          then open http://localhost:5173/403

More detail: USER_JOURNEY.md in this folder, and the roadmap in README.txt at the project root.
