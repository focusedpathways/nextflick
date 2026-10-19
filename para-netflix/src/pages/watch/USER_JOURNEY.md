# User journey: Watch, the demo player (`/watch/:id`)

**Who:** a signed-in member who pressed **Play**.
**Goal:** "watch" a film or show, and later pick it up again where they left off.

Code: `src/pages/watch/Watch.jsx`. The saved history is in `src/context/` and feeds the Continue Watching rows.

**This is a demo.** There are no real films, so the page plays stand-in footage (a silent stock montage) and says so on the screen.

## How they get here

- They press the white **Play** on the home page's big card (the film shown there plays), or
- they press **Play** inside a film's **More Info** pop-up (that film plays).

The browser goes to a page of its own, `/watch/<film>`, full screen, without the header or the footer.

## What they see

1. The stand-in footage fills the screen.
2. Top left: a round **Back** button and the film's **title**.
3. Bottom: a line saying it is a demo ("Demo: stand-in footage, not <the film>."), then a white **Pause** button, a **progress bar** and the time ("12m of 2h 10m").
4. Time moves at one film-minute for every real second, so a long film "plays" for a couple of minutes. For a TV show, the length shown is one episode.

## What they can do

| They do this | It does this |
|---|---|
| Press Pause (or Space) | The clock and the footage stop. The button becomes Play. |
| Press Play (or Space) | They carry on. |
| Drag the progress bar, or move it with the arrow keys | They jump to that minute. |
| Let it run to the end | The footage stops, it says "The end (demo).", and the button says "Play again". |
| Press Play again | It starts over from the beginning. |

## How they leave

- The round **Back** button, the **Esc** key, or the browser's **Back** button.
- They land where they came from: the home page (with the Shows or Movies filter still on if it was), or My NextFlick. If they opened the page directly, they land on the home page.
- If they had pressed Play inside a pop-up, they land on the page behind it. The pop-up is closed.

## What it does to Continue Watching

1. The moment the player opens, the film moves to the **front of Continue Watching** (on the home page and on My NextFlick).
2. Their place is remembered while they watch and when they leave. Next time they press Play on it, it **starts at that minute**.
3. If they watch it to the end, it **leaves Continue Watching** (it is finished).
4. It is kept in the browser, so it is still there after a reload.
5. The Shows and Movies filter applies: a show they played appears at the front under Shows, not under Movies.
6. At the start, Continue Watching shows a fixed list so it is never empty; anything really played goes in front of it.

## Keyboard and screen readers

- Space plays and pauses, Esc leaves, the arrow keys move the progress bar.
- The page is named "Now playing: <title>". The Pause/Play button says what it will do ("Pause", "Play", "Play again"), and the progress bar reads aloud as "12m of 2h 10m".
- With "reduce motion" turned on, no video plays: they see the film's poster on a dark screen, and everything else works.

## What can go wrong

| Situation | What they see |
|---|---|
| A made-up address like `/watch/banana` | They are sent to the home page. |
| The browser blocks storage (a private window) | Playing works, but Continue Watching forgets it after a reload. |
| A different person uses the same browser | They see the same Continue Watching: it belongs to the browser until there is a database. |

## Open questions

- Should the footage have **sound**? It is silent stock footage, so there is no volume button.
- Should the controls **fade away** after a few seconds, like a real player? Now they always show.
- Should **Continue Watching** show a **progress bar** under each thumbnail now that progress is saved? Not built.
- Should a show play **episode by episode** (an episode list)? Now it is one length per show.
- Should the clock run at a different speed (now one minute per second)?
- Should a **real trailer** play for each film once there are clips?
