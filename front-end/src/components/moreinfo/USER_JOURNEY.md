# User journey: More Info pop-up (on `/browse`)

**Who:** a member on the home screen who wants to know more about one film.
**Goal:** look at a film's page, and (later) learn about it, add it to their list, or play it.

Code: `src/components/moreinfo/MoreInfo.jsx` (the pop-up), `MoreInfoHero.jsx` (its top section). Opened by `Browse.jsx`.

**The pop-up has its hero section, the details under it, and a "More Like This" section under those.**

## How it opens

- The member presses **More Info** on the hero card (the film shown there opens), or
- presses **any thumbnail** in Most Rewatched, Continue Watching or We Think You'll Love These (that film opens).

The page behind dims and blurs a little, and the panel rises into the middle of the screen.

## What they see in the hero section

1. A large picture area at the top of the panel: the film's poster on the right, with a soft, slowly moving glow in the poster's colors behind it.
2. The film's **title** at the bottom left, in large silver capitals.
3. Under the title, three buttons:
   - **Play** (white): goes to the demo player page (`/watch/<film>`). Coming back lands on the page behind the pop-up, with the pop-up closed. See `src/pages/watch/USER_JOURNEY.md`.
   - **+** (My List): adds the film to My List and turns into a check mark; pressing the check takes it out again. The list is kept in the browser and shown on the **My NextFlick** page.
   - **Thumbs up** (I like this): fills in when pressed, and back when pressed again. Not saved yet (it resets when the film changes).
4. A round **X** at the top right.

## What they see in the details, under the hero

Two columns, like the Netflix references:

- **Left:** the film's **year** and **running time** (for example 2022 and 2h 10m). Under that, the **rating** in a small box (PG-13) with the **reason** it got that rating next to it (for example "sequences of intense action, and some strong language"). Then the film's **short summary**.
- **Right:** **Cast:** the three top-billed actors, and just below it **Genres:** (for example Action, Drama).

A few older films (Back to the Future, Chariots of Fire) have no rating reason listed, so only the rating box shows for them. The rating reasons are the official ones, so a more intense film shows its real reason.

## TV shows

A TV show's pop-up works the same way, with these differences: the line under the hero gives the **year and the number of seasons** (for example "2016  1 Season") instead of a running time; the rating box shows the TV rating (TV-G, TV-PG or TV-14) and has no reason beside it; and **More Like This** shows other TV shows, each with its number of seasons in the corner of its picture.

## What they see in More Like This, under the details

1. A heading, **More Like This**, and six cards in two rows of three, like the Netflix screenshot.
2. Each card has a wide picture (the film's poster, whole, over a blurred copy of itself) with the **running time** in its top right corner, then the **rating** in a small box and the **year**, then a three-line **summary**.
3. The films are the ones that share the most genres with the film they are looking at (never the film itself). For a database later: "viewers also watched".
4. **Pressing a card switches the pop-up to that film**: the same pop-up stays open, jumps back to the top, and shows the new film's hero, details and its own More Like This. They can keep going from film to film. The new film shows its own My List state, and Like starts off.
5. Cards work with the keyboard too (Tab to one, Enter to open it) and grow a little under the mouse.

## How they close it

- The **X**, the **Esc** key, or a click anywhere on the dimmed page outside the panel. (A click inside the panel does not close it.)
- Their place on the home screen is unchanged, and the keyboard focus returns to the button they pressed to FIRST open it (even after they have moved through several films in the pop-up).

## Keyboard and screen readers

- When it opens, keyboard focus moves into the panel. Tab and Shift+Tab move between Play, My List, Like and the X, and stay inside until it is closed.
- It is announced as a dialog named after the film. My List and Like announce whether they are on.
- While it is open the page behind does not scroll. If the panel is taller than the window, the panel itself scrolls.
- With "reduce motion" turned on, nothing animates and the glow's video is not loaded.

## What can go wrong

| Situation | What the viewer sees |
|---|---|
| Play pressed | Nothing happens yet. |
| My List pressed, then the pop-up closed and opened again | It is still on: the list is saved in the browser. (Like is not saved: it is off again.) |
| Window is short | The pop-up scrolls inside the dimmed area. |
| A very long title (for example The Secret Life of Walter Mitty) | The title wraps onto two lines and never touches the poster. |

## Exits

- Close → back to the home screen exactly as it was.
- There are no links out of the pop-up yet (the film's IMDb link is kept in the data and could be added as a link here).

## Open questions (for the junior, as we craft it)

- Answered: the cast stays at the top three names; the rating reasons stay.
- More Like This: should it show more than 6 films, or a different shape (for example the cards wider, two across)? Should hovering a card show a Play and a + like the real thing? Not built.
- Should the back/forward or a "back to the previous film" step exist after switching films? Not built (Esc closes the whole pop-up).

- Should the names, or the genres, be links to something later (a search)?
- Should the film's **IMDb link** appear in the pop-up (it is in the data)?

- The references have a **volume button** at the bottom right of the picture. It controls a trailer's sound and we have no trailers, so it is left out. Add a disabled one anyway, or wait for trailers?
- Should **Play** be the white pill (like the page hero) or the squarer white button of the references?
- Should the picture area be this tall (62% of the window), or shorter so more details show without scrolling?
- Should the poster sit on the right (like the page hero) or on the left, so the pop-up looks different from the card behind it?
- My List is saved in the browser and feeds My NextFlick. Should **Like** be saved too, and should the lists belong to the member (needs a database)?
- Should the panel also close when the member presses the browser's Back button? Not built.
