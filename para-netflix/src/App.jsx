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
import RequireAuth from './components/RequireAuth.jsx'
import { registerUser } from './services/auth.js'
import { saveBilling, saveContact } from './services/profile.js'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      {/* Signing up: Password -> Contact -> Billing -> Gateway. Each page is a standalone module;
          this is the only place that says what comes next, so the same pages can be mounted again
          (e.g. under /account) with different next/back and wording. */}
      <Route path="/signup" element={<Password next="/signup/contact" onSubmit={registerUser} />} />
      <Route path="/signup/contact" element={<Contact next="/signup/billing" back="/signup" onSubmit={saveContact} />} />
      <Route path="/signup/billing" element={<Billing next="/login" back="/signup/contact" onSubmit={saveBilling} />} />
      <Route path="/login" element={<Gateway />} />
      <Route path="/403" element={<Forbidden />} />
      {/* Members only: signed-out visitors are sent to /login */}
      <Route element={<RequireAuth />}>
      <Route path="/browse" element={<Browse />} />
      <Route path="/my-nextflick" element={<MyNextFlick />} />
      <Route path="/watch/:id" element={<Watch />} />
      {/* The account menu's pages: the same three form pages as signing up, with different words and
          next/back (see components/FORM_PAGES.md). They still show the light header with Sign In. */}
      <Route path="/account/password" element={
        <Password next="/browse" back="/browse" homeTo="/browse" heading="Change your password"
          intro="Choose a new password for your account." submitLabel="Save" />
      } />
      <Route path="/account/contact" element={
        <Contact next="/browse" back="/browse" homeTo="/browse" heading="Update your contact information"
          intro="Keep your name and phone number up to date." submitLabel="Save" onSubmit={saveContact} />
      } />
      <Route path="/account/billing" element={
        <Billing next="/browse" back="/browse" homeTo="/browse" heading="Update your billing address"
          intro="This is a demo: nothing is charged. Saving updates the address on your account." submitLabel="Save"
          onSubmit={saveBilling} />
      } />
      </Route>
    </Routes>
  )
}
