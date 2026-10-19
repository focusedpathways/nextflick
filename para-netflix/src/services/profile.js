import { supabase } from './db.js'

// Saves the signed-in member's name and phone to their own row in public.users (the row the sign-up trigger
// created). The database's "users: update own" policy only lets a member change their own row.
// Returns { error } where error is a message to show, or null when it was saved.
export async function saveContact({ name, phone }) {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return { error: 'Please sign in first, then try again.' }
  const { data, error } = await supabase
    .from('users')
    .update({ name, phone })
    .eq('id', session.user.id)
    .select('id')
  // No error but no row either means the policy hid the row: nothing was saved
  if (error || data.length === 0) return { error: 'We could not save your details. Please try again.' }
  return { error: null }
}

// Saves the signed-in member's billing address: one row per member in billing_profiles (user_id is the key).
// An upsert, so saving again (from /account/billing) updates that row. `address` uses the table's column
// names: street, apartment (may be null), city, state, zip, country. The "billing: insert/update own"
// policies only allow the member's own row. Returns { error } like saveContact.
export async function saveBilling(address) {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return { error: 'Please sign in first, then try again.' }
  const { data, error } = await supabase
    .from('billing_profiles')
    .upsert({ ...address, user_id: session.user.id }, { onConflict: 'user_id' })
    .select('user_id')
  if (error || data.length === 0) return { error: 'We could not save your billing address. Please try again.' }
  return { error: null }
}
