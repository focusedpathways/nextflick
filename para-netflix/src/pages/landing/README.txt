LANDING PAGE (folder: src/pages/landing/)
=========================================

What this is
  The front door. Route: /
  A visitor types an email and presses Get Started, or clicks Sign In. Landing is the template
  the Gateway (/login) and the 403 page reuse.

What is in this folder
  README.txt        this file, a quick orientation
  USER_JOURNEY.md   the visitor's path through the page: steps, errors, exits
  Landing.jsx       the page: the "Join now" callout, inside the shared showcase layout

Reuse (DRY)
  src/components/ShowcasePage.jsx/.css   video, fixed header, callout area, Featured Films, footer
  src/components/EmailCapture.jsx/.css   the email field + GET STARTED button (used twice on this page)
  src/components/SiteHeader, FeaturedRow, PosterCard, Footer, Logo, BackgroundVideo
  src/utils/validation.js                EMAIL_PATTERN

The page in one paragraph
  A looping video fills the screen under a fixed header (silver logo at the left, red "Sign In" at the
  right). A boxless callout, centered below the header: "Join now for the best access to your favorite
  shows and movies", "Ready to watch? Enter your email to get started.", a translucent email field and a
  solid red GET STARTED button. Scrolling down: Featured Films (the Top 10: ten ranked posters, the first ten
  films in src/data/titles.json via topTen() in src/utils/recommend.js) and the footer.

Rules
  - The email must look like name@domain.tld, else an inline error shows.
  - A valid email opens /signup (the Password page) and carries the email in router state.

Try it
  cd para-netflix
  npm run dev          then open http://localhost:5173/

More detail: USER_JOURNEY.md here, and the roadmap and decisions log in README.txt at the project root.
