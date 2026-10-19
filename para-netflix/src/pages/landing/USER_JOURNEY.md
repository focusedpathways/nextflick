# User journey: Landing (`/`)

**Who:** a visitor who has heard of NextFlick and wants to start a membership, or who wants to sign in.
**Goal:** type an email address and press Get Started.

Code: `src/pages/Landing.jsx` (the page), `src/components/EmailCapture.jsx` (the form, used twice),
`src/components/SiteHeader.jsx` (`variant="overlay"`), `src/components/FeaturedRow.jsx`, `src/components/Footer.jsx`.

## Steps

1. The visitor opens `/`. A looping video plays behind the page (a still image shows instead if the video fails or the visitor prefers reduced motion).
2. They read the headline "Join now for the best access to your favorite shows and movies" and the line "Ready to watch? Enter your email to get started."
3. They type an email into the **Email address** field and press **Get Started →**.
4. If the email is valid, the app opens `/signup` and carries the email along (no password yet).

## Other ways in

- **Sign In** (top right, red text): goes to `/login`, the Gateway (the sign-in page).
- **Scroll down** to Featured Films: a row of the Top 10 posters (the first ten films in the data) they can scroll sideways. Posters do nothing when clicked yet.
- **Footer email form** ("Ready to watch? Enter your email to create or restart your membership."): same behavior as step 3, reached after scrolling.
- **Footer links** (FAQ, Help Center, Privacy, and so on): placeholders. They go nowhere (`#`).

## What can go wrong

| Situation | What the visitor sees |
|---|---|
| Email is empty or not shaped like `name@domain.tld` | Red message under the field: "Please enter a valid email address, like name@example.com." The field stays filled, the page does not move on. |
| Email has spaces around it | Trimmed before checking, so it is accepted. |
| Video fails to load | The still poster image shows instead. Nothing breaks. |

## Exits

- Valid email → `/signup` (the password step), with the email in router state.
- Sign In → `/login` (the Gateway).
- Nothing else leaves the page yet.

## Open questions

- Should the footer's email form and the hero form look different, or is the difference only visual (current design: yes, look only)?
- Should a returning visitor be sent to Sign In instead of the membership flow? Not decided.
