// The header's small icons, drawn as inline SVG so they take their color from the text (currentColor).

export function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5 21 21" />
    </svg>
  )
}

export function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.5a1.5 1.5 0 0 1 1.5 1.5v.6A6.5 6.5 0 0 1 18.5 11v4.2l1.6 2.4c.4.6 0 1.4-.8 1.4H4.7c-.8 0-1.2-.8-.8-1.4l1.6-2.4V11a6.5 6.5 0 0 1 5-6.4V4A1.5 1.5 0 0 1 12 2.5Zm-2.6 17.2h5.2a2.6 2.6 0 0 1-5.2 0Z" />
    </svg>
  )
}

// Our own profile icon: just a head-and-shoulders in the logo's silver, with no square behind or
// around it (the junior asked for the colors inverted, then for the square outline to go).
export function AvatarIcon() {
  return (
    <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
      <defs>
        <linearGradient id="avatar-metal" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f2f6fb" />
          <stop offset="0.45" stopColor="#9fb1c4" />
          <stop offset="0.75" stopColor="#e3ebf4" />
          <stop offset="1" stopColor="#7d90a5" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="12.5" r="5" fill="url(#avatar-metal)" />
      <path d="M5.5 29c.8-5.6 5.2-8.5 10.5-8.5S25.7 23.4 26.5 29Z" fill="url(#avatar-metal)" />
    </svg>
  )
}

export function CaretIcon({ open }) {
  return (
    <svg viewBox="0 0 10 6" width="10" height="6" fill="currentColor" aria-hidden="true" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>
      <path d="M0 0h10L5 6Z" />
    </svg>
  )
}

export function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
      <path d="M6 3.8v16.4a1 1 0 0 0 1.5.86l13.6-8.2a1 1 0 0 0 0-1.72L7.5 2.94A1 1 0 0 0 6 3.8Z" />
    </svg>
  )
}

export function RefreshIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 12a8 8 0 1 1-2.6-5.9" />
      <path d="M20 4v5h-5" />
    </svg>
  )
}

// A popcorn bucket (red and white stripes) heaped with kernels, for the hero's "you will love this" badge
export function PopcornIcon() {
  return (
    <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
      <defs>
        <clipPath id="popcorn-bucket">
          <path d="M6 14h20l-2.6 15H8.6Z" />
        </clipPath>
      </defs>
      <g fill="#fff4cf" stroke="#e9c35d" strokeWidth="0.8">
        <circle cx="9.5" cy="11" r="4" />
        <circle cx="23" cy="11.5" r="3.7" />
        <circle cx="14" cy="8" r="4.6" />
        <circle cx="19.5" cy="8.5" r="4.2" />
        <circle cx="16" cy="12.5" r="4" />
      </g>
      <path d="M6 14h20l-2.6 15H8.6Z" fill="#fff" />
      <g clipPath="url(#popcorn-bucket)" fill="#e50914">
        <rect x="6.5" y="14" width="3.4" height="16" />
        <rect x="13.2" y="14" width="3.4" height="16" />
        <rect x="19.9" y="14" width="3.4" height="16" />
      </g>
    </svg>
  )
}

// Icons for the More Info pop-up
export function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  )
}

export function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

export function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12.5 10 17.5 19 7" />
    </svg>
  )
}

// outline when off, filled when on
export function ThumbUpIcon({ filled }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
      <path d="M2.5 10.5h4v10h-4zM6.5 11 11 3.2c.4-.7 1.2-1 2-.8 1 .3 1.6 1.3 1.4 2.3L13.8 9h5.4c1.3 0 2.2 1.2 1.9 2.4l-1.6 7c-.2 1.1-1.2 1.8-2.3 1.8H6.5" />
    </svg>
  )
}

// Icons for the watch page
export function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
      <rect x="6" y="4.5" width="4.2" height="15" rx="1" />
      <rect x="13.8" y="4.5" width="4.2" height="15" rx="1" />
    </svg>
  )
}

export function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  )
}
