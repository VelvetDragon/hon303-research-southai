// pages/methodology.js
import styles from "../styles/Content.module.css";
import Image from "next/image";
import Link from "next/link";

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
            This research project focuses on applying machine learning to recipe
            generation, specifically using the McCain Library&apos;s collection
            of community cookbooks as training data. The implementation followed
            a standard machine learning pipeline: data collection,
            preprocessing, model training, and deployment.
          </p>
        </div>

        <div className={`${styles.subsection} ${styles.spacedSection}`}>
          <h3>1. Data Collection</h3>
          <p>
            The data collection phase focused on digitizing approximately 1,200
            recipes from historical cookbooks in the McCain Library archives:
          </p>

          <div className={styles.contentSpacing}>
            <h4>Technical Implementation</h4>
            <ul className={`${styles.bulletList} ${styles.spacedList}`}>
              <li>
                Used Tesseract OCR for text extraction from scanned cookbook
                pages
              </li>
              <li>Implemented custom Python scripts for batch processing</li>
              <li>
                Stored extracted data in JSON format for further processing
              </li>
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
            The preprocessing stage converted raw OCR output into structured
            data suitable for model training:
          </p>

          <div className={styles.contentSpacing}>
            <h4>Cleaning Pipeline</h4>
            <ul className={`${styles.bulletList} ${styles.spacedList}`}>
              <li>OCR error correction using regex patterns</li>
              <li>
                Text normalization (measurements, ingredients, instructions)
              </li>
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
            The model development phase utilized GPT-Neo as the base model, with
            specific optimizations for recipe generation:
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
            The final system was deployed as a web service with the following
            components:
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
      </section>

      {/* Historical Cookbooks */}
      <section className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>
          Historical Southern Cookbooks Used in This Study
        </h2>
        <p>
          My research draws from historical Southern cookbooks from the McCain
          Library's collection at The University of Southern Mississippi. Each
          cookbook provides unique insights into traditional Southern cooking
          methods and recipes:
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
            <div className={styles.cookbookYear}>
              {" "}
              Coahoma Woman&apos; Club, 1952
            </div>
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
            <div className={styles.cookbookYear}>
              Forrest County Home Economics Alumnae of Mississippi Southern
              College, 1961
            </div>
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
            <div className={styles.cookbookYear}>
              Old Southern Recipes, 1947
            </div>
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
            <div className={styles.cookbookYear}>
              Forrest County Home Economics Alumnae of USM, 1962-1964
            </div>
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
            <div className={styles.cookbookYear}>
              My Friends&apos; and My Own, 1963
            </div>
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
            <div className={styles.cookbookYear}>
              Oak Grove Methodist Church, 1966
            </div>
          </div>

          <div className={styles.cookbookEntry}>
            <h3>What&apos;s Cookin&apos; in Pascagoula</h3>
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
            <div className={styles.cookbookYear}>
              Alta Woods Methodist Church, 1969
            </div>
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
              Fine-tuning is a specialized process in machine learning. Imagine
              you have an AI model that has already learned a lot about language
              and general concepts by reading a massive amount of text from the
              internet. This is like a skilled chef who understands basic
              cooking techniques, ingredients, and kitchen equipment from years
              of working in various kitchens.
            </p>
            <p>
              Fine-tuning is the step where you take this generally skilled AI
              (the chef) and train it specifically in one area – in our case,
              Southern culinary traditions. You provide it with a focused
              dataset of Southern recipes, allowing it to learn the unique
              vocabulary, common ingredients, preparation methods, and the
              typical structure and style of these specific types of recipes.
            </p>
            <p>
              Through fine-tuning, the AI transitions from being a general
              language model to a specialized model capable of generating text
              that closely resembles the style and content of Southern recipes.
              It leverages its broad initial knowledge but adapts it to the
              specific nuances and patterns of the target domain.
            </p>
          </div>
        </div>

        <div className={`${styles.subsection} ${styles.spacedSection}`}>
          <h3>The Fine-Tuning Process</h3>
          <div className={styles.contentSpacing}>
            <p>
              The process of fine-tuning the AI model to generate Southern
              recipes involved several deliberate steps to ensure it effectively
              learned the characteristics of the dataset:
            </p>
            <ol className={`${styles.numberedList} ${styles.spacedList}`}>
              <li>
                <strong>Starting with a Capable Base Model:</strong> I began
                with GPT-Neo, a pre-trained language model. This model was
                chosen because its initial training on a vast and diverse text
                corpus provided it with a strong foundation in understanding
                English language structure, grammar, and a wide range of general
                knowledge, including basic cooking terminology. Starting with a
                model that already possesses these foundational abilities is
                significantly more efficient than training a model from scratch.
              </li>
              <li>
                <strong>Preparing and Structuring the Recipe Data:</strong> The
                collected historical Southern recipes were meticulously cleaned
                and prepared. A critical step was formatting each recipe into a
                consistent and standardized structure. This involved clearly
                identifying and marking the recipe title, the list of
                ingredients, and the sequence of cooking instructions. This
                uniform presentation was essential for the AI to reliably
                identify and learn the different components and the logical flow
                inherent in a recipe. Efforts were also made to retain any
                original regional notes or unique instructions to capture the
                full character of the dataset.
              </li>
              <li>
                <strong>Iterative Learning through Training Rounds:</strong> The
                fine-tuning process involved multiple cycles of training on the
                prepared dataset. These cycles, known as epochs, allowed the
                model to repeatedly process the entire collection of recipes.
                The training was designed to facilitate a layered learning
                process:
                <ul className={`${styles.bulletList} ${styles.spacedList}`}>
                  <li>
                    Early in the training, the model primarily focused on
                    recognizing the overall layout and key sections within the
                    recipes, such as distinguishing the title from the
                    ingredients or the instructions.
                  </li>
                  <li>
                    As training progressed, it began to learn the relationships
                    between ingredients and how they are typically used or
                    mentioned within the procedural steps.
                  </li>
                  <li>
                    In the later stages, the model refined its ability to
                    generate the actual cooking instructions, focusing on
                    coherence, logical sequencing, and the specific phrasing
                    common in Southern recipes.
                  </li>
                </ul>
                This iterative approach ensured that the model built its
                understanding progressively, from overall structure to detailed
                content generation.
              </li>
            </ol>
          </div>
        </div>

        <div className={`${styles.subsection} ${styles.spacedSection}`}>
          <h3>Technical Implementation Details</h3>
          <div className={styles.contentSpacing}>
            <p>
              For researchers and technical practitioners, here are the specific
              parameters and approaches used in my fine-tuning process:
            </p>

            <div className={styles.contentSpacing}>
              <h4>Base Model Architecture</h4>
              <p>
                I utilized GPT-Neo with 1.3 billion parameters as our
                foundation. This size offered a balance between computational
                efficiency and the capacity to learn complex patterns in
                Southern cooking traditions. The model&apos;s transformer
                architecture proved particularly adept at capturing long-range
                dependencies in recipe instructions.
              </p>
            </div>

            <div className={styles.contentSpacing}>
              <h4>Training Configuration</h4>
              <p>Our training process involved:</p>
              <ul className={`${styles.bulletList} ${styles.spacedList}`}>
                <li>
                  <strong>Epochs:</strong> 4 complete passes through the recipe
                  collection, allowing for thorough pattern recognition while
                  avoiding overfitting. This means the model trained on your
                  entire set of recipes 4 times. Each time the model sees all
                  the recipes, that&apos;s one epoch. Doing this helps the model
                  learn the patterns in the recipes well, but stopping at 4
                  helps prevent it from just memorizing the recipes instead of
                  learning general rules (overfitting).
                </li>
                <li>
                  <strong>Learning Rate:</strong> Carefully controlled at
                  0.00005 (5e-5) using AdamW optimizer with cosine decay
                  scheduling. The learning rate is a very small number (0.00005)
                  that controls how big of a step the model takes to adjust its
                  learning based on the data. AdamW optimizer is the specific
                  method or algorithm used to make those adjustments
                  efficiently. Cosine decay scheduling is a strategy where the
                  learning rate starts a bit higher and then slowly decreases
                  over time following a specific curve, which can help training.
                </li>
                <li>
                  <strong>Batch Size:</strong> Small batches of 2 recipes to
                  maintain training stability and ensure detailed attention to
                  each recipe&apos;s nuances. This refers to how many recipes
                  the model looks at together before it makes a learning
                  adjustment. A small batch size of 2 means it processed recipes
                  in very small groups. Using small batches can help the
                  training process stay stable and allows the model to pay close
                  attention to the unique details in each small group of
                  recipes.
                </li>
                <li>
                  <strong>Gradient Accumulation:</strong> Steps of 4 to simulate
                  larger batch training while working within memory constraints.
                  This is a technique used because the batch size is small.
                  Instead of learning after every batch of 2, the model gathered
                  the learning information (gradients) from 4 batches first. By
                  accumulating the information from 4 batches (2 recipes each),
                  it&apos;s like the model learned from 8 recipes (2 * 4 = 8)
                  before updating itself. This simulates a larger batch size,
                  which can be beneficial, but is done in steps to avoid using
                  too much computer memory at once.
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
          As with any research project, this study has certain limitations that
          are important to acknowledge. These constraints primarily relate to
          the subjective nature of culinary authenticity, the scope of the
          dataset, potential noise in the data, and the computational resources
          available.
        </p>

        <div className={`${styles.subsection} ${styles.spacedSection}`}>
          <h3>Subjective Authenticity</h3>
          <div className={styles.contentSpacing}>
            <p>
              Defining and evaluating the "authenticity" of Southern cooking is
              inherently subjective and can vary significantly based on
              individual background, family traditions, and specific geographic
              locations within the South. Culinary practices and preferred
              ingredients often differ from one family to another and even
              between nearby parishes or counties. It is possible that certain highly localized or unique
              culinary idiosyncrasies (for example, specific spice blends used
              only in a particular Delta region versus those common in Cajun
              areas) may not be universally agreed upon as "authentic" across
              all Southern culinary experts or practitioners. This subjectivity
              means that the model's output, while aiming for general Southern
              characteristics, may not perfectly align with every individual's
              definition of an authentic regional recipe.
            </p>
          </div>
        </div>

        <div className={`${styles.subsection} ${styles.spacedSection}`}>
          <h3>Regional Coverage Gaps</h3>
          <div className={styles.contentSpacing}>
            <p>
              The primary dataset used for fine-tuning the AI model was sourced
              predominantly from community cookbooks within Mississippi. While
              this collection provides a rich and valuable representation of a
              specific area within the South, it does not encompass the full
              breadth of Southern culinary diversity. Regions such as the
              Lowcountry of South Carolina, the Appalachian hill country of
              Tennessee, or the distinct culinary landscapes of Texas and
              Florida have unique ingredients, techniques, and recipe styles.
              Consequently, the model's training data may not fully capture the
              local flavors, terminology, and methods characteristic of these
              under-represented areas. This regional bias in the training data
              could limit the model's ability to generate recipes that are
              authentically representative of all Southern sub-regions.
            </p>
          </div>
        </div>

        <div className={`${styles.subsection} ${styles.spacedSection}`}>
          <h3>OCR & Transcription Noise</h3>
          <div className={styles.contentSpacing}>
            <p>
              The process of digitizing historical recipes, particularly those
              from handwritten notes or aged printed community cookbooks,
              involved Optical Character Recognition (OCR) and manual
              transcription. While significant effort was made to clean the data
              and correct transcription errors, the inherent challenges of
              reading varied handwriting styles and faded or damaged print mean
              that some inaccuracies may remain. These inaccuracies, referred to
              as "noise," could include misidentified ingredient names,
              incorrect measurements, or errors in the procedural steps. Despite
              careful proofreading and data validation, a small percentage of
              such errors might have been introduced into the training dataset,
              potentially influencing the model's learning process and the
              accuracy of the generated recipes.
            </p>
          </div>
        </div>

        <div className={`${styles.subsection} ${styles.spacedSection}`}>
          <h3>Compute & Dataset Size</h3>
          <div className={styles.contentSpacing}>
            <p>
              The computational resources available for this research presented
              a limitation. The fine-tuning process was conducted on a single
              GPU instance over a defined period. While this was sufficient for
              training the chosen model on the available dataset, access to more
              powerful computing resources (e.g., multiple GPUs or extended
              training time) could potentially allow for the use of larger, more
              complex models or more extensive hyperparameter tuning, which
              might yield further improvements in recipe generation quality.
              Furthermore, the cleaned dataset, totaling approximately 1,200
              recipes, while substantial, represents a finite collection.
              Expanding the dataset with a greater volume and diversity of
              Southern recipes from various regions and time periods would
              likely enhance the model's ability to learn less common regional
              terms, niche cooking steps, and a broader spectrum of Southern
              culinary expressions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
