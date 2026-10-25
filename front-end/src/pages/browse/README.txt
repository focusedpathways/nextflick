BROWSE PAGE, THE HOME SCREEN (folder: src/pages/browse/)
========================================================

What this is
  The user's home screen. Route: /browse. You arrive here after signing in (the Gateway).
  STATUS: the HEADER, the HERO, three ROWS of thumbnails and the FOOTER are built. The thumbnails are buttons that do
  them opens the More Info pop-up for that film (see moreinfo/).

What is in this folder
  README.txt         this file, a quick orientation
  USER_JOURNEY.md    the visitor's path through the page: steps, menus, exits
  (the More Info pop-up moved to src/components/moreinfo/, with its own README.txt and USER_JOURNEY.md: both pages open it; its
                     More Like This cards switch it to another film without closing it)
  Browse.jsx         the page: the hero, then three rows, inside the shared MemberPage shell (the header, the footer and the
                     More Info pop-up now come from src/components/MemberPage; the header is MemberHeader, shared with
                     My NextFlick)
  Hero.jsx/.css      the feature card for the film the viewer is most likely to enjoy (its glow is GlowBackdrop)
  (the three rows use src/components/ThumbnailRow.jsx/.css, see below)
  MemberHeader.jsx/.css   the top bar: logo, tabs, search, bell, profile menu
  SearchField.jsx/.css    the long white search field with the grey magnifier
  icons.jsx          search, bell, our profile icon and the caret (inline SVG)

Shared pieces
  src/components/ThumbnailRow.jsx/.css  a titled row of thumbnail buttons that scrolls sideways (used 3 times)
  src/components/GlowBackdrop.jsx/.css  the moving glow (blurred poster + blurred video), shared by the hero and the
                                     More Info pop-up (extracted from the hero; the hero looks the same)
  src/components/useRowScroll.js     the scroll + "show the arrow only while there is more" logic, shared with
                                     Landing's Featured Films row (extracted from it; its look is unchanged)
  src/components/Dropdown.jsx/.css   ONE component behind both the bell and the profile menu:
                                     opens under its button; closes on a second click, a click outside
                                     or Escape (focus returns to the button); opening one closes the other
  src/components/Logo.jsx            the same logo, silver, as on the dark pages
  src/data/notifications.json        the three sample notifications (hand-written)
  src/data/titles.json               the 37 titles (26 movies, 11 TV shows; the first ten are the Top 10); each has a `type`
  src/utils/recommend.js             the stand-in recommender: rankPicks(), currentPick(), advancePick()

The header in one paragraph (modeled on the junior's screenshot, with NextFlick's own look)
  A bar that stays at the top while the page scrolls. Left to right: our logo; the tabs Home, Shows,
  Movies, My NextFlick (the current tab is a soft filled pill); then, pushed to the right, a long white
  search field with fully rounded ends (a pill) and a grey magnifier at its right end; a bell with a small count
  badge; and our own profile icon (just a silver head-and-shoulders, with no square around it; the junior asked for the colors inverted, then for the square outline to go) with a caret.
  Dropped from the reference: Games, New & Popular, Browse by Languages.

