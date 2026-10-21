// What NextFlick will not show from TMDB (junior: nothing overly sexualized, and nothing tied to horror,
// spiritualism or the occult; the same spirit as the hand-picked catalog). TMDB's popular list has no content
// ratings, so this checks what it does give: its adult and softcore flags, the Horror genre, and words in the
// title and summary. A film whose summary does not mention such content can still slip through.

const HORROR_GENRE = 27

// Whole words (or word starts, where a * follows) in the title or summary that rule a film out
const BLOCKED_WORDS = [
  // occult, spiritualism, horror
  'occult*', 'demon*', 'satan*', 'devil*', 'exorcis*', 'possessed', 'possession', 'witch*', 'warlock*',
  'sorcer*', 'necromanc*', 'seance*', 'séance*', 'ouija', 'medium', 'spiritualis*', 'evil spirit*', 'ghost',
  'ghosts', 'haunt*', 'poltergeist*', 'paranormal', 'supernatural', 'cursed', 'curse', 'vampire*', 'zombie*',
  'werewol*', 'horror*', 'hell', 'ritual*', 'summon*', 'undead',
  // sexual content
  'erotic*', 'seduc*', 'sexual*', 'sex', 'sexy', 'stripper*', 'strip club*', 'prostitut*', 'escort*', 'porn*',
  'nude', 'naked', 'lust*', 'steamy', 'sensual*', 'one-night stand*', 'affair*', 'softcore',
]

const BLOCKED = new RegExp(
  `(^|[^\\p{L}])(${BLOCKED_WORDS.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, (c) => (c === '*' ? '\\p{L}*' : `\\${c}`))).join('|')})(?![\\p{L}])`,
  'iu',
)

// True when a movie from TMDB's popular list may be shown. Returns the reason in `why` when it may not.
export function checkTmdbMovie(movie) {
  if (movie.adult) return { ok: false, why: 'adult' }
  if (movie.softcore) return { ok: false, why: 'softcore' }
  if ((movie.genre_ids ?? []).includes(HORROR_GENRE)) return { ok: false, why: 'Horror genre' }
  const match = `${movie.title ?? ''} ${movie.overview ?? ''}`.match(BLOCKED)
  if (match) return { ok: false, why: `word "${match[2]}"` }
  return { ok: true }
}
