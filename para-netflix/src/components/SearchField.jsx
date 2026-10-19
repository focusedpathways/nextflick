import { useId, useState } from 'react'
import { SearchIcon } from './icons.jsx'
import './SearchField.css'

// The header's search field: a long white field with rounded corners and a grey magnifying glass
// inside, at its right end. A controlled input (React state holds what is typed). Searching is not
// connected to anything yet: pressing Enter or the glass just keeps the text.
export default function SearchField() {
  const [query, setQuery] = useState('')
  const id = useId()

  return (
    <form className="search-field" role="search" onSubmit={(event) => event.preventDefault()}>
      <label htmlFor={id} className="visually-hidden">Search titles</label>
      <input
        id={id}
        type="search"
        placeholder="Search titles"
        autoComplete="off"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="search-field__button" aria-label="Search">
        <SearchIcon />
      </button>
    </form>
  )
}