The hero in one paragraph (modeled on the junior's Netflix screenshot)
  A rounded dark card under the header showing the film we think the viewer will love. Left,
  bottom-aligned: the title in large spaced capitals (silver gradient), a facts line (Movie, the first two genres, year,
  rating), a short synopsis, and two pill buttons: a white Play (junior: leave as is) and a grey More Info.
  Right: the poster, sharp, with a heavily blurred copy of it glowing behind the whole card (we only have
  480px portrait posters, which would look soft blown up as a wide backdrop). Under the poster, in one row
  exactly as wide as the poster (junior: ranking to the right of the love badge, poster sized so both fit
  beside each other): on the left plain popcorn and the words "We think you'll love this!" with no bubble
  (it replaced a "97% Match" chip: the junior will not pursue a percent match), on the right the "No. N in
  Top 10" chip (the junior's "rating"; the film's own rating, e.g. PG, stays in the facts line). The row
  starts on the poster's left edge and ends on its right edge. The badges live inside the poster's box,
  so they move and tilt with it. Their type scales with the poster's width (about 15px, 12.8px on a short
  window) so the pair always fits side by side; the hero has a 38rem minimum height so the poster is never
  narrower than about 308px. Top right: a round refresh button that steps to the next pick.
  - WHICH FILM (junior: "change on login"): the pick changes on every login and holds until the next one.
    src/utils/recommend.js walks all 37 titles (movies and shows) in a fixed stand-in order, one step per login
    (advancePick(), called by the Gateway's login), and remembers the film in localStorage
    (`nextflick:featured`, just a film id). The hero starts on currentPick(); a visit with nothing stored
    starts on Top Gun: Maverick. The junior will replace this with a database algorithm: keep the three
    functions, change how they choose.
  - MOTION (junior: motion captures better): the glow drifts slowly AND a video plays inside it (junior:
    "with this much blur nobody will know whether it is the movie or not"). It is the Landing page's stock
    montage (public/videos/landing-loop.mp4, the same file, so no extra download), blurred 60px, slowed to
    half speed, and blended over the poster's blurred colors with `overlay`, so the poster supplies the
    colors and the video supplies moving light. It is NOT the film's footage. The montage cuts between very
    dark and very bright shots, which made the glow pulse about 4x; its contrast is squeezed (contrast .35,
    brightness 1.7, opacity .65) so the swing is about 1.4x (measured: mean brightness of the glow at twelve
    points through the loop). The video sits outside the part that remounts on a new pick, so it keeps playing.
    Also: the poster floats up and down and a soft band of light sweeps across it every few seconds; the poster and glow
    shift and tilt a little against the mouse (parallax; the pointer position goes into two CSS variables,
    so React does not re-render); a new pick enters with the poster rising and the text rising in turn.
    Only transforms and opacity are animated (plus the video). Everything, including the video, is OFF for
    "reduce motion": the video element is not even rendered (verified).
  - REAL TRAILERS: not built (no per-film clips; studio footage is copyrighted). If the junior sources
    clips, a `video` field on a title could play (blurred or not) instead of the stand-in montage.
  - The "No. N in Top 10" chip shows only for the Top 10 (the first ten films in titles.json, the same ten as
    Landing's Featured Films: topTen() in recommend.js). For the 16 films added later only the popcorn line shows.
  - Play goes to the demo player page, /watch/:id (src/pages/watch/). More Info opens the More Info pop-up for the film
    shown (components/moreinfo/; MemberPage keeps which film is open).
  - The synopses are my short summaries in my own words; check them for accuracy.

The three rows under the hero (junior: "simple thumbnail images will suffice. the thumbnails are buttons")
  - Most Rewatched, Continue Watching, We Think You'll Love These (the heading style follows the junior's Netflix
    screenshot; its "for ryan" and "Recently Added"/"Top 10" tags and progress bars are not copied: simple).
  - Each row: a heading, then poster thumbnails (rounded corners) in a strip that scrolls sideways. EVERY row always
    has a left and a right scroll button (junior: "the way the row on the landing page has"): same look as Landing's
    arrows (tall dark rounded block, big chevron, sized from the thumbnail width), placed just inside the row's left and right
    edges over the ends of the strip (like Landing's), dimmed and disabled while there is nothing more to scroll that way. With the
    pointer over a row, the wheel still scrolls the PAGE up and down. Thumbnails grow slightly on hover and show a focus ring for the keyboard.
  - Every thumbnail is a real <button> (its name is the film's title and year). Pressing one opens the More Info
    pop-up for that film (ThumbnailRow's `onSelect(film)`, wired in Browse.jsx).
  - LIVE TMDB ROW (preview): "Live from TMDB (preview)" under the three rows. Hidden under Shows and while searching.
    Films come from src/services/tmdb.js, which calls the Supabase Edge Function `tmdb-movies` (the TMDB token stays
    in that function; its source is supabase/functions/tmdb-movies/index.ts at the repo root, outside front-end/). Pressing a thumbnail fetches the film's
    details (genres, cast, rating, runtime) and opens the same More Info pop-up as every row; Play and My List work
    for it too (ids look like tmdb-550; utils/films.js keeps the fetched films for the visit). If the details call
    fails, the pop-up still opens with what the popular list has (poster, year, summary, genres) and hides the rest.
    CONTENT FILTER (junior: nothing overly sexualized, horror, spiritualism or occult): src/utils/contentFilter.js
    drops TMDB's adult/softcore films, the Horror genre, and any title or summary using a blocked word (the list is
    in that file; edit it to tighten or loosen). It only sees the summary, so some films can still slip through.
    To remove it, delete the one <ThumbnailRow heading="Live from TMDB (preview)"> block in Browse.jsx.
  - Which films (stand-ins for database queries, in src/utils/recommend.js): Most Rewatched = 12 films in a fixed
    order; Continue Watching = the titles the member really played (the watch history, most recent first) followed by a stand-in list of 12; We Think You'll Love These = the next 15 best picks without the film the
    hero is showing. They mix the 16 newer live-action films with the original ten. Posters are the only art we have, so they are PORTRAIT, not the landscape thumbnails of the
    reference (a landscape crop of a portrait poster loses the title).
  - Sizing: the thumbnail width follows the window (120px to 220px). Each row's left and right limits ARE the hero's
    (junior: the implied lines carry down; a row is never wider than the hero): rows sit in the same column, the
    strip has no side padding, so the cut-off thumbnail at the right is cut exactly on the hero's right line; the
    heading and first thumbnail start on its left line; the buttons stay inside the lines; the first/last thumbnail
    grows inward on hover so it is not clipped. Measured at 7 widths from 1000 to 3440px: all on the lines (0.5px).

The footer (junior: "the footer we used on the landing page should be added below the last row")
  - The same Footer component as Landing (phone line, four columns of placeholder links, credit line), under the
    last row, but WITHOUT Landing's "Ready to watch? ... create or restart your membership" email prompt
    (showSignup={false}): whoever is on this page is already signed in. One prop brings it back.
  - Its content keeps to the hero's left and right lines (--gutter), like the rows, instead of Landing's wider
    strip margin (override in Browse.css). About 112px of space between the last row and the footer.

Dropdowns (placeholder content, to be discussed with the junior)
  - Bell: "Notifications" and three sample items (title text + when).
  - Profile: the signed-in email (when known), then Change password, Contact information, Billing
    information, a divider, and Sign out (goes to Landing; there is no session yet).
  - The three account links open /account/password, /account/contact and /account/billing: the
    Password, Contact and Billing pages reused with "Change/Update ..." wording and a Save button
    (see src/components/FORM_PAGES.md and the routes in src/App.jsx).

Behavior and limits
  - RULE (junior): on this side of the Gateway, the logo and the Home tab ALWAYS go to /browse (before the
    Gateway the logo goes to Landing). On /browse they bring back the Home highlight and scroll to the top;
    the account pages' white header logo goes to /browse too. The email travels along each time.
  - Home and My NextFlick are real pages (the current page's tab wears the pill): My NextFlick is /my-nextflick, with its
    own folder (src/pages/mynextflick/). Shows and Movies are the SAME page with a filter (see "Shows and Movies" below).
  - Search: the field holds what you type; Enter or the glass does nothing yet.
  - The badge is red with a white number and shows only while there are notifications (the junior's choice;
    red is otherwise for actions). Its number is just the count of
    the sample notifications.
  - Not protected yet: /browse can be opened by URL. Protecting it needs AuthContext (not built).
  - The account pages still show the white header with "Sign In" until AuthContext knows who is signed in.

Responsive sizing (junior: make sure the hero resizes dynamically with the window)
  - The hero sizes itself from the CARD (CSS container units), not the window: the poster is as tall as the card
    allows but never wider than 34% of it; the text column is "whatever room is left" after the poster, so the
    title never touches the poster (always at least 2rem apart); the title and the badge row scale with the card.
  - Card height: 74% of the window height, between 38rem and 50rem. Poster at most ~437px wide (the poster files are
    480px wide; bigger would look soft) and at least ~308px (so the badge row fits).
  - Very wide windows (over ~2000px): the card stays full width and the glow fills it, but the text and poster stay
    grouped in a centered 1900px, instead of drifting to opposite edges.
  - The header: the search field is the part that shrinks (26rem down to 8rem) so nothing sticks out of a narrow window.
  - Measured on a grid of 9 widths (1000 to 3440) x 6 heights (600 to 1440) x all 10 films then in the data: 0 problems. Works down to
    about 1000px wide (desktop only for now).

Shows and Movies (junior: "stay on the home page and apply a filter")
  - Pressing Shows opens /browse?type=show; Movies opens /browse?type=movie; Home or the logo opens plain /browse (everything).
    The pill sits on whichever tab matches, the same way it sits on My NextFlick on the other page (aria-current too).
  - The hero and all three rows then show only that kind of title. In Shows: the hero is a TV show (its facts line reads
    "Show, Comedy, Crime, 2013, 8 Seasons, TV-14") and its refresh button cycles through the 11 shows only; the rows hold
    8 / 6 / 10 shows. In Movies: only movies. A row with nothing in it is not drawn. The Top 10 chip is only for the ten
    Top 10 movies. Landing's Featured Films stays the ten movies.
  - The filter is in the address (?type=), so it survives a reload and the Back button walks back through the filters. Any
    other value means everything. From My NextFlick, Shows/Movies lead to the filtered home page.
  - Every title has a `type`; the three rows' stand-in lists mix shows with movies and a filter keeps the matching ones.
  - The 11 shows were found on IMDb under the same rule as the movies (not overly sexualized, violent or supernatural; exciting
    for 18 to 53; all live-action; TV-G/PG/14 with Sex and Violence None or Mild): Planet Earth II, Cosmos, Brooklyn Nine-Nine,
    Parks and Recreation, Friday Night Lights, The Amazing Race, MacGyver, MythBusters, Monk, Psych, Downton Abbey.

Try it
  cd para-netflix
  npm run dev          sign in at http://localhost:5173/login (any email + 8+ character password)
                       or open http://localhost:5173/browse

More detail: USER_JOURNEY.md here, and the roadmap in README.txt at the project root.
