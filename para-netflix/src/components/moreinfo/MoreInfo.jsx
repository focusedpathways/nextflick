import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import MoreInfoHero from './MoreInfoHero.jsx'
import MoreInfoDetails from './MoreInfoDetails.jsx'
import MoreInfoMoreLikeThis from './MoreInfoMoreLikeThis.jsx'
import './MoreInfo.css'

// Everything that can take keyboard focus, for keeping Tab inside the pop-up
const FOCUSABLE = 'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'

// The "More Info" pop-up: a panel over a dimmed page, opened from the hero's More Info button or by
// pressing a thumbnail in any row (Browse keeps which film is open: lifted state). It has a hero
// section, the details under it (year, running time, rating, summary, cast, genres) and "More Like This".
// Pressing a card there switches the pop-up to that film (onSelectFilm) WITHOUT closing it, so the page's
// focus and scroll lock stay as they were and focus still returns to the original button on close.
//
// Behaves like a proper dialog:
//   - drawn into <body> (a portal), so no part of the page can sit on top of it
//   - Esc, the X, or a click on the dimmed area closes it
//   - the page behind stops scrolling (the pop-up itself scrolls if it is taller than the window)
//   - Tab stays inside it, and focus goes back to the button that opened it when it closes
//   - screen readers get role="dialog" with the film's title as its name
export default function MoreInfo({ film, onSelectFilm, onPlay, onClose }) {
  const overlayRef = useRef(null)
  const dialogRef = useRef(null)
  const titleId = useId()

  useEffect(() => {
    const opener = document.activeElement   // the button that opened us: focus returns to it
    const body = document.body
    const before = { overflow: body.style.overflow, paddingRight: body.style.paddingRight }
    // hiding the page's scrollbar would make the page jump sideways, so its width is kept as padding
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    body.style.overflow = 'hidden'
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`
    dialogRef.current.focus()

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab') return
      const items = [...dialogRef.current.querySelectorAll(FOCUSABLE)]
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      body.style.overflow = before.overflow
      body.style.paddingRight = before.paddingRight
      opener?.focus?.()
    }
  }, [onClose])

  // A different film while it stays open (a More Like This card): back to the top, and focus to the panel
  // (the card that was pressed is gone), so a screen reader announces the new title.
  useEffect(() => {
    overlayRef.current.scrollTop = 0
    dialogRef.current.focus({ preventScroll: true })   // moving focus must not scroll the panel away from the top
  }, [film.id])

  return createPortal(
    // pressing on the dimmed area itself (not on the panel) closes it
    <div className="moreinfo" ref={overlayRef} onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="moreinfo__dialog" role="dialog" aria-modal="true" aria-labelledby={titleId} tabIndex={-1} ref={dialogRef}>
        {/* key: a different film starts the hero afresh (My List and Like off, the entrance replays) */}
        <MoreInfoHero key={film.id} film={film} titleId={titleId} onPlay={onPlay} onClose={onClose} />

        <MoreInfoDetails film={film} />
        <MoreInfoMoreLikeThis film={film} onSelectFilm={onSelectFilm} />
      </div>
    </div>,
    document.body,
  )
}
