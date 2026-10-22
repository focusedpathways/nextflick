import { formatLength } from '../../utils/format.js'
import './MoreInfoDetails.css'

// The facts under the pop-up's hero (modeled on the junior's Netflix screenshots), in two columns.
//   Left:  the year and how long it is (a movie's running time, a show's number of seasons); the rating in a small box with the reason the film got it
//          (the MPAA's own words, as IMDb lists them; a few older films have none); then the short summary.
//   Right: the cast, and just below it the genres.
// Everything comes from the film's entry in src/data/titles.json (year, runtime, rating, advisory,
// synopsis, cast, genres), all checked against IMDb. A TMDB film whose details could not be loaded has no cast,
// rating or real running time (services/tmdb.js): those parts are left out instead of showing blanks or guesses.
export default function MoreInfoDetails({ film }) {
  return (
    <section className="mi-details" aria-label={`About ${film.title}`}>
      <div className="mi-details__main">
        <p className="mi-details__line">
          <span>{film.year}</span>
          {film.runtimeKnown !== false && <span>{formatLength(film)}</span>}
        </p>

        {film.rating && (
          <p className="mi-details__rating">
            <span className="mi-details__badge">{film.rating}</span>
            {film.advisory && <span className="mi-details__advisory">{film.advisory}</span>}
          </p>
        )}

        <p className="mi-details__summary">{film.synopsis}</p>
      </div>

      <dl className="mi-details__facts">
        {film.cast.length > 0 && (
          <div>
            <dt>Cast:</dt>
            <dd>{film.cast.join(', ')}</dd>
          </div>
        )}
        {film.genres.length > 0 && (
          <div>
            <dt>Genres:</dt>
            <dd>{film.genres.join(', ')}</dd>
          </div>
        )}
      </dl>
    </section>
  )
}
