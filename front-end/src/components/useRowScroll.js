import { useCallback, useEffect, useRef, useState } from 'react'

// The scrolling behavior shared by every sideways row (Landing's Featured Films, Browse's thumbnail
// rows). Put `scroller` on the element that scrolls and `update` on its onScroll; show the left and
// right arrows only while `canLeft` / `canRight` (there is more to scroll that way); call
// `page(-1)` / `page(1)` from the arrows to move the row by about four fifths of its width.
export default function useRowScroll() {
  const scroller = useRef(null)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(true)

  const update = useCallback(() => {
    const el = scroller.current
    if (!el) return
    setCanLeft(el.scrollLeft > 8)
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8)
  }, [])

  // Re-check when the window changes size: a wider window may need no arrows at all
  useEffect(() => {
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [update])

  function page(direction) {
    const el = scroller.current
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  return { scroller, canLeft, canRight, update, page }
}
