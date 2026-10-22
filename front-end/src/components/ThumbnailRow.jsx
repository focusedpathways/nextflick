import { useId } from 'react'
import useRowScroll from './useRowScroll.js'
import './ThumbnailRow.css'

// A titled row of thumbnails that scrolls sideways (the rows under Browse's hero, and on My NextFlick). Every
// thumbnail is a real <button> (it opens the film's More Info pop-up through `onSelect`). Every row always has a
// left and a right scroll button (junior); a button is dimmed and disabled while there is nothing more to scroll
// that way. The row is exactly as wide as the hero above it (same column; see ThumbnailRow.css).
//   heading       the words above the row
//   films         the films to show (objects from titles.json)
//   onSelect      optional: called with the film when a thumbnail is pressed
//   wrap          show the thumbnails as a wrapping grid (all visible, no sideways scrolling, no scroll buttons)
//                 instead of a scrolling row: for a list that can grow, like My List
//   emptyMessage  shown under the heading instead of the thumbnails when `films` is empty
export default function ThumbnailRow({ heading, films, onSelect, wrap = false, emptyMessage }) {
  const { scroller, canLeft, canRight, update, page } = useRowScroll()
  const headingId = useId()
  const isEmpty = films.length === 0 && emptyMessage

  return (
    <section className="thumb-row" aria-labelledby={headingId}>
      <h2 id={headingId} className="thumb-row__heading">{heading}</h2>

      {isEmpty ? (
        <p className="thumb-row__empty">{emptyMessage}</p>
      ) : (
        <div className="thumb-row__wrap">
          {!wrap && (
            <button
              type="button"
              className="thumb-row__arrow thumb-row__arrow--left"
              onClick={() => page(-1)}
              disabled={!canLeft}
              aria-label={`Scroll ${heading} left`}
            >
              &#8249;
            </button>
          )}

          <ul
            className={wrap ? 'thumb-row__strip thumb-row__strip--wrap' : 'thumb-row__strip'}
            ref={scroller}
            onScroll={update}
          >
            {films.map((film) => (
              <li key={film.id}>
                <button
                  type="button"
                  className="thumb"
                  aria-label={`${film.title} (${film.year})`}
                  onClick={() => onSelect?.(film)}
                >
                  <img src={film.image} alt="" loading="lazy" draggable="false" />
                </button>
              </li>
            ))}
          </ul>

          {!wrap && (
            <button
              type="button"
              className="thumb-row__arrow thumb-row__arrow--right"
              onClick={() => page(1)}
              disabled={!canRight}
              aria-label={`Scroll ${heading} right`}
            >
              &#8250;
            </button>
          )}
        </div>
      )}
    </section>
  )
}
