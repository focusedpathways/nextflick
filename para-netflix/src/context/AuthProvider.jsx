import { useEffect, useState } from 'react'
import { supabase } from '../services/db.js'
import { AuthContext } from './authContext.js'

// Holds the Supabase session for the whole app. supabase-js saves it in localStorage, so a reload keeps the
// member signed in; this provider reads it once on load and then follows every sign-in and sign-out.
export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })
    const { data } = supabase.auth.onAuthStateChange((_event, next) => setSession(next))
    return () => data.subscription.unsubscribe()
  }, [])

  const value = {
    session,
    userId: session?.user.id ?? null,
    email: session?.user.email ?? null,
    loading,
    signOut: () => supabase.auth.signOut(),
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
