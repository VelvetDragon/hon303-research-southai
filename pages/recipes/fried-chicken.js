import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/Recipe.module.css';

export default function FriedChickenRecipe() {
  return (
    <div className={styles.recipeContainer}>
      <div className={styles.recipeHeader}>
        <h1 className={styles.recipeTitle}>Southern Fried Chicken</h1>
        <p className={styles.recipeIntro}>
          This AI-generated recipe represents a classic Southern approach to fried chicken,
          featuring a crispy, well-seasoned crust and juicy, tender meat.
        </p>
      </div>
      
      <div className={styles.recipeImageContainer}>
        <Image 
          src="/images/fried-chicken.jpg"
          alt="Southern Fried Chicken"
          fill
          className={styles.recipeImage}
          priority
        />
      </div>
      
      <div className={styles.recipeMeta}>
        <div className={styles.metaItem}>
          <div className={styles.metaIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </div>
          <div className={styles.metaContent}>
            <span className={styles.metaLabel}>Prep Time</span>
            <span className={styles.metaValue}>30 minutes</span>
          </div>
        </div>
        
        <div className={styles.metaItem}>
          <div className={styles.metaIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
          </div>
          <div className={styles.metaContent}>
            <span className={styles.metaLabel}>Cook Time</span>
            <span className={styles.metaValue}>25 minutes</span>
          </div>
        </div>
        
        <div className={styles.metaItem}>
          <div className={styles.metaIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          </div>
          <div className={styles.metaContent}>
            <span className={styles.metaLabel}>Serves</span>
            <span className={styles.metaValue}>4-6 people</span>
          </div>
        </div>
        
        <div className={styles.metaItem}>
          <div className={styles.metaIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.27 21.7s9.87-3.5 12.73-6.36a4.5 4.5 0 0 0-6.36-6.37C5.77 11.84 2.27 21.7 2.27 21.7zM15.42 15.42l6.37-6.37a2.94 2.94 0 0 0 .53-3.34 3.14 3.14 0 0 0-5.13-1.13 3.28 3.28 0 0 0-.71 3.06l-6.37 6.37"></path></svg>
          </div>
          <div className={styles.metaContent}>
            <span className={styles.metaLabel}>Difficulty</span>
            <span className={styles.metaValue}>Medium</span>
          </div>
        </div>
      </div>
      
      <div className={styles.ingredientsSection}>
        <h2 className={styles.sectionTitle}>Ingredients</h2>
        
        <div className={styles.ingredientsList}>
          <h3 className={styles.subheading}>Chicken</h3>
          <ul>
            <li>3-4 pounds chicken, cut into pieces (thighs, drumsticks, wings, breasts)</li>
            <li>2 cups buttermilk</li>
            <li>1 tablespoon hot sauce (such as Tabasco or Crystal)</li>
            <li>1 teaspoon garlic powder</li>
            <li>1 teaspoon onion powder</li>
            <li>1 teaspoon paprika</li>
            <li>1 teaspoon salt</li>
          </ul>
          
          <h3 className={styles.subheading}>Coating</h3>
          <ul>
            <li>2 cups all-purpose flour</li>
            <li>1 tablespoon salt</li>
            <li>1 1/2 teaspoons black pepper</li>
            <li>1 tablespoon paprika</li>
            <li>1 teaspoon garlic powder</li>
            <li>1 teaspoon onion powder</li>
            <li>1/2 teaspoon cayenne pepper (adjust to taste)</li>
            <li>1/2 teaspoon dried thyme</li>
            <li>1/2 teaspoon dried oregano</li>
          </ul>
          
          <h3 className={styles.subheading}>For Frying</h3>
          <ul>
            <li>Vegetable oil or peanut oil (enough for 1-inch depth in skillet)</li>
          </ul>
          
          <h3 className={styles.subheading}>GRAVY (Optional)</h3>
          <ul>
            <li>1/4 cup reserved frying oil (with brown bits)</li>
            <li>3 tablespoons all-purpose flour</li>
            <li>2 cups whole milk, room temperature</li>
            <li>1/2 teaspoon salt</li>
            <li>1/4 teaspoon black pepper</li>
            <li>1/4 teaspoon garlic powder</li>
          </ul>
        </div>
      </div>
      
      <div className={styles.instructionsSection}>
        <h2 className={styles.sectionTitle}>Instructions</h2>
        
        <div className={styles.instructionSteps}>
          <h3 className={styles.subheading}>Preparation</h3>
          <ol>
            <li>
              <p>In a large bowl, combine buttermilk, hot sauce, garlic powder, onion powder, paprika, and salt. Whisk well to combine.</p>
            </li>
            <li>
              <p>Add the chicken pieces to the buttermilk mixture, making sure each piece is fully submerged. Cover and refrigerate for at least 4 hours, preferably overnight.</p>
            </li>
            <li>
              <p>When ready to cook, remove the chicken from the refrigerator and let it sit at room temperature for 30 minutes.</p>
            </li>
            <li>
              <p>In a large paper bag or shallow dish, combine all the coating ingredients and mix well.</p>
            </li>
          </ol>
          
          <h3 className={styles.subheading}>Frying the Chicken</h3>
          <ol start="5">
            <li>
              <p>Pour oil into a large, heavy skillet (cast iron is ideal) to a depth of about 1 inch. Heat over medium-high heat until oil reaches 350°F (175°C).</p>
            </li>
            <li>
              <p>Remove chicken pieces from the buttermilk mixture, allowing excess to drip off.</p>
            </li>
            <li>
              <p>One piece at a time, place chicken in the flour mixture and coat thoroughly, shaking off excess.</p>
            </li>
            <li>
              <p>Carefully place chicken pieces in the hot oil, skin side down. Don't overcrowd the pan – cook in batches if necessary.</p>
            </li>
            <li>
              <p>Cook for 10-12 minutes on the first side, until golden brown. Turn and cook for another 10-12 minutes, until chicken is cooked through (internal temperature should reach 165°F or 74°C) and golden brown on all sides.</p>
            </li>
            <li>
              <p>Transfer chicken to a wire rack set over paper towels to drain excess oil. Let rest for 10 minutes before serving.</p>
            </li>
          </ol>
          
          <h3 className={styles.subheading}>GRAVY (Optional)</h3>
          <ol start="11">
            <li>
              <p>Pour off all but 1/4 cup of the frying oil, making sure to keep the browned bits.</p>
            </li>
            <li>
              <p>Add flour to the reserved oil and whisk constantly over medium heat for 3-4 minutes, until it forms a golden brown roux.</p>
            </li>
            <li>
              <p>Gradually whisk in the milk, stirring constantly to prevent lumps.</p>
            </li>
            <li>
              <p>Add salt, pepper, and garlic powder. Continue to cook, stirring frequently, for 5-7 minutes until the gravy thickens.</p>
            </li>
            <li>
              <p>Taste and adjust seasonings as needed. Serve hot alongside the fried chicken.</p>
            </li>
          </ol>
        </div>
      </div>
      
      <div className={styles.recipeNotes}>
        <h2 className={styles.sectionTitle}>Recipe Notes</h2>
        <ul>
          <li>For the crispiest chicken, make sure your oil stays between 325°F and 350°F throughout cooking.</li>
          <li>Dark meat (thighs and drumsticks) may require slightly longer cooking time than white meat (breasts).</li>
          <li>If chicken is browning too quickly, reduce heat slightly.</li>
          <li>The longer you marinate the chicken in buttermilk, the more tender it will be.</li>
        </ul>
      </div>
      
      <Link href="/recipes" className={styles.backButton}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"></path><path d="M12 19l-7-7 7-7"></path></svg>
        Back to Recipes
      </Link>
    </div>
  );
} 