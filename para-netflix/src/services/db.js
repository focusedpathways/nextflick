import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)')
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)
const DEVICE_ID_KEY = 'nextflick:device-id'

// Generate a v4-like UUID for device tracking (crypto.randomUUID() where available)
function generateUUID() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  // Fallback for older browsers
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}

// Get or create a device ID for this browser. This uniquely identifies the browser
// without needing a user account. Stored in localStorage and sent to Supabase as the user_id
// in the user_preferences table (before real user accounts are added).
function getDeviceId() {
  try {
    let deviceId = localStorage.getItem(DEVICE_ID_KEY)
    if (!deviceId) {
      deviceId = generateUUID()
      localStorage.setItem(DEVICE_ID_KEY, deviceId)
    }
    return deviceId
  } catch {
    // localStorage unavailable; generate a temp ID (won't persist but still works during session)
    return generateUUID()
  }
}

// Load My List (watchlist) from user_preferences
export async function loadMyList() {
  try {
    const deviceId = getDeviceId()

    const { data: prefs, error } = await supabase
      .from('user_preferences')
      .select('watchlist')
      .eq('user_id', deviceId)
      .maybeSingle()

    if (error && error.code !== 'PGRST116') {
      // Real error (not "not found")
      throw error
    }

    // If row doesn't exist, return empty array
    return prefs?.watchlist || []
  } catch (error) {
    console.error('Failed to load My List from Supabase:', error)
    return null // Signal that we should fall back to localStorage
  }
}

// Save My List (watchlist) to user_preferences
export async function saveMyList(filmIds) {
  try {
    const deviceId = getDeviceId()

    const { error } = await supabase
      .from('user_preferences')
      .upsert(
        {
          user_id: deviceId,
          watchlist: filmIds,
        },
        { onConflict: 'user_id' }
      )

    if (error) throw error
    return true
  } catch (error) {
    console.error('Failed to save My List to Supabase:', error)
    return false // Fallback to localStorage
  }
}
