import { Routes, Route, Link } from 'react-router-dom'
import Landing from './pages/Landing.jsx'

// Temporary stand-in until each page is built (one page at a time).
function ComingSoon({ name }) {
  return (
    <main style={{ padding: '4rem', textAlign: 'center' }}>
      <h1>{name}: coming soon</h1>
      <Link to="/" style={{ color: 'var(--accent)' }}>Back to start</Link>
    </main>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<ComingSoon name="Sign up" />} />
      <Route path="/login" element={<ComingSoon name="Sign in" />} />
    </Routes>
  )
}
