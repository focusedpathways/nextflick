MY NEXTFLICK PAGE (folder: src/pages/mynextflick/)
==================================================

What this is
  The member's own page. Route: /my-nextflick. Reached from the "My NextFlick" tab in the header.
  Same header and footer as the home screen; then the Continue Watching row, then My List.

What is in this folder
  README.txt         this file, a quick orientation
  USER_JOURNEY.md    the member's path: how they get here, what they see, how My List fills and empties
  MyNextFlick.jsx    the page: two ThumbnailRows inside the shared MemberPage shell

Shared pieces it uses (src/components/ unless noted)
  MemberPage.jsx/.css      the shell of every signed-in page: MemberHeader + the page's content + the Landing footer
                           (without the sign-up prompt) + the More Info pop-up, which it opens for any film
  MemberHeader.jsx/.css    the top bar (moved here from pages/browse: the home screen and this page both use it)
  ThumbnailRow.jsx/.css    a titled row of thumbnail buttons; new `wrap` and `emptyMessage` options (see below)
  moreinfo/                the More Info pop-up (its + button is what fills My List)
  src/context/myListContext.js + MyListProvider.jsx   the shared My List (see below)
  src/utils/recommend.js   continueWatching(type, playedIds): the same list as the Continue Watching row on the home screen
  src/context/watchHistoryContext.js + WatchHistoryProvider.jsx   what the member has really played (see pages/watch/)

The page in one paragraph (junior's spec)
  "Header menu is the same as the current page. The bubble that is over Home will be around My NextFlick to show what
  page we are on. The first row below the menu is simply the Continue Watching row: reuse what we already have. Below
  that, a section for My List: videos that had the plus button pressed on their More Info page."
  - Header: identical to the home screen's (logo, tabs, search, bell, profile menu). The filled pill sits on "My NextFlick"
    (and aria-current marks it); Home has none. Pressing Home or the logo goes to /browse, where the pill is on Home.
  - First row: Continue Watching, the very same ThumbnailRow as on the home screen, fed by the same continueWatching(type,
    playedIds): titles the member has really played (Play -> /watch/:id) come FIRST (most recent first), then the stand-in
    list as filler so the row is never empty.
  - My List: the films the member added with the + button on a film's More Info pop-up, NEWEST FIRST, shown as a wrapping
    grid (all of them visible, no sideways scrolling, no scroll buttons: a list can grow). Thumbnails are buttons that
    open that film's More Info pop-up, where its + is already on; pressing it takes the film out of the list (you can see
    it disappear behind the pop-up). When the list is empty the section says: "Nothing here yet. Press the + button on a
    film's More Info page to add it to My List."
  - There is no hero on this page.

My List (the shared state)
  - src/context/myListContext.js: the context and the useMyList() hook (ids, films, has(id), toggle(id)).
  - src/context/MyListProvider.jsx: holds the list in React state and keeps it in this browser's localStorage under
    `nextflick:my-list` (only film ids, newest first), so it survives a reload. It is provided once, in main.jsx, so the
    pop-up (which changes it) and this page (which shows it) always agree, on every page.
  - There is no account or database yet, so the list belongs to the BROWSER, not to a person: anyone signing in on this
    browser sees it. With a database it would belong to the signed-in member (replace MyListProvider, keep useMyList()).
  - Storage can be missing or blocked (private window): then the list works but is forgotten on reload. Unknown or removed
    film ids in storage are dropped when it loads.
  - The two files are separate because of a fast-refresh lint rule: a file should export components or non-components,
    not both.

ThumbnailRow's new options (used here, also available to any page)
  - wrap: shows the films as a wrapping grid instead of a scrolling row (no arrows). In a grid a hovered thumbnail only
    lifts (it does not grow), so the left-hand ones never pass the page's left line.
  - emptyMessage: shown under the heading in place of the thumbnails when there are none.

Verified (real browser)
  The pill is on My NextFlick only; first row is Continue Watching (F1, Twisters, Hidden Figures, David, Free Solo, Sully);
  My List shows two added films newest first, no arrows, wrapping; the pop-up opens from a list thumbnail with + on;
  removing from the pop-up updates the list behind it and localStorage; the list survives a reload; the empty message
  shows after removing the last one; Home and the logo go back to /browse (pill returns); Shows and Movies lead to the filtered home page (then),
  the email travels (profile menu still shows it); no console errors; lint and build clean.

Try it
  cd para-netflix
  npm run dev          sign in at http://localhost:5173/login, press More Info on a film, press +, then open My NextFlick.

More detail: USER_JOURNEY.md here, src/components/moreinfo/README.txt, and the roadmap in README.txt at the project root.
