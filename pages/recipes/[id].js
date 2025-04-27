import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../styles/Recipe.module.css';

// Complete fallback recipe data for better offline functionality
const fallbackRecipes = {
  'buttermilk-biscuits': {
    title: 'Buttermilk Biscuits',
    image: '/images/biscuits-gravy.jpg',
    intro: 'This AI-generated recipe represents a classic Southern approach to buttermilk biscuits, featuring a light, fluffy texture with a golden brown crust.',
    prepTime: '15 minutes',
    cookTime: '12 minutes',
    difficulty: 'Medium',
    serves: '6-8 biscuits',
    ingredients: [
      {
        title: 'Dry Ingredients',
        items: [
          '2 cups all-purpose flour',
          '1 tablespoon baking powder',
          '1/2 teaspoon baking soda',
          '1 teaspoon salt',
          '1 tablespoon sugar (optional)'
        ]
      },
      {
        title: 'Wet Ingredients',
        items: [
          '1/2 cup cold unsalted butter, cubed',
          '3/4 cup cold buttermilk, plus extra for brushing',
          '2 tablespoons melted butter (for topping)'
        ]
      }
    ],
    instructions: [
      {
        title: 'Preparation',
        steps: [
          'Preheat oven to 450°F (230°C).',
          'In a large bowl, whisk together flour, baking powder, baking soda, salt, and sugar if using.',
          'Cut in the cold butter using a pastry cutter or your fingers until the mixture resembles coarse crumbs with some pea-sized pieces of butter remaining.',
          'Make a well in the center and pour in the cold buttermilk.'
        ]
      },
      {
        title: 'Biscuit Formation',
        steps: [
          'Stir just until the dough comes together. It should be slightly sticky.',
          'Turn the dough out onto a lightly floured surface and gently fold it over itself 4-5 times to create layers.',
          'Pat the dough into a rectangle about 3/4 inch thick.',
          'Cut out biscuits using a 2 1/2 inch round cutter. Press straight down without twisting for the highest rise.',
          'Place biscuits on a baking sheet with sides touching for soft edges or 1 inch apart for crisp edges.'
        ]
      },
      {
        title: 'Baking',
        steps: [
          'Brush the tops with additional buttermilk.',
          'Bake for 12-15 minutes until golden brown.',
          'Brush hot biscuits with melted butter.',
          'Serve warm.'
        ]
      }
    ],
    notes: [
      'Keep all ingredients cold for the flakiest biscuits.',
      'Handle the dough as little as possible to avoid tough biscuits.',
      'For even more flavor, try adding 1/2 cup of grated sharp cheddar cheese or 2 tablespoons of chopped herbs to the dry ingredients.'
    ]
  },
  'fried-chicken': {
    title: 'Southern Fried Chicken',
    image: '/images/fried-chicken.jpg',
    intro: 'This AI-generated recipe represents a classic Southern approach to fried chicken, featuring a crispy, well-seasoned crust and juicy, tender meat.',
    prepTime: '30 minutes',
    cookTime: '25 minutes',
    difficulty: 'Medium',
    serves: '4-6 people',
    ingredients: [
      {
        title: 'Chicken',
        items: [
          '3-4 pounds chicken, cut into pieces (thighs, drumsticks, wings, breasts)',
          '2 cups buttermilk',
          '1 tablespoon hot sauce (such as Tabasco or Crystal)',
          '1 teaspoon garlic powder',
          '1 teaspoon onion powder',
          '1 teaspoon paprika',
          '1 teaspoon salt'
        ]
      },
      {
        title: 'Coating',
        items: [
          '2 cups all-purpose flour',
          '1 tablespoon salt',
          '1 1/2 teaspoons black pepper',
          '1 tablespoon paprika',
          '1 teaspoon garlic powder',
          '1 teaspoon onion powder',
          '1/2 teaspoon cayenne pepper (adjust to taste)',
          '1/2 teaspoon dried thyme',
          '1/2 teaspoon dried oregano'
        ]
      },
      {
        title: 'For Frying',
        items: [
          'Vegetable oil or peanut oil (enough for 1-inch depth in skillet)'
        ]
      }
    ],
    instructions: [
      {
        title: 'Preparation',
        steps: [
          'In a large bowl, combine buttermilk, hot sauce, garlic powder, onion powder, paprika, and salt. Whisk well to combine.',
          'Add the chicken pieces to the buttermilk mixture, making sure each piece is fully submerged. Cover and refrigerate for at least 4 hours, preferably overnight.',
          'When ready to cook, remove the chicken from the refrigerator and let it sit at room temperature for 30 minutes.',
          'In a large paper bag or shallow dish, combine all the coating ingredients and mix well.'
        ]
      },
      {
        title: 'Frying the Chicken',
        steps: [
          'Pour oil into a large, heavy skillet (cast iron is ideal) to a depth of about 1 inch. Heat over medium-high heat until oil reaches 350°F (175°C).',
          'Remove chicken pieces from the buttermilk mixture, allowing excess to drip off.',
          'One piece at a time, place chicken in the flour mixture and coat thoroughly, shaking off excess.',
          'Carefully place chicken pieces in the hot oil, skin side down. Don\'t overcrowd the pan – cook in batches if necessary.',
          'Cook for 10-12 minutes on the first side, until golden brown. Turn and cook for another 10-12 minutes, until chicken is cooked through (internal temperature should reach 165°F or 74°C) and golden brown on all sides.',
          'Transfer chicken to a wire rack set over paper towels to drain excess oil. Let rest for 10 minutes before serving.'
        ]
      }
    ],
    notes: [
      'For the crispiest chicken, make sure your oil stays between 325°F and 350°F throughout cooking.',
      'Dark meat (thighs and drumsticks) may require slightly longer cooking time than white meat (breasts).',
      'If chicken is browning too quickly, reduce heat slightly.',
      'The longer you marinate the chicken in buttermilk, the more tender it will be.'
    ]
  },
  'cornbread': {
    title: 'Classic Cornbread',
    image: '/images/cornbread.jpg',
    intro: 'This traditional Southern cornbread has a golden crust and tender crumb with the perfect balance of sweetness and corn flavor.',
    prepTime: '10 minutes',
    cookTime: '20 minutes',
    difficulty: 'Easy',
    serves: '8 servings',
    ingredients: [
      {
        title: '',
        items: [
          '1 cup yellow cornmeal',
          '1 cup all-purpose flour',
          '1/4 cup sugar (optional, for Northern-style cornbread)',
          '1 tablespoon baking powder',
          '1 teaspoon salt',
          '1 cup buttermilk',
          '1/3 cup whole milk',
          '2 large eggs, lightly beaten',
          '8 tablespoons (1 stick) unsalted butter, melted'
        ]
      }
    ],
    instructions: [
      {
        title: '',
        steps: [
          'Preheat oven to 425°F (220°C). Place a 9-inch cast iron skillet in the oven while it preheats.',
          'In a large bowl, whisk together cornmeal, flour, sugar (if using), baking powder, and salt.',
          'In a separate bowl, whisk together buttermilk, milk, and eggs.',
          'Pour the wet ingredients into the dry ingredients and stir just until combined.',
          'Remove the hot skillet from the oven and add 2 tablespoons of the melted butter, swirling to coat the bottom and sides.',
          'Pour the remaining melted butter into the batter and stir quickly to incorporate.',
          'Pour the batter into the hot skillet (it should sizzle).',
          'Bake for 20-25 minutes until golden brown and a toothpick inserted in the center comes out clean.',
          'Allow to cool in the skillet for 10 minutes before slicing and serving.'
        ]
      }
    ],
    notes: [
      'Traditional Southern cornbread uses little to no sugar, while Northern-style is sweeter.',
      'For extra flavor, add 1 cup of fresh or frozen corn kernels or 1/2 cup shredded cheddar cheese to the batter.',
      'The preheated cast iron skillet creates that signature crisp bottom crust.'
    ]
  },
  'gumbo': {
    title: 'Shrimp and Sausage Gumbo',
    image: '/images/gumbo.jpg',
    intro: 'A rich, flavorful gumbo with fresh shrimp and andouille sausage that captures the essence of Louisiana Creole cooking.',
    prepTime: '45 minutes',
    cookTime: '2 hours',
    difficulty: 'Advanced',
    serves: '8-10 servings',
    ingredients: [
      {
        title: 'For the Roux',
        items: [
          '1 cup vegetable oil',
          '1 cup all-purpose flour'
        ]
      },
      {
        title: 'For the Gumbo',
        items: [
          '2 large onions, diced',
          '2 green bell peppers, diced',
          '4 celery stalks, diced',
          '8 cloves garlic, minced',
          '1 lb andouille sausage, sliced',
          '8 cups chicken stock',
          '2 bay leaves',
          '2 teaspoons Creole seasoning',
          '1 teaspoon dried thyme',
          '1 teaspoon dried oregano',
          '1/2 teaspoon cayenne pepper (adjust to taste)',
          '2 lbs large shrimp, peeled and deveined',
          '1 cup green onions, chopped',
          '1/4 cup fresh parsley, chopped',
          'Hot cooked rice, for serving',
          'File powder (optional, for serving)'
        ]
      }
    ],
    instructions: [
      {
        title: 'Make the Roux',
        steps: [
          'In a large, heavy-bottomed Dutch oven, heat the oil over medium heat.',
          'Gradually whisk in the flour until fully incorporated.',
          'Cook, stirring constantly with a wooden spoon, until the roux reaches a deep chocolate brown color, about 25-35 minutes. Do not let it burn.',
          'The roux is ready when it smells nutty and is the color of dark chocolate.'
        ]
      },
      {
        title: 'Make the Gumbo',
        steps: [
          'Once the roux reaches the proper color, add the onions, bell peppers, and celery. Cook until vegetables begin to soften, about 8-10 minutes.',
          'Add garlic and cook for another minute until fragrant.',
          'Stir in the sliced andouille sausage and cook for 5 minutes.',
          'Slowly add the chicken stock, stirring constantly to prevent lumps.',
          'Add bay leaves, Creole seasoning, thyme, oregano, and cayenne pepper.',
          'Bring to a boil, then reduce heat to low and simmer, uncovered, for 1 hour, skimming off any foam that rises to the surface.',
          'Add the shrimp and cook just until they turn pink, about 5 minutes.',
          'Stir in green onions and parsley. Adjust seasoning to taste.',
          'Remove bay leaves before serving.',
          'Serve over hot rice with file powder on the side for sprinkling (if using).'
        ]
      }
    ],
    notes: [
      'The key to great gumbo is a dark, flavorful roux. Take your time and don\'t rush this step.',
      'For seafood variation, add 1 lb of crab meat along with the shrimp.',
      'Gumbo is often better the next day after flavors have melded.',
      'File powder (ground sassafras leaves) should be added at the table, not during cooking.'
    ]
  },
  'peach-cobbler': {
    title: 'Peach Cobbler',
    image: '/images/peach-cobbler.jpg',
    intro: 'A classic Southern dessert featuring sweet, juicy peaches topped with a golden buttery crust.',
    prepTime: '20 minutes',
    cookTime: '45 minutes',
    difficulty: 'Medium',
    serves: '8 servings',
    ingredients: [
      {
        title: 'Filling',
        items: [
          '8 cups fresh peaches, peeled, pitted and sliced (about 8-10 peaches)',
          '1 cup granulated sugar',
          '1/4 cup brown sugar',
          '1/4 cup butter',
          '1 teaspoon ground cinnamon',
          '1/4 teaspoon ground nutmeg',
          '1 tablespoon lemon juice',
          '2 teaspoons vanilla extract',
          '2 tablespoons cornstarch'
        ]
      },
      {
        title: 'Topping',
        items: [
          '2 cups all-purpose flour',
          '1/2 cup granulated sugar',
          '1/2 cup brown sugar',
          '2 teaspoons baking powder',
          '1 teaspoon salt',
          '12 tablespoons cold unsalted butter, cubed',
          '1/2 cup boiling water',
          '3 tablespoons sugar mixed with 1 teaspoon cinnamon, for sprinkling'
        ]
      }
    ],
    instructions: [
      {
        title: 'Prepare the Filling',
        steps: [
          'Preheat oven to 375°F (190°C).',
          'In a large saucepan, combine the peaches, sugars, butter, cinnamon, nutmeg, and lemon juice.',
          'Cook over medium heat for about 5 minutes until peaches begin to soften and release juices.',
          'In a small bowl, mix cornstarch with 2 tablespoons cold water until dissolved.',
          'Add cornstarch mixture and vanilla to the peach mixture, stirring constantly until thickened, about 2 minutes.',
          'Pour the filling into a buttered 9x13 inch baking dish.'
        ]
      },
      {
        title: 'Make the Topping',
        steps: [
          'In a medium bowl, whisk together flour, sugars, baking powder, and salt.',
          'Cut in the cold butter using a pastry cutter or your fingers until mixture resembles coarse crumbs.',
          'Stir in boiling water just until combined. The dough will be slightly sticky.',
          'Drop spoonfuls of dough over the peach filling, covering most of the surface.',
          'Sprinkle the cinnamon-sugar mixture over the top.',
          'Bake for 40-45 minutes until the topping is golden brown and filling is bubbly.',
          'Allow to cool for at least 15 minutes before serving.'
        ]
      }
    ],
    notes: [
      'If using frozen peaches, thaw completely and drain excess liquid before using.',
      'For extra richness, serve warm with vanilla ice cream or freshly whipped cream.',
      'Can be made with other fruits - blackberries, blueberries, or apples all work well.',
      'For a shortcut, you can use canned peaches in light syrup (drained) instead of fresh.'
    ]
  }
};

