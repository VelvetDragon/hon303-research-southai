// pages/recipes.js
import { useState } from 'react'
import styles from '../styles/Recipes.module.css'

export default function Recipes() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSearch(e) {
    e.preventDefault()
    const q = query.trim()
    if (!q) return

    setLoading(true)
    setError('')
    setResults([])

    try {
      const res = await fetch(
        `https://hon303-southern-ai-recipe.onrender.com/api/recipe?q=${encodeURIComponent(q)}`,
        { mode: 'cors' }
      )
      if (!res.ok) throw new Error(`Server returned ${res.status}`)

      const data = await res.json()
      // normalize to an array
      let list = data.recipes ?? (data.recipe ? [data.recipe] : [])
      if (!list.length) {
        setError('No recipes found.')
      } else {
        // bring exact-title matches to front
        const normalizedQ = q.toLowerCase()
        list.sort((a, b) => {
          const aExact = a.title.trim().toLowerCase() === normalizedQ
          const bExact = b.title.trim().toLowerCase() === normalizedQ
          if (aExact && !bExact) return -1
          if (!aExact && bExact) return 1
          return 0
        })
        setResults(list)
      }
    } catch (err) {
      console.error(err)
      setError('Failed to fetch recipes. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.recipesContainer}>
      <h1 className={styles.pageTitle}>Recipe Finder</h1>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Enter dish name or ingredients…"
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton} disabled={loading}>
          {loading
            ? <span className={styles.searchingSpinner} />
            : 'Search'}
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.recipeGrid}>
        {results.map((r, i) => (
          <div
            key={i}
            className={styles.recipeCard}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <h2 className={styles.recipeTitle}>{r.title}</h2>

            <h3 className={styles.subheading}>Ingredients</h3>
            <ul className={styles.list}>
              {r.ingredients.map((ing, j) => (
                <li key={j}>{ing}</li>
              ))}
            </ul>

            <h3 className={styles.subheading}>Steps</h3>
            <ol className={styles.list}>
              {r.steps.map((step, k) => (
                <li key={k}>{step}</li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  )
}
