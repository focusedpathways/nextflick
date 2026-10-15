import './Logo.css'

// Logo: ONE svg. A flat film reel (disc, four round holes, hub), a bar that starts at the
// reel and runs under the wordmark, and the wordmark itself, all in one coordinate space.
// The reel and the bar share a single gradient that runs across the whole width, so
// they read as one unit (no seam, no color change where they meet). The wordmark has a
// fixed width (textLength), so the bar always ends exactly where the word ends, even
// before the web font has loaded. Reference: the junior's logo image 7.
//
// Units are px at the logo's natural size (the svg scales with CSS).
const W = 139          // total width
const H = 29           // total height = the reel's diameter: the bar's bottom edge runs level
                       // with the reel's lowest point, so the two share one flat bottom line
const R = 14.5         // reel radius
const BAR_TOP = 25.6   // bar is about 1/9 of the reel's height, like the reference
const TEXT_X = 37      // where the wordmark starts
const TEXT_W = W - TEXT_X

// A circle as a path segment, so holes can be cut out with the even-odd rule
const circle = (cx, cy, r) =>
  `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0Z`

const HOLE_R = 3.2
const HOLE_D = 7.7   // distance of each hole from the center (bottom hole clears the bar)
const REEL_PATH = [
  circle(R, R, R),                       // disc
  circle(R, R - HOLE_D, HOLE_R),         // four holes: top, right, bottom, left
  circle(R + HOLE_D, R, HOLE_R),
  circle(R, R + HOLE_D, HOLE_R),
  circle(R - HOLE_D, R, HOLE_R),
  circle(R, R, 1.1),                     // hub
].join(' ')

// tone="silver" (default): the metallic look used on the dark Landing page.
// tone="red": solid Netflix red for reel, bar and wordmark (light pages like Signup).
export default function Logo({ tone = 'silver' }) {
  const fill = tone === 'red' ? '#e50914' : 'url(#logo-metal)'
  return (
    <svg className={`logo logo--${tone}`} viewBox={`0 0 ${W} ${H}`} role="img" aria-label="NextFlick">
      <defs>
        {/* userSpaceOnUse: one gradient across the whole lockup, shared by reel and bar */}
        <linearGradient id="logo-metal" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={W} y2={H}>
          <stop offset="0" stopColor="#f2f6fb" />
          <stop offset="0.45" stopColor="#9fb1c4" />
          <stop offset="0.75" stopColor="#e3ebf4" />
          <stop offset="1" stopColor="#7d90a5" />
        </linearGradient>
      </defs>

      <path d={REEL_PATH} fill={fill} fillRule="evenodd" />
      <rect x={R} y={BAR_TOP} width={W - R} height={H - BAR_TOP} fill={fill} />

      <text
        className="logo-text"
        x={TEXT_X}
        y={R}
        dominantBaseline="central"
        textLength={TEXT_W}
        lengthAdjust="spacingAndGlyphs"
      >
        NEXTFLICK
      </text>
    </svg>
  )
}
