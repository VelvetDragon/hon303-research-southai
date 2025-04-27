import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/RecipeList.module.css';
import { FaClock, FaUtensils } from 'react-icons/fa';

const RecipeList = ({ recipes }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.ingredients.some(ingredient => 
      ingredient.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className={styles.pageContainer}>
      <div className={styles.searchSection}>
        <h1 className={styles.mainTitle}>Southern Research Kitchen</h1>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search recipes by name, type, or ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.recipesGrid}>
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className={styles.recipeCard}>
            <div className={styles.imageWrapper}>
              <Image
                src={recipe.imageUrl}
                alt={recipe.name}
                className={styles.recipeImage}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <span className={styles.recipeType}>{recipe.type}</span>
            </div>
            <div className={styles.recipeInfo}>
              <h2 className={styles.recipeTitle}>{recipe.name}</h2>
              <p className={styles.recipeDescription}>
                {recipe.description || `A delicious ${recipe.type.toLowerCase()} recipe featuring ${recipe.ingredients.slice(0, 3).join(', ')}...`}
              </p>
              <div className={styles.recipeMetadata}>
                <span>
                  <FaClock />
                  {recipe.prepTime}
                </span>
                <span>
                  <FaUtensils />
                  {recipe.difficulty}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList; 