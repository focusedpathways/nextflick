import { supabase } from './db.js'

const RETRY_LATER = 'Too many attempts. Please wait a minute and try again.'

// What the visitor reads for the errors Supabase can return when signing up (by error.code).
const SIGN_UP_MESSAGES = {
  user_already_exists: 'An account with this email already exists. Try signing in instead.',
  email_exists: 'An account with this email already exists. Try signing in instead.',
  email_address_invalid: 'We cannot use this email address. Please try a different one.',
  weak_password: 'That password is too weak. Try a longer one with letters and numbers.',
  over_request_rate_limit: RETRY_LATER,
  over_email_send_rate_limit: RETRY_LATER,
  signup_disabled: 'Sign-ups are turned off right now.',
}

// The same for signing in. invalid_credentials is not here: the login form sends that to /403.
const SIGN_IN_MESSAGES = {
  email_not_confirmed: 'Please confirm your email first: open the link we sent you, then sign in.',
  over_request_rate_limit: RETRY_LATER,
}

// Creates the account in Supabase Auth. A database trigger then adds the member's own rows in
// public.users and public.user_preferences. Returns { error } where error is a message to show,
// or null when the account was created. The password goes straight to Supabase and is not kept.
export async function registerUser(email, password) {
  const { error } = await supabase.auth.signUp({ email, password })
  if (!error) return { error: null }
  return { error: SIGN_UP_MESSAGES[error.code] ?? 'We could not create your account. Please try again.' }
}

// Signs in with Supabase Auth; supabase-js keeps the session in localStorage.
// Returns { wrongCredentials: true } for a bad email/password pair, { error } with a message
// for anything else that went wrong, or {} on success.
export async function signInUser(email, password) {
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (!error) return {}
  if (error.code === 'invalid_credentials') return { wrongCredentials: true }
  return { error: SIGN_IN_MESSAGES[error.code] ?? 'We could not sign you in. Please try again.' }
}
