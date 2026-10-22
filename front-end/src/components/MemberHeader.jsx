import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import Dropdown from './Dropdown.jsx'
import SearchField from './SearchField.jsx'
import { AvatarIcon, BellIcon, CaretIcon } from './icons.jsx'
import notifications from '../data/notifications.json'
import { useAuth } from '../context/authContext.js'
import './MemberHeader.css'

// The tabs after the logo. All four are links: Home (/browse) shows everything, Shows and Movies are the SAME page
// with a filter (/browse?type=show and /browse?type=movie: the home page then shows only that kind of title),
// and My NextFlick (/my-nextflick) is its own page.
const TABS = [
  { label: 'Home', to: '/browse' },
  { label: 'Shows', to: '/browse?type=show' },
  { label: 'Movies', to: '/browse?type=movie' },
  { label: 'My NextFlick', to: '/my-nextflick' },
]

// The signed-in members' top bar, shared by Browse (Home, Shows, Movies) and My NextFlick: logo, tabs, then
// (right) search, a notifications bell and the profile menu. The bell and the profile icon each open a
// dropdown (the shared Dropdown component).
//   current   the tab that matches what is on screen ('Home', 'Shows', 'Movies' or 'My NextFlick'): it gets the
//             filled pill and aria-current. The page decides it (Browse reads the filter from the address).
//   email     the signed-in email when it is known (it arrives in router state from the login)
export default function MemberHeader({ current = 'Home', email }) {
  const { signOut } = useAuth()
  const accountState = email ? { email } : undefined
  const hasNotifications = notifications.length > 0

  // On this side of the Gateway, the logo and the Home tab always lead to the home screen (with no filter).
  // Pressing a tab (or the logo) while already on its page scrolls to the top. The email is carried along so
  // the profile menu still knows who is signed in.
  function goTo() {
    window.scrollTo({ top: 0 })
  }

  return (
    <header className="member-header">
      <Link to="/browse" state={accountState} onClick={goTo} aria-label="NextFlick home" className="member-header__logo">
        <Logo />
      </Link>

      <nav className="member-nav" aria-label="Sections">
        {TABS.map(({ label, to }) => (
          <Link
            key={label}
            to={to}
            state={accountState}
            onClick={goTo}
            className={label === current ? 'member-nav__tab member-nav__tab--active' : 'member-nav__tab'}
            aria-current={label === current ? 'page' : undefined}
          >
            {label}
          </Link>
        ))}
      </nav>

      <div className="member-header__tools">
        <SearchField />

        <Dropdown
          label={hasNotifications ? `Notifications, ${notifications.length} new` : 'Notifications'}
          className="notifications"
          panelClassName="notifications__panel"
          trigger={
            <span className="notifications__icon">
              <BellIcon />
              {hasNotifications && (
                <span className="notifications__badge" aria-hidden="true">{notifications.length}</span>
              )}
            </span>
          }
        >
          <h2 className="dropdown__heading">Notifications</h2>
          <ul className="notifications__list">
            {notifications.map((item) => (
              <li key={item.id} className="notifications__item">
                <p className="notifications__text">{item.text}</p>
                <p className="notifications__when">{item.when}</p>
              </li>
            ))}
          </ul>
        </Dropdown>

        <Dropdown
          label="Account menu"
          className="account"
          panelClassName="account__panel"
          trigger={({ open }) => (
            <>
              <AvatarIcon />
              <CaretIcon open={open} />
            </>
          )}
        >
          {({ close }) => (
            <>
              {email && <p className="account__email">{email}</p>}
              <h2 className="dropdown__heading">Account</h2>
              <ul className="account__list">
                <li><Link to="/account/password" state={accountState} onClick={close}>Change password</Link></li>
                <li><Link to="/account/contact" state={accountState} onClick={close}>Contact information</Link></li>
                <li><Link to="/account/billing" state={accountState} onClick={close}>Billing information</Link></li>
              </ul>
              <div className="account__divider" />
              <ul className="account__list">
                <li><Link to="/" onClick={() => { close(); signOut() }}>Sign out</Link></li>
              </ul>
            </>
          )}
        </Dropdown>
      </div>
    </header>
  )
}
