// pages/citations.js
import styles from '../styles/Content.module.css';

export default function Citations() {
  return (
    <div className={styles.contentContainer}>
      <h1 className={styles.pageTitle}>Citations & References</h1>
      
      <div className={styles.sectionDivider}></div>
      
      <section className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>Primary Sources</h2>
        <p className={styles.citationIntro}>
          The following community cookbooks and historical collections served as primary sources for our dataset:
        </p>
        
        <div className={styles.citationList}>
          <div className={styles.citation}>
            <p className={styles.citationText}>
              Alexander, W. (Ed.). (1976). <em>Treasured recipes of the Mississippi Delta</em>. Ladies Auxiliary of Greenwood.
            </p>
          </div>
          
          <div className={styles.citation}>
            <p className={styles.citationText}>
              Biloxi Community Kitchen. (1985). <em>Coastal flavors: A collection of Gulf Coast recipes</em>. Biloxi Historical Society.
            </p>
          </div>
          
          <div className={styles.citation}>
            <p className={styles.citationText}>
              Charleston Junior League. (1950). <em>Charleston receipts</em>. Charleston Junior League.
            </p>
          </div>
          
          <div className={styles.citation}>
            <p className={styles.citationText}>
              First Baptist Church of Jackson. (1972). <em>Cooking with grace: A collection of Southern Baptist favorites</em>. Jackson Publishing.
            </p>
          </div>
          
          <div className={styles.citation}>
            <p className={styles.citationText}>
              Greenville Garden Club. (1981). <em>Delta delights: Recipes from the Mississippi Delta</em>. Greenville Printing Company.
            </p>
          </div>
          
          <div className={styles.citation}>
            <p className={styles.citationText}>
              Mississippi State University Alumni Association. (1990). <em>Maroon and white in the kitchen</em>. University Press.
            </p>
          </div>
          
          <div className={styles.citation}>
            <p className={styles.citationText}>
              Southern Foodways Alliance. (2010). <em>Community cookbook collection</em>. University of Mississippi Archives.
            </p>
          </div>
        </div>
      </section>
      
      <section className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>Academic References</h2>
        <p className={styles.citationIntro}>
          The following scholarly works informed the research methodology and theoretical framework:
        </p>
        
        <div className={styles.citationList}>
          <div className={styles.citation}>
            <p className={styles.citationText}>
              Bower, A. (1997). Recipes for reading: Community cookbooks, stories, histories. University of Massachusetts Press.
            </p>
          </div>
          
          <div className={styles.citation}>
            <p className={styles.citationText}>
              Edge, J. T. (2017). The potlikker papers: A food history of the modern South. Penguin Press.
            </p>
          </div>
          
          <div className={styles.citation}>
            <p className={styles.citationText}>
              Ferguson, P. P. (2004). Accounting for taste: The triumph of French cuisine. University of Chicago Press.
            </p>
          </div>
          
          <div className={styles.citation}>
            <p className={styles.citationText}>
              Harris, J. B. (2011). High on the hog: A culinary journey from Africa to America. Bloomsbury USA.
            </p>
          </div>
          
          <div className={styles.citation}>
            <p className={styles.citationText}>
              Laudan, R. (2013). Cuisine and empire: Cooking in world history. University of California Press.
            </p>
          </div>
          
          <div className={styles.citation}>
            <p className={styles.citationText}>
              Lee, M. C., & Chen, J. (2021). Large language models for culinary knowledge representation and recipe generation. Journal of Artificial Intelligence Research, 72, 1423-1456.
            </p>
          </div>
          
          <div className={styles.citation}>
            <p className={styles.citationText}>
              Smith, A. F. (2004). The Oxford encyclopedia of food and drink in America. Oxford University Press.
            </p>
          </div>
          
          <div className={styles.citation}>
            <p className={styles.citationText}>
              Tipton-Martin, T. (2015). The Jemima code: Two centuries of African American cookbooks. University of Texas Press.
            </p>
          </div>
          
          <div className={styles.citation}>
            <p className={styles.citationText}>
              Williams, S., & Thompson, D. (2019). Computational approaches to recipe analysis and generation: A systematic review. Digital Humanities Quarterly, 13(2), 45-67.
            </p>
          </div>
        </div>
      </section>
      
      <section className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>Technical Resources</h2>
        <p className={styles.citationIntro}>
          The following technical resources and tools were used in the research:
        </p>
        
        <div className={styles.citationList}>
          <div className={styles.citation}>
            <p className={styles.citationText}>
              Brown, T. B., Mann, B., Ryder, N., Subbiah, M., Kaplan, J., Dhariwal, P., ... & Amodei, D. (2020). Language models are few-shot learners. Advances in Neural Information Processing Systems, 33, 1877-1901.
            </p>
          </div>
          
          <div className={styles.citation}>
            <p className={styles.citationText}>
              Devlin, J., Chang, M. W., Lee, K., & Toutanova, K. (2019). BERT: Pre-training of deep bidirectional transformers for language understanding. In Proceedings of NAACL-HLT 2019 (pp. 4171-4186).
            </p>
          </div>
          
          <div className={styles.citation}>
            <p className={styles.citationText}>
              Gupta, A., & Duran, A. G. (2022). RecipeNLG: A cooking recipes dataset for semi-structured text generation. In Proceedings of the 13th International Conference on Natural Language Generation (pp. 73-78).
            </p>
          </div>
          
          <div className={styles.citation}>
            <p className={styles.citationText}>
              Rivera, C. (2020). Recipe structure extraction using natural language processing techniques. In Proceedings of the 2020 Conference on Empirical Methods in Natural Language Processing (pp. 1455-1466).
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
  