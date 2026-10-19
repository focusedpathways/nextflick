# User journey: Browse, the home screen (`/browse`)

**Who:** a member who just signed in.
**Goal:** find something to watch, and reach their account.

Code: `src/pages/browse/Browse.jsx` (the page), `MemberHeader.jsx` (the top bar), `SearchField.jsx`, `src/components/Dropdown.jsx` (both menus).

**So far the header, the hero, three rows of thumbnails, the footer and the More Info pop-up's hero section are built.**

## Steps

1. The visitor arrives from the Gateway after a valid login. Their email comes in router state.
2. They see the header at the top: the NextFlick logo, the tabs **Home**, **Shows**, **Movies**, **My NextFlick** (Home is highlighted), a long white **search** field, a **bell** with a count badge, and their **profile icon** with a caret.
3. Under the header is the **hero**: a large card for the film we think they will love, with its title, a facts line (Movie, the first two genres, year, rating), a short synopsis, a **Play** button and a **More Info** button. The poster is on the right and the card glows in its colors. Under the poster, in one row as wide as the poster: the popcorn and the words "We think you'll love this!" (no bubble around them) on the left, and, for films in the Top 10, the "No. N in Top 10" chip on the right (the 16 newer films are not in the Top 10, so they show only the popcorn line).
4. Below the hero are three rows: **Most Rewatched**, **Continue Watching** and **We Think You'll Love These**. Each is a strip of poster thumbnails.
5. They can type in the search field, click a tab, open either menu, use the hero, or press a thumbnail.

## The rows

1. Each row scrolls sideways and always has a scroll button on each side, just inside the row's edges (the rows line up exactly with the hero's left and right edges). A button is dimmed when there is nothing more to see that way (at the start the left one is dimmed; Continue Watching usually fits, so both are dimmed); pressing an active one moves the row along. Scrolling the mouse wheel over a row still moves the whole page up and down.
2. Every thumbnail is a button: it can be reached with the Tab key, shows a focus ring, and grows a little when the mouse is over it.
3. Pressing a thumbnail opens the More Info pop-up for that film (see `moreinfo/USER_JOURNEY.md`).
4. We Think You'll Love These leaves out the film the hero is already showing.
5. The rows' films are stand-ins for a database, except that Continue Watching is real: titles the member has played with **Play** come first, then a fixed list. Most Rewatched shows 20 titles (8 shows and 12 movies in the Shows/Movies views), Continue Watching up to 12 plus whatever was played, We Think You'll Love These 15, mixing exciting live-action films (Top Gun: Maverick, Apollo 13, Back to the Future, F1, ...) with the original family films.

## The hero

1. **Which film:** it changes every time they log in (a different film each login) and stays the same while they move around, open account pages and come back, or reload. A database algorithm will choose it later; for now it walks through the films in a fixed order.
2. **Motion:** the soft glow behind the card is alive: it drifts and slow patches of light move through it (it is a blurred video, so nobody can tell it is not the film's own footage). The poster floats gently and catches a passing band of light, and the card shifts a little as the mouse moves across it. When a new film appears, the poster rises in and the text follows line by line. With "reduce motion" turned on, none of this moves and the video is not loaded.
3. The round **refresh** button at its top right shows the next pick (it does not change what the next login shows). Pressing it ten times goes through all the films and wraps.
4. **Play** goes to the demo player page (`/watch/<film>`: stand-in footage, a clock, a progress bar). Whatever they play moves to the front of Continue Watching. See `src/pages/watch/USER_JOURNEY.md`.
5. **More Info** opens the More Info pop-up for the film shown in the hero (see `moreinfo/USER_JOURNEY.md`).

## Shows and Movies (the filter)

1. In the header, **Home**, **Shows** and **Movies** are three views of the same page. The filled bubble is around the one you are on.
2. Pressing **Shows** keeps them on the home page but only TV shows appear: the hero (a show, with its number of seasons in the facts line, for example "Show, Comedy, Crime, 2013, 8 Seasons, TV-14") and all three rows. The hero's refresh button then steps through the shows only.
3. Pressing **Movies** does the same for movies. Pressing **Home** (or the logo) shows everything again.
4. The page address changes (`/browse?type=show`, `/browse?type=movie`), so reloading keeps the filter and the browser's Back button goes back to the previous view.
5. A show's More Info pop-up says how many seasons it has instead of a running time, and its More Like This shows other shows.

## The footer

Below the last row is the same footer as the Landing page: "Questions? Call 1-800-555-0199", four columns of links (placeholders: they go nowhere yet) and the credit line. It has no sign-up email form (they are already a member), and it lines up with the hero and the rows.

## The notifications menu (bell)

1. They click the bell. A panel opens under it with the heading "Notifications" and three sample items, each with a line of text and when it happened.
2. They close it by clicking the bell again, clicking anywhere else, or pressing Escape.
3. Clicking the profile icon while it is open closes it and opens the profile menu instead.

## The profile menu (profile icon)

1. They click the profile icon. A panel opens with their email, the heading "Account" and three links: **Change password**, **Contact information**, **Billing information**, then a divider and **Sign out**.
2. Each account link opens a page they already know from signing up, reworded for changing (a **Save** button, and **Back** returns here): `/account/password`, `/account/contact`, `/account/billing`.
3. **Sign out** goes to Landing (`/`). There is no real session yet.

## What can go wrong

| Situation | What the visitor sees |
|---|---|
| Opened directly at `/browse` with no sign-in | The page works: there is no protection yet. The profile menu has no email line. |
| Shows or Movies pressed | The home page stays, filtered: the hero and every row show only TV shows (or only movies), and the bubble moves to that tab. Home or the logo clears the filter; My NextFlick opens its own page (`src/pages/mynextflick/`). |
| Play pressed | Nothing happens yet. |
| A thumbnail pressed | The More Info pop-up opens for that film. |
| Search typed and Enter pressed | The text stays in the field. Nothing is searched yet. |
| An account page opened | It still has the white header with "Sign In" (it does not know who is signed in yet). |

## Exits

- **Logo and Home tab → `/browse`, always.** Past the Gateway nothing leads back to Landing except Sign out. When already on the home screen they bring the Home highlight back and scroll to the top. The signed-in email is carried along, so the profile menu keeps showing it.
- Change password / Contact information / Billing information → `/account/password`, `/account/contact`, `/account/billing`; Save or Back returns to `/browse`, and the logo on those pages goes to `/browse` too (not Landing).
- Sign out → `/`.

## Open questions

- Hero motion: the blurred glow now has a real video in it (the Landing montage, slowed). Should it ever show the film's own trailer clip instead? That needs clips we would have to source.
- Should the popcorn be two thumbs up instead? It is an easy swap.
- What should the dropdowns hold? (To discuss next; the contents now are placeholders.)
- Should the bell badge go away once the panel has been opened? Currently it always shows the count.
- Shows and Movies filter the home page (decided). Should there later also be genre filters, or real Shows and Movies pages with seasons and episodes?
- Should Sign out clear a session? That needs AuthContext.
- Profile icon: now just a silver head-and-shoulders with no square. Still a placeholder design; swap for another if wanted.
- Should the thumbnails be landscape like the reference? That needs wide art per film (our posters are portrait).
- Should Continue Watching show a progress bar under each thumbnail, and say "for ryan" in its heading, like the reference? Not built (simple thumbnails were asked for).
