import PosterCard from './PosterCard.jsx'
import { topTen } from '../utils/recommend.js'
import useRowScroll from './useRowScroll.js'
import './FeaturedRow.css'

// "Featured Films": the Top 10 (topTen() in utils/recommend.js), a horizontally scrolling row of ranked posters with a big outlined
// number overlapping each card, and arrow buttons to page the row left/right.
export default function FeaturedRow() {
  // the scrolling and the arrows' show/hide logic is shared with Browse's rows
  const { scroller, canLeft, canRight, update: updateArrows, page } = useRowScroll()

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
          {topTen().map((film, index) => (
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
