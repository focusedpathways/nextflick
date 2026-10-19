# User journey: My NextFlick (`/my-nextflick`)

**Who:** a signed-in member who wants their own corner: what they were watching, and the films they saved.
**Goal:** pick up where they left off, or open something from their list.

Code: `src/pages/mynextflick/MyNextFlick.jsx`. It uses the shared `MemberPage` shell, `ThumbnailRow` and the shared My List (`src/context/`).

## How they get here

- Press **My NextFlick** in the header (from the home screen, or from this page's own header).
- They always leave through the header too: **Home** or the NextFlick logo goes to the home screen (`/browse`).

## What they see

1. The same **header** as the home screen: logo, tabs, search, bell and profile menu. The soft filled bubble is now around **My NextFlick**, so they can see which page they are on. (On the home screen it is around Home.)
2. Directly under the header, the **Continue Watching** row: the same row, with the same films in the same order, as on the home screen. Anything they have played with **Play** comes first (most recent first), then a fixed list so the row is never empty. It scrolls sideways with a button on each side.
3. Below it, **My List**: the films they added with the **+** button on a film's More Info pop-up. The newest one comes first. They are laid out in a grid that wraps, so every film is visible at once (there is nothing to scroll sideways).
4. The footer, the same as on the home screen.

There is no big hero card on this page.

## How a film gets into My List

1. On the home screen (or anywhere a thumbnail is) they press a film to open its **More Info** pop-up. (Or they press More Info on the hero card.)
2. They press the round **+** button. It becomes a check mark: the film is in their list.
3. They can do this for as many films as they like, including films they reach by pressing a card in "More Like This".
4. The list is kept in this browser, so it is still there after they close the page and come back.

## How a film leaves My List

1. On this page they press the film's thumbnail: its More Info pop-up opens, and its button already shows the check mark.
2. They press the check mark: it turns back into a **+**, and the film disappears from My List behind the pop-up.
3. They can also remove a film the same way from the home screen's pop-up.

## What they see when the list is empty

Under the **My List** heading: "Nothing here yet. Press the + button on a film's More Info page to add it to My List."

## What can go wrong

| Situation | What the member sees |
|---|---|
| Opened directly at `/my-nextflick` with no sign-in | The page works: nothing is protected yet. The profile menu has no email line. |
| A different person signs in on the same browser | They see the same list: it belongs to the browser until there is a database. |
| The browser blocks storage (a private window) | The list works while the page is open, and is empty again after a reload. |
| Shows or Movies pressed | They go to the home page with that filter (only TV shows, or only movies). |

## Exits

- Home tab or logo → `/browse` (everything). Shows or Movies tab → the home page showing only TV shows / only movies.
- Any film thumbnail → its More Info pop-up (and from there, "More Like This" cards switch films; Esc closes it back to this page).
- Profile menu → the account pages (Change password, Contact information, Billing information) or Sign out (→ Landing).

## Open questions

- Should **My List** be a scrolling row like the others instead of a grid? (A grid was chosen because the list can grow and every film stays visible.)
- Should there be a way to **reorder** the list, or a **remove** button on the thumbnail itself (not just in the pop-up)?
- Should **Continue Watching** show how far through each film they are (a progress bar), now that it has its own page? Not built.
- Should this page have its own **big feature** at the top, or stay simple as it is?
- Should **Like** (the thumbs up) also get a section here ("Films I liked")? Not built; Like is not saved yet.
- When there is a database, My List should belong to the member, not the browser.
