import { useEffect } from 'react'
import SiteHeader from './SiteHeader.jsx'
import Footer from './Footer.jsx'
import './LightPage.css'

// Layout for the light (white) pages: header with a thin grey line, a centered content area,
// and the grey footer filling the bottom third of the screen.
export default function LightPage({ children }) {
  // Turn the whole document light while this page is shown (also the overscroll area)
  useEffect(() => {
    document.documentElement.dataset.theme = 'light'
    return () => {
      delete document.documentElement.dataset.theme
    }
  }, [])

  return (
    <div className="light-page">
      <SiteHeader variant="light" />
      <main className="light-page__main">{children}</main>
      <Footer variant="light" showSignup={false} />
    </div>
  )
}
