import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/authContext.js'

// Wraps the member-only routes in App.jsx: signed in -> the page; signed out -> the Gateway (/login), which is
// told where the visitor was going (state.from) so it can send them there after signing in.
// Nothing is drawn while the saved session is still being read, so a reload does not bounce a member out.
export default function RequireAuth() {
  const { session, loading } = useAuth()
  const location = useLocation()
  if (loading) return null
  if (session) return <Outlet />
  const from = location.pathname + location.search
  return <Navigate to="/login" replace state={{ from }} />
}
