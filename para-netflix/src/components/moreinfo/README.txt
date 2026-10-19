MORE INFO POP-UP (folder: src/components/moreinfo/)
=====================================================

What this is
  A pop-up (a "call out") that opens over the home screen when the viewer presses the hero's More Info
  button, or any thumbnail in the rows below the hero. It shows one film. It is not a route: it lives on /browse.
  STATUS: the shell, its HERO SECTION, the DETAILS under it and MORE LIKE THIS under those are built (crafted with the
  junior, step by step, from his two Netflix screenshots: The Last Ship and The Bourne Identity). A link to the film's
  IMDb page, and a "full cast" behind a "more", were discussed and left out for now (junior: top 3 names is fine).

What is in this folder
  README.txt            this file, a quick orientation
  USER_JOURNEY.md       the viewer's path: how it opens, what is in it, how it closes
  MoreInfo.jsx/.css     the shell: dimmed page, the panel, open/close behavior, focus, scroll lock
  MoreInfoHero.jsx/.css the hero section at the top of the panel (title, buttons, poster, glow, close)
  MoreInfoDetails.jsx/.css the details under the hero: year, running time, rating + its reason, summary, cast, genres
  MoreInfoMoreLikeThis.jsx/.css  "More Like This": a grid of 6 cards under the details (press one to switch films)

Shared pieces it uses
  src/components/GlowBackdrop.jsx/.css  the moving glow (blurred poster + blurred, slowed video); extracted from the
                                        page hero so both use the very same one
  src/components/icons.jsx            Close, Plus, Check, ThumbUp (new), Play (existing)
  src/utils/motion.js                   prefersReducedMotion()
  src/utils/format.js                   formatRuntime() (118 -> 1h 58m), shared by the details and the cards
  src/utils/recommend.js                moreLike(film): which films are "more like this" (a stand-in for a database)

