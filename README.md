# NextFlick

## Assignment: Agentic Netflix Clone I

In this assignment, you will have the opportunity to generate your own version of Netflix personalized around the shows and activities that interests you. Take your time to explore Media Platforms like:

- [Netflix](https://netflix.com)
- [HBO](https://hbo.com)
- [Disney +](https://www.disneyplus.com/home)
- [CrunchyRoll](https://www.crunchyroll.com/discover)

And take the time to identify their structure and main components of the application. If it helps you can open the inspector tools and hover your mouse over the sight to view diferent segments and how they fit together.

Have fun, put in effort, and focus on understanding the Front-End design structure more than anything 🚀

## About NextFlick

A Netflix-style single page app built for the Code Platoon assignment. The focus is front-end
structure: pages, shared layouts and reusable components. There is no backend: sign-in and billing
are mocked with local state and validation, and the film data is a hand-written JSON file.

Brand: **NextFlick** (its own identity). Look: dark, cool, metallic; Netflix red is the only warm
color and is reserved for actions. Desktop only for now.

## Run it

```
cd front-end
npm install        # first time only
npm run dev        # then open http://localhost:5173/  (never open index.html directly: white screen)
npm run lint
npm run build
```

Stack: Vite 8, React 19, react-router-dom, plain CSS (one `.css` next to each component or page).

## Where things are

The app is in `front-end/`; the paths below are inside it. Database files (migrations, the TMDB edge function, security notes) are in `supabase/`.

| Path | What |
|---|---|
| `src/App.jsx` | Routes. Also says what comes next in the sign-up flow |
| `src/pages/<name>/` | One folder per page: its code, a `README.txt` and a `USER_JOURNEY.md`. A pop-up that belongs to a page gets a subfolder the same way (`src/components/moreinfo/`) |
| `src/components/` | Shared layouts and pieces (`ShowcasePage`, `LightPage`, `MemberPage`, `MemberHeader`, `FormStep`, `FieldForm`, `SiteHeader`, `Footer`, `FeaturedRow`, `ThumbnailRow`, the `moreinfo/` pop-up, ...) |
| `src/context/` | State shared between pages (My List and the watch history, both kept in the browser) |
| `src/utils/validation.js` | Form rules used by more than one page |
| `src/data/titles.json` | The 37 titles, 26 movies and 11 TV shows (type, title, IMDb genres, year, running time or seasons, rating, cast, poster, IMDb link, synopsis). The first ten are the Top 10 |
| `src/utils/recommend.js` | Which films go where (hero pick per login, the rows, the Top 10): stand-ins for a database |
| `public/` | Background video, poster images, favicon |

## Pages

| Route | Page | Status |
|---|---|---|
| `/` | Landing | done |
| `/signup` | Password (sign-up step 1) | done |
| `/signup/contact` | Contact (sign-up step 2) | done |
| `/signup/billing` | Billing (sign-up step 3) | done |
| `/login` | Gateway (sign in) | done |
| `/403` | Error 403, wrong email or password (not linked from login until a database exists) | done |
| `/watch/:id` | The demo player: Play opens it; full screen, stand-in footage, a clock and a progress bar (what is played feeds Continue Watching) | done |
| `/my-nextflick` | My NextFlick: Continue Watching + My List (the films whose + was pressed) | done |
| `/browse` | The user's home screen. `/browse?type=show` and `/browse?type=movie` are the same page with only TV shows or only movies (the header's Shows and Movies tabs) | in progress: header (logo, tabs, search, notifications and profile dropdowns), hero, three thumbnail rows and the footer done; More Info pop-up in progress (hero section, details and More Like This are built) |
| `/account/password`, `/account/contact`, `/account/billing` | The profile menu's pages (the sign-up form pages reused with Save buttons) | done |
| `/profiles` | Who's Watching | skipped for now |

Sign-up flow: Landing, Password, Contact, Billing, Gateway, then the home screen. The Password,
Contact and Billing pages are standalone modules that are meant to be reused later in an account
menu (see `src/components/FORM_PAGES.md`).

## Documentation

- `front-end/README.txt`: the roadmap, the current state of each page and the decisions log.
- `CLAUDE.md`: project rules and the full current spec.
- `front-end/src/pages/<name>/README.txt` and `USER_JOURNEY.md`: per page.
- `front-end/src/components/FORM_PAGES.md`: how the reusable form pages are built.

## Status note (2026-10-16)

All pages through the watch page (`/watch/:id`) are built and awaiting the junior's audit. One open item: a reported "page does not resize with the window", traced to a pinned test-browser viewport rather than the CSS; see `front-end/README.txt` ("WHERE WE STOPPED") and `CLAUDE.md` ("Browser QA gotcha").
