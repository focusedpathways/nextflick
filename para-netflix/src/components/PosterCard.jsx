import './PosterCard.css'

// A film poster. If the film has an `image` (a file in public/posters/), that photo
// is shown. Otherwise the poster is drawn in code: two-tone gradient, a shape per film,
// genre tag and a big title (palette and shape come from src/data/titles.json).
// The Browse page can reuse this card later.
export default function PosterCard({ title, genre, year, shape = 'diagonal', palette, image }) {
  if (image) {
    return (
      <figure className="poster poster--image">
        <img src={image} alt={`${title} (${year}) poster`} loading="lazy" draggable="false" />
      </figure>
    )
  }

  const [c1, c2, c3] = palette ?? ['#1b2430', '#07090d', '#9fb1c4']   // fallback if a film has neither image nor palette
  return (
    <figure
      className={`poster poster--${shape}`}
      style={{ '--c1': c1, '--c2': c2, '--c3': c3 }}
    >
      <span className="poster-genre">{genre}</span>
      <figcaption className="poster-caption">
        <span className="poster-title">{title}</span>
      </figcaption>
      <span className="poster-year">{year}</span>
    </figure>
  )
}
