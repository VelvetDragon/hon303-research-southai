// pages/recipes.js
import { useState } from 'react'

export default function RecipeFinder() {
  const [query, setQuery] = useState('')
  const [recipes, setRecipes] = useState(null)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setRecipes(null)

    // Build the full URL using our env var
    const base = process.env.NEXT_PUBLIC_API_URL
    const url  = `${base}/api/recipe?q=${encodeURIComponent(query.trim())}`

    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`Status ${res.status}`)
      const payload = await res.json()
      // Depending on your backend shape:
      setRecipes(payload.recipes || [payload.recipe])
    } catch (err) {
      console.error(err)
      setError('Unable to fetch recipe. Please try again.')
    }
  }

  return (
    <div>
      <h1>Recipe Finder</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Enter dish name or ingredients"
          required
        />
        <button type="submit">Search</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {recipes && (
        <div>
          <h2>Results for “{query}”</h2>
          {recipes.map((r, i) => (
            <article key={i} style={{ margin: '2rem 0' }}>
              <h3>{r.title}</h3>
              <h4>Ingredients:</h4>
              <ul>{r.ingredients.map((ing, j) => <li key={j}>{ing}</li>)}</ul>
              <h4>Steps:</h4>
              <ol>{r.steps.map((s, j) => <li key={j}>{s}</li>)}</ol>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