Who opens it (lifted state)
  MemberPage.jsx (the shell shared by Browse and My NextFlick) keeps which film is open (`selected`, null = closed),
  because several parts can open it (and two pages):
  the hero (onMoreInfo(film)) and every row (ThumbnailRow's onSelect(film)). The page passes them openMoreInfo; MemberPage renders
  <MoreInfo key={film.id} film onClose />. The film's data comes from the row or the hero, so no lookup is needed.

The hero section in one paragraph (junior's references: a large picture area, title bottom left, Play + round buttons)
  A rounded dark panel (70rem wide, or the window less 2rem each side) over a dimmed, slightly blurred page. At the top
  a picture area 62% of the window height (26rem to 40rem): the film's poster, sharp, on the right, with the same moving
  glow as the page hero behind it; the film's title bottom left in the silver spaced capitals used on the page hero; and
  under it Play (white pill) and two round buttons: add to My List (+, turns into a check) and like (thumbs up, fills).
  A round X is at the top right. The picture melts into the panel's dark body below.
  - Our art is PORTRAIT posters only, so the references' wide photo becomes poster + glow, like the page hero.
  - Play goes to the demo player page, /watch/:id (src/pages/watch/): MemberPage passes MoreInfo `onPlay` (= playFilm), and
    MoreInfoHero's Play button calls it. The pop-up is not reopened when the viewer comes back (it is local state).
  - My List is REAL: the + button adds the film to (or takes it out of) the shared My List (src/context/: useMyList()),
    which My NextFlick shows. It is kept in the browser's localStorage, so it survives a reload; the button shows a check
    when the film is in the list, whichever film the pop-up is showing. (Before the My NextFlick page existed it only
    toggled and was forgotten.) Like still only switches on and off (aria-pressed), resets when the film changes, and is
    not saved.
  - NO volume button (it is in the references): it controls a trailer's sound and we have no trailers; the glow's video
    is silent stock footage. It can be added when there are trailers.
  - The hero is a size container (cqw/cqh), like the page hero: the poster is as tall as the area allows minus 6rem, the
    title column's max-width is "whatever is left" after the poster (always 2rem clear), the title scales with the width.

Shows (added with the Shows tab): the same pop-up works for TV shows. The year is followed by the number of seasons
  instead of a running time ("2016  1 Season"; formatLength() in utils/format.js), the rating box shows the TV rating (TV-G,
  TV-PG, TV-14; IMDb lists no reason text for TV ratings, so there is none), and More Like This shows other SHOWS (moreLike
  prefers the same kind) with their season counts in the picture corner.

The details under the hero (junior: "year, duration, rating, short description/summary; cast on the right, genres just below")
  Two columns under the picture, like the references.
  - LEFT: the year and the running time (2022  2h 10m); under it the rating in a small outlined box followed by the
    reason it got that rating, in the MPAA's own words as IMDb lists them (PG-13  sequences of intense action, and some
    strong language); then the short summary (our own synopsis).
  - RIGHT: "Cast:" with the three top-billed names, and just below it "Genres:" with IMDb's genres (up to three).
  - Data: all from the film's entry in src/data/titles.json (year, runtime in minutes, rating, advisory, synopsis, cast,
    genres). Everything except the synopsis was read from IMDb for all 26 movies (title page: running time, cast, genres;
    Parents Guide: the rating's reason). Two older films have no reason listed on IMDb (Back to the Future, Chariots of
    Fire), so only their rating box shows. The reason is shown as written, so a harsher one shows too (for example
    Angel and the Badman: "violence/bloody images, suggestive material and language").
  - The old single `genre` field was replaced by IMDb's `genres` list (one source of truth): the page hero's facts line now
    uses the first two of them. (IMDb lists the 2026 Angel and the Badman as Action, Adventure, Romance; our old "Western,
    Drama" came from a box-office chart.)
  - Running time is formatted from minutes (118 -> 1h 58m, 120 -> 2h). Names are plain text (decoded; e.g. Lupita Nyong'o).
  - Verified for all 26 movies opened from the hero: every field filled and matching its data, nothing overflows, the cast
    and genres sit right of the summary, no stray HTML entities.
  - Two bugs found and fixed while building: (1) my margin reset out-ranked the spacing classes (CSS specificity), which
    squeezed the left column; it now uses :where() so it has zero weight. (2) A one-pixel hairline of the glow showed at the
    hero's bottom edge at some window sizes; the details panel now has its own solid background and overlaps the hero by one
    pixel (checked at five window sizes, including a fractional 1281x733).

More Like This (junior: "3 more like this follows underneath, following the screenshots": his Bourne Collection screenshot)
  - A heading "More Like This" and a grid of cards, THREE ACROSS, two rows (6 films), lined up with the details above.
  - Each card (like the reference): a wide 16:9 picture with the running time in its top right corner; under it the rating
    in a small outlined box, then the year; then the film's short summary, cut at three lines.
  - Our art is portrait posters, so the wide picture shows the poster WHOLE, centered, over a blurred copy of itself that
    fills the sides (the glow trick, without the video). The poster is taken out of the layout flow (position:absolute):
    in the flow, its natural size stretched the box and the pictures came out tall instead of wide (found by measuring the
    ratio: 0.47 instead of 1.78).
  - Which films: moreLike(film) in src/utils/recommend.js: the other films that share the most genres with this one (most
    shared first; ties keep the stand-in ranking order, so it is always the same for the same film). For Top Gun: Maverick:
    Ford v Ferrari (Action + Drama), F1, The Martian, Twisters, The Prince of Egypt, Hidden Figures. A database would use
    real similarity ("viewers also watched"). It never lists the film itself.
  - Every card is a button (named "Title (year)"). PRESSING ONE SWITCHES THE POP-UP TO THAT FILM, in place: it does not close
    and reopen. Browse now renders <MoreInfo> without a per-film key, so it is one instance for the whole time it is open;
    that keeps the page lock, and focus still returns to the ORIGINAL button (the hero's More Info or the thumbnail) when it
    finally closes. On a switch the panel scrolls back to the top and takes focus (without scrolling: preventScroll), My List
    (nothing to reset for My List: it shows the new film's own state) and Like starts off again, and the hero's entrance
    replays (MoreInfoHero is keyed by the film).
  - A card grows slightly on hover and shows a focus ring; both off for "reduce motion".

How it behaves (a proper dialog)
  - Drawn into <body> with a portal, above the sticky header.
  - Closes with Esc, the X, or a press on the dimmed area (a press on the panel does not close it).
  - The page behind stops scrolling (and its scrollbar width is kept as padding so nothing jumps sideways). If the panel
    is taller than the window, the pop-up scrolls itself.
  - Focus moves into the panel when it opens; Tab and Shift+Tab stay inside (Play, My List, Like, X); focus goes back to
    the button that opened it when it closes.
  - role="dialog", aria-modal, named by the film's title.
  - Entrance: the panel rises and fades in, the poster rises, the title and buttons follow. "Reduce motion": no
    animation and no video.
  - Gotcha found while building: a box with overflow:hidden can be SCROLLED by the browser when a button inside it takes
    focus. The oversized glow gave the hero hidden scroll room, so Tab slid the whole hero up 48px. The hero and the
    panel use overflow: clip (same crop, cannot scroll); the page hero got the same fix.

Verified (real browser)
  Opens from the hero and from a thumbnail in each of the 3 rows (and shows that film's details and its More Like This), showing that film; closes with Esc, X and a press on
  the dimmed area; focus returns to the opener; Tab is trapped; the page behind does not scroll or shift; the toggles
  switch; no scrolling of the hero by focus; 24 combinations of window size (1000x600 to 3440x1440) with the longest
  titles: title never touches the poster, X never over the poster, panel on screen, no sideways scroll; a short window
  makes the pop-up scroll; More Like This: 6 cards in a 3 x 2 grid, 16:9 pictures, switching films in place (one dialog, the new
  film's list excludes itself, scroll back at the top, keyboard Tab + Enter works, Esc returns focus to the original opener); no
  console errors; lint and build clean.

Try it
  cd para-netflix
  npm run dev          sign in at http://localhost:5173/login, then press More Info on the hero or any thumbnail.

More detail: USER_JOURNEY.md here, and the roadmap in README.txt at the project root.
