NEXTFLICK ROADMAP  (repo folder: para-netflix)
==============================================
Rule: one page at a time. A page is done only when the junior signs off.
Target: desktop only for now.

STATUS KEY:  [ ] not started   [~] in progress   [x] approved   [-] skipped for now

SETUP
[x] 0. react-router-dom installed, folder skeleton, Vite template leftovers removed

PAGES
[x] 1. Landing        /          APPROVED by the junior, committed on branch landing-page
[x] 2. Signup         /signup    APPROVED by the junior ("looks good"), committed on landing-page.
                                 REWORKED (junior): split into three modular pages, see 2b.
[x] 2b. Password, Contact, Billing  /signup, /signup/contact, /signup/billing   APPROVED (junior moved on).
                                 Each page has its own folder + README.txt + USER_JOURNEY.md; shared
                                 form system documented in src/components/FORM_PAGES.md. Meant to become
                                 the account dropdown items later (needs AuthContext + Browse header).
[x] 3. Login/Gateway  /login     email + password on Landing's layout (ShowcasePage). APPROVED. Docs: src/pages/gateway/README.txt, USER_JOURNEY.md
[x] 3b. Error 403    /403       "Wrong email or password" page. APPROVED; not linked from
                                 login yet by design (database comes later, TODO in LoginForm.jsx). Docs: src/pages/forbidden/
[-] 4. Who's Watching /profiles  SKIPPED for now (junior). Profile picker, active profile in AuthContext.
                                 No route exists. Revisit after Browse; login goes straight to /browse.
[~] 5. Browse (home)  /browse    IN PROGRESS. HEADER + HERO BUILT, awaiting audit (logo, tabs, white search,
                                 bell + profile dropdowns; feature card). Next: discuss dropdowns, then
                                 three thumbnail rows. Docs: src/pages/browse/README.txt, USER_JOURNEY.md
                                 (reference: Netflix rows screenshot, landscape
                                 poster tiles with titles baked into the art)
[~] 6. Title popup / More Info  (pop-up on /browse)  IN PROGRESS, built with the junior step by step. Shell + HERO
                                 SECTION, DETAILS and MORE LIKE THIS built (poster + glow, title, Play, My List, Like, X; year, running time, rating + reason, summary, cast, genres; a 3 x 2 grid of similar films that switches the pop-up when pressed); an IMDb link
                                 (facts, synopsis, cast, more like this) are next. Docs: src/components/moreinfo/
[~] 6d. Play / Watch      /watch/:id  BUILT, awaiting sign-off: Play opens a demo player PAGE (stand-in footage, clock, progress
                                 bar, Back); what is played makes Continue Watching real. Docs: src/pages/watch/
[~] 6c. Shows / Movies filter  (the home page, ?type=show / ?type=movie)  BUILT, awaiting sign-off: the tabs wear the
                                 pill like My NextFlick does and filter the hero and the rows. 11 TV shows added
                                 from IMDb so Shows has content. Docs: pages/browse/README.txt
[~] 6b. My NextFlick   /my-nextflick  BUILT, awaiting sign-off: same header (pill on My NextFlick), the Continue
                                 Watching row (reused), then My List (films whose + was pressed in a More Info
                                 pop-up, saved in the browser). Docs: src/pages/mynextflick/
[ ] 7. Final          polish across pages, Playwright QA, lint, build

PER-PAGE LOOP
a) Propose 2-3 layout options, junior picks
b) Build components
c) View in browser
d) Junior approves or requests changes
e) Tick the box above and log decisions below

RUN IT
  cd para-netflix
  npm install        (first time only)
  npm run dev        then open http://localhost:5173/   (not index.html directly)
  npm run lint
  npm run build

----------------------------------------------------------------------
LANDING PAGE: CURRENT STATE (page 1)
----------------------------------------------------------------------
Files
  src/pages/Landing.jsx                   page (the callout; layout is in components/ShowcasePage)
  src/components/EmailCapture.jsx/.css    email field + Get Started (used by the callout AND the footer)
  src/components/Footer.jsx/.css          footer strip below Featured Films
  src/components/FeaturedRow.jsx/.css     "Featured Films" row below the fold
  src/components/PosterCard.jsx/.css      poster drawn in CSS (reused on Browse later)
  src/data/titles.json                    the 37 titles: 26 movies + 11 TV shows (type, genres, year, runtime/seasons, rating, cast, poster, IMDb link, synopsis)
  src/components/Logo.jsx, Logo.css       logo (SVG drawn in code) + wordmark
  src/components/BackgroundVideo.jsx/.css full-screen video, poster fallback
  src/index.css                           colors (tokens), --gutter, base reset
  public/videos/landing-loop.mp4          background montage (about 3 MB)
  public/images/landing-poster.jpg        still shown if the video fails

What is on the page
  - Brand: NextFlick. Dark cool/metallic look; Netflix red (#e50914, --cta) is
    the only warm color and is used for actions.
  - Top nav bar (full width, dark gradient + soft blur):
      left  = logo = ONE svg: flat film reel (4 holes + hub) + wide squared NEXTFLICK wordmark + a bar that grows out of the reel and runs under the word
      right = "Sign In" link, red text only, goes to /login
      Logo and Sign In share the same side margin (--gutter, 3rem).
  - Center callout, centered on the screen, 640px wide, NO box (no background,
    border, blur or shadow; text floats over the video with a soft text shadow and
    a faint feathered darkening behind it):
      text is LEFT-aligned: headline and sub-line start at the email field's left edge
      headline "Join now for the best access to your favorite shows and movies"
      line "Ready to watch? Enter your email to get started."
      semi-transparent square email field + GET STARTED -> button: solid Netflix
      red, white uppercase text, square corners, same height as the field
      Email must look like name@domain.tld, else an inline error shows.
      A valid email goes to /signup and is passed along in router state.
  - Below the fold (scroll down): "Featured Films" row, modeled on the junior's
    "Trending Now" reference screenshot: heading, a horizontally scrolling strip of
    10 tall poster cards with a big outlined rank number overlapping each card's
    lower-left corner, and arrow buttons at the strip's edges (each shows only when
    there is more to scroll that way).
    FLUID + INSET (junior): posters are 1/3 smaller than the first version
    (236px -> 158px on a 1728px-wide window) and the strip is inset from both
    screen edges, clipping cards at its boundary. Two CSS numbers in
    FeaturedRow.css drive everything and follow the window width:
      --w            poster width = 9.14vw, clamped 110px..240px
      --strip-margin side margin   = 6vw,   clamped 1.5rem..8rem
    Gaps, rank numbers, text on the posters and the arrows all scale from --w.
    Posters are original and drawn in CSS (fictional titles, one gradient + shape
    per film, genre tag and title at the top, year at the bottom right). The
    section is opaque and fades in from the video above.
  - Footer strip (below Featured Films), modeled on the junior's footer screenshot:
      closing prompt "Ready to watch? Enter your email to create or restart your
      membership." + the same email field and GET STARTED button (solid look, 760px
      wide, block centered, the prompt text LEFT-aligned with the email field's left edge);
      gaps (junior): exactly 150px between the bottom of the posters and this prompt, and
      exactly 150px between the email row and the "Questions?" line (--section-gap in
      index.css; measured 150/150 at three window sizes); "Questions? Call 1-800-555-0199" (555-01xx is the reserved
      fictional range); four columns of underlined links (FAQ, Help Center, Account,
      Terms of Use ... 20 links); a small line "(c) 2026 NextFlick. A class project.
      Film posters belong to their studios." The footer lines up with the Featured
      Films strip (shared --strip-margin). The links are PLACEHOLDERS: no pages
      behind them yet, clicking does nothing.
      Both email forms validate the same way (one component); a valid email goes to
      /signup carrying the email; each form shows its own error.
  - Background: full-screen video with a slow zoom/drift, dark overlay.
      23s fast-cut montage, 16 shots, about 1.4s each, loops via fade to black.
      Action (rally car, explosion, night light trails, drone road chase,
      fireball) intercut with audience reactions (friends leaping off a couch,
      shocked friends, bar crowd cheering, festival crowd, a cinema house).
      Teal/orange color grade. No audio.
      If the video fails: the poster still shows. If the user has "reduce
      motion" turned on: the video is hidden and the poster shows.

Known limits / open items for the junior
  - Sign In shows in the developer's browser at 1728 and 1920 wide, in line with
    the logo with equal 48px side margins. The junior reported it missing; try a
    hard refresh (Cmd+Shift+R) and check the port. If still missing: send a
    screenshot.
  - Pexels has no cinema footage of people jumping out of their seats, so the
    excited reactions come from living room / bar / outdoor crowd settings.
  - The clip fades up from black at the start of each loop, so a fresh page load
    shows a dark frame for a moment.
  - Logo is drawn in code (placeholder); swap for a real asset when ready.
  - The wordmark font loads from Google Fonts; with no internet it falls back to
    a system font and looks different.

