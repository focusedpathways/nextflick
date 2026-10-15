NEXTFLICK ROADMAP  (repo folder: para-netflix)
==============================================
Rule: one page at a time. A page is done only when the junior signs off.
Target: desktop only for now.

STATUS KEY:  [ ] not started   [~] in progress   [x] approved

SETUP
[x] 0. react-router-dom installed, folder skeleton, Vite template leftovers removed

PAGES
[x] 1. Landing        /          APPROVED by the junior, committed on branch landing-page
[ ] 2. Signup         /signup    email (prefilled from Landing) -> payment step,
                                 validation + inline errors. Currently a placeholder.
[ ] 3. Login          /login     email + password, error state. Currently a placeholder.
[ ] 4. Who's Watching /profiles  profile picker, active profile in AuthContext
[ ] 5. Browse         /browse    titles.json, Navbar, Hero, category Rows
                                 (reference: Netflix rows screenshot, landscape
                                 poster tiles with titles baked into the art)
[ ] 6. Title popup    (modal)    media, summary, episodes, Play
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
  src/pages/Landing.jsx, Landing.css      page, nav bar, callout, email validation
  src/components/EmailCapture.jsx/.css    email field + Get Started (used by the callout AND the footer)
  src/components/Footer.jsx/.css          footer strip below Featured Films
  src/components/FeaturedRow.jsx/.css     "Featured Films" row below the fold
  src/components/PosterCard.jsx/.css      poster drawn in CSS (reused on Browse later)
  src/data/titles.json                    10 fictional films (title, genre, year, palette, shape)
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

THUMBNAILS (done): the drawn placeholders are replaced with real posters, chosen with
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
  src/data/titles.json (id, title, genre, year, rating, image, imdb link).
  COPYRIGHT: these posters belong to their studios. Fine for a class demo; do not
  publish the site with them. For anything public, use the TMDB API (free key,
  attribution required) or licensed art.

CALLOUT CENTERING (junior chose): centered in the area BELOW the nav bar, not the whole
  window (5rem top padding on .landing-main). Measured: callout center is within 1px
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
