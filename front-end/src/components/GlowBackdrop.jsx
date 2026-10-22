import { useState } from 'react'
import { VIDEO_SRC } from './BackgroundVideo.jsx'
import { prefersReducedMotion } from '../utils/motion.js'
import './GlowBackdrop.css'

// The soft, moving glow behind a film's poster (the Browse hero and the More Info pop-up use the same
// one). A heavily blurred copy of the poster supplies the colors and a blurred, slowed-down video
// supplies slowly moving light; it is blurred so far that nobody can tell it is not the film's own
// footage (it is the Landing page's stock montage). Fills whatever positioned box it is put in.
//   image   the poster; a new image fades its colors in over the video, which keeps playing
// "Reduce motion": the video is not rendered at all and the drift stops.
export default function GlowBackdrop({ image }) {
  const [playVideo] = useState(() => !prefersReducedMotion())

  return (
    <div className="glow" aria-hidden="true">
      {/* key: a new image remounts the art, which fades the new colors in over the video */}
      <div className="glow__art" key={image} style={{ backgroundImage: `url(${image})` }} />
      {playVideo && (
        <video
          className="glow__video"
          src={VIDEO_SRC}
          autoPlay
          muted
          loop
          playsInline
          onLoadedMetadata={(event) => {
            event.currentTarget.playbackRate = 0.5   // slower, so the cuts do not pulse
          }}
        />
      )}
    </div>
  )
}