----------------------------------------------------------------------
OPEN DECISIONS (default in brackets)
----------------------------------------------------------------------
- Should the Featured Films posters be clickable (open the title popup later)? -> ______
- Persist session in localStorage: [yes]                -> ______
- Poster images for Browse: [generated placeholder art] or free images -> ______
- Should the Landing callout move off the faces in the audience shots? -> ______

----------------------------------------------------------------------
DECISIONS LOG
----------------------------------------------------------------------
Project
- Theme: generic movies/TV. Backend: none (mocked auth and payment).
- Data: hand-written local JSON. Routing/state: React Router + Context.
- Styling: plain CSS. Layout target: desktop only.
- Site/company name: NextFlick (renamed from Para-Netflix / Parabolic Cinema).

Look and feel (junior)
- Moved off Netflix red to sleek metallic / cool colors, dramatic design.
  CTAs may be red or orange: first chose orange-red #ff5a1f, then switched to Netflix red #e50914 (junior).
- Sign In: red text only (no fill), top right, in line with the logo.
- Get Started: went text-only (red, arrow), then back to a solid Netflix-red
  button with white text, square corners, sleek (junior). Email field is square too.
- Callout: was reduced by 1/3 (480px), then enlarged by 33% (now 640px, headline
  2rem), boxless/transparent (junior), centered on the screen, extra space
  (about 1.5 lines) between the text and the email row. Headline gradient
  brightened for legibility over the footage.
