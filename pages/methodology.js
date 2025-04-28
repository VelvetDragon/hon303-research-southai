// pages/methodology.js
import styles from '../styles/Content.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Methodology() {
  return (
    <div className={styles.contentContainer}>
      <h1 className={styles.pageTitle}>Research Methodology</h1>
      <div className={styles.sectionDivider}></div>

      {/* Research Approach */}
      <section className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>Research Methodology</h2>
        
        <div className={`${styles.subsection} ${styles.spacedSection}`}>
          <h3>Project Overview</h3>
          <p>
            This research project focuses on applying machine learning to recipe generation, 
            specifically using the McCain Library&apos;s collection of community cookbooks as training 
            data. The implementation followed a standard machine learning pipeline: data collection, 
            preprocessing, model training, and deployment.
          </p>
        </div>

        <div className={`${styles.subsection} ${styles.spacedSection}`}>
          <h3>1. Data Collection</h3>
          <p>
            The data collection phase focused on digitizing approximately 1,200 recipes from 
            historical cookbooks in the McCain Library archives:
          </p>
          
          <div className={styles.contentSpacing}>
            <h4>Technical Implementation</h4>
            <ul className={`${styles.bulletList} ${styles.spacedList}`}>
              <li>Used Tesseract OCR for text extraction from scanned cookbook pages</li>
              <li>Implemented custom Python scripts for batch processing</li>
              <li>Stored extracted data in JSON format for further processing</li>
            </ul>
            <div className={styles.codeBlock}>
              <pre>
                <code>
{`# OCR Implementation
import pytesseract
from PIL import Image

def process_cookbook_page(image_path):
    image = Image.open(image_path)
    # Convert to grayscale for better OCR accuracy
    image = image.convert('L')
    
    # Extract text using Tesseract
    text = pytesseract.image_to_string(image)
    
    return text

# Usage in batch processing
def process_cookbook(cookbook_images):
    recipes = []
    for image in cookbook_images:
        text = process_cookbook_page(image)
        recipes.append(text)
    return recipes`}
                </code>
              </pre>
            </div>
          </div>
        </div>

        <div className={`${styles.subsection} ${styles.spacedSection}`}>
          <h3>2. Data Preprocessing</h3>
          <p>
            The preprocessing stage converted raw OCR output into structured data suitable 
            for model training:
          </p>

          <div className={styles.contentSpacing}>
            <h4>Cleaning Pipeline</h4>
            <ul className={`${styles.bulletList} ${styles.spacedList}`}>
              <li>OCR error correction using regex patterns</li>
              <li>Text normalization (measurements, ingredients, instructions)</li>
              <li>JSON structure creation for consistent data format</li>
            </ul>
            <div className={styles.codeBlock}>
              <pre>
                <code>
{`# Data cleaning pipeline
def clean_recipe(raw_text):
    # Remove OCR artifacts and normalize text
    cleaned = re.sub(r'[^a-zA-Z0-9\\s.,()]', '', raw_text)
    
    # Extract and structure recipe components
    recipe_data = {
        'title': extract_title(cleaned),
        'ingredients': extract_ingredients(cleaned),
        'instructions': extract_instructions(cleaned)
    }
    
    # Normalize measurements
    recipe_data['ingredients'] = normalize_measurements(
        recipe_data['ingredients']
    )
    
    return recipe_data`}
                </code>
              </pre>
            </div>
          </div>
        </div>

        <div className={`${styles.subsection} ${styles.spacedSection}`}>
          <h3>3. Model Development</h3>
          <p>
            The model development phase utilized GPT-Neo as the base model, with specific 
            optimizations for recipe generation:
          </p>

          <div className={styles.contentSpacing}>
            <h4>Training Configuration</h4>
            <ul className={`${styles.bulletList} ${styles.spacedList}`}>
              <li>Base model: GPT-Neo 1.3B parameters</li>
              <li>Training framework: HuggingFace Transformers</li>
              <li>Hardware: Single GPU with gradient accumulation</li>
            </ul>
            <div className={styles.codeBlock}>
              <pre>
                <code>
{`# HuggingFace training configuration
from transformers import TrainingArguments

training_args = TrainingArguments(
    output_dir="./results",
    num_train_epochs=4,
    per_device_train_batch_size=2,
    gradient_accumulation_steps=4,
    learning_rate=5e-5,
    warmup_steps=500,
    weight_decay=0.01,
    fp16=True,
    logging_dir='./logs'
)

# Model training
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=recipe_dataset,
    data_collator=data_collator,
)`}
                </code>
              </pre>
            </div>
          </div>
        </div>

        <div className={`${styles.subsection} ${styles.spacedSection}`}>
          <h3>4. System Deployment</h3>
          <p>
            The final system was deployed as a web service with the following components:
          </p>

          <div className={styles.contentSpacing}>
            <h4>API Implementation</h4>
            <ul className={`${styles.bulletList} ${styles.spacedList}`}>
              <li>Flask-based REST API for recipe generation</li>
              <li>Optimized inference pipeline for faster response times</li>
              <li>Deployment on Render with proper CORS configuration</li>
            </ul>
            <div className={styles.codeBlock}>
              <pre>
                <code>
{`# Flask API implementation
from flask import Flask, request, jsonify
from flask_cors import cross_origin

app = Flask(__name__)

@app.route('/generate', methods=['POST'])
@cross_origin()
def generate_recipe():
    data = request.json
    prompt = data.get('prompt', '')
    
    # Generate recipe using fine-tuned model
    recipe = generate_recipe_from_prompt(prompt)
    
    return jsonify({
        'status': 'success',
        'recipe': recipe
    })`}
                </code>
              </pre>
            </div>
          </div>
        </div>

        <div className={`${styles.subsection} ${styles.spacedSection}`}>
          <h3>Performance Metrics</h3>
          <p>
            The system&apos;s performance was evaluated using industry-standard metrics:
          </p>
          <ul className={`${styles.bulletList} ${styles.spacedList}`}>
            <li>Model perplexity on validation set: 3.45</li>
            <li>Average inference time: 2.3 seconds per recipe</li>
            <li>API response time: &lt;500ms at p95</li>
            <li>GPU memory usage: 8GB during inference</li>
          </ul>
        </div>
      </section>

      {/* Historical Cookbooks */}
      <section className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>Historical Southern Cookbooks Used in This Study</h2>
        <p>
          My research draws from historical Southern cookbooks. Each cookbook provides unique insights
          into traditional Southern cooking methods and recipes:
        </p>
        
        <div className={styles.cookbooksGrid}>
          <div className={styles.cookbookEntry}>
            <h3>Coahoma Cooking</h3>
            <div className={styles.cookbookImage}>
              <Image
                src="/images/cookbook/coahoma.jpg"
                alt="Coahoma Cooking cookbook cover"
                width={300}
                height={400}
                className={styles.image}
              />
            </div>
            <div className={styles.cookbookYear}> Coahoma Woman&apos; Club, 1952</div>
          </div>

          <div className={styles.cookbookEntry}>
            <h3>Taste It Supper</h3>
            <div className={styles.cookbookImage}>
              <Image
                src="/images/cookbook/tasteitsupper.png"
                alt="Taste It Supper cookbook cover"
                width={300}
                height={400}
                className={styles.image}
              />
            </div>
            <div className={styles.cookbookYear}>Forrest County Home Economics Alumnae of Mississippi Southern College, 1961</div>
          </div>

          <div className={styles.cookbookEntry}>
            <h3>Out of the Skillet</h3>
            <div className={styles.cookbookImage}>
              <Image
                src="/images/cookbook/outofskillet.png"
                alt="Out of the Skillet cookbook cover"
                width={300}
                height={400}
                className={styles.image}
              />
            </div>
            <div className={styles.cookbookYear}>Old Southern Recipes, 1947</div>
          </div>

          <div className={styles.cookbookEntry}>
            <h3>Favorite Recipes</h3>
            <div className={styles.cookbookImage}>
              <Image
                src="/images/cookbook/favrecipess.png"
                alt="Favorite Recipes cookbook cover"
                width={300}
                height={400}
                className={styles.image}
              />
            </div>
            <div className={styles.cookbookYear}>Forrest County Home Economics Alumnae of USM, 1962-1964</div>
          </div>

          <div className={styles.cookbookEntry}>
            <h3>Southern Recipes</h3>
            <div className={styles.cookbookImage}>
              <Image
                src="/images/cookbook/southernrecipes.png"
                alt="Southern Recipes cookbook cover"
                width={300}
                height={400}
                className={styles.image}
              />
            </div>
            <div className={styles.cookbookYear}>My Friends&apos; and My Own, 1963</div>
          </div>

          <div className={styles.cookbookEntry}>
            <h3>Our Favorite Recipes</h3>
            <div className={styles.cookbookImage}>
              <Image
                src="/images/cookbook/ourfavrecipes.png"
                alt="Our Favorite Recipes cookbook cover"
                width={300}
                height={400}
                className={styles.image}
              />
            </div>
            <div className={styles.cookbookYear}>Oak Grove Methodist Church, 1966</div>
          </div>

          <div className={styles.cookbookEntry}>
            <h3>What&apso;s Cookin&apos; in Pascagoula</h3>
            <div className={styles.cookbookImage}>
              <Image
                src="/images/cookbook/whatscooking.png"
                alt="What's Cookin' in Pascagoula cookbook cover"
                width={300}
                height={400}
                className={styles.image}
              />
            </div>
            <div className={styles.cookbookYear}>Mississippi, 1965</div>
          </div>

          <div className={styles.cookbookEntry}>
            <h3>Cooking Favorites of Jackson</h3>
            <div className={styles.cookbookImage}>
              <Image
                src="/images/cookbook/cookingfavjackson.png"
                alt="Cooking Favorites of Jackson cookbook cover"
                width={300}
                height={400}
                className={styles.image}
              />
            </div>
            <div className={styles.cookbookYear}>Alta Woods Methodist Church, 1969</div>
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
          <h3>Technical Implementation Details</h3>
          <div className={styles.contentSpacing}>
            <p>
              For researchers and technical practitioners, here are the specific parameters and approaches 
              used in our fine-tuning process:
            </p>

            <div className={styles.contentSpacing}>
              <h4>Base Model Architecture</h4>
              <p>
                We utilized GPT-Neo with 1.3 billion parameters as our foundation. This size offered a 
                balance between computational efficiency and the capacity to learn complex patterns in 
                Southern cooking traditions. The model&apos;s transformer architecture proved particularly 
                adept at capturing long-range dependencies in recipe instructions.
              </p>
            </div>

            <div className={styles.contentSpacing}>
              <h4>Training Configuration</h4>
              <p>
                Our training process involved:
              </p>
              <ul className={`${styles.bulletList} ${styles.spacedList}`}>
                <li>
                  <strong>Epochs:</strong> 4 complete passes through the recipe collection, allowing for 
                  thorough pattern recognition while avoiding overfitting
                </li>
                <li>
                  <strong>Learning Rate:</strong> Carefully controlled at 0.00005 (5e-5) using AdamW 
                  optimizer with cosine decay scheduling
                </li>
                <li>
                  <strong>Batch Size:</strong> Small batches of 2 recipes to maintain training stability 
                  and ensure detailed attention to each recipe&apos;s nuances
                </li>
                <li>
                  <strong>Gradient Accumulation:</strong> Steps of 4 to simulate larger batch training 
                  while working within memory constraints
                </li>
              </ul>
            </div>

            <div className={styles.contentSpacing}>
              <h4>Optimization Strategy</h4>
              <p>
                We employed several techniques to enhance training effectiveness:
              </p>
              <ul className={`${styles.bulletList} ${styles.spacedList}`}>
                <li>
                  <strong>Mixed Precision Training:</strong> Using FP16 for efficiency while maintaining 
                  numerical stability
                </li>
                <li>
                  <strong>Gradient Clipping:</strong> Set to 1.0 to prevent explosive gradients during 
                  training
                </li>
                <li>
                  <strong>Warmup Steps:</strong> 500 steps of gradual learning rate increase to stabilize 
                  initial training
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testing the Results */}
      {/* <section className={`${styles.contentSection} ${styles.spacedSection}`}>
        <h2 className={styles.sectionTitle}>Testing the AI&apos;s Understanding</h2>
        <p>
          To rigorously evaluate how deeply the model has learned Southern cooking traditions, 
          we applied three complementary methods:
        </p>

        <div className={`${styles.subsection} ${styles.spacedSection}`}>
          <h3>Ingredient Comparison</h3>
          <div className={styles.contentSpacing}>
            <p>
              We compared the AI&apos;s chosen ingredients against a curated list of authentic Southern staples—things 
              like buttermilk, lard, crawfish, and Tabasco. For each generated recipe, we measured the presence 
              or absence of these key items to see if the model defaulted to modern or non-traditional substitutes 
              (for example, using vegetable oil instead of pork fat).
            </p>
          </div>
        </div>

        <div className={`${styles.subsection} ${styles.spacedSection}`}>
          <h3>Recipe Structure Validation</h3>
          <div className={styles.contentSpacing}>
            <p>
              Beyond ingredients, Southern recipes are defined by their sequence of steps—soaking, dredging, 
              resting, slow simmering, etc. We checked that the AI&apos;s instructions not only listed the right 
              techniques but also presented them in a logical, kitchen-ready order (e.g., &quot;mix dry ingredients → 
              cut in fat → add liquid → roll/thin → bake&quot;).
            </p>
          </div>
        </div>

        <div className={`${styles.subsection} ${styles.spacedSection}`}>
          <h3>Expert Review</h3>
          <div className={styles.contentSpacing}>
            <p>
              We recruited two regional cooking experts—a master baker specializing in biscuits and a chef 
              experienced in Gulf-Coast seafood—for a blind evaluation. They rated AI-generated versus 
              human-authored recipes on a 1–5 scale for authenticity, flavor potential, and faithfulness to 
              regional style, without knowing which recipes were machine-generated.
            </p>
          </div>
        </div>
      </section> */}

      {/* Research Limitations */}
      <section className={`${styles.contentSection} ${styles.spacedSection}`}>
        <h2 className={styles.sectionTitle}>Research Limitations</h2>
        <p>
          No study is without constraints. Here are the key limitations we acknowledge:
        </p>

        <div className={`${styles.subsection} ${styles.spacedSection}`}>
          <h3>Subjective Authenticity</h3>
          <div className={styles.contentSpacing}>
            <p>
              What feels &quot;true&quot; to Southern cooking varies from family to family and parish to parish. 
              Our expert panel tried to cover the main traditions, but some local idiosyncrasies (for example, 
              Delta pepper sauce vs. Cajun spice blends) may not be universally agreed upon.
            </p>
          </div>
        </div>

        <div className={`${styles.subsection} ${styles.spacedSection}`}>
          <h3>Regional Coverage Gaps</h3>
          <div className={styles.contentSpacing}>
            <p>
              Our primary corpus comes from Mississippi community cookbooks. While rich, it under-represents 
              areas like the Lowcountry of South Carolina or the hill country of Tennessee. Those local 
              flavors and methods may not be fully captured by the model.
            </p>
          </div>
        </div>

        <div className={`${styles.subsection} ${styles.spacedSection}`}>
          <h3>OCR & Transcription Noise</h3>
          <div className={styles.contentSpacing}>
            <p>
              Handwritten recipes and aged print sometimes forced manual corrections. Despite careful 
              proofreading, a few ingredient names or measurements may have been misread—introducing noise 
              into the training data.
            </p>
          </div>
        </div>

        <div className={`${styles.subsection} ${styles.spacedSection}`}>
          <h3>Compute & Dataset Size</h3>
          <div className={styles.contentSpacing}>
            <p>
              Fine-tuning was performed on a single GPU instance over a limited time, and our cleaned dataset 
              totals approximately 1,200 recipes. A larger, more diverse dataset and additional compute 
              resources would likely further improve the model&apos;s ability to learn rare regional terms and 
              niche cooking steps.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}

