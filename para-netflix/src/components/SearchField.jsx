import { useId } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { SearchIcon } from './icons.jsx'
import './SearchField.css'

// The header's search field: a long white field with rounded corners and a grey magnifying glass
// inside, at its right end. What is typed lives in the address (?q=...), like the Shows/Movies filter, and the
// home page (/browse) shows only the titles whose name contains it.
//   On /browse   each keystroke rewrites ?q= in place (replace: the Back button is not filled with every letter),
//                keeping any ?type= filter.
//   Elsewhere    (My NextFlick) the first keystroke opens /browse?q=..., and the field there takes the focus so
//                typing carries on.
// A controlled input: its value is read from the address.
export default function SearchField() {
  const [params, setParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()
  const id = useId()
  const onBrowse = location.pathname === '/browse'
  const query = onBrowse ? params.get('q') ?? '' : ''

  function handleChange(event) {
    const text = event.target.value
    const next = new URLSearchParams(onBrowse ? params : undefined)
    if (text) next.set('q', text)
    else next.delete('q')
    const state = { ...location.state, focusSearch: true }
    if (onBrowse) setParams(next, { replace: true, state })
    else navigate(`/browse?${next}`, { state })
  }

  return (
    <form className="search-field" role="search" onSubmit={(event) => event.preventDefault()}>
      <label htmlFor={id} className="visually-hidden">Search titles</label>
      <input
        id={id}
        type="search"
        placeholder="Search titles"
        autoComplete="off"
        autoFocus={Boolean(location.state?.focusSearch)}
        value={query}
        onChange={handleChange}
      />
      <button type="submit" className="search-field__button" aria-label="Search">
        <SearchIcon />
      </button>
    </form>
  )
}
