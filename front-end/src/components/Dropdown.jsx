import { useEffect, useId, useRef, useState } from 'react'
import './Dropdown.css'

// A button that opens a panel under it (the header's notifications and account menus). One
// component for both, so they open, close and look the same.
//   label      the button's accessible name (it only shows an icon)
//   trigger    what the button shows; a function gets { open } so an icon can react (a caret flips)
//   children   the panel's content; a function gets { close } so an item can close the panel
//   className  styles the wrapper; panelClassName styles the panel (width, etc.)
//
// Closing: click the button again, click anywhere outside, or press Escape (focus goes back to the
// button). Clicking another dropdown's button counts as "outside", so only one is open at a time
// without the two components knowing about each other.
export default function Dropdown({ label, trigger, children, className = '', panelClassName = '' }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const buttonRef = useRef(null)
  const panelId = useId()

  useEffect(() => {
    if (!open) return undefined
    function handlePointerDown(event) {
      if (!rootRef.current.contains(event.target)) setOpen(false)
    }
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current.focus()
      }
    }
    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return (
    <div className={`dropdown ${className}`} ref={rootRef}>
      <button
        type="button"
        ref={buttonRef}
        className="dropdown__button"
        aria-label={label}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => setOpen((current) => !current)}
      >
        {typeof trigger === 'function' ? trigger({ open }) : trigger}
      </button>

      {open && (
        <div id={panelId} className={`dropdown__panel ${panelClassName}`}>
          {typeof children === 'function' ? children({ close: () => setOpen(false) }) : children}
        </div>
      )}
    </div>
  )
}
