# NextFlick (repo: para-netflix): Project Guidance

Code Platoon assignment: a Netflix-style single page app. Focus is front-end structure. The user is a junior student and has the **final say**. Act as a senior full-stack engineer supporting them.

## Working rules
- **One page at a time.** Design, build, view in browser, get approval, then move on. Do not start a later page before the current one is signed off.
- **Audit checkpoints.** After each page: summarize what changed and why, list files touched, offer 2-3 options where choices exist, and wait for approval.
- Ask questions where it improves the design. Explain React concepts used (props, lifting state, context, controlled inputs). Let the junior write key pieces when they want practice.
- **Desktop only for now.** No mobile/tablet breakpoints.
- No git commits unless asked.
- Keep `README.txt` (roadmap + decisions log) and this file current as decisions change. Rewrite sections to the current state rather than piling up notes.

## Stack and decisions
- App lives in `para-netflix/` (Vite 8 + React 19 + react-router-dom). Run: `cd para-netflix && npm run dev`, open http://localhost:5173/ (never open `index.html` directly: it shows a white screen). Also `npm run lint`, `npm run build`.
- Theme: generic movies/TV. Brand: **NextFlick**, own identity (not a Netflix copy).
- Look: dark, cool, metallic, dramatic. Colors live as tokens in `src/index.css`. Netflix red (`--cta` #e50914, black text if ever used on a fill) is the only warm color, reserved for actions (Sign In, Get Started).
- Backend: none. Mocked auth/payment with local state + validation.
- Data: hand-written local JSON (`src/data/titles.json`).
- Routing/state: React Router + Context (`AuthContext`).
- Styling: plain CSS, one `.css` file next to each component/page.
- Open: persist session in localStorage (default yes); Browse poster art (default generated placeholders).

## Routes (from the concept map)
| Route | Screen | Status |
|---|---|---|
| `/` | Landing (email + Get Started, Sign In) | built, awaiting sign-off |
| `/signup` | Password step (email arrives from Landing in router state) | built, awaiting audit |
| `/signup/payment` | Payment placeholder: "Payment is omitted from this demo." | placeholder |
| `/login` | Email + password | placeholder |
| `/profiles` | Who's Watching | not started |
| `/browse` | Hero + category rows; title popup as a modal | not started |

Errors: invalid email/password on login; invalid email/payment on signup (inline messages). Successful auth/payment leads to `/profiles`.

## Component tree
```
App (Router + AuthProvider)
 ├─ Landing            (built)  uses Logo, BackgroundVideo, EmailCapture (x2), FeaturedRow (→ PosterCard), Footer
 ├─ Signup             (built)  password step, uses LightPage (SiteHeader light, Footer light)
 ├─ PaymentPlaceholder (placeholder)
 ├─ Login
 ├─ Profiles (ProfileCard)
 └─ Browse (protected)
     ├─ Navbar, Hero, Row → TitleCard
     └─ TitleModal (media, summary, episodes, Play)
```
Built so far (also `src/components/EmailCapture.jsx/.css` and `src/components/Footer.jsx/.css`): `src/App.jsx` (routes, with a temporary `ComingSoon` stand-in), `src/pages/Landing.jsx/.css`, `src/components/Logo.jsx/.css`, `src/components/BackgroundVideo.jsx/.css`, `src/components/FeaturedRow.jsx/.css`, `src/components/PosterCard.jsx/.css`, `src/data/titles.json`.

## Landing page (built; junior's decisions)
- **Nav bar:** full width, fixed, dark gradient + soft blur. Left: logo = ONE svg (`Logo.jsx`): flat film reel (disc, four holes, hub) + wide squared NEXTFLICK wordmark (Michroma, fixed width via `textLength`) + a bar that grows out of the reel and runs under the word. Reel and bar share one gradient across the whole width and a flat shared bottom line so they read as a single shape (junior: "make the wheel and the underline one unit"); follows the junior's reference image 7 (black parts = metallic silver, white parts = the dark page). Natural size 139x29px (8.7rem wide); the wordmark and Sign In share one midline. Right: "Sign In" link, red text only, to `/login`. Logo and Sign In use the same side margin, `--gutter` (3rem).
- **Callout:** centered in the area below the nav bar (`.landing-main` has 5rem top padding, junior's choice), 640px wide, **no box**: no background, border, blur or shadow; text floats over the video, with a text shadow and a faint feathered darkening behind it (`.cta-card::before`) for legibility. Text is left-aligned with the email field's left edge (the callout block itself stays centered on the screen). Headline "Join now for the best access to your favorite shows and movies" (2rem), sub-line, about 1.5 lines of space, then a semi-transparent square email field + a "GET STARTED →" button (solid Netflix red, white uppercase text, square corners, same height as the field). Sign In stays red text only. Email must match `name@domain.tld` (regex in `Landing.jsx`); invalid shows an inline error; valid navigates to `/signup` with the email in router state.
- **Background:** `BackgroundVideo` shows `public/videos/landing-loop.mp4` full-screen (`object-fit: cover`, slow zoom/drift, dark overlay). On error or "reduce motion", the still `public/images/landing-poster.jpg` shows instead.
- **Video content:** 23s fast-cut montage (16 shots, about 1.4s each, near-hard cuts, ends on a fireball that fades to black so the loop is clean). Action shots (rally car, explosion, night light trails, drone road chase, fireball) intercut with audience reactions (leap off a couch, shocked friends, bar crowd, festival crowd, cinema house). All free Pexels clips; IDs are listed in `README.txt`. Teal/orange grade, no audio, about 3 MB.
- **Featured Films (below the fold):** `FeaturedRow` is an opaque section (fades in from the video) modeled on the junior's "Trending Now" screenshot: heading, a horizontally scrolling strip of 10 tall posters with big outlined rank numbers overlapping each card's lower-left corner, and left/right arrow buttons that appear only when there is more to scroll. The strip is **fluid and inset**: `--w` (poster width, `clamp(110px, 9.14vw, 240px)`, which is 158px on a 1728px window = 1/3 smaller than the first 236px version) and `--strip-margin` (`clamp(1.5rem, 6vw, 8rem)`) are set on `.featured` in `FeaturedRow.css`; gaps, rank numbers, arrows and the poster's inner type all derive from them (`--u` = 1em of the strip). Cards clip at the strip's edges, not the screen's. Posters are `PosterCard`s drawn in CSS from `src/data/titles.json` (fictional titles, palette + shape per film; title at the top so the rank number never covers it; inside `PosterCard.css` everything is `em`, scaled from `--w`). No real/copyrighted poster art. Reuse `PosterCard` and `titles.json` on Browse (set `--w` on the parent; default 236px). Gotchas: `em` offsets on the rank number would use its own big font size, so they use `calc(var(--u) * n)`; the row needs `scroll-padding-inline` or scroll-snap cuts off card 1.
- **Footer + EmailCapture:** `Footer` (below Featured Films) copies the structure of the junior's footer screenshot: closing "Ready to watch?" prompt + the email form, a phone line (fictional 555-01xx number), four link columns (placeholder links that do nothing), and a small credit line about the class project and film posters. Spacing (junior): exactly `--section-gap` (150px, in `index.css`) from the bottom of the posters to the closing prompt and from the email row to the "Questions?" line; the prompt's text is left-aligned with the email field (block centered, 760px). The first gap works because the strip row's bottom padding is a fixed 16px and the footer prompt's top margin is `--section-gap - 16px`. It lines up with the strip via the global `--strip-margin` (now in `index.css`). The email form is ONE shared component, `EmailCapture` (`variant="hero"` translucent / `"footer"` solid): it owns the email regex, the inline error and the navigation to `/signup` with the email in router state; ids come from `useId()` because two forms are on the page.
- **Light pages (Signup, payment placeholder):** `LightPage` is the shared layout: `SiteHeader variant="light"` (in the page flow, white, 1px `--grey-line` underneath, all-red logo via `Logo tone="red"`, black Sign In), a centered content area, and `Footer variant="light" showSignup={false}` (grey `--grey-line` background filling the bottom third, text `--grey-footer-text`, no email prompt). It sets `data-theme="light"` on `<html>` while mounted (white background, no dark overscroll). `--grey-line` is ONE variable on purpose: the header line and the footer area must match. `SiteHeader variant="overlay"` is the Landing header, moved out of `Landing` unchanged (verified pixel-identical).
- **Signup** (`/signup`): H1 "Create a password to start your membership", paragraph "Just a few more steps and you're done! We hate paperwork, too.", Password + Verify password fields, red square "Next" (all centered in a 440px column). Rule: 8+ characters and both must match, inline errors, focus moves to the bad field. Next validates then goes to `/signup/payment` with ONLY the email in router state. Never store or forward the password (verified). `/signup` opened directly still renders.
- **Sign In** link uses the class `nav-account` (renamed from `signin-btn` in case a browser extension hides "signin" elements). The strip row is `overflow-y: hidden`, with no scroll-snap, so it cannot swallow vertical page scrolling; verify scrolling with real wheel events (`page.mouse.wheel`), not just `scrollTo`.
- **Posters:** `src/data/titles.json` now holds 10 real films (id, title, genre, year, rating, `image` under `public/posters/`, `imdb` link): Angel and the Badman (from the IMDb box office chart, PG-13) plus nine family/faith PG films (The King of Kings, David, The Wild Robot, Paddington in Peru, I Can Only Imagine, The Prince of Egypt, War Room, Soul Surfer, Chariots of Fire). Chosen with the junior as "Christian appropriate"; ratings confirmed on IMDb. `PosterCard` shows `image` when present, else the CSS-drawn art (needs `palette`/`shape`, which have defaults). Studio posters are copyrighted: OK for a class demo, not for publishing; prefer the TMDB API for anything public. IMDb returns 403 to scripts, so reading IMDb pages is done through the browser tabs (Playwright `context().pages()` / `newPage()`).
- **Open:** the junior reported Sign In missing on their screen; it renders and is clickable in the dev browser. Ask for a screenshot or a hard refresh if it comes up again.

## Making or changing the video (not stored in the repo)
- No system `ffmpeg`. A throwaway Python venv with `imageio-ffmpeg` provides a binary (in the session scratchpad).
- Pexels page URLs return 403 to curl, but the file server works with a browser User-Agent and `-e https://www.pexels.com/`: `https://videos.pexels.com/video-files/<id>/<id>-<res>_<fps>fps.mp4`. The exact file name varies (`hd_1920_1080_25fps`, `uhd_2560_1080_25fps`, `hd_1366_720_25fps`...); read it from the page (WebFetch) or probe with ranged requests.
- Pipeline: cut each shot to 1280x720 at 25fps, apply one shared grade, tiny fades, concat, encode `-crf 28`, extract the poster frame.
- Gotchas: in zsh, unquoted variables do not word-split (use `while read`); give `ffmpeg` `-nostdin` inside loops or it eats the loop's input; the Playwright screenshot tool only writes inside the repo root.

## Roadmap
Tracked in `README.txt` (tick boxes and log decisions there as pages are approved).

## Design skills available
frontend-design, ui-ux-pro-max, design-motion-principles (project `.claude/skills/`). taste-skill targets marketing pages, so it fits the Landing page only. Playwright MCP is available for browser QA.
