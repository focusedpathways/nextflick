import { useEffect, useRef, useState } from 'react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import titles from '../../data/titles.json'
import { VIDEO_SRC } from '../../components/BackgroundVideo.jsx'
import { BackIcon, PauseIcon, PlayIcon } from '../../components/icons.jsx'
import { useWatchHistory } from '../../context/watchHistoryContext.js'
import { prefersReducedMotion } from '../../utils/motion.js'
import { formatRuntime } from '../../utils/format.js'
import './Watch.css'

// Watch (route /watch/:id): the demo player, a page of its own with no header or footer. There are no real films
// to play, so it plays the Landing page's stock montage as STAND-IN footage (and says so on the screen). Time moves
// at one film-minute per real second so progress is easy to see. What was watched is written to the watch history
// (context/WatchHistoryProvider.jsx), which is what makes the Continue Watching rows real.

// The page the address names; an unknown id goes back to the home screen
export default function Watch() {
  const { id } = useParams()
  const film = titles.find((t) => t.id === id)
  if (!film) return <Navigate to="/browse" replace />
  return <WatchPlayer key={film.id} film={film} />
}

function WatchPlayer({ film }) {
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email
  const { progressOf, record, finish } = useWatchHistory()

  // Start where the member left off (a title that was finished starts from the beginning)
  const [minutes, setMinutes] = useState(() => {
    const saved = progressOf(film.id)
    return saved >= film.runtime ? 0 : saved
  })
  const [playing, setPlaying] = useState(true)
  const [withVideo] = useState(() => !prefersReducedMotion())   // "reduce motion": no video, the poster instead
  const videoRef = useRef(null)
  const latest = useRef(minutes)
  const finished = minutes >= film.runtime
  const running = playing && !finished

  // Time passes: one film-minute per second, while playing
  useEffect(() => {
    if (!running) return undefined
    const timer = setInterval(() => setMinutes((m) => Math.min(m + 1, film.runtime)), 1000)
    return () => clearInterval(timer)
  }, [running, film.runtime])

  // The footage plays and pauses with the clock
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (running) video.play().catch(() => {})
    else video.pause()
  }, [running])

  // Note what was watched: at once (so the title moves to the front of Continue Watching), every five minutes while
  // playing, and when leaving. Reaching the end finishes the title (it leaves Continue Watching).
  useEffect(() => {
    latest.current = minutes
    if (minutes >= film.runtime) finish(film.id)
    else if (minutes % 5 === 0) record(film.id, minutes)
  }, [minutes, film.id, film.runtime, record, finish])

  // ...and on arrival whatever the minute (resuming at minute 7 should also bring the title to the front)
  useEffect(() => {
    record(film.id, latest.current)
  }, [film.id, record])

  useEffect(() => () => {
    if (latest.current < film.runtime) record(film.id, latest.current)
  }, [film.id, film.runtime, record])

  // Leave: back to wherever we came from (with its filter and its email), or to the home screen when this page
  // was opened directly (the router calls the first entry's key "default")
  function leave() {
    if (location.key !== 'default') navigate(-1)
    else navigate('/browse', { state: email ? { email } : undefined })
  }

  function togglePlay() {
    if (finished) setMinutes(0)   // "Play" after the end starts over
    setPlaying(!finished ? !playing : true)
  }

  // Esc leaves; Space plays and pauses (unless a control has focus: it handles Space itself)
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') leave()
      else if (event.key === ' ' && !['BUTTON', 'INPUT'].includes(event.target.tagName)) {
        event.preventDefault()
        togglePlay()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  const elapsed = formatRuntime(minutes) || '0m'
  const total = formatRuntime(film.runtime)
  const label = finished ? 'Play again' : playing ? 'Pause' : 'Play'

  return (
    <main className="watch" aria-label={`Now playing: ${film.title}`}>
      {withVideo ? (
        <video ref={videoRef} className="watch__video" src={VIDEO_SRC} autoPlay muted loop playsInline />
      ) : (
        <img className="watch__poster" src={film.image} alt="" draggable="false" />
      )}

      <div className="watch__top">
        <button type="button" className="watch__back" onClick={leave} aria-label="Back">
          <BackIcon />
        </button>
        <h1 className="watch__title">{film.title}</h1>
      </div>

      <div className="watch__bottom">
        <p className="watch__caption">
          {finished
            ? 'The end (demo).'
            : withVideo
              ? `Demo: stand-in footage, not ${film.title}.`
              : `Demo: a still of ${film.title} stands in for the film.`}
        </p>
        <div className="watch__controls">
          <button type="button" className="watch__play" onClick={togglePlay} aria-label={label} autoFocus>
            {playing && !finished ? <PauseIcon /> : <PlayIcon />}
          </button>
          <input
            type="range"
            className="watch__bar"
            min={0}
            max={film.runtime}
            step={1}
            value={minutes}
            onChange={(event) => setMinutes(Number(event.target.value))}
            aria-label="Progress"
            aria-valuetext={`${elapsed} of ${total}`}
            style={{ '--fill': `${(minutes / film.runtime) * 100}%` }}
          />
          <span className="watch__time">{elapsed} of {total}</span>
        </div>
      </div>
    </main>
  )
}
