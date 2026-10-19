import { useState } from 'react'
import GlowBackdrop from '../GlowBackdrop.jsx'
import { useMyList } from '../../context/myListContext.js'
import { CheckIcon, CloseIcon, PlayIcon, PlusIcon, ThumbUpIcon } from '../icons.jsx'
import './MoreInfoHero.css'

// The top of the More Info pop-up (modeled on the junior's two Netflix screenshots): a large picture
// area with the film's title at the bottom left, then a row of buttons (Play, add to My List, like),
// and a close button at the top right. We only have portrait posters, so, like the page's hero, the
// poster sits sharp on the right and the same moving glow (GlowBackdrop) fills the area behind it.
//
// Play goes to the demo player page (/watch/:id). "My List" is real: it adds the film to (or
// takes it out of) the shared My List (context/MyListContext.jsx, kept in the browser), which My NextFlick
// shows. "Like" only switches on and off here (it resets when the pop-up changes film); it is not saved.
// There is no volume button: it controls a trailer's sound, and there are no trailers (the glow's
// video is silent stock footage).
export default function MoreInfoHero({ film, titleId, onPlay, onClose }) {
  const { has, toggle } = useMyList()
  const inList = has(film.id)
  const [liked, setLiked] = useState(false)

  return (
    <section className="mi-hero">
      <div className="mi-hero__backdrop">
        <GlowBackdrop image={film.image} />
      </div>

      <img className="mi-hero__poster" src={film.image} alt={`${film.title} (${film.year}) poster`} draggable="false" />

      <div className="mi-hero__content">
        <h2 id={titleId} className="mi-hero__title">{film.title}</h2>

        <div className="mi-hero__actions">
          <button type="button" className="mi-hero__play" onClick={() => onPlay?.(film)}>
            <PlayIcon />
            Play
          </button>
          <button
            type="button"
            className="mi-hero__round"
            aria-pressed={inList}
            aria-label="My List"
            title={inList ? 'Remove from My List' : 'Add to My List'}
            onClick={() => toggle(film.id)}
          >
            {inList ? <CheckIcon /> : <PlusIcon />}
          </button>
          <button
            type="button"
            className="mi-hero__round"
            aria-pressed={liked}
            aria-label="I like this"
            title={liked ? 'Remove your like' : 'I like this'}
            onClick={() => setLiked((on) => !on)}
          >
            <ThumbUpIcon filled={liked} />
          </button>
        </div>
      </div>

      <button type="button" className="mi-hero__close" aria-label="Close" onClick={onClose}>
        <CloseIcon />
      </button>
    </section>
  )
}
