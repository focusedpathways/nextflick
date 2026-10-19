// True when the viewer has asked their system for less motion. Checked when something would start to
// move (a video, a parallax shift), so it follows the setting as it is at that moment.
export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
