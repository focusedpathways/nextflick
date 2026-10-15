import './Footer.css'

// Footer strip (modeled on the junior's reference): a closing "Ready to watch?" prompt with
// the email form, a phone line, and four columns of links. The links are placeholders:
// there are no pages behind them yet, so clicking does nothing. The phone number uses
// the 555-01xx range, which is reserved for fiction.
import EmailCapture from './EmailCapture.jsx'

const COLUMNS = [
  ['FAQ', 'Media Center', 'Redeem Gift Cards', 'Privacy', 'Speed Test', 'Ad Choices'],
  ['Help Center', 'Investor Relations', 'Buy Gift Cards', 'Cookie Preferences', 'Legal Notices'],
  ['Account', 'Jobs', 'Ways to Watch', 'Corporate Information', 'Only on NextFlick'],
  ['Terms of Use', 'Contact Us', 'Do Not Sell or Share My Personal Information'],
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-cta">
        <p>Ready to watch? Enter your email to create or restart your membership.</p>
        <EmailCapture variant="footer" />
      </div>

      <p className="footer-questions">
        Questions? Call <a href="tel:+18005550199">1-800-555-0199</a>
      </p>

      <nav className="footer-links" aria-label="Footer">
        {COLUMNS.map((column) => (
          <ul key={column[0]}>
            {column.map((label) => (
              <li key={label}>
                <a href="#" onClick={(event) => event.preventDefault()}>{label}</a>
              </li>
            ))}
          </ul>
        ))}
      </nav>

      <p className="footer-legal">
        &copy; 2026 NextFlick. A class project. Film posters belong to their studios.
      </p>
    </footer>
  )
}
