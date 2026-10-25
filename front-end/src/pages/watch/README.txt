WATCH PAGE: THE DEMO PLAYER (folder: src/pages/watch/)
======================================================

What this is
  The page Play opens. Route: /watch/:id (for example /watch/top-gun-maverick). It is a page of its own, full screen,
  with no header and no footer. Both Play buttons lead here: the white Play on the home hero and the Play inside the
  More Info pop-up. An id that matches no title sends the viewer to /browse.
  There are no real films or trailers, so the page plays the Landing page's stock montage (public/videos/landing-loop.mp4)
  as STAND-IN footage, says so on the screen, and keeps an honest clock. What was watched is saved, which is what makes
  the Continue Watching rows real.

What is in this folder
  README.txt         this file, a quick orientation
  USER_JOURNEY.md    the viewer's path: how they get here, what they can do, how they leave
  Watch.jsx          the page (Watch looks the title up; WatchPlayer holds the clock, the footage and the controls)
  Watch.css          the full-screen look and the hand-drawn progress bar

Shared pieces it uses
  src/context/watchHistoryContext.js + WatchHistoryProvider.jsx   the saved watch history (see below)
  src/components/BackgroundVideo.jsx (VIDEO_SRC)                  the stand-in footage
  src/utils/motion.js (prefersReducedMotion), src/utils/format.js (formatRuntime)
  src/components/icons.jsx                                        Play, Pause, Back
  src/components/MemberPage.jsx                                   hands every member page playFilm(film), which goes here

The page in one paragraph (junior: "what should we do when they press Play? this is just a demo", then "video player a
different page?")
  Black screen filled by the footage (unblurred, silent, looping). Top left: a round Back button and the title in
  silver spaced capitals. Bottom: a caption ("Demo: stand-in footage, not <title>."), then a round white Pause/Play
  button, a progress bar and "12m of 2h 10m". A bar that can be dragged, or moved with the arrow keys.
  - THE CLOCK: one film-minute per real second, so a 2 h 10 m film "plays" for about two minutes and the movement is easy
    to see. Pausing stops the clock and the footage together. At the end the footage stops, the caption says "The end
    (demo)." and the button says "Play again" (it restarts from 0). For a TV show the length is one episode (22 to 60 min).
  - KEYS: Space plays and pauses (when a control has focus the control handles Space itself); Esc leaves.
  - LEAVING: the Back button, Esc and the browser's Back all leave. If the viewer came from somewhere in the app, they go
    back there (so the Shows or Movies filter is still on, and the email is still known); if the page was opened directly
    (a bookmark, a typed address), they go to /browse. Playing from inside the More Info pop-up returns to the page
    behind it; the pop-up is not reopened (it lives in that page's state).
  - REDUCED MOTION: no <video> at all; the film's poster on a dark screen and the caption says "a still of <title>
    stands in for the film". The clock and the controls work the same.

Continue Watching is real now
  - The watch history (src/context/WatchHistoryProvider.jsx) keeps { id, minutes } for each played title, most recently
    played first, in this browser's localStorage under `nextflick:watching`. Entries for titles that no longer exist or with
    nonsense minutes are dropped when it loads; if storage is blocked it just is not remembered.
  - Opening the player records the title at once (so it moves to the front), then every 5 film-minutes while playing, and
    when leaving. Reaching the end (or dragging to the end) FINISHES the title: it is taken out of the history, and leaving
    afterwards does not put it back. Replaying a half-watched title starts at its saved minute; a finished one starts at 0.
  - continueWatching(type, playedIds) in src/utils/recommend.js puts the played titles first and then the old stand-in list
    as filler (so a brand-new demo is not empty), with no title twice, then applies the Shows / Movies filter. Browse and
    My NextFlick pass the history in, so both rows always agree.
  - The history belongs to the BROWSER, not a person: no accounts or database yet (same as My List).

Verified (real browser)
  Hero Play -> /watch/top-gun-maverick (no header, footer): footage playing, caption, "3m of 2h 10m" after ~3.5 s, Pause froze
  the clock and the footage, End key = "2h 10m of 2h 10m" with "The end (demo)" and "Play again", a title scrubbed back 3
  minutes ran to the end by itself, Play again = 0m; Back -> /browse and the title leads Continue Watching; a show played
  from the Shows filter, Esc -> /browse?type=show with the pill on Shows and the show leading there but not under Movies;
  Play from the pop-up -> browser Back -> home page, pop-up closed, title leading; My NextFlick shows the same order;
  reload keeps it; replay resumes at the saved minute (1m of 1h 42m); a finished title leaves the saved list and stays out
  after leaving; Space toggles; saved at minute 5 while playing and on leaving; direct visit Back -> /browse; /watch/banana
  -> /browse; reduced motion: 0 videos, poster, pause works; More Info, More Like This, My List and Landing unaffected;
  no console errors; lint (0 warnings) and build clean.

A testing note (found here)
  If a screenshot hangs on "waiting for fonts to load" and requestAnimationFrame runs at about 1 frame per second on EVERY
  page (even Landing), the browser tab is in the background and the browser is throttling it: it is not the page. Call
  page.bringToFront() (the page then ran at 121 frames per second with the full-screen video playing).

Try it
  cd para-netflix
  npm run dev          sign in at http://localhost:5173/login, then press Play on the hero. Press the Back button, and look
                       at Continue Watching.

More detail: USER_JOURNEY.md here, and the roadmap in README.txt at the project root.
