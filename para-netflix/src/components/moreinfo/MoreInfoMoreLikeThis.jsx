import { useId } from 'react'
import { moreLike } from '../../utils/recommend.js'
import { formatLength } from '../../utils/format.js'
import './MoreInfoMoreLikeThis.css'

// "More Like This" under the details (modeled on the junior's second Netflix screenshot, the Bourne
// Collection): a heading and a grid of three cards across. Each card has a picture with the running time
// in its corner, and under it the rating, the year and a short summary. Pressing a card switches the
// pop-up to that film (onSelectFilm). The films come from moreLike() in utils/recommend.js (the ones that
// share the most genres: a stand-in for a database's "viewers also watched").
//
// Our art is portrait posters, so the wide picture area shows the poster whole in the middle, over a
// blurred copy of itself that fills the sides (the same trick as the hero's glow, without the video).
export default function MoreInfoMoreLikeThis({ film, onSelectFilm }) {
  const headingId = useId()
  const films = moreLike(film)

  return (
    <section className="mi-like" aria-labelledby={headingId}>
      <h3 id={headingId} className="mi-like__heading">More Like This</h3>

      <ul className="mi-like__grid">
        {films.map((other) => (
          <li key={other.id}>
            <button
              type="button"
              className="mi-like__card"
              aria-label={`${other.title} (${other.year})`}
              onClick={() => onSelectFilm(other)}
            >
              <span className="mi-like__pic" style={{ '--pic': `url(${other.image})` }}>
                <img src={other.image} alt="" loading="lazy" draggable="false" />
                <span className="mi-like__time">{formatLength(other)}</span>
              </span>

              <span className="mi-like__body">
                <span className="mi-like__meta">
                  <span className="mi-like__badge">{other.rating}</span>
                  <span>{other.year}</span>
                </span>
                <span className="mi-like__summary">{other.synopsis}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
