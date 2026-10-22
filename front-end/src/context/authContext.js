import { createContext, useContext } from 'react'

// Who is signed in (see AuthProvider.jsx). Kept apart from the provider component so each file exports only
// one kind of thing (components in one, the hook in the other).
export const AuthContext = createContext(null)

// session  the Supabase session, or null when nobody is signed in
// userId   the signed-in member's id (auth.users.id = public.users.id), or null
// email    the signed-in member's email (null when signed out)
// loading  true until the saved session has been read on page load (do not redirect before that)
// signOut  ends the session
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside <AuthProvider>')
  return context
}
