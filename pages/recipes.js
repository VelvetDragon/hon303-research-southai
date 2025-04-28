// pages/recipes.js
import { useState, useEffect } from 'react'; // Import useEffect
import styles from '../styles/Recipes.module.css';
import Image from 'next/image';

const popularDishes = [
  { name: "Fried Chicken", image: "/images/fried-chicken.jpg" },
  { name: "Shrimp and Grits", image: "/images/shrimp-grits.jpg" },
  { name: "Biscuits and Gravy", image: "/images/biscuits-gravy.jpg" },
  { name: "Cornbread", image: "/images/cornbread.jpg" },
  { name: "Pecan Pie", image: "/images/pecan_pie.jpg" },
  { name: "Collard Greens", image: "/images/collard_greens.jpg" },
];

export default function Recipes() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // --- NEW: useEffect to clear results when search input is empty ---
  useEffect(() => {
    // Check if query consists only of whitespace or is empty
    if (query.trim() === '') {
      setResults([]); // Clear results
      setError('');   // Clear any "No results found" type errors
    }
  }, [query]); // Dependency array: runs when `query` changes

  async function handleSearch(e, searchTerm) {
    if (e) e.preventDefault();
    const q = (searchTerm || query).trim();
    if (!q) {
        // If search initiated with empty/whitespace, ensure results are clear
        setResults([]);
        setError('');
        return;
    };

    if (searchTerm) setQuery(searchTerm);

    setLoading(true);
    setError('');
    setResults([]); // Clear previous results *before* new search

    try {
      const res = await fetch(
        `https://hon303-southern-ai-recipe.onrender.com/api/recipe?q=${encodeURIComponent(q)}`,
        { mode: 'cors' }
      );
      if (!res.ok) throw new Error(`Server returned ${res.status}`);

      const data = await res.json();
      let list = data.recipes ?? (data.recipe ? [data.recipe] : []);
      if (!list.length) {
        setError('No recipes found.');
        // Keep results empty
      } else {
        const normalizedQ = q.toLowerCase();
        list.sort((a, b) => {
          const aExact = a.title.trim().toLowerCase() === normalizedQ;
          const bExact = b.title.trim().toLowerCase() === normalizedQ;
          if (aExact && !bExact) return -1;
          if (!aExact && bExact) return 1;
          return 0;
        });
        setResults(list);
        setError(''); // Clear error if results found
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch recipes. Please try again.');
      setResults([]); // Ensure results are empty on fetch error
    } finally {
      setLoading(false);
    }
  }

  const handlePopularDishClick = (dishName) => {
    handleSearch(null, dishName);
  };

  return (
    // Removed recipesPageWrapper unless needed for specific background styling
    <div className={styles.recipesContainer}>
      {/* Removed mainContentArea wrapper - back to simple structure */}
      <h1 className={styles.pageTitle}>Recipe Finder</h1>
      <p className={styles.pageSubtitle}>
        Explore AI-generated Southern recipes. Search by dish name or ingredients, or try one of our popular suggestions below.
      </p>

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

      {/* --- Conditionally Render Popular Dishes --- */}
      {/* Show only when NOT loading AND there are NO results */}
      {!loading && results.length === 0 && (
        <section className={styles.popularDishesSection}>
          <h2 className={styles.popularDishesTitle}>Popular Southern Dishes</h2>
          <div className={styles.popularDishesGrid}>
            {popularDishes.map((dish) => (
              <div
                key={dish.name}
                className={styles.popularDishCard}
                onClick={() => handlePopularDishClick(dish.name)}
              >
                <div className={styles.popularDishImageWrapper}>
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    layout="fill"
                    objectFit="cover"
                    className={styles.popularDishImage}
                    priority // Prioritize loading these images
                  />
                </div>
                <p className={styles.popularDishName}>{dish.name}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* --- Results Area --- */}
      {/* Separator: Show if loading, or if there's an error, or if there are results */}
      {(loading || error || results.length > 0) && <div className={styles.resultsSeparator}></div>}

      {loading && (
        <div className={styles.loadingContainer}>
          <span className={styles.loadingSpinner} />
          <p>Loading recipes...</p>
        </div>
      )}

      {error && <p className={styles.error}>{error}</p>}

      {!loading && results.length > 0 && (
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
              <ul className={styles.list}>
                {r.steps.map((step, k) => {
                  const isSubRecipeTitle = step.startsWith('**') && step.endsWith('**');
                  if (isSubRecipeTitle) {
                    const title = step.substring(2, step.length - 2);
                    return <li key={k} className={styles.subRecipeTitle}>{title}</li>;
                  } else {
                    return <li key={k}>{step}</li>;
                  }
                })}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div> // End recipesContainer
  );
}