export default function RecipePage() {
  const router = useRouter();
  const { id } = router.query;
  
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiUnavailable, setApiUnavailable] = useState(false);
  
  useEffect(() => {
    if (!id) return;
    
    async function fetchRecipe() {
      setIsLoading(true);
      
      // First check if we have local data
      if (fallbackRecipes[id]) {
        try {
          // Try to fetch from render backend with a timeout
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
          
          try {
            const response = await fetch(
              `https://southern-recipes-api.onrender.com/recipes/${id}`,
              { signal: controller.signal }
            );
            
            clearTimeout(timeoutId);
            
            if (response.ok) {
              const data = await response.json();
              setRecipe(data);
              setApiUnavailable(false);
            } else {
              console.log('API returned error, using fallback data');
              setRecipe(fallbackRecipes[id]);
              setApiUnavailable(true);
            }
          } catch (fetchError) {
            clearTimeout(timeoutId);
            console.log('Fetch operation failed:', fetchError.message);
            setRecipe(fallbackRecipes[id]);
            setApiUnavailable(true);
          }
        } catch (error) {
          console.error('Error fetching recipe:', error);
          setRecipe(fallbackRecipes[id]);
          setApiUnavailable(true);
        } finally {
          setIsLoading(false);
        }
      } else {
        setError('Recipe not found');
        setIsLoading(false);
      }
    }
    
    fetchRecipe();
  }, [id]);
  
  if (isLoading) {
    return (
      <div className={styles.recipeContainer}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading recipe...</p>
        </div>
      </div>
    );
  }
  
  if (error || !recipe) {
    return (
      <div className={styles.recipeContainer}>
        <div className={styles.errorContainer}>
          <h1>Oops! Something went wrong</h1>
          <p>{error || "We couldn't find the recipe you're looking for."}</p>
          <button onClick={() => router.push('/recipes')} className={styles.backButton}>
            Return to Recipes
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className={styles.recipeContainer}>
      {apiUnavailable && (
        <div className={styles.apiNotice}>
          <small>Online recipe database is currently unavailable. Showing locally stored recipe.</small>
        </div>
      )}
      
      <header className={styles.recipeHeader}>
        <h1 className={styles.recipeTitle}>{recipe.title}</h1>
        <div className={styles.decorativeLine}></div>
      </header>
      
      <div className={styles.recipeImageContainer}>
        <Image 
          src={recipe.image}
          alt={recipe.title}
          fill
          className={styles.recipeImage}
          priority
        />
      </div>
      
      <section className={styles.recipeSection}>
        <h2 className={styles.sectionTitle}>Ingredients</h2>
        
        <ul className={styles.ingredientsList}>
          {recipe.ingredients && recipe.ingredients.map((section, idx) => (
            <li key={idx} className={styles.ingredientItem}>
              {section.title && <h3 className={styles.subheading}>{section.title}</h3>}
              <ul>
                {section.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>
      
      <section className={styles.recipeSection}>
        <h2 className={styles.sectionTitle}>Instructions</h2>
        
        <ol className={styles.stepsList}>
          {recipe.instructions && recipe.instructions.map((section, idx) => (
            <li key={idx} className={styles.stepItem}>
              {section.title && <h3 className={styles.subheading}>{section.title}</h3>}
              <ol start={idx > 0 ? recipe.instructions[idx-1].steps.length + 1 : 1}>
                {section.steps.map((step, i) => (
                  <li key={i}>
                    <p>{step}</p>
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ol>
      </section>
      
      {recipe.notes && (
        <section className={styles.recipeSection}>
          <h2 className={styles.sectionTitle}>Cook's Notes</h2>
          <div className={styles.recipeNotes}>
            <ul>
              {recipe.notes.map((note, idx) => (
                <li key={idx}>{note}</li>
              ))}
            </ul>
          </div>
        </section>
      )}
      
      <button 
        onClick={() => router.push('/recipes')} 
        className={styles.backButton}
      >
        ← Back to Recipes
      </button>
    </div>
  );
} 