import { Routes, Route } from 'react-router-dom'
import Landing from './pages/landing/Landing.jsx'
import Password from './pages/password/Password.jsx'
import Contact from './pages/contact/Contact.jsx'
import Billing from './pages/billing/Billing.jsx'
import Gateway from './pages/gateway/Gateway.jsx'
import Forbidden from './pages/forbidden/Forbidden.jsx'
import Browse from './pages/browse/Browse.jsx'
import MyNextFlick from './pages/mynextflick/MyNextFlick.jsx'
import Watch from './pages/watch/Watch.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      {/* Signing up: Password -> Contact -> Billing -> Gateway. Each page is a standalone module;
          this is the only place that says what comes next, so the same pages can be mounted again
          (e.g. under /account) with different next/back and wording. */}
      <Route path="/signup" element={<Password next="/signup/contact" />} />
      <Route path="/signup/contact" element={<Contact next="/signup/billing" back="/signup" />} />
      <Route path="/signup/billing" element={<Billing next="/login" back="/signup/contact" />} />
      <Route path="/login" element={<Gateway />} />
      <Route path="/403" element={<Forbidden />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/my-nextflick" element={<MyNextFlick />} />
      <Route path="/watch/:id" element={<Watch />} />
      {/* The account menu's pages: the same three form pages as signing up, with different words and
          next/back (see components/FORM_PAGES.md). They still show the light header with Sign In until
          AuthContext knows who is signed in. */}
      <Route path="/account/password" element={
        <Password next="/browse" back="/browse" homeTo="/browse" heading="Change your password"
          intro="Choose a new password for your account." submitLabel="Save" />
      } />
      <Route path="/account/contact" element={
        <Contact next="/browse" back="/browse" homeTo="/browse" heading="Update your contact information"
          intro="This is a demo. Nothing you type here is saved." submitLabel="Save" />
      } />
      <Route path="/account/billing" element={
        <Billing next="/browse" back="/browse" homeTo="/browse" heading="Update your billing address"
          intro="This is a demo. Nothing is charged, and nothing you type here is saved." submitLabel="Save" />
      } />
    </Routes>
  )
}
