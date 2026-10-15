import { useState } from 'react'
import './BackgroundVideo.css'

const VIDEO_SRC = '/videos/landing-loop.mp4'
const POSTER_SRC = '/images/landing-poster.jpg'

// Full-bleed looping clip. If the video fails to load, the still poster
// (CSS background on the wrapper) shows instead.
export default function BackgroundVideo() {
  const [failed, setFailed] = useState(false)

  return (
    <div className="bg-video" style={{ backgroundImage: `url(${POSTER_SRC})` }}>
      {!failed && (
        <video
          className="bg-video-media"
          src={VIDEO_SRC}
          poster={POSTER_SRC}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={() => setFailed(true)}
          aria-hidden="true"
        />
      )}
      <div className="bg-video-overlay" />
    </div>
  )
}
