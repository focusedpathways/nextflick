import { useEffect, useRef, useState } from 'react'
import PosterCard from './PosterCard.jsx'
import titles from '../data/titles.json'
import './FeaturedRow.css'

// "Featured Films": a horizontally scrolling row of ranked posters with a big outlined
// number overlapping each card, and arrow buttons to page the row left/right.
export default function FeaturedRow() {
  const scroller = useRef(null)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(true)

  // Show each arrow only when there is more to scroll in that direction
  function updateArrows() {
    const el = scroller.current
    if (!el) return
    setCanLeft(el.scrollLeft > 8)
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8)
  }

  useEffect(() => {
    updateArrows()
    window.addEventListener('resize', updateArrows)
    return () => window.removeEventListener('resize', updateArrows)
  }, [])

  function page(direction) {
    const el = scroller.current
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <section className="featured" aria-labelledby="featured-heading">
      <h2 id="featured-heading" className="featured-heading">Featured Films</h2>

      <div className="featured-wrap">
        {canLeft && (
          <button type="button" className="featured-arrow featured-arrow--left" onClick={() => page(-1)} aria-label="Scroll featured films left">
            &#8249;
          </button>
        )}

        <ol className="featured-row" ref={scroller} onScroll={updateArrows} tabIndex={0} aria-label="Featured films, scroll sideways">
          {titles.map((film, index) => (
            <li className="featured-item" key={film.id}>
              <span className="featured-rank" aria-hidden="true">{index + 1}</span>
              <PosterCard {...film} />
            </li>
          ))}
        </ol>

        {canRight && (
          <button type="button" className="featured-arrow featured-arrow--right" onClick={() => page(1)} aria-label="Scroll featured films right">
            &#8250;
          </button>
        )}
      </div>
    </section>
  )
}
