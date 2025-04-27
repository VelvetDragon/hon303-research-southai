import { useState } from 'react'

export default function Recipes() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])      // now always an array
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query.trim()) return
    setLoading(true)

    // 1️⃣ Fetch
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/recipe?q=${encodeURIComponent(query)}`
    )
    const data = await res.json()

    // 2️⃣ Normalize to an array
    let hits = []
    if (data.recipe) hits = [data.recipe]
    else if (Array.isArray(data.recipes)) hits = data.recipes

    // 3️⃣ Sort: exact‐title matches first
    const q = query.trim().toLowerCase()
    const exact = hits.filter(r => r.title.trim().toLowerCase() === q)
    const fuzzy = hits.filter(r => r.title.trim().toLowerCase() !== q)
    const sorted = [...exact, ...fuzzy]

    setResults(sorted)
    setLoading(false)
  }

  return (
    <div style={{ padding: '2rem', maxWidth: 600, margin: 'auto' }}>
      <h1>Recipe Finder</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="e.g. jambalaya, fried chicken…"
          style={{ width: '100%', padding: '.5rem', marginBottom: '1rem' }}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching…' : 'Search'}
        </button>
      </form>

      {results.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Results for “{query}”</h2>
          {results.map((r, i) => (
            <div key={i} style={{ marginBottom: '2rem' }}>
              <h3>{r.title}</h3>
              <strong>Ingredients:</strong>
              <ul>
                {r.ingredients.map((ing,j) => <li key={j}>{ing}</li>)}
              </ul>
              <strong>Steps:</strong>
              <ol>
                {r.steps.map((step,k) => <li key={k}>{step}</li>)}
              </ol>
            </div>
          ))}
        </div>
      )}
      {results.length === 0 && !loading && <p>No recipes found.</p>}
    </div>
  )
}
