import { Fragment, useRef, useState } from 'react'
import GlowBackdrop from '../../components/GlowBackdrop.jsx'
import { prefersReducedMotion } from '../../utils/motion.js'
import { formatLength, typeLabel } from '../../utils/format.js'
import { currentPick, rankPicks, topTen } from '../../utils/recommend.js'
import { PlayIcon, PopcornIcon, RefreshIcon } from '../../components/icons.jsx'
import './Hero.css'

// The big feature card at the top of the home screen (modeled on the junior's Netflix screenshot):
// the film we think the viewer will love, with its title, a line of facts, a synopsis and two
// buttons. It starts on the film chosen at the last login (see utils/recommend.js; a database
// algorithm will replace that later) and the round button at the top right steps through the others.
//
// We only have portrait posters, which would look soft blown up to a wide backdrop, so the poster
// sits sharp on the right and a heavily blurred copy of it glows behind the card. Motion makes the
// card feel alive: the glow drifts, the poster floats and catches a passing sheen, and the layers
// shift a little against the mouse (parallax). All of it is switched off for "reduce motion".
//
// The glow really moves: it is the shared GlowBackdrop (a blurred poster plus a blurred, slowed-down
// video). It sits OUTSIDE the keyed part of the stage so a new pick does not restart the video.

//   type  'all', 'movie' or 'show': the hero only picks titles of that kind (Browse remounts it when the filter changes)
export default function Hero({ type = 'all', onMoreInfo, onPlay }) {
  const [picks] = useState(() => rankPicks(type))
  const [index, setIndex] = useState(() => picks.findIndex((t) => t.id === currentPick(type).id))
  const heroRef = useRef(null)
  const pick = picks[index]
  const rank = topTen().findIndex((t) => t.id === pick.id) + 1   // 1 to 10, or 0 when it is not in the Top 10
  // Movie  Action, Drama  2022  PG-13    or    Show  Comedy, Crime  2013  8 Seasons  TV-14
  const facts = [typeLabel(pick), pick.genres.slice(0, 2).join(', '), pick.year, pick.type === 'show' && formatLength(pick), pick.rating].filter(Boolean)

  // Parallax: write the pointer's position (-1 at the left/top edge, +1 at the right/bottom edge)
  // into two CSS variables. CSS does the moving, so React does not re-render on every mouse move.
  function handlePointerMove(event) {
    if (prefersReducedMotion()) return
    const box = heroRef.current.getBoundingClientRect()
    heroRef.current.style.setProperty('--px', (((event.clientX - box.left) / box.width) * 2 - 1).toFixed(3))
    heroRef.current.style.setProperty('--py', (((event.clientY - box.top) / box.height) * 2 - 1).toFixed(3))
  }

  function handlePointerLeave() {
    heroRef.current.style.setProperty('--px', 0)
    heroRef.current.style.setProperty('--py', 0)
  }

  return (
    <section
      className="hero"
      aria-label="Featured for you"
      ref={heroRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="hero__stage">
        <div className="hero__backdrop">
          <GlowBackdrop image={pick.image} />
        </div>

        {/* key: a new pick remounts everything below, which replays the entrance animations */}
        <Fragment key={pick.id}>
          <div className="hero__poster">
            <div className="hero__poster-float">
              <img src={pick.image} alt={`${pick.title} (${pick.year}) poster`} draggable="false" />
            </div>

            {/* under the poster, lined up with its left edge */}
            <ul className="hero__badges">
              <li className="hero__badge--love">
                <PopcornIcon />
                We think you&apos;ll love this!
              </li>
              {rank > 0 && <li>No. {rank} in Top 10</li>}
            </ul>
          </div>

          <div className="hero__content">
            <h1 className="hero__title">{pick.title}</h1>

            <ul className="hero__facts">
              {facts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>

            <p className="hero__synopsis">{pick.synopsis}</p>

            <div className="hero__actions">
              {/* Play goes to the demo player page (/watch/:id) */}
              <button type="button" className="hero__btn hero__btn--play" onClick={() => onPlay?.(pick)}>
                <PlayIcon />
                Play
              </button>
              {/* More Info opens the pop-up (Browse keeps which film is open) */}
              <button type="button" className="hero__btn hero__btn--info" onClick={() => onMoreInfo?.(pick)}>
                More Info
              </button>
            </div>
          </div>
        </Fragment>
      </div>

      <button
        type="button"
        className="hero__refresh"
        aria-label="Show another pick"
        onClick={() => setIndex((current) => (current + 1) % picks.length)}
      >
        <RefreshIcon />
      </button>
    </section>
  )
}