- Logo (junior, reference image 7): a flat film reel (disc, four round holes, small
  hub), a wide squared heavy wordmark NEXTFLICK, and one long bar under the word.
  Reference is black on white, so black parts are metallic silver and white parts
  show the dark page. FINAL BUILD (junior: "make the wheel and the underline one
  unit"): everything is ONE svg (Logo.jsx). The reel and the bar share a single
  gradient that runs across the whole width (gradientUnits userSpaceOnUse), and the
  bar's bottom edge runs level with the reel's lowest point (flat shared bottom
  line, like film unspooling), so there is no seam or color change. The wordmark
  has a fixed width (textLength), so the bar always ends exactly where the word
  ends, even before the web font loads. Font: Michroma (Google Fonts, link in
  index.html; falls back to system fonts). Size: 139 x 29 px (8.7rem wide).
  Sign In shares the wordmark's midline and the same 48px side margin as the logo.
  History: earlier versions were a hand-drawn tilted reel + film strip, a traced
  vector, then reel + CSS bar as separate pieces (seam visible); all replaced. The
  first reference was a watermarked stock image; do not ship a copy of it.

Background video (junior)
- Wanted real stock footage, cinematic and moody, then more exciting: split
  scenes across action shots (car chase style), then audience reaction cuts,
  then more excited audiences and faster cuts.
- Final: 23s montage, shots about 1.4s, near-hard cuts.
- Source: free Pexels clips (Pexels license). Video IDs:
    action:    15017371 (rally car), 15270404 (night highway), 1350924
               (explosion), 3621230 (light trails), 12148762 (drone road),
               17807763 (fireball)
    audience:  6104307 (leap off couch), 6104249 (shocked friends), 7039094
               (bar cheering), 3722009 (crowd hands up), 7985879 (cinema house)
- Earlier versions dropped: generated projector loop, helicopter-in-sky clip,
  laughing/popcorn theater shots.
- The YouTube clips shared were not used (license unclear, no downloader).

Process
- Nothing is committed to git unless the junior asks.

Featured Films (junior): below-the-fold section "similar to" the Trending Now
  screenshot. Built as a ranked poster row with scroll arrows. Posters are
  placeholder art drawn in CSS with fictional film titles (no real posters /
  copyrighted art). Heading says "Featured Films" (plural, since it is a row).

Featured Films sizing (junior): thumbnails reduced by 33% with margins left and
  right of the screen; strip size is dynamic (fluid with screen width, see
  --w and --strip-margin in FeaturedRow.css). Checked at ~1280, ~1920 and ~2560
  wide windows: no sideways page scroll. Desktop only, so no phone/tablet layout.

FIXES (junior's round): Sign In link CSS class renamed from signin-btn to
  nav-account (some browser extensions hide anything named "signin"); it measures
  clickable at the top right with the same 48px margin as the logo at 1100, 1440
  and 1728 wide. Hero uses the small-viewport height (100svh). Featured strip:
  removed scroll-snap, set overflow-y hidden (so it cannot capture vertical page
  scrolling), overscroll-behavior-x contain, more space below it, keyboard
  scrolling (focus the row, then arrow keys). Verified with real wheel events: page
  scrolls to the bottom with the whole strip visible; strip swipes to the last card
  and back. Poster cards now accept an optional `image` (public/posters/...).
  Could not reproduce the junior's "strip won't scroll past two thirds": if it
  still happens, note the window size, mouse or trackpad, and whether arrows or
  swiping.

THUMBNAILS (done; these ten are still the Top 10, 16 more films were added later: see MORE FILMS at the end):
  the drawn placeholders are replaced with real posters, chosen with
  the junior. Source: IMDb (the US box office chart, read from the junior's open tab;
  IMDb returns 403 to scripts), plus family/faith films found on IMDb. Ratings were
  confirmed on each IMDb title page:
    1 Angel and the Badman (2026)  PG-13   from the box office chart (Angel Studios)
    2 The King of Kings (2025)     PG
    3 David (2025)                 PG
    4 The Wild Robot (2024)        PG
    5 Paddington in Peru (2024)    PG
    6 I Can Only Imagine (2018)    PG
    7 The Prince of Egypt (1998)   PG
    8 War Room (2015)              PG
    9 Soul Surfer (2011)           PG
   10 Chariots of Fire (1981)      PG
  Rest of the chart excluded: Other Mommy (thriller/horror), Verity and Resident Evil
  (R / horror), Heart of the Beast (violent PG-13 thriller, not picked), The Odyssey
  (rating unconfirmed, not picked), Forgotten Island (PG, scary fantasy with a
  vampire-like demon, not picked), The Social Reckoning, Primetime, Digger (unknown /
  adult themes). The junior can swap any film: add a row to src/data/titles.json and
  a poster file in public/posters/.
  Files: public/posters/<slug>.jpg (480px wide, about 60KB each),
  src/data/titles.json (id, title, genre, year, rating, image, imdb link; later versions: genres, runtime, advisory, cast, synopsis).
  COPYRIGHT: these posters belong to their studios. Fine for a class demo; do not
  publish the site with them. For anything public, use the TMDB API (free key,
  attribution required) or licensed art.

CALLOUT CENTERING (junior chose): centered in the area BELOW the nav bar, not the whole
  window (5rem top padding on .showcase__main). Measured: callout center is within 1px
  of the middle of that area; horizontally exact.

FOOTER (junior): added a footer strip modeled on the screenshot (closing email prompt,
  questions line, four link columns). The email form was pulled out into one shared
  component (EmailCapture) with two looks: "hero" (translucent over the video) and
  "footer" (solid). Link labels adapted from the reference (Netflix-only items dropped
  or renamed). Verified in the browser: both forms validate, the footer form reaches
  /signup with the email, page scrolls to the very bottom, no sideways overflow.

FOOTER SPACING (junior): 150px gap posters -> closing email prompt, and 150px gap email
  row -> "Questions?" line (--section-gap). The prompt text is left-aligned with the
  email field. The row's bottom padding is a fixed 16px so the first gap is exact.

COMMIT (junior): Landing page approved and committed on a new branch, landing-page (not
  main), local only, nothing pushed. Film posters included on purpose. Reminder: they are
  copyrighted studio artwork, so swap them for licensed art before ever pushing to a
  public GitHub repo. Tooling folders (.claude, .vscode, .playwright-mcp) are in the
  root .gitignore.

----------------------------------------------------------------------
SIGNUP PAGE: ORIGINAL SINGLE-PAGE DESIGN (page 2)  [SUPERSEDED: now Password/Contact/Billing, see
the MODULAR ACCOUNT FORMS section at the end; the look and rules below carried over unchanged]
----------------------------------------------------------------------
Flow (original): Landing (email) -> Signup (password) -> Payment (placeholder) -> Who's Watching (later).
Files
  (these files were replaced by src/pages/password|contact|billing/, see the MODULAR ACCOUNT FORMS section)
  was: src/pages/Signup.jsx (password form), src/pages/PaymentPlaceholder.jsx, src/pages/signup/*
  src/components/LightPage.jsx, .css            shared layout for the white pages
  src/components/SiteHeader.jsx, .css           the header, shared by Landing and the light pages
                                                (extracted from Landing; Landing is unchanged)
  src/components/Logo.jsx                       new tone prop: "silver" (default) or "red"
  src/components/Footer.jsx, .css               new variant ("dark" | "light") and showSignup

Junior's spec, as built
  - Logo: all red (reel, bar, wordmark = #e50914). Sign In: black text.
  - Body white; paper-thin grey line (#e6e6e6, 1px) under the header.
  - The lower third of the screen is grey = the SAME variable as the line (--grey-line).
    Footer text is just darker (#737373). The footer has the usual contents (phone line,
    four link columns, credit line) but not the email prompt.
  - Centered column (440px): H1 "Create a password to start your membership"; paragraph
    "Just a few more steps and you're done! We hate paperwork, too."; Password and Verify
    password fields; red square button, white text, "Next".
Defaults I chose (junior can change)
  - Password rule: at least 8 characters and both fields must match. Messages appear under
    the field ("Use at least 8 characters." / "Passwords do not match.") and focus moves to it.
  - Square fields (matches the square button), 50px tall, 1px #8c8c8c border; button 56px.
  - Next goes to /signup/payment, carrying ONLY the email in router state. The password is
    never stored or forwarded (checked: not in history state, local/session storage, cookies).
  - /signup opened directly (no email) still renders, no redirect.
  - Footer is compact so its content (299px) fits inside a third of a ~1000px-tall window.
    It is exactly a third in windows at least 897px tall and grows a bit in shorter ones.
  - Footer text contrast is about 3.8:1 (the junior asked for "just darker" than the grey).
    Below the 4.5:1 guideline; a darker grey (#6b6b6b is about 4.4:1) is an easy change.
Verified (real browser, three window sizes): Landing unchanged by the header refactor (all
  positions identical; 6 screenshot pairs with zero visibly differing pixels); header line,
  logo fills, Sign In color, white page, grey third, centering (0px offsets), all password
  scenarios, flow from Landing, Back / Sign In / logo links, no console errors.

SIGNUP decisions log (junior)
  - Landing committed first on branch landing-page (commit 7cba0c0), nothing pushed.
  - Headline and paragraph centered. Next leads to a payment placeholder page.
  - The paper-thin line is 1 CSS px; on retina screens that is the thinnest standard line.

SIGNUP approved (junior: "looks good"). The defaults I had flagged are accepted as built:
  footer text #737373 (about 3.8:1 contrast), square fields, 8-character password rule,
  placeholder payment wording. Committed on branch landing-page (not pushed).

----------------------------------------------------------------------
GATEWAY PAGE: CURRENT STATE (page 3)   route /login
----------------------------------------------------------------------
Flow: Billing -> Gateway -> Browse (home). Landing's Sign In link also opens it. (Who's Watching is skipped for now.)
Files
  src/pages/gateway/Gateway.jsx, LoginForm.jsx/.css, README.txt, USER_JOURNEY.md
  src/components/ShowcasePage.jsx/.css   NEW shared layout (moved out of Landing; Landing.css is gone)
  src/utils/validation.js                NEW: EMAIL_PATTERN, MIN_PASSWORD_LENGTH (one copy of each rule)
  src/components/SiteHeader.jsx          new prop showSignIn
Junior's spec, as built
  - Landing is the template (DRY): the callout is the only difference. Headline "Welcome back to
    NextFlick" (my wording, easy to change), Email + Password fields, solid red LOGIN button in
    the same style as Get Started.
  - The header's Sign In link is removed on this page (kept on Landing and the light pages).
Defaults I chose (junior can change)
  - Mock login: any valid email + a password of 8+ characters signs in (no accounts to check);
    goes to /browse (the home screen; a "coming soon" stand-in until it is built, since Who's Watching is
    skipped). Password never stored or passed on.
  - Two stacked fields, then LOGIN at half width right-aligned with them (junior), and a plain white
    "Forgot Password" text button in the left half (junior). Forgot Password is mocked: needs a valid
    email, then the headline/line say a reset link was sent to it and the button becomes "Resend Link".
  - Payment's valid submit now goes to /login with the email prefilled (it used to show "Thanks").
  - Footer keeps the "create or restart your membership" prompt, as on Landing.
Verified (real browser): Landing measurements identical before/after the refactor; Gateway has no
  Sign In; all error cases; valid login; Landing -> Signup -> Payment -> Gateway with email carried
  over; Landing's Sign In link; Signup keeps its Sign In; no console errors; lint clean.

----------------------------------------------------------------------
ERROR 403 PAGE: CURRENT STATE (page 3b)   route /403
----------------------------------------------------------------------
Files
  src/pages/forbidden/Forbidden.jsx, Forbidden.css, README.txt, USER_JOURNEY.md
  src/components/ShowcasePage.css       now also holds the shared .cta-actions / .cta-link row
                                        (moved out of LoginForm.css; Gateway and 403 both use it)
Junior's spec, as built
  - "In keeping with this page design": same layout as Landing and the Gateway (ShowcasePage), an
    error callout instead of a form. Folder, README.txt and USER_JOURNEY.md per page, as before.
Defaults I chose (junior can change)
  - Copy: label "ERROR 403", headline "Wrong email or password", line "We couldn't sign you in with
    those details. Check them and try again."
  - Buttons: "Forgot Password" (white text, left half; junior replaced "Back to home") and a red TRY
    AGAIN (right half, half the callout's width like Login). Try Again returns to /login with the typed
    email prefilled. Forgot Password opens /login in its "Check your email" view (the Gateway's
    reset flow is the "forgot password page"; nothing separate was built).
  - No Sign In link in the header (same as the Gateway); label is muted silver, not red.
  - NOT linked from login (junior's decision): the mock accepts any valid pair, so nothing is ever
    "wrong", and databases are connected downstream. The page only has to be present to connect. The
    hook is a TODO in LoginForm.jsx handleSubmit: navigate('/403', { state: { email } }).
Verified (real browser): page content and layout, Try Again -> /login, Forgot Password (with and
  without an email) -> Gateway reset view, ordinary Sign In path unchanged, the Gateway
  unchanged by the style move (same measurements, Forgot Password flow still works), no console
  errors, lint clean.

----------------------------------------------------------------------
MODULAR ACCOUNT FORMS: CURRENT STATE (page 2b)
----------------------------------------------------------------------
Routes: /signup (Password), /signup/contact (Contact), /signup/billing (Billing)
Flow: Landing -> Password -> Contact -> Billing -> Gateway /login.
Junior's decision: "more modular for reuse": password setting, billing information and contact
  information are each their own page, so they can be reused (password reset, updating billing,
  updating contact details) and later sit in an account dropdown in the header's top right once the
  user reaches the home screen (video selections).
Files
  src/pages/password/Password.jsx, README.txt, USER_JOURNEY.md
  src/pages/contact/Contact.jsx,  README.txt, USER_JOURNEY.md
  src/pages/billing/Billing.jsx,  README.txt, USER_JOURNEY.md
  src/components/FieldForm.jsx/.css   NEW: draws a form from a field list (values, errors, focus, submit)
  src/components/FormStep.jsx/.css    NEW: LightPage + headline + line + FieldForm + Back link
  src/components/FORM_PAGES.md        NEW: how the pieces fit and how to reuse a page
  src/utils/validation.js             added validateRequired
  Removed: src/pages/Signup.jsx, PaymentPlaceholder.jsx, src/pages/signup/ (its docs were folded into
  the three page folders; the junior's notes in the old USER_JOURNEY.md moved to password/USER_JOURNEY.md).
  Also tidied: Landing.jsx moved into src/pages/landing/ (with a new README.txt) so every page has a folder.
How reuse works
  A page never knows its place in a flow. The route in App.jsx passes next, back, heading, intro and
  submitLabel (defaults are the sign-up wording). Reusing = one more <Route> with different props.
Defaults I chose (junior can change)
  - Order: Password -> Contact -> Billing -> Gateway (reorder by editing the routes in App.jsx).
  - Split of the old 9-field payment form: Contact = full name, email, phone; Billing = address, apartment
    (optional), city, region, postal code, country. No card number (needs a real payment provider).
  - Back keeps the email (it used to lose it). Only the email travels; nothing else is kept.
  - New wording: Contact "How can we reach you?"; Billing "Add your billing address". Password wording unchanged.
Not done (needs more pages first)
  - /account menu items, a reset page, AuthContext, the Browse header dropdown. The old /signup/payment
    route is gone (it now shows a blank page; nothing links to it).
Verified (real browser): full flow Landing -> Password -> Contact -> Billing -> Gateway with the edited
  email carried through; every error case; Back keeps the email; all three pages render when opened
  directly; Password page measures exactly as the approved Signup page (440px column, 50px fields,
  56px button); nothing stored (localStorage, sessionStorage, cookies); no console errors; lint clean.

----------------------------------------------------------------------
DOCS UP TO DATE / NEXT STEP  (junior: "ensure all readme and md files are up to date, so we can press on")
----------------------------------------------------------------------
Doc map
  README.txt (this file)        roadmap, current state per page, decisions log
  CLAUDE.md                     project rules and the full current spec (routes, component tree, decisions)
  para-netflix/README.md        what the project is and how to run it (the Vite template text was replaced)
  src/pages/<name>/README.txt + USER_JOURNEY.md   landing, password, contact, billing, gateway, forbidden
  src/components/FORM_PAGES.md  how Password/Contact/Billing share FormStep + FieldForm and how to reuse them
Decisions
  - Who's Watching is skipped for now (junior). A successful login goes to /browse (a "coming soon"
    stand-in route until the home screen is built). No /profiles route exists.
  - Pages 1 to 3b are approved. Next page: Browse, the user's home screen.
  - The Browse header gets an account dropdown at the top right holding the Password, Contact and Billing
    pages (reused from the sign-up flow). That needs AuthContext and a protected /browse.
First tasks for Browse
  - Build AuthContext (who is signed in; session persistence default: localStorage) and protect /browse.
  - Mount the three form pages under /account/... with Save buttons and their own next/back (see FORM_PAGES.md).
  - Keep one folder per page (src/pages/browse/) with README.txt and USER_JOURNEY.md.

----------------------------------------------------------------------
BROWSE (HOME): CURRENT STATE, HEADER ONLY (page 5)   route /browse
----------------------------------------------------------------------
Flow: Gateway -> Browse. Built from the junior's Netflix header screenshot; the hero comes after the
  dropdowns are discussed.
Files
  src/pages/browse/Browse.jsx/.css, MemberHeader.jsx/.css, SearchField.jsx/.css, icons.jsx,
    README.txt, USER_JOURNEY.md
  src/components/Dropdown.jsx/.css      NEW: one component for both header dropdowns
  src/data/notifications.json           NEW: 3 sample notifications
  src/App.jsx                           /browse -> Browse; /account/password|contact|billing reuse the
                                        form pages (Save, Back to /browse); the ComingSoon stand-in is gone
Junior's spec, as built
  - Header: OUR logo replaces theirs; then Home, Shows, Movies, My NextFlick (nothing else).
  - Search: a longer WHITE field with rounded corners and a GREY magnifier right-aligned inside it.
  - Bell kept for notifications; OUR OWN profile icon replaces theirs. Both open a dropdown on click.
Defaults I chose (junior can change)
  - Header is sticky (stays on screen when scrolling), dark with a soft blur, same side margin as the logo elsewhere.
  - Search field: fully rounded ends (pill; the junior asked for rounder than my first 10px), width
    up to 26rem and shrinking to 8rem in a narrow window (it was a fixed min(26rem, 30vw)), placeholder
    "Search titles"; it searches nothing yet.
  - Tabs: the current one is a soft filled pill; Home goes to /browse, the others only move the highlight.
  - HOME RULE (junior): past the Gateway, the logo and the Home tab ALWAYS go to /browse (before it: Landing).
    Also on the /account/... pages (their white header logo goes to /browse; homeTo prop on SiteHeader /
    LightPage / FormStep / the three form pages). The email is carried along each time.
  - Bell badge: RED (junior's choice; first built ice blue), white number, shown only while there are
    notifications (count of the sample ones: 3). The one non-action use of the red.
  - Profile icon: just a silver head-and-shoulders and a caret, NO square around it (placeholder design; colors
    were inverted at the junior's request, then the square outline was removed at the junior's request).
  - Dropdown contents are placeholders: bell = 3 sample items; profile = email, Change password, Contact
    information, Billing information, divider, Sign out (to Landing).
  - Account links open the reused form pages under /account/... (still show the white header with Sign In
    until AuthContext exists).
Verified (real browser): arriving through the login; header layout; tabs; search field styling; both
  dropdowns open with the right content; opening one closes the other; Escape closes and returns focus; a
  click outside closes; account links reach the reused pages (Save, Back); no console errors; lint/build clean.
Not done: hero and rows, AuthContext and protecting /browse, real search, real tab content, real sign out.

---------------------------------------------------------------------------------------------------------------------------------------
BROWSE (HOME): HERO ADDED (page 5)
----------------------------------------------------------------------
Junior's spec: "a hero section which will map to the featured film or TV show most likely to be enjoyed by
  the user; use the previously supplied Netflix image for inspiration." Then: Play stays white; the film
  changes on login (a database algorithm replaces it downstream); motion on the hero captures better (animate
  it, or video); drop the percent match for a popcorn / thumbs-up badge saying "We think you will love this!".
Files
  src/pages/browse/Hero.jsx/.css            the feature card (layered motion)
  src/components/icons.jsx                added PlayIcon, RefreshIcon, PopcornIcon
  src/utils/recommend.js                    the stand-in recommender: rankPicks(), currentPick(), advancePick()
  src/data/titles.json                      each film has a `synopsis` (the made-up `match` % was removed)
  src/pages/gateway/LoginForm.jsx           calls advancePick() on a successful login
  src/pages/browse/Browse.jsx/.css          renders the hero under the header
As built
  - Rounded dark card under the header; dark left with title, facts line, synopsis, white Play + grey More Info;
    round refresh button top right; popcorn badge + "No. N in Top 10" chip (first built bottom right, since moved
    under the poster: see the later sections).
  - Posters are 480px portraits, so the poster sits sharp on the right with a blurred copy glowing behind the card
    (a real wide backdrop per film would replace this).
  - WHICH FILM: changes on every login, holds until the next. advancePick() steps through a fixed stand-in order and
    stores the film id in localStorage (`nextflick:featured`). Nothing stored: starts on The Wild Robot (since the
    16 new films: Top Gun: Maverick). The
    junior will replace the three functions in recommend.js with a database algorithm.
  - MOTION: drifting glow, floating poster with a sweeping sheen, mouse parallax (CSS variables --px/--py, no React
    re-renders), staggered entrance on each new pick. Transforms and opacity only. All off for "reduce motion".
Defaults I chose (junior can change)
  - Popcorn (drawn as SVG, red-and-white bucket) rather than two thumbs up; the Top 10 chip stays.
  - Motion first; NO video yet (no per-film trailers, studio footage is copyrighted). If clips are sourced, a `video`
    field per title can play muted and looped behind the card, with the animation as the fallback.
  - The refresh button stays; it steps through the films without changing what the next login shows.
  - Rank chip = place in the titles.json order (same as Featured Films); since the 16 new films it shows only for the
    Top 10 (the first ten films). Synopses are my own short summaries: check them.
Verified (real browser): a different film on each of four logins in the stand-in order; the pick holds through Home,
  an account-page round trip and a reload; nothing stored starts on The Wild Robot; popcorn badge and chip text;
  all six animations running; parallax follows the mouse and resets on leave; reduced motion: no animations, no tilt;
  no console errors; lint and build clean.
Not done: category rows, title popup, real Play, AuthContext/protection, video.

----------------------------------------------------------------------
BROWSE HERO: BADGES MOVED, BLURRED VIDEO ADDED (page 5)
----------------------------------------------------------------------
Junior's spec: the "we think you'll love this" badge left-aligned with the poster; "the rating" underneath the
  poster too; and since the glow is so blurred, make it MOVE (a video) because nobody can tell it is not the film.
As built
  - Under the poster, left edge on the poster's left edge: popcorn badge "We think you'll love this!", then the
    "No. N in Top 10" chip below it (since moved BESIDE it, see the last section). They sit inside the poster's box (move/tilt with it). I read "the rating" as
    the Top 10 chip; the film's own rating (PG) stays in the facts line. The poster is a bit smaller to make room.
  - The glow now contains a real video: the Landing montage (public/videos/landing-loop.mp4, same file), blurred
    60px, half speed, blended with `overlay` over the poster's blurred colors. Poster = colors, video = moving
    light. It does not restart when the pick changes. Not the film's footage.
  - Tuning: unsqueezed, the glow pulsed ~4x between dark and bright montage shots. Contrast squeezed (.35),
    brightness 1.7, opacity .65: ~1.4x swing, a slow flow of light. Measured, not guessed: mean brightness of the
    glow at 12 points through the loop (3 candidate settings compared; B chosen; C was brighter and flatter).
  - Reduced motion: no video element at all and no animations (verified).
Defaults I chose (junior can change)
  - "you'll" (contraction) in the badge, as typed.
  - Playback speed 0.5 (cuts every ~2.8s instead of ~1.4s). Faster means more flicker.
  - Real trailers per film would replace the stand-in montage (needs clips; studio footage is copyrighted).
Files: Hero.jsx/.css, components/BackgroundVideo.jsx (now exports VIDEO_SRC).
Verified (real browser): badges left-aligned with the poster (1151 = 1151); stacked under it (later changed to one row), inside the card, clear
  of the text for all ten picks; video playing at 0.5 with the final filter; it keeps playing across a pick change;
  reduced motion (0 videos, 0 animations); no console errors; lint and build clean.

----------------------------------------------------------------------
SMALL TWEAKS (junior): INVERTED PROFILE ICON, NO BUBBLE ON THE LOVE BADGE
----------------------------------------------------------------------
  - Profile icon colors inverted: dark tile, silver head-and-shoulders (it was a silver tile with a dark figure).
    I added a thin silver outline so the dark tile does not disappear into the dark header.
  - "We think you'll love this!": the background, border and padding are gone. Just the popcorn and the words
    (with a text shadow for legibility over the glow); the popcorn now starts exactly on the poster's left edge
    (measured 1151 = 1151). The "No. N in Top 10" chip keeps its bubble.
  Files: components/icons.jsx (AvatarIcon; it was in pages/browse/ then), pages/browse/Hero.css. Verified in the browser; lint and build clean.

----------------------------------------------------------------------
BROWSE HERO: RANKING BESIDE THE LOVE BADGE (junior)
----------------------------------------------------------------------
Junior's spec: "the movie ranking to the right of 'we think you will love'; adjust the sizing of the poster so
  both fit underneath the poster, beside each other."
As built
  - One row under the poster, exactly as wide as the poster: popcorn + "We think you'll love this!" at the left
    (starting on the poster's left edge), the "No. N in Top 10" chip at the right (ending on the poster's right
    edge). Measured: love left = poster left, chip right = poster right, same row, inside the card.
  - Poster sizing: it is taller/wider again than in the stacked version (height calc(100% - 9.5rem): one row
    needs less room than two stacked chips). 394px wide at a 996px-tall window (was 373px stacked).
  - The pair is about 24 characters wide, so the row's type scales with the poster (a size container, cqw units):
    15.2px on a normal window, 14.5px at 900px tall, 12.8px at the smallest card. The hero's minimum height went
    from 34rem to 38rem so the poster is never narrower than ~308px and the pair never has to wrap.
  - Without that floor, windows under about 850px tall wrapped the chip to a second line even at the smallest
    type; that was found by measuring window heights from 600 to 1400, not by eye.
Verified (real browser): heights 600, 700, 800, 900, 996, 1200, 1400 all keep one row, in the card, clear of the
  text; all ten picks (stepped by keyboard so the mouse did not tilt the poster during measuring); also looked at
  on a 1440x800 laptop-size window; lint and build clean.
Files: pages/browse/Hero.css only.

----------------------------------------------------------------------
BROWSE HERO: RESPONSIVE SIZING CHECK AND FIXES (junior: "make sure it is dynamically resizing to the window")
----------------------------------------------------------------------
Method: measured, not eyeballed. A grid of 9 window widths (1000, 1100, 1280, 1440, 1728, 1920, 2200, 2560, 3440) x
  6 heights (600, 720, 800, 900, 1080, 1440) x all 10 films (540 combinations; films stepped by keyboard, reduced
  motion on so no animation moves the boxes). Checks: sideways scroll, header fit, text vs poster (needs 16px+),
  content inside the card, poster inside the card, badges on one row and inside, refresh button clear of the poster,
  nav vs search clearance. Then screenshots of the stress case (the longest title, "Angel and the Badman") at 1100,
  1440, 2560 and 3440 wide.
First run found (144 failures):
  1. Title overlapped the poster on narrow windows (up to 277px at 1024 wide; ~100px for the longest title even at 1152)
     and on tall windows at 1280: the text column had a fixed max-width and did not shrink for the poster.
  2. The page scrolled sideways at 1024 wide: the HEADER was too wide (logo + tabs + search + tools); the profile menu
     poked out ~30px. (Not the hero.)
  3. On ultrawide (3440) the text sat at the far left and the poster at the far right, ~2000px apart.
  4. Later found: the tenth film's chip ("No. 10 in Top 10", two digits) was wider and wrapped on the narrowest poster.
Fixes (Hero.css, MemberHeader.css, SearchField.css)
  - The hero stage is a size container; the poster size, the text column's max-width and the title size are computed
    from the card (details in CLAUDE.md, "Hero responsive sizing"). The text can no longer reach the poster.
  - Poster never wider than 34% of the card; card height floor 38rem (poster >= ~308px, so the badge row always fits).
  - Badge row type: width / 26 (was / 24) to fit the two-digit ranking.
  - Header: search field flexes (26rem down to 8rem); logo and tabs do not shrink; no sideways scroll down to ~1000px.
  - Ultrawide: text and poster are kept inside a centered 1900px; text-to-poster distance at 3440 wide went from
    ~2000px to 551px; the glow still fills the whole card.
Result: 0 failures in the full grid (540 combinations). Windows under ~1000px wide are not supported (desktop only; the
  header would not fit below ~950px).

----------------------------------------------------------------------
BROWSE: PROFILE ICON WITHOUT THE SQUARE, AND THREE THUMBNAIL ROWS (junior)
----------------------------------------------------------------------
Junior's spec: no square outline around the account icon; under the hero a row for Most Rewatched, below it
  Continue Watching, and last We Think You'll Love These (reference screenshot supplied); "simple thumbnail images will
  suffice; the thumbnails are buttons".
Files
  src/components/ThumbnailRow.jsx/.css   NEW: a titled sideways row of thumbnail buttons
  src/components/useRowScroll.js         NEW: the scroll/arrow logic, extracted from Landing's FeaturedRow
  src/components/FeaturedRow.jsx         now uses the hook (markup and CSS untouched; behavior re-checked)
  src/utils/recommend.js                 + mostRewatched(), continueWatching(), lovedPicks() (stand-ins for queries)
  src/pages/browse/Browse.jsx/.css       renders the three rows under the hero
  src/components/icons.jsx             AvatarIcon: the square (tile + outline) is gone; just the silver figure
As built
  - Headings "Most Rewatched", "Continue Watching", "We Think You'll Love These"; each row a strip of poster
    thumbnails with rounded corners; every thumbnail is a real <button> (accessible name = title and year).
  - Arrows at a row's edges only while there is more to scroll; the mouse wheel over a row still scrolls the page.
  - Rows line up with the hero's left edge; thumbnail width 120px to 220px with the window; no sideways page scroll
    from 1000 to 3440px wide (checked).
Defaults I chose (junior can change)
  - PORTRAIT thumbnails (our posters are portrait; the reference's landscape thumbnails need wide art per film).
  - Pressing a thumbnail opens the More Info pop-up for that film (onSelect, wired in Browse.jsx; at first it did nothing).
  - Films per row are stand-ins: Most Rewatched = all 10 in a fixed order; Continue Watching = 5; We Think You'll
    Love These = the picks without the hero's film (9). Replace with database queries later. (Now 12 / 6 / 15 with the
    16 new films: see MORE FILMS below.)
  - Not copied from the reference (simple was asked for): "for ryan", the Recently Added / Top 10 tags, progress bars.
  - The profile icon is now only the silver figure (there was a dark tile with a silver outline).
Verified (real browser): three rows with the right headings, counts and order; all thumbnails are buttons; the love row
  leaves out the hero's film; the arrow scrolls a row and the left arrow then appears; wheel over a row scrolls the
  page; thumbnails are keyboard-focusable; no sideways scroll at 5 window sizes; Landing's row still scrolls and shows
  its arrows after the refactor; no square in the profile icon; no console errors; lint and build clean.

----------------------------------------------------------------------
BROWSE ROWS: A LEFT AND RIGHT SCROLL BUTTON ON EVERY ROW (junior)
----------------------------------------------------------------------
Junior's spec: "each row of video thumbnails should have a left and right scroll button the way the row on the landing
  page has." (Before: like Landing, a button only appeared while there was more to scroll, so Continue Watching had none,
  and the ultrawide layout the junior was accidentally shown had none at all.)
As built
  - Both buttons are always there on all three rows, with Landing's look (tall dark rounded block, big chevron, sized
    from the thumbnail width).
  - They sat in the side margins next to the strip at first; moved inside the hero's lines in the next change (below).
  - A button is dimmed and does nothing while there is nothing more to scroll that way (start of a row: left dimmed;
    Continue Watching usually fits: both dimmed). Scrolling right turns the left one on, and so on.
Defaults I chose (junior can change)
  - Dimmed rather than hidden when there is nothing to scroll (Landing's row still hides them; it can be made to match).
  - Buttons in the margins rather than over the thumbnails (Landing's sit over its posters).
Verified (real browser): two buttons per row at 1000, 1728 and 2560 wide, clear of the thumbnails and on screen, no
  sideways scroll; enabled/disabled state follows scrolling; the shared tab restored to 1728x996 with motion on.
Files: src/components/ThumbnailRow.jsx/.css.

----------------------------------------------------------------------
BROWSE ROWS: SAME LEFT AND RIGHT LINES AS THE HERO (junior)
----------------------------------------------------------------------
Junior's spec: "make sure the implied lines on the left and right limit of the hero section are consistent through the
  rows below it. Rows should not appear wider than the hero at any point; they should resize dynamically as the hero does."
Found: each strip reached ~6px past the hero on both sides (room for the hover growth), so the cut-off thumbnail at the
  right poked past the hero's right edge; and the scroll buttons sat outside the lines, in the page margins.
As built
  - The strip has no side padding: its clipping edges are exactly the hero's left and right lines. The heading and the
    first thumbnail start on the left line; the cut-off thumbnail is cut on the right line; scrolled to the end, the last
    thumbnail ends on the right line.
  - The scroll buttons sit just inside the lines, over the ends of the strip (like the Landing row's).
  - So the first/last thumbnail is not clipped when it grows on hover, it grows inward (transform-origin left/right).
  - Rows are in the same column as the hero, so they resize with it at every window size.
Verified (real browser): 7 widths (1000, 1280, 1440, 1728, 1920, 2560, 3440): strip, heading, first thumbnail and both
  buttons within 0.5px of the hero's edges on all three rows; hovered first thumbnail stays on the left line; no sideways
  scroll; the shared tab restored to 1728x996.
Files: src/components/ThumbnailRow.jsx/.css.

----------------------------------------------------------------------
MORE FILMS FROM IMDB, FOR VARIETY (junior)
----------------------------------------------------------------------
Junior's spec: "reference IMDb for more thumbnails, for more movie variance. Not overly sexualized, violent, or
  supernatural, but exciting to viewers 18 to 53. Some cartoons are okay, but the majority should not be cartoons."
How they were checked (on IMDb, in the browser; IMDb blocks scripts)
  - Title page JSON-LD: exact title, release date, MPAA rating, genres, poster image.
  - Parents Guide: the severity IMDb voters gave each category. Kept only films that are PG or PG-13 with
    Sex & Nudity NONE or MILD and Violence & Gore NONE or MILD, and nothing SEVERE. Supernatural: none of them has
    ghosts, magic or demons (Interstellar and Back to the Future are science fiction).
Added (16, all live-action), rating / Sex / Violence / Frightening per IMDb:
  Top Gun: Maverick (2022)          PG-13  None / Mild / Moderate
  F1 (2025)                         PG-13  Mild / Mild / Moderate
  Ford v Ferrari (2019)             PG-13  None / Mild / Mild
  The Martian (2015)                PG-13  Mild / Mild / Mild    (rating notes brief, non-sexual nudity)
  Apollo 13 (1995)                  PG     Mild / None / Mild
  Twisters (2024)                   PG-13  None / Mild / Moderate
  National Treasure (2004)          PG     None / Mild / Mild
  Hidden Figures (2016)             PG     None / None / Mild
  Remember the Titans (2000)        PG     None / Mild / Mild
  The Secret Life of Walter Mitty (2013)  PG  None / Mild / Mild
  Back to the Future (1985)         PG     Mild / Mild / Mild
  The Greatest Showman (2017)       PG     None / Mild / Mild
  Free Solo (2018)                  PG-13  None / None / Moderate   (documentary)
  Interstellar (2014)               PG-13  None / Mild / Moderate
  Sully (2016)                      PG-13  None / Mild / Moderate
  Miracle (2004)                    PG     None / Mild / Mild
  ("Moderate" frightening = intense peril, e.g. flying, storms, space; profanity ranges Mild to Moderate.)
Rejected: Gravity (Violence & Gore MODERATE). Passed but left out as near-duplicates: Gran Turismo (racing, like F1 and
  Ford v Ferrari), Rudy (underdog sports, like Miracle and Remember the Titans).
Mix: 26 films, 22 live-action and 4 animated (The King of Kings, David, The Wild Robot, The Prince of Egypt).
Files
  public/posters/<slug>.jpg (16 new, 480px wide, 31 to 98 KB) and src/data/titles.json (16 new entries after the ten).
  src/utils/recommend.js: STAND_IN_ORDER now all 26 (Top Gun: Maverick first), the three rows' lists (12 / 6 / 15),
    and topTen() = the first ten films. Landing's FeaturedRow and the hero's ranking chip use topTen(), so Landing
    still shows exactly ten and the chip only appears for those ten.
  src/pages/browse/Hero.jsx: the chip is hidden for films outside the Top 10.
Synopses are my own short summaries, written from what I know of each film: please check them.
COPYRIGHT: same as before: studio posters, fine for a class demo, not for publishing.
Verified (real browser): every thumbnail and hero poster loads (0 broken); rows show 12 / 6 / 15 with the new films;
  the hero steps through all 26 and wraps, with the ranking chip only on the ten Top 10 films; login rotation works;
  Landing's Featured Films still shows exactly ten (1 to 10); no console errors; lint and build clean.

----------------------------------------------------------------------
BROWSE: THE LANDING FOOTER UNDER THE LAST ROW (junior)
----------------------------------------------------------------------
  - Same Footer component as Landing, under the last row: questions line, four link columns (placeholders), credit line.
  - Default I chose: WITHOUT Landing's "Ready to watch? ... create or restart your membership" email prompt
    (showSignup={false}), since the viewer is already signed in. Easy to turn back on.
  - Its content follows the hero's left and right lines (--gutter), like the rows, not Landing's wider strip margin.
  Files: pages/browse/Browse.jsx/.css (Footer.jsx unchanged apart from a comment). Verified at 1000, 1728 and 2560
  wide: on the left line, inside the right line, below the last row (112px gap), no sideways scroll; Landing's
  footer unchanged; no console errors; lint and build clean.

----------------------------------------------------------------------
MORE INFO POP-UP: SHELL + HERO SECTION (page 6, in progress, crafted with the junior)
----------------------------------------------------------------------
Junior's spec: "a sub page for the home page called More Info: like a pop up or call out that appears when the More Info
  button on the hero is clicked, or when a thumbnail in the rows below is clicked. Create a subfolder for it and let us
  begin to craft its hero section together." References: his two Netflix screenshots (The Last Ship, The Bourne Identity):
  a big picture area, title bottom left, Play + round add/like buttons, a round X top right, the details below.
Files
  src/components/moreinfo/  MoreInfo.jsx/.css (shell), MoreInfoHero.jsx/.css (hero section), README.txt, USER_JOURNEY.md
  src/components/GlowBackdrop.jsx/.css  NEW: the moving glow, extracted from the page hero (now shared; hero unchanged)
  src/utils/motion.js                   NEW: prefersReducedMotion()
  src/pages/browse/Browse.jsx           keeps which film is open (lifted state), renders the pop-up
  src/pages/browse/Hero.jsx/.css        More Info is now a button (it opened IMDb); glow replaced by <GlowBackdrop>
  src/components/icons.jsx            + Close, Plus, Check, ThumbUp
As built (first version, for the junior to react to)
  - Opens from the hero's More Info and from any thumbnail; closes with Esc, the X, or a press on the dimmed page.
  - Panel 70rem wide over a dimmed, slightly blurred page; hero area 62% of the window height; the poster sharp on the
    right with the moving glow behind it (our art is portrait posters, not wide photos); title bottom left; Play (white
    pill) and two round buttons: My List (+ / check) and Like (thumb); round X top right; the picture melts into the body.
  - A proper dialog: portal into <body>, focus trap, focus returns to the opener, page behind locked without shifting,
    announced as a dialog named by the film, all motion off for "reduce motion".
Defaults I chose (junior can change)
  - NO volume button: there are no trailers. Play does nothing yet. My List and Like only toggle (not saved).
  - Play is the white pill like the page hero (the references' is a squarer white button).
  - Poster on the right, like the page hero, rather than the left.
  - The details section is just a note ("comes next") for now.
Bug found and fixed while building: Tab slid the hero up 48px and exposed the glow's edge, because a box with
  overflow:hidden can be scrolled by focus. Now overflow:clip on the pop-up's hero and panel, and on the page hero.
Verified (real browser): opens from the hero and from a thumbnail in all three rows (right film each time); Esc / X /
  dimmed-area close, panel press does not close; focus back on the opener; Tab trapped; toggles; page does not scroll or
  shift; hero never scrolled by focus; 24 window-size combinations with the longest titles: no collisions; short window
  scrolls the pop-up; the page hero's glow identical after the extraction (same filters, video keeps playing across picks,
  none under reduced motion); no console errors; lint and build clean. The shared tab was restored to 1728x996.
Next: the details section (facts, synopsis, cast, more like this, IMDb link), once the junior has shaped the hero.

----------------------------------------------------------------------
MORE INFO POP-UP: THE DETAILS UNDER THE HERO (junior)
----------------------------------------------------------------------
Junior's spec: "right underneath the hero, list the year, duration, rating, short description/summary, cast on the right,
  genres just below that." (Reference: the "2002  1h 58m / PG-13  violence and some language / summary" block on the left
  and "Cast:" / "Genres:" on the right of his Netflix screenshots.)
Files
  src/components/moreinfo/MoreInfoDetails.jsx/.css   NEW: the details section
  src/components/moreinfo/MoreInfo.jsx/.css          holds it instead of the "details come next" note
  src/data/titles.json     every film now has genres (IMDb's), runtime (minutes), advisory (rating reason), cast (3 names);
                           the old single `genre` field is gone
  src/components/PosterCard.jsx, src/pages/browse/Hero.jsx   use `genres` (hero facts: the first two)
Data, read from IMDb for all 26 films (title page: running time, cast, genres; Parents Guide: the MPAA's reason)
  - 24 films have a rating reason; Back to the Future and Chariots of Fire have none listed (only their rating box shows).
  - Cast = IMDb's three top-billed names; genres = IMDb's list (1 to 3). Entities decoded (Lupita Nyong'o).
  - IMDb lists the 2026 Angel and the Badman as Action, Adventure, Romance (our old "Western, Drama" came from a box-office
    chart); the pop-up and the hero now agree because both read `genres`.
  - Worth knowing (found while collecting the reasons): three of the ORIGINAL ten are more intense than the 16 films I
    screened later. Angel and the Badman: "PG-13 for violence/bloody images, suggestive material and language" (Sex Mild,
    Violence Moderate). The Prince of Egypt and Soul Surfer: Violence Moderate (the plagues; the shark attack). The ten were
    chosen with the junior earlier, so they were left as they are; the pop-up shows the real reasons.
As built
  - Left column: year + running time, then the rating in an outlined box with the reason beside it, then the summary.
    Right column: Cast, and just below it Genres. Same look as the references: muted labels, light values.
  - Spacing matches the references (after fixing a CSS specificity slip that had squeezed it) and a 1px hairline of the
    glow at the hero's bottom edge is gone (details panel overlaps the hero by 1px with a solid background).
Defaults I chose (junior can change)
  - Three cast names (no "more"); genres as plain text; the rating reason always shown when IMDb has one.
  - The synopsis is my own short summary (not IMDb's text): please check them.
Verified (real browser): all 26 films opened from the hero: every field filled and equal to its data, layout inside the panel,
  no overflow, no stray entities; the seam checked at 1728x996, 1440x800, 1281x733, 1000x700 and 2560x1440; no console
  errors; lint and build clean; the shared tab restored to 1728x996.
Next: a "more like this" section? an IMDb link? (junior to decide)

----------------------------------------------------------------------
MORE INFO POP-UP: "MORE LIKE THIS" UNDER THE DETAILS (junior)
----------------------------------------------------------------------
Junior's answers: top 3 cast names is fine; the rating reasons are OK; "3 / more like this follows underneath, following the
  screenshots I provided for inspiration/layout" (his Bourne Collection screenshot: a heading, then cards three across, each
  with a picture + running time in its corner, the rating box + year, and a short description).
Files
  src/components/moreinfo/MoreInfoMoreLikeThis.jsx/.css   NEW
  src/components/moreinfo/MoreInfo.jsx                    holds it; stays open when the film changes (see below)
  src/pages/browse/Browse.jsx                               renders <MoreInfo> without a per-film key; passes onSelectFilm
  src/utils/recommend.js                                    + moreLike(film): the 6 films sharing the most genres
  src/utils/format.js                                       NEW: formatRuntime(), shared by the details and the cards
As built
  - Heading "More Like This"; 6 cards, 3 across x 2 rows, lined up with the details; wide 16:9 pictures (the portrait poster
    shown whole over a blurred copy of itself), running time top right, rating box + year, summary cut at 3 lines.
  - Pressing a card switches the pop-up to that film IN PLACE (no close and reopen): same dialog, back to the top, new hero,
    details and list; My List / Like start off again. Esc still closes the whole pop-up, and focus returns to the ORIGINAL
    button. (First version remounted the pop-up per film, which would have lost the original opener for focus.)
  - Which films: share the most genres; never itself; always the same list for the same film. A stand-in for a database.
Bug found by measuring and fixed: the pictures came out TALL (ratio 0.47), because the poster's natural size stretched the
  16:9 box. The poster is now positioned (out of the flow), so the box keeps 16:9 (1.78 measured). Also the focus move on a
  switch used to scroll the panel 32px; it now uses preventScroll.
Defaults I chose (junior can change)
  - 6 cards (two rows); portrait poster whole over a blurred copy (we have no wide art); no hover Play / + on the cards.
  - The cast stays at three names, no "more"; no IMDb link in the pop-up for now.
Verified (real browser): section structure and layout (3 columns, 2 rows, equal sizes, inside the panel, aligned with the details,
  16:9); similarity (Top Gun: Maverick -> Ford v Ferrari (Action + Drama), F1, The Martian, Twisters, The Prince of Egypt,
  Hidden Figures); switching in place by mouse and by keyboard; Esc closes and focus returns to the original More Info button;
  no console errors; lint and build clean; the shared tab restored to 1728x996.
Next (junior to decide): an IMDb link, hover Play/+ on the cards, saving My List and Like, a volume button once there are trailers.

----------------------------------------------------------------------
MY NEXTFLICK PAGE + A REAL MY LIST (page 6b, junior)
----------------------------------------------------------------------
Junior's spec: "creating new page, My NextFlick. Header menu is the same as the current page. The bubble that is over Home
  will be around My NextFlick to show what page we are on. The first row below the menu is simply the Continue Watching
  row: reuse what we already have. Below that, a section for My List. These will be videos that had the plus button
  pressed on their corresponding More Info page."
Files
  src/pages/mynextflick/  MyNextFlick.jsx, README.txt, USER_JOURNEY.md                 NEW
  src/components/MemberPage.jsx/.css      NEW shared shell: MemberHeader + content + Footer + the More Info pop-up
  src/context/myListContext.js, MyListProvider.jsx   NEW: the shared My List, kept in localStorage (`nextflick:my-list`)
  src/components/ThumbnailRow.jsx/.css    + `wrap` (grid) and `emptyMessage`
  src/components/moreinfo/MoreInfoHero.jsx   the + button now reads/writes the shared list (it only toggled before)
  src/App.jsx (route /my-nextflick), src/main.jsx (MyListProvider)
  MOVED to src/components/ because two pages now use them (a page must not import another page's folder):
    pages/browse/BrowseHeader (now MemberHeader), SearchField, icons.jsx, and the whole moreinfo/ folder.
    (CSS classes renamed: .browse-header -> .member-header, .browse-nav -> .member-nav, .browse__main -> .member-page__main,
    .browse__rows -> .member-rows. Older sections of this file use the old names and paths: they describe what was true then.)
  src/pages/browse/Browse.jsx is now just its own content (hero + three rows) inside MemberPage; Browse.css is gone.
As built
  - Header identical to the home screen's. The pill is on "My NextFlick" here and on "Home" on the home screen (a `current`
    prop; Shows and Movies still only move the pill). Home and the logo always go to /browse.
  - First row: Continue Watching, the very same row and films as on the home screen. No hero on this page.
  - My List: the films whose + was pressed in a More Info pop-up, newest first, as a wrapping grid (every film visible, no
    scroll buttons). Thumbnails open the pop-up with + already on; pressing it removes the film (the list behind updates).
    Empty: "Nothing here yet. Press the + button on a film's More Info page to add it to My List."
  - The list survives a reload (browser localStorage). It belongs to the browser, not a person: no accounts or database yet.
Defaults I chose (junior can change)
  - A GRID for My List rather than a scrolling row (a list can grow; all films stay visible). Newest first.
  - Remove only from the pop-up (press the check). No remove button on the thumbnail yet; no reordering.
  - Like (the thumbs up) is still not saved and has no section.
  - The shell, header, search, icons and pop-up moved into src/components/ (see above): all docs were updated to the new paths.
Verified (real browser): Browse unchanged after the restructure (rows, pop-up, More Like This); pill only on My NextFlick on the
  new page and back on Home after Home; two films added (one through a More Like This card) show newest first with no arrows;
  opening one from the list shows + on; removing from the pop-up updates the list behind it and localStorage; reload keeps the
  list; the empty message appears after removing the last film; Shows only moves the pill; the email carries over; no console
  errors; lint (0 warnings) and build clean; the shared tab restored to 1728x996.
Next (junior to decide): remove/reorder on the thumbnails, a "Liked" section, a progress bar on Continue Watching, member-owned
  lists once there is a database, the Shows and Movies pages.

----------------------------------------------------------------------
SHOWS AND MOVIES FILTER THE HOME PAGE + 11 TV SHOWS ADDED (page 6c, junior)
----------------------------------------------------------------------
Junior's spec: "for the header buttons Shows and Movies, we will show them as active the same way we did when we changed page to
  My NextFlick. The only difference is, all we will do is stay on the home page and apply a filter. If Shows is pressed, the home
  page will only show videos classified as TV shows. If Movies is selected, the user homepage will only show movies."
The catch: the catalog was all movies, so Shows would have been an empty page. So I added TV shows (same rule and same IMDb checks
  as the 16 movies) and gave every title a `type`.
Files
  src/data/titles.json            37 titles: `type` on all; 11 shows (with `seasons`; `runtime` = episode length)
  public/posters/                 11 new posters (480px wide, 29 to 98 KB)
  src/utils/recommend.js          ofType(); every list takes a `type`; the three stand-in orders mix shows with movies;
                                  currentPick(type) rotates within a kind; moreLike() prefers the same kind
  src/utils/format.js             typeLabel() and formatLength() (movie: 2h 10m; show: 8 Seasons)
  src/components/MemberHeader.jsx all four tabs are links (Shows /browse?type=show, Movies /browse?type=movie); the placeholder
                                  state is gone; `current` decides the pill
  src/pages/browse/Browse.jsx     reads ?type= (useSearchParams), filters the hero and the rows, hides empty rows
  src/pages/browse/Hero.jsx       `type` prop: picks of one kind; "Show" / "Movie" and "N Seasons" in the facts line
  src/components/moreinfo/*       the details and the More Like This corners use formatLength() (seasons for a show)
The 11 shows, rating / Sex / Violence per IMDb Parents Guide (Frightening is Mild or None for all)
  Planet Earth II (2016)            TV-G   None / Mild    1 season, 50 min      documentary
  Cosmos: A Spacetime Odyssey (2014) TV-PG None / None    1 season, 45 min      documentary
  Brooklyn Nine-Nine (2013)         TV-14  Mild / Mild    8 seasons, 22 min     comedy
  Parks and Recreation (2009)       TV-14  Mild / Mild    7 seasons, 22 min     comedy
  Friday Night Lights (2006)        TV-14  Mild / Mild    5 seasons, 45 min     drama
  The Amazing Race (2001)           TV-PG  None / Mild    39 seasons, 60 min    competition / adventure
  MacGyver (1985)                   TV-PG  Mild / Mild    7 seasons, 48 min     action / adventure
  MythBusters (2003)                TV-PG  Mild / Mild    16 seasons, 44 min    science / documentary
  Monk (2002)                       TV-PG  Mild / Mild    8 seasons, 44 min     comedy / crime
  Psych (2006)                      TV-PG  Mild / Mild    9 seasons, 44 min     comedy / mystery
  Downton Abbey (2010)              TV-PG  Mild / Mild    6 seasons, 60 min     period drama
  All live-action: of the 37 titles, the only animated ones are still the 4 movies. Rejected: Formula 1: Drive to
  Survive (TV-MA, profanity Severe), Chuck (violence Moderate). Two guessed IMDb ids pointed at unrelated titles (the baking show,
  Shark Tank); caught because the page's name was compared. Years are the series' first year as IMDb shows it. Synopses and the
  rest are my own short summaries or IMDb data: please check the summaries.
As built
  - Tabs: Home / Shows / Movies / My NextFlick are all links; the pill follows the page and filter (and aria-current).
  - /browse?type=show: the hero is a show (refresh cycles through the 11); the three rows hold only shows (8 / 6 / 10).
    /browse?type=movie: only movies. /browse: both. Anything else in the address means everything.
  - The filter is in the address, so reload and the Back button keep it. Home and the logo clear it. From My NextFlick,
    Shows / Movies go to the filtered home page.
  - A show's pop-up: "2016  1 Season", TV rating, cast, More Like This = other shows with season counts.
Defaults I chose (junior can change)
  - The same page with a filter (as asked), not separate pages. The rows keep their headings.
  - The row lists are mixed orders that a filter trims; Home therefore now shows shows AND movies together (Most Rewatched 20,
    Continue Watching 12, We Think You'll Love These 15).
  - Shows have no rating reason (IMDb lists none for TV ratings).
  - 11 shows (not more): a mix of nature/science documentaries, comedies, dramas and adventure, all live-action.
Verified (real browser): Home 47 thumbnails (27 movies + 20 shows); Shows: hero Brooklyn Nine-Nine with "Show, Comedy, Crime, 2013,
  8 Seasons, TV-14", rows 8/6/10 = 24 thumbnails, 0 movies; Movies: 33 thumbnails, 0 shows; pill and aria-current on the right tab;
  Back and reload keep the filter; hero cycle = 11 distinct shows and wraps; show pop-up and More Like This (6 shows, season
  counts); a show in My List; from My NextFlick Movies -> /browse?type=movie; logo clears the filter; bad value = everything;
  Landing's Top 10 still ten; email carried; no console errors; lint (0 warnings) and build clean; the shared tab restored.
Next (junior to decide): genre filters, real Shows and Movies pages with seasons and episodes, remove/reorder on My List.

----------------------------------------------------------------------
PLAY: A DEMO PLAYER PAGE AND A REAL CONTINUE WATCHING (page 6d, junior)
----------------------------------------------------------------------
Junior's questions and choices: "what should we do for when they press Play? this is just a demo app/page" -> options offered (a demo
  player screen / a short notice / open IMDb); chosen: the demo player, and "make Continue Watching real". Then, on seeing the plan
  (first drawn as an overlay): "video player a different page?" -> yes, it is now a page of its own, /watch/:id.
Files
  src/pages/watch/  Watch.jsx, Watch.css, README.txt, USER_JOURNEY.md                         NEW
  src/context/      watchHistoryContext.js, WatchHistoryProvider.jsx                          NEW (in main.jsx)
  src/App.jsx (route /watch/:id), components/MemberPage.jsx (playFilm), pages/browse/Hero.jsx (onPlay),
  components/moreinfo/MoreInfo.jsx + MoreInfoHero.jsx (onPlay), pages/browse/Browse.jsx + pages/mynextflick/MyNextFlick.jsx (history in),
  utils/recommend.js (continueWatching(type, playedIds)), components/icons.jsx (+ PauseIcon, BackIcon)
As built
  - Play (hero or pop-up) -> /watch/<id>: full screen, no header/footer; the Landing montage plays as stand-in footage (silent) with
    the caption "Demo: stand-in footage, not <title>."; Back button + title top left; Pause/Play, a draggable progress bar and
    "12m of 2h 10m" at the bottom. One film-minute per real second; the end says "The end (demo)." and the button "Play again".
  - Leaving (Back button, Esc, browser Back) returns to where the viewer came from (filters kept); a direct visit goes to /browse;
    an unknown id goes to /browse.
  - Continue Watching: titles played go to the front (home page AND My NextFlick), are remembered in the browser, resume at the saved
    minute, and drop out when finished. The old fixed list stays as filler so a fresh demo is not empty. The Shows/Movies filter applies.
  - Reduced motion: no video, the poster instead, everything else works.
Defaults I chose (junior can change)
  - 1 film-minute per second; controls always visible; no sound (silent footage, so no volume button); one length per show (an
    episode), no episode list; no progress bars under the thumbnails yet (the minutes are saved, so they are easy to add).
  - The watch history belongs to the browser, not a person (no accounts yet), like My List.
Verified (real browser): see CLAUDE.md ("Play: the watch page...") for the full list: both Play buttons, the clock, Pause, scrubbing, the
  end, every way of leaving, the filter, the pop-up, My NextFlick, reload, resume, finishing, Space, saving at 5 minutes and on leaving,
  direct visit, unknown id, reduced motion, regressions; no console errors; lint (0 warnings) and build clean; the shared tab restored.
A testing note: a screenshot that hangs on "waiting for fonts to load" with requestAnimationFrame at ~1 fps on every page means the
  tab is throttled in the background: call page.bringToFront() (then 121 fps and a 59 ms screenshot).
Next (junior to decide): progress bars under Continue Watching, sound, auto-hiding controls, an episode list for shows, real trailers.

----------------------------------------------------------------------------------------------------
WHERE WE STOPPED (2026-10-16 session end; junior: "update all readme and md files so we can continue working after I exit")
----------------------------------------------------------------------------------------------------
Code state: nothing changed in the code this session after the watch page. Watch page, My NextFlick, Shows/Movies filter, Browse and the
  More Info pop-up are all built and AWAITING the junior's audit. Next feature is the junior's choice (see "Next" above).
OPEN ISSUE reported by the junior, unresolved: "page is not dynamically responding to resize of browser window" (and earlier: "the page
  size was erroneously adjusted ... return to the previously approved size").
  What was found: NOT a CSS bug. The Playwright browser tab had its viewport PINNED to 1728x996 by my earlier setViewportSize calls, so
  the page ignored the real window size (innerWidth 1728 inside an outer window of 1200x984). A fresh tab follows the window (innerWidth
  1200). The approved layout measures correctly at 1728x996 (hero ~1620x737, header 72px, thumbnails 181x269, row heading at 48px).
  Chrome ignored Browser.setWindowBounds, so I could not restore the window width from my side.
  What I did last: closed the Playwright browser (browser_close) and re-navigated to /browse to drop the pin; the junior interrupted the
  next check. TO CONFIRM next session: open a fresh tab, drag the window narrower/wider, and check that innerWidth follows it and the
  layout reflows (the hero/rows were already verified to resize at 9 widths from 1000 to 3440). If the junior's OWN browser (not the
  Playwright tab) still does not resize, ask for a screenshot and the window size, then look for a CSS min-width or fixed width.
  RULE going forward: do NOT call page.setViewportSize in tests (use a separate new page or leave the window alone), so the tab keeps
  following the real window.
