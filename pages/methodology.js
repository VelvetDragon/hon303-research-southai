// pages/methodology.js
import styles from '../styles/Content.module.css';
import Image from 'next/image';

export default function Methodology() {
  return (
    <div className={styles.contentContainer}>
      <h1 className={styles.pageTitle}>Research Methodology</h1>
      <div className={styles.sectionDivider}></div>

      {/* Research Approach */}
      <section className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>Research Approach</h2>
        <p>
          This research uses a <strong>mixed-methods</strong> framework (combining different types of research techniques)
          to study AI-generated Southern recipes. We use both:
        </p>
        <ul className={styles.bulletList}>
          <li>
            <strong>Quantitative techniques</strong> (methods involving numbers and measurements) through computer analysis
          </li>
          <li>
            <strong>Qualitative evaluation</strong> (methods based on expert judgment and observation) by Southern cooking experts
          </li>
        </ul>
        <p>We organized the study into four main stages:</p>
        <ol className={styles.numberedList}>
          <li><strong>Data Collection:</strong> Gathering historical and modern Southern recipes</li>
          <li><strong>Data Preparation:</strong> Converting recipes into a format computers can understand</li>
          <li><strong>Model Fine-Tuning:</strong> Teaching AI systems about Southern cooking</li>
          <li><strong>Comparative Evaluation:</strong> Testing how well the AI understands Southern cuisine</li>
        </ol>
      </section>

      {/* Historical Cookbooks */}
      <section className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>Historical Southern Cookbooks Used in This Study</h2>
        <p>
          Our research draws from nine historical Southern cookbooks. Each cookbook provides unique insights
          into traditional Southern cooking methods and recipes:
        </p>
        
        {/* Cookbook 1 */}
        <div className={styles.cookbookEntry}>
          <h3>Cookbook #1</h3>
          <div className={styles.cookbookImagePlaceholder}>
            [Add cookbook image here]
          </div>
          <p><strong>Title:</strong> [Add cookbook title]</p>
          <p><strong>Year:</strong> [Add year]</p>
        </div>

        {/* Template repeated for remaining cookbooks */}
        {/* Add Cookbooks 2-9 in the same format */}
        {/* You can fill in the details for each cookbook */}
      </section>

      {/* Data Collection */}
      <section className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>Data Collection Process</h2>
        <div className={styles.sectionSpacing}>
          <p>
            Our research focuses exclusively on historical Southern recipes preserved in the McCain Library 
            and Archives. This prestigious collection provides an authentic window into Southern culinary history.
          </p>
        </div>
        
        <div className={`${styles.subsection} ${styles.spacedSection}`}>
          <h3>McCain Library Archives Collection</h3>
          <div className={styles.contentSpacing}>
            <p>
              We digitized over 1,200 historical recipes from the McCain Library&apos;s extensive Southern cookbook collection.
              These recipes represent authentic Southern cooking traditions preserved through:
            </p>
            <ul className={`${styles.bulletList} ${styles.spacedList}`}>
              <li>Community cookbooks from Southern social organizations</li>
              <li>Church congregation recipe collections</li>
              <li>Family recipe books donated to the archives</li>
              <li>Regional cooking pamphlets and publications</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Data Preparation */}
      <section className={`${styles.contentSection} ${styles.spacedSection}`}>
        <h2 className={styles.sectionTitle}>Data Preparation</h2>
        <div className={styles.contentSpacing}>
          <p>
            Before we could use these recipes with AI systems, we needed to convert them into a standardized 
            digital format. This involved several steps:
          </p>
        </div>

        <div className={`${styles.subsection} ${styles.spacedSection}`}>
          <h3>Converting Physical to Digital</h3>
          <div className={styles.contentSpacing}>
            <p>
              We used <strong>Tesseract OCR</strong> (a computer program that reads printed text) to:
            </p>
            <ul className={`${styles.bulletList} ${styles.spacedList}`}>
              <li>Scan cookbook pages into digital text</li>
              <li>Fix common scanning errors (like mistaking &quot;0&quot; for &quot;O&quot;)</li>
              <li>Correct measurement symbols (converting typed fractions to digital format)</li>
            </ul>
          </div>
        </div>

        <div className={`${styles.subsection} ${styles.spacedSection}`}>
          <h3>Organizing Recipe Information</h3>
          <div className={styles.contentSpacing}>
            <p>
              We created a standard format for each recipe that includes:
            </p>
            <ul className={`${styles.bulletList} ${styles.spacedList}`}>
              <li>Recipe title and source information</li>
              <li>Ingredient list with standardized measurements</li>
              <li>Step-by-step cooking instructions</li>
              <li>Regional information (which part of the South it&apos;s from)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Understanding AI Fine-Tuning */}
      <section className={`${styles.contentSection} ${styles.spacedSection}`}>
        <h2 className={styles.sectionTitle}>Understanding AI Fine-Tuning</h2>
        
        <div className={`${styles.subsection} ${styles.spacedSection}`}>
          <h3>What is Fine-Tuning?</h3>
          <div className={styles.contentSpacing}>
            <p>
              Think of fine-tuning like teaching a general cook to become a specialist in Southern cuisine. 
              The AI starts with basic knowledge of language and cooking (like knowing what &quot;bake&quot; or &quot;mix&quot; means), 
              and we teach it the specific patterns and traditions of Southern cooking.
            </p>
          </div>
        </div>

        <div className={`${styles.subsection} ${styles.spacedSection}`}>
          <h3>The Fine-Tuning Process</h3>
          <div className={styles.contentSpacing}>
            <p>
              Our fine-tuning process involved several careful steps:
            </p>
            <ol className={`${styles.numberedList} ${styles.spacedList}`}>
              <li>
                <strong>Starting Point:</strong> We began with GPT-Neo (an AI model that understands basic English 
                and general cooking terms)
              </li>
              <li>
                <strong>Teaching Format:</strong> We showed the AI thousands of Southern recipes in a specific format:
                <ul className={`${styles.bulletList} ${styles.spacedList}`}>
                  <li>Recipe title at the top</li>
                  <li>Ingredients list marked with special tags</li>
                  <li>Step-by-step instructions in a consistent format</li>
                  <li>Regional notes and special instructions</li>
                </ul>
              </li>
              <li>
                <strong>Learning Process:</strong> The AI went through multiple rounds of learning:
                <ul className={`${styles.bulletList} ${styles.spacedList}`}>
                  <li>First round: Learning to recognize recipe parts</li>
                  <li>Second round: Understanding ingredient relationships</li>
                  <li>Third round: Mastering cooking instructions</li>
                  <li>Final round: Fine-tuning for Southern specifics</li>
                </ul>
              </li>
            </ol>
          </div>
        </div>

        <div className={`${styles.subsection} ${styles.spacedSection}`}>
          <h3>Special Southern Cooking Considerations</h3>
          <div className={styles.contentSpacing}>
            <p>
              We paid special attention to teaching the AI about unique aspects of Southern cooking:
            </p>
            <ul className={`${styles.bulletList} ${styles.spacedList}`}>
              <li>
                <strong>Regional Terms:</strong> Understanding words like &quot;mess of greens&quot; or &quot;pinch of soda&quot;
              </li>
              <li>
                <strong>Cooking Methods:</strong> Learning traditional techniques like &quot;seasoning cast iron&quot; or 
                &quot;working the dough&quot;
              </li>
              <li>
                <strong>Cultural Context:</strong> Understanding when certain dishes are traditionally served 
                (like black-eyed peas on New Year&apos;s Day)
              </li>
              <li>
                <strong>Family Wisdom:</strong> Learning to interpret notes like &quot;cook until done&quot; or 
                &quot;add flour until right&quot;
              </li>
            </ul>
          </div>
        </div>

        <div className={`${styles.subsection} ${styles.spacedSection}`}>
          <h3>Technical Details of Fine-Tuning</h3>
          <div className={styles.contentSpacing}>
            <p>
              For those interested in the technical aspects, our fine-tuning used:
            </p>
            <ul className={`${styles.bulletList} ${styles.spacedList}`}>
              <li>
                <strong>Base Model:</strong> GPT-Neo with 1.3 billion parameters (a measure of the AI&apos;s capacity 
                to learn)
              </li>
              <li>
                <strong>Training Iterations:</strong> 4 complete passes through the recipe collection
              </li>
              <li>
                <strong>Learning Speed:</strong> Carefully controlled at 0.00005 (5e-5) to ensure stable learning
              </li>
              <li>
                <strong>Batch Processing:</strong> Recipes were taught in small groups of 2 to maintain quality
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Testing the Results */}
      <section className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>Testing the AI&apos;s Understanding</h2>
        <p>
          We used several methods to check how well the AI learned about Southern cooking:
        </p>
        <ul className={styles.bulletList}>
          <li>
            <strong>Ingredient Comparison:</strong> Checking if the AI uses authentic Southern ingredients
          </li>
          <li>
            <strong>Recipe Structure:</strong> Making sure the cooking steps make sense
          </li>
          <li>
            <strong>Expert Review:</strong> Having Southern cooking experts evaluate the AI&apos;s recipes
          </li>
          <li>
            <strong>Kitchen Testing:</strong> Actually cooking the AI&apos;s recipes to see if they work
          </li>
        </ul>
      </section>

      {/* Research Limitations */}
      <section className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>Research Limitations</h2>
        <p>
          It&apos;s important to note what our research couldn&apos;t fully address:
        </p>
        <ul className={styles.bulletList}>
          <li>
            <strong>Subjective Nature:</strong> What makes a recipe &quot;authentically Southern&quot; can vary by region and family tradition
          </li>
          <li>
            <strong>Regional Gaps:</strong> Some areas of the South might be better represented than others in our cookbook collection
          </li>
          <li>
            <strong>Technical Limitations:</strong> Some handwritten recipes couldn&apos;t be perfectly converted to digital format
          </li>
          <li>
            <strong>Computer Processing Limits:</strong> We could only use a certain amount of computing power to train the AI
          </li>
        </ul>
      </section>

    </div>
  );
}

