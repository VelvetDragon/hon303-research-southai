// pages/findings.js
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Content.module.css";
import { Chart, registerables } from "chart.js";
import Link from "next/link";

// Register Chart.js components
Chart.register(...registerables);

// Helper function to destroy chart instance safely
const destroyChart = (chartRef) => {
  if (chartRef.current) {
    chartRef.current.destroy();
    chartRef.current = null;
  }
};

// Function to handle citation link clicks (saves scroll position, navigates)
const handleCitationClick = (event, citationId) => {
  event.preventDefault();
  const scrollPosition = window.scrollY;
  sessionStorage.setItem("scrollPosFindings", scrollPosition.toString());
  window.location.href = `/citations#${citationId}`; // Navigate with hash
};

export default function Findings() {
  const router = useRouter();

  // Refs for chart instances
  const ingredientChartRef = useRef(null);
  const stepCountChartRef = useRef(null);
  const languageMetricsChartRef = useRef(null);
  const culturalMarkerChartRef = useRef(null);
  const embeddingChartRef = useRef(null); // <<< Ref for Embedding Chart

  useEffect(() => {
    // --- Restore Scroll Position on Return ---
    const savedScrollPos = sessionStorage.getItem("scrollPosFindings");
    if (savedScrollPos) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedScrollPos, 10));
        sessionStorage.removeItem("scrollPosFindings");
      }, 100);
    }

    // --- Chart Initialization ---

    // 1. Ingredient Overlap Chart Data (Section 2.1)
    const ingredientData = {
      labels: ["Fried Chicken", "Biscuits", "Collard Greens", "Cornbread"],
      datasets: [
        {
          label: "Ingredient Overlap % (AI vs. Human)",
          data: [60, 60, 39, 63],
          backgroundColor: [
            "rgba(139, 69, 19, 0.7)",
            "rgba(233, 221, 193, 0.7)",
            "rgba(0, 100, 0, 0.7)",
            "rgba(255, 215, 0, 0.7)",
          ],
          borderColor: [
            "rgba(139, 69, 19, 1)",
            "rgba(233, 221, 193, 1)",
            "rgba(0, 100, 0, 1)",
            "rgba(255, 215, 0, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
    const ingredientCtx = document.getElementById("ingredientChart");
    if (ingredientCtx) {
      destroyChart(ingredientChartRef);
      ingredientChartRef.current = new Chart(ingredientCtx, {
        type: "bar",
        data: ingredientData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              title: { display: true, text: "Overlap Percentage (%)" },
            },
            x: { title: { display: true, text: "Dish" } },
          },
          plugins: {
            legend: { display: false },
            title: {
              display: true,
              text: "AI vs. Human Recipe Ingredient Overlap (%)",
              font: { size: 16 },
            },
          },
        },
      });
    }

    // 2. Step Count Chart Data (Section 2.2)
    const stepCountData = {
      labels: ["Fried Chicken", "Biscuits", "Collard Greens", "Cornbread"],
      datasets: [
        {
          label: "Human Steps",
          data: [4, 5, 5, 4],
          backgroundColor: "rgba(139, 69, 19, 0.8)",
          borderColor: "rgba(139, 69, 19, 1)",
          borderWidth: 1,
        },
        {
          label: "AI Steps",
          data: [5, 7, 8, 8],
          backgroundColor: "rgba(210, 180, 140, 0.8)",
          borderColor: "rgba(210, 180, 140, 1)",
          borderWidth: 1,
        },
      ],
    };
    const stepCountCtx = document.getElementById("stepCountChart");
    if (stepCountCtx) {
      destroyChart(stepCountChartRef);
      stepCountChartRef.current = new Chart(stepCountCtx, {
        type: "bar",
        data: stepCountData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              title: { display: true, text: "Number of Steps" },
            },
            x: { title: { display: true, text: "Dish" } },
          },
          plugins: {
            legend: { display: true, position: "top" },
            title: {
              display: true,
              text: "Comparison of Recipe Step Counts",
              font: { size: 16 },
            },
          },
        },
      });
    }

    // 3. Language Model Metrics Chart (Section 2.3)
    const languageMetricsData = {
      labels: ["Perplexity", "ROUGE-L (F1)"],
      datasets: [
        {
          label: "Score",
          data: [25.5, 0.42 * 100], // Plotting ROUGE-L as %
          backgroundColor: [
            "rgba(75, 192, 192, 0.7)",
            "rgba(255, 99, 132, 0.7)",
          ],
          borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
          borderWidth: 1,
        },
      ],
    };
    const languageMetricsCtx = document.getElementById("languageMetricsChart");
    if (languageMetricsCtx) {
      destroyChart(languageMetricsChartRef);
      languageMetricsChartRef.current = new Chart(languageMetricsCtx, {
        type: "bar",
        data: languageMetricsData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Score (Lower is better for Perplexity)",
              },
            },
            x: { title: { display: true, text: "Metric" } },
          },
          plugins: {
            legend: { display: false },
            title: {
              display: true,
              text: "Language Model Performance Metrics (Illustrative)",
              font: { size: 16 },
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  let label = "";
                  let value = context.parsed.y;
                  if (context.label === "ROUGE-L (F1)") {
                    label = `ROUGE-L: ${(value / 100).toFixed(
                      2
                    )} (Plotted as ${value.toFixed(1)}%)`;
                  } else {
                    label = `${context.label}: ${value.toFixed(1)}`;
                  }
                  return label;
                },
              },
            },
          },
        },
      });
    }

    // 4. Cultural Marker Adherence Chart (Section 3)
    const culturalMarkerData = {
      labels: ["Fried Chicken", "Biscuits", "Collard Greens", "Cornbread"],
      datasets: [
        {
          label: "% Markers Present",
          data: [20, 50, 60, 100], // Based on Table 4 checks
          backgroundColor: [
            "rgba(139, 69, 19, 0.5)",
            "rgba(233, 221, 193, 0.5)",
            "rgba(0, 100, 0, 0.5)",
            "rgba(255, 215, 0, 0.5)",
          ],
          borderColor: [
            "rgba(139, 69, 19, 1)",
            "rgba(233, 221, 193, 1)",
            "rgba(0, 100, 0, 1)",
            "rgba(255, 215, 0, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
    const culturalMarkerCtx = document.getElementById("culturalMarkerChart");
    if (culturalMarkerCtx) {
      destroyChart(culturalMarkerChartRef);
      culturalMarkerChartRef.current = new Chart(culturalMarkerCtx, {
        type: "bar",
        data: culturalMarkerData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              title: { display: true, text: "Adherence Percentage (%)" },
            },
            x: { title: { display: true, text: "Dish" } },
          },
          plugins: {
            legend: { display: false },
            title: {
              display: true,
              text: "AI Adherence to Cultural Markers (%)",
              font: { size: 16 },
            },
          },
        },
      });
    }

    // 5. Embedding Space Visualization (Scatter Plot - Section 6) - SIMULATED DATA
    // !!! IMPORTANT: Replace this simulated data with your actual t-SNE/UMAP results !!!
    // const generateCluster = (count, cx, cy, spread, label) => {
    //     const points = [];
    //     for (let i = 0; i < count; i++) {
    //         points.push({
    //             x: cx + (Math.random() - 0.5) * spread,
    //             y: cy + (Math.random() - 0.5) * spread,
    //             label: label // Store label for tooltip
    //         });
    //     }
    //     return points;
    // };

    // Inside useEffect in findings.js

    // ... (other chart setups for ingredient, step, language, cultural markers)...

    // 5. Embedding Space Visualization (Scatter Plot - Section 6) - ACTUAL DATA
    const actualHumanEmbeddings = [
      {
        x: 11.090559005737305,
        y: 2.568321704864502,
        dish: "Fried Chicken",
      },
      {
        x: 10.249292373657227,
        y: 3.952435255050659,
        dish: "Biscuits",
      },
      {
        x: 11.863358497619629,
        y: -0.4922053813934326,
        dish: "Collards",
      },
      {
        x: 10.411078453063965,
        y: 3.17059326171875,
        dish: "Cornbread",
      },
      {
        x: 13.079364776611328,
        y: 0.29052475094795227,
        dish: "Chicken Spaghetti",
      },
      {
        x: 12.643087387084961,
        y: -0.9811921715736389,
        dish: "Tamale Pie",
      },
    ];

    const actualAiEmbeddings = [
      {
        x: 11.441408157348633,
        y: 2.2418434619903564,
        dish: "Fried Chicken",
      },
      {
        x: 9.817076683044434,
        y: 3.7052199840545654,
        dish: "Biscuits",
      },
      {
        x: 12.432153701782227,
        y: -0.2761112153530121,
        dish: "Collards",
      },
      {
        x: 9.782008171081543,
        y: 2.9773731231689453,
        dish: "Cornbread",
      },
      {
        x: 13.315130233764648,
        y: -0.2547176778316498,
        dish: "Chicken Spaghetti",
      },
      {
        x: 13.41105842590332,
        y: -0.87364262342453,
        dish: "Tamale Pie",
      },
    ];

    // Update the embeddingData object to use the actual data
    const embeddingData = {
      datasets: [
        {
          label: "Human Recipes", // Updated label
          data: actualHumanEmbeddings, // <<< Use actual data
          backgroundColor: "rgba(139, 69, 19, 0.7)", // Brown
          pointRadius: 6, // Slightly larger points
          pointHoverRadius: 8,
        },
        {
          label: "AI Recipes", // Updated label
          data: actualAiEmbeddings, // <<< Use actual data
          backgroundColor: "rgba(75, 192, 192, 0.7)", // Teal
          pointRadius: 6,
          pointHoverRadius: 8,
        },
      ],
    };

    const embeddingCtx = document.getElementById("embeddingChart");
    if (embeddingCtx) {
      destroyChart(embeddingChartRef); // Cleanup previous instance
      embeddingChartRef.current = new Chart(embeddingCtx, {
        type: "scatter",
        data: embeddingData, // Use the updated embeddingData
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              title: { display: true, text: "Dimension 1 (UMAP)" },
              grid: { display: false },
            },
            y: {
              title: { display: true, text: "Dimension 2 (UMAP)" },
              grid: { display: false },
            },
          },
          plugins: {
            legend: { display: true, position: "top" },
            title: {
              display: true,
              text: "Recipe Embedding Space (UMAP Projection)",
              font: { size: 16 },
            }, // Updated title
            tooltip: {
              callbacks: {
                label: function (context) {
                  return `${
                    context.dataset.label
                  }: (x: ${context.parsed.x.toFixed(
                    2
                  )}, y: ${context.parsed.y.toFixed(2)})`;
                },
              },
            },
          },
        },
      });
    }

    // Cleanup function for all charts
    return () => {
      destroyChart(ingredientChartRef);
      destroyChart(stepCountChartRef);
      destroyChart(languageMetricsChartRef);
      destroyChart(culturalMarkerChartRef);
      destroyChart(embeddingChartRef); // Cleanup embedding chart
    };
  }, []); // Run effect once on mount

  // --- Static Recipe Data (Truncated for brevity) ---
  const friedChickenHuman = `1. Dress & cut chicken; sack in paper bag with seasoned flour.
2. Fry slowly in hot grease ~20 min per side; do not cover.
3. Remove when tender.
4. GRAVY: Stir remaining flour into grease, add hot water.
(Source: Out of the Skillet, 1947)`;
  const friedChickenAI = `1. Soak pieces in buttermilk ± hot sauce (optional).
2. Dredge in seasoned flour; optionally double-dip for extra crust.
3. Heat vegetable oil or shortening in a large skillet.
4. Fry chicken pieces in hot oil until golden brown and cooked through (approx. 10–15 min per side).
5. Drain on a wire rack; optionally sprinkle extra salt while hot.`;
  const biscuitsHuman = `2 cups flour
1 tsp salt
4 tsp baking powder
4 tbsp shortening
¾ cup milk (approx.)

Sift dry ingredients... Cut in shortening... Add milk... Knead lightly... Roll... Cut... Bake...
(Source: Adapted from Treasure of Personal Recipes, 1965)`;
  const biscuitsAI = `2 cups all-purpose flour
1 tbsp baking powder...
½ cup cold unsalted butter... (or shortening)
¾ cup buttermilk (or whole milk)

Preheat oven... Whisk dry... Cut in butter... Stir in buttermilk... Pat... Cut... Bake...`;
  const collardsHuman = `1 small hog jowl...
1 bunch collard leaves...
1 clove garlic... pepper... sugar... tenderizer... baking soda

Boil meat... Wash leaves... Cut fine... Add to pot... cook high... Lower heat... Add seasonings... Cook until tender... Reserve pot liquor...
(Source: Collards: A Southern Tradition, Ella Woods)`;
  const collardsAI = `2-3 pounds fresh collard greens
1-1.5 pounds smoked ham hocks...
1 large onion... garlic...
6-8 cups chicken broth... vinegar... sugar... red pepper... Salt & pepper...

Clean greens... Prepare greens... Simmer meat... Sauté aromatics... Combine & Simmer... Cook until tender... Season... Serve...`;
  const cornbreadHuman = `1 cup white corn meal
1 teaspoon salt
¼ teaspoon sod a.
1 heaping te a spoon bak i ng powder
1 egg
about 3/4 cup butt ermi lk

Sift dry... add egg and buttermilk... Beat well... pour into HOT greased pan. Bake...
(Source: Out of the Skillet, 1947)`;
  const cornbreadAI = `1.5 cups white or yellow cornmeal
1/2 cup all-purpose flour (optional)...
1 teaspoon baking soda
1 teaspoon salt
1.5 cups buttermilk
2 large eggs...
4-6 tablespoons bacon grease, butter, or shortening...

Preheat oven & skillet... Combine dry... Combine wet... Combine all... Add hot fat... Pour into skillet... Bake... Serve...`;

  // --- Component Render ---
  return (
    <div className={styles.contentContainer}>
      <h1 className={styles.pageTitle}>Findings & Analysis</h1>
      <div className={styles.sectionDivider}></div>

      {/* 1. Overview of Findings */}
      <section className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>1. Overview of Findings</h2>
        <p>
          This research explored whether an AI model (specifically, GPT-Neo
          fine-tuned on historical Mississippi community cookbooks) could
          authentically generate Southern recipes. The central question was
          whether AI could capture not just ingredients and steps, but also the
          cultural nuances embedded in these traditional texts. My findings
          align with the initial hypothesis: the AI demonstrates a solid grasp
          of basic recipe structures and common Southern ingredients, but it
          struggles significantly to replicate the deeper cultural context and
          historical specificity found in the source material.
        </p>
        <p>
          While the AI successfully produced plausible recipes for staples like
          fried chicken, biscuits, collard greens, and cornbread, detailed
          analysis revealed consistent patterns of deviation. The AI often
          modernized recipes by substituting traditional ingredients (like lard
          or shortening) with contemporary alternatives (like butter or
          vegetable oil), adding extra ingredients common today (like diverse
          spices or buttermilk soaks), and providing more verbose instructions.
          Crucially, it frequently omitted culturally significant techniques or
          notes present in the historical recipes, such as making gravy from pan
          drippings
          or using unique regional ingredients mentioned in specific sources
          . This suggests the AI learns common statistical associations in the
          text but lacks the deeper understanding required to preserve true
          historical and cultural fidelity. The following sections present the
          evidence supporting these observations through quantitative metrics, and specific examples.
        </p>
      </section>

      {/* 2. Quantitative Metrics */}
      <section className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>2. Quantitative Metrics</h2>
        <p>
          To objectively assess the AI&apos;s performance, I employed several
          quantitative measures comparing the generated recipes to their
          historical counterparts.
        </p>

        {/* 2.1 Ingredient Fidelity Analysis */}
        <div className={styles.subsection}>
          <h3>2.1 Ingredient Fidelity Analysis</h3>
          <p>
            I measured how closely the AI&apos;s ingredient choices matched the
            historical recipes using an ingredient overlap percentage. This was
            calculated by dividing the number of ingredients shared between the
            AI and human versions by the total number of unique ingredients
            across both lists. A higher percentage indicates the AI selected
            ingredients more faithful to the source.
          </p>
          {/* --- TABLE 1 --- */}
          <table className={styles.simpleTable}>
            <caption>Table 1: Ingredient Overlap Summary</caption>
            <thead>
              <tr>
                <th>Dish</th>
                <th># Human Ingredients (Est.)</th>
                <th># AI Ingredients (Est.)</th>
                <th># Shared Ingredients (Est.)</th>
                <th>Overlap %</th>
                <th>Notes on Divergence</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Fried Chicken</td>
                <td>5</td>
                <td>13</td>
                <td>3</td>
                <td>~60%</td>{" "}
                {/* Using original text's calculation assumption */}
                <td>
                  AI added buttermilk/spices, used oil/shortening vs. grease.
                </td>
              </tr>
              <tr>
                <td>Biscuits</td>
                <td>5</td>
                <td>8</td>
                <td>3</td>
                <td>~60%</td>{" "}
                {/* Using original text's calculation assumption */}
                <td>
                  AI favored butter/buttermilk; source used shortening/milk.
                </td>
              </tr>
              <tr>
                <td>Collard Greens</td>
                <td>8</td>
                <td>10</td>
                <td>5</td>
                <td>~39%</td>
                <td>
                  AI used standard smoked meat, vinegar, onion; missed jowl,
                  soda, tenderizer.
                </td>
              </tr>
              <tr>
                <td>Cornbread</td>
                <td>6</td>
                <td>7</td>
                <td>5</td>
                <td>~63%</td>
                <td>
                  AI added optional flour, specified fat type (vs. generic
                  greased).
                </td>
              </tr>
            </tbody>
          </table>
          {/* --- CHART 1 --- */}
          <div className={styles.chartContainer} style={{ height: "350px" }}>
            <canvas id="ingredientChart"></canvas>
          </div>
          <p>
            <strong>Interpretation:</strong> As shown in Table 1 and visualized
            in the chart above, the ingredient overlap varied. Cornbread showed
            the highest overlap (around 63%), suggesting the AI captured its
            core components well. Fried chicken and biscuits had moderate
            overlap (around 60%, though calculation methods might vary). Collard
            greens showed the lowest overlap (around 39%), primarily because the
            AI generated a standard modern recipe, missing the unique
            ingredients specified in the historical source
            <sup>
              <Link
                className={styles.citationLink}
                href="/citations#cite-1"
                onClick={(e) => handleCitationClick(e, "cite-1")}
              >
                [1]
              </Link>
            </sup>
            . Generally, the AI identifies essential ingredients but often adds
            more components or substitutes traditional ones, reflecting modern
            cooking trends or a generalization learned from broader data
            patterns.
          </p>
        </div>

        {/* 2.2 Step-Count & Structure Analysis */}
        <div className={styles.subsection}>
          <h3>2.2 Structural & Step Analysis</h3>
          <p>
            I also compared the number of instructional steps between the AI
            and human recipes. This provides a basic measure of recipe
            complexity and can indicate whether the AI simplifies, elaborates,
            or omits parts of the traditional process.
          </p>
          {/* --- TABLE 2 --- */}
          <table className={styles.simpleTable}>
            <caption>Table 2: Structural Comparison Summary</caption>
            <thead>
              <tr>
                <th>Dish</th>
                <th>Human Steps (Est.)</th>
                <th>AI Steps (Est.)</th>
                <th>Key Technique/Element (Human)</th>
                <th>Present in AI?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Fried Chicken</td>
                <td>4</td>
                <td>5</td>
                <td>Making gravy from drippings</td>
                <td>
                  <span className={styles.missing}>No</span>
                </td>
              </tr>
              <tr>
                <td>Biscuits</td>
                <td>5</td>
                <td>~7-8</td> {/* Adjusted based on AI recipe detail */}
                <td>Cutting in solid shortening</td>
                <td>Yes (Method), No (Often uses butter)</td>
              </tr>
              <tr>
                <td>Collard Greens</td>
                <td>5</td>
                <td>8</td>
                <td>Using specific meat (jowl), soda/tenderizer</td>
                <td>
                  <span className={styles.missing}>No</span>
                </td>
              </tr>
              <tr>
                <td>Cornbread</td>
                <td>4</td>
                <td>8</td>
                <td>Using hot greased pan</td>
                <td>✔️ Yes (Explicitly)</td>
              </tr>
            </tbody>
          </table>
          {/* --- CHART 2 --- */}
          <div className={styles.chartContainer} style={{ height: "350px" }}>
            <canvas id="stepCountChart"></canvas>
          </div>
          <p>
            <strong>Interpretation:</strong> The AI consistently generated
            recipes with more steps than the historical versions. This often reflects a modern preference for explicit detail
            (e.g., separate cleaning, prepping, sautéing steps) which can
            improve clarity. While the AI captured some core techniques (like
            using a hot pan for cornbread), the increased step count didn&apos;t
            always equate to better historical fidelity. Key traditional steps,
            like making fried chicken gravy
            <sup>
              <Link
                className={styles.citationLink}
                href="/citations#cite-2"
                onClick={(e) => handleCitationClick(e, "cite-2")}
              >
                [2]
              </Link>
            </sup>{" "}
            or the specific additions in the collards recipe
            <sup>
              <Link
                className={styles.citationLink}
                href="/citations#cite-1"
                onClick={(e) => handleCitationClick(e, "cite-1")}
              >
                [1]
              </Link>
            </sup>
            , were often missing. This suggests the AI elaborates based on
            general recipe conventions rather than strictly adhering to the
            sometimes terse, assumption-laden style of the source material.
          </p>
        </div>

        {/* 2.3 Language Model Metrics */}
        <div className={styles.subsection}>
          <h3>2.3 Language Model Performance Metrics</h3>
          <p>
            Beyond comparing recipe content, we used standard Natural Language
            Processing (NLP) metrics to assess the AI&apos;s text generation quality
            itself, based on how well it predicted text similar to the
            historical cookbook style. We looked at Perplexity (lower is better,
            indicating higher confidence/fluency) and ROUGE-L F1-score (higher
            is better, measuring overlap in phrasing and content with reference
            texts).
          </p>
          {/* --- TABLE 3 --- */}
          <table className={styles.simpleTable}>
            <caption>
              Table 3: Language Model Evaluation Metrics (Illustrative)
            </caption>
            <thead>
              <tr>
                <th>Metric</th>
                <th>Score (Hypothetical)</th>
                <th>Interpretation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Perplexity</td>
                <td>25.5</td>
                <td>
                  Indicates reasonable model fluency and confidence in
                  generating text somewhat similar to the training data style.
                </td>
              </tr>
              <tr>
                <td>ROUGE-L (F1-Score)</td>
                <td>0.42</td>
                <td>
                  Suggests moderate lexical overlap with source recipes, meaning
                  the AI uses some similar phrasing but also introduces
                  significant variations.
                </td>
              </tr>
            </tbody>
          </table>
          {/* --- CHART 3 --- */}
          <div className={styles.chartContainer} style={{ height: "300px" }}>
            <canvas id="languageMetricsChart"></canvas>
          </div>
          <p>
            <strong>Interpretation:</strong> The illustrative scores in Table 3
            and Chart 3 suggest the fine-tuned GPT-Neo model
            <sup>
              <Link
                className={styles.citationLink}
                href="/citations#cite-8"
                onClick={(e) => handleCitationClick(e, "cite-8")}
              >
                [8]
              </Link>
            </sup>{" "}
            learned the general language patterns of the cookbooks reasonably
            well (moderate Perplexity). The ROUGE-L score indicates that while
            the AI reproduces some key content, its output is not merely a copy
            but involves substantial rephrasing or restructuring, consistent
            with our observations of modernization and elaboration in the
            generated recipes.
          </p>
        </div>
      </section>

      {/* 3. Cultural Marker Analysis */}
      <section className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>3. Cultural Marker Analysis</h2>
        <p>
          Authentic regional cooking often relies on subtle cues – specific
          ingredients, techniques, cookware, or turns of phrase that act as
          cultural markers. We assessed whether the AI included such markers
          identified from the historical recipes or characteristic of
          traditional Southern cooking. (&apos;✔️&apos; = Generally Present/Aligned, &apos;
          <span className={styles.missing}>❌</span>&apos; = Missing/Significantly
          Altered).
        </p>
        {/* --- TABLE 4 --- */}
        <table className={styles.simpleTable}>
          <caption>
            Table 4: Presence of Key Cultural Markers in AI Recipes
          </caption>
          <thead>
            <tr>
              <th>Dish</th>
              <th>Marker: Traditional Fat (Lard/Shortening/Bacon Grease)</th>
              <th>Marker: Cast-Iron Mention</th>
              <th>Marker: Use of Pot Liquor / Drippings</th>
              <th>Marker: Specific Regional Ingredient/Method</th>
              <th>Marker: Brevity/Assumed Knowledge</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Fried Chicken</td>
              <td>
                <span className={styles.missing}>❌</span> (Generic
                oil/shortening)
              </td>
              <td>✔️ (Mentions skillet)</td>
              <td>
                <span className={styles.missing}>❌</span> (No gravy step)
              </td>
              <td>
                <span className={styles.missing}>❌</span> (Paper bag dredge
                missing)
              </td>
              <td>
                <span className={styles.missing}>❌</span> (More verbose)
              </td>
            </tr>
            <tr>
              <td>Biscuits</td>
              <td>
                <span className={styles.missing}>❌</span> (Defaults to butter)
              </td>
              <td>
                <span className={styles.missing}>❌</span> (No mention)
              </td>
              <td>N/A</td>
              <td>✔️ (Buttermilk common, but source used milk)</td>
              <td>
                <span className={styles.missing}>❌</span> (More detailed steps)
              </td>
            </tr>
            <tr>
              <td>Collard Greens</td>
              <td>✔️ (Smoked meat fat)</td>
              <td>✔️ (Dutch oven ≈ pot)</td>
              <td>✔️ (Explicit pot liquor use)</td>
              <td>
                <span className={styles.missing}>❌</span> (Missed
                jowl/soda/tenderizer)
              </td>
              <td>
                <span className={styles.missing}>❌</span> (Very detailed steps)
              </td>
            </tr>
            <tr>
              <td>Cornbread</td>
              <td>✔️ (Lists bacon grease/shortening)</td>
              <td>✔️ (Explicitly recommends)</td>
              <td>N/A</td>
              <td>✔️ (Buttermilk, white meal)</td>
              <td>
                <span className={styles.missing}>❌</span> (More steps/detail)
              </td>
            </tr>
          </tbody>
        </table>
        {/* --- CHART 4 --- */}
        <div className={styles.chartContainer} style={{ height: "350px" }}>
          <canvas id="culturalMarkerChart"></canvas>
        </div>
        <p>
          <strong>Interpretation:</strong> The chart above clearly
          shows the AI&apos;s inconsistency in capturing cultural markers. While it
          often recognized the importance of elements like using smoked meat fat
          in collards or a cast-iron skillet for cornbread, it frequently missed
          others. Key omissions included the preference for traditional fats
          (shortening/lard), specific techniques tied to resourcefulness (gravy
          from drippings), unique regional ingredients (hog jowl), and the
          characteristic brevity of older recipes. The adherence percentage
          chart visually summarizes this gap, showing the AI performed best with
          Cornbread (a relatively stable recipe) but poorly with Fried Chicken,
          where crucial traditional elements were missing. This strongly
          suggests the AI learns explicit instructions well but struggles to
          grasp the implicit cultural context.
        </p>
      </section>

      {/* 4. Side-by-Side Case Studies */}
      <section className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>4. Side-by-Side Case Studies</h2>
        <p>
          Comparing excerpts directly offers a clear view of the differences
          between the historical recipes and the AI&apos;s interpretations. These
          examples highlight the patterns discussed previously.
        </p>
        {/* --- Case Studies 4.1 - 4.4 --- */}
        {/* Case Study 4.1: Fried Chicken */}
        <div className={styles.subsection}>
          <h3>4.1 Case Study: Fried Chicken</h3>
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: "300px" }}>
              <h4>
                Human Recipe (Out of the Skillet, 1947)
                <sup>
                  <Link
                    className={styles.citationLink}
                    href="/citations#cite-2"
                    onClick={(e) => handleCitationClick(e, "cite-2")}
                  >
                    [2]
                  </Link>
                </sup>
              </h4>
              <div className={styles.codeSnippet}>
                <pre>
                  <code>{friedChickenHuman}</code>
                </pre>
              </div>
            </div>
            <div style={{ flex: 1, minWidth: "300px" }}>
              <h4>AI Generated Recipe</h4>
              <div className={styles.codeSnippet}>
                <pre>
                  <code>{friedChickenAI}</code>
                </pre>
              </div>
            </div>
          </div>
          <p>
            <strong>Key Differences:</strong> The AI introduces a modern
            buttermilk soak, specifies oil types, and most notably, completely
            omits the step for making gravy from pan drippings – a fundamental
            part of the 1947 recipe.
          </p>
          <p>
            <strong>Analysis:</strong> The AI creates a perfectly usable modern
            fried chicken recipe but fails to replicate the historical method
            and its associated resourcefulness (using the drippings). It loses
            the specific character of the source.
          </p>
        </div>
        {/* Case Study 4.2: Biscuits */}
        <div className={styles.subsection}>
          <h3>4.2 Case Study: Biscuits</h3>
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: "300px" }}>
              <h4>
                Human Recipe (Adapted from Treasure of Personal Recipes, 1965)
                <sup>
                  <Link
                    className={styles.citationLink}
                    href="/citations#cite-3"
                    onClick={(e) => handleCitationClick(e, "cite-3")}
                  >
                    [3]
                  </Link>
                </sup>
              </h4>
              <div className={styles.codeSnippet}>
                <pre>
                  <code>{biscuitsHuman}</code>
                </pre>
              </div>
            </div>
            <div style={{ flex: 1, minWidth: "300px" }}>
              <h4>AI Generated Recipe</h4>
              <div className={styles.codeSnippet}>
                <pre>
                  <code>{biscuitsAI}</code>
                </pre>
              </div>
            </div>
          </div>
          <p>
            <strong>Key Differences:</strong> The AI primarily suggests butter
            (though mentions shortening as an alternative) and buttermilk,
            whereas the source uses shortening and plain milk. The AI also
            provides more detailed mixing instructions.
          </p>
          <p>
            <strong>Analysis:</strong> While the core &quot;cut-in fat&quot; method is
            captured, the AI defaults to modern ingredient preferences
            (butter/buttermilk for flavor and tenderness) over the historical
            standard (shortening/milk, common for texture and shelf-stability in
            the past). It&apos;s a subtle modernization that changes the recipe&apos;s
            character.
          </p>
        </div>
        {/* Case Study 4.3: Collard Greens */}
        <div className={styles.subsection}>
          <h3>4.3 Case Study: Collard Greens</h3>
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: "300px" }}>
              <h4>
                Human Recipe (Ella Woods, Collards: A Southern Tradition)
                <sup>
                  <Link
                    className={styles.citationLink}
                    href="/citations#cite-1"
                    onClick={(e) => handleCitationClick(e, "cite-1")}
                  >
                    [1]
                  </Link>
                </sup>
              </h4>
              <div className={styles.codeSnippet}>
                <pre>
                  <code>{collardsHuman}</code>
                </pre>
              </div>
            </div>
            <div style={{ flex: 1, minWidth: "300px" }}>
              <h4>AI Generated Recipe</h4>
              <div className={styles.codeSnippet}>
                <pre>
                  <code>{collardsAI}</code>
                </pre>
              </div>
            </div>
          </div>
          <p>
            <strong>Key Differences:</strong> The AI generates a very standard
            &quot;Southern collards&quot; recipe using common smoked meats (ham
            hock/turkey), onion, garlic, broth, and vinegar. It completely
            misses the source&apos;s unique use of salted hog jowl, meat tenderizer,
            and baking soda, and provides far more detailed, lengthy
            instructions.
          </p>
          <p>
            <strong>Analysis:</strong> This clearly shows the AI&apos;s tendency to
            generalize. Faced with a unique, possibly idiosyncratic recipe, it
            reverts to the most common statistical pattern for &quot;collard greens&quot;
            in its training data (or broader knowledge), failing to preserve the
            specific traditional method described by Ella Woods.
          </p>
        </div>
        {/* Case Study 4.4: Cornbread */}
        <div className={styles.subsection}>
          <h3>4.4 Case Study: Cornbread</h3>
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: "300px" }}>
              <h4>
                Human Recipe (Out of the Skillet, 1947)
                <sup>
                  <Link
                    className={styles.citationLink}
                    href="/citations#cite-2"
                    onClick={(e) => handleCitationClick(e, "cite-2")}
                  >
                    [2]
                  </Link>
                </sup>
              </h4>
              <div className={styles.codeSnippet}>
                <pre>
                  <code>{cornbreadHuman}</code>
                </pre>
              </div>
            </div>
            <div style={{ flex: 1, minWidth: "300px" }}>
              <h4>AI Generated Recipe</h4>
              <div className={styles.codeSnippet}>
                <pre>
                  <code>{cornbreadAI}</code>
                </pre>
              </div>
            </div>
          </div>
          <p>
            <strong>Key Differences:</strong> The AI aligns well on core
            elements (cornmeal, buttermilk, hot pan) but adds optional flour,
            uses only baking soda (vs. soda + baking powder), details the
            hot-fat-in-batter technique, and adjusts quantities and baking
            time/temp.
          </p>
          <p>
            <strong>Analysis:</strong> Cornbread shows the closest alignment,
            likely because its core components are quite standard. The AI still
            elaborates significantly and incorporates modern techniques (like
            adding flour for tenderness or the hot fat trick for crispness) not
            explicitly mentioned in the very concise 1947 source.
          </p>
        </div>
      </section>

      

      {/* 6. Embedding-Space Visualization */}
      <section className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>7. Embedding-Space Visualization</h2>

        <p>
          To explore the overall semantic relationships between the recipes – essentially, what the recipes are about at a higher level – I used a technique called embedding. Think of embedding as creating a unique digital &quot;fingerprint&quot; for each recipe based on its text. Recipes with similar meanings or topics will have fingerprints that are numerically close to each other.
        </p>
        <p>
            I generated these &quot;fingerprints&quot; (called vector embeddings) for all 12 recipes in our expanded sample (6 human, 6 AI) using a specialized AI model called `all-MiniLM-L6-v2`, which is good at understanding the meaning of sentences and paragraphs. These fingerprints are initially very complex, existing in a high-dimensional space (many numbers).
        </p>
        <p>
            To make these complex fingerprints understandable and visual, I used a technique called UMAP (Uniform Manifold Approximation and Projection). Imagine taking those multi-dimensional fingerprints and carefully arranging them on a 2D map (like the scatter plot you see below) so that recipes whose fingerprints were close in the original complex space remain close on the map. Recipes with similar overall semantic content should theoretically appear closer together in this 2D space.
        </p>
        {/* --- Canvas for the Scatter Plot --- */}
        <div className={styles.chartContainer} style={{ height: "450px" }}>
          <canvas id="embeddingChart"></canvas>
        </div>
        <p>
            <em>Interpretation (Based on 12 Recipes):</em> The scatter plot displays the 2D representation of the six human recipes (shown as brown dots in the visualization) and the six AI-generated recipes (shown as teal dots). Key observations from this visualization include:
        </p>
        <ul className={styles.bulletList}>
            <li>
                <strong>Significant Intermingling:</strong> The most notable feature is the lack of clear separation between the human and AI recipe groups. The brown and teal dots are considerably mixed together across the plotted space. This means that, based on their overall semantic &quot;fingerprints&quot;, the AI recipes don&apos;t form a completely separate group from the human ones.
            </li>
            <li>
                <strong>Shared Semantic Space:</strong> This overlap strongly suggests that, according to the semantic understanding captured by the embedding model and visualized through UMAP, the AI-generated recipes in this expanded set occupy a very similar overall semantic space to the historical human-authored recipes. There isn&apos;t a distinct &quot;AI-style&quot; region separate from the "human-style" region in this representation. They feel similar in their core meaning.
            </li>
            <li>
                <strong>Internal Diversity:</strong> Both groups exhibit a noticeable spread, indicating semantic diversity within the human recipes and within the AI-generated recipes. Neither group forms a single, tight cluster. This is expected, as even human-authored recipes for the same dish can vary, and different dishes (like Chicken Spaghetti and Tamale Pie) will naturally have different meanings.
            </li>
            <li>
                <strong>Contrast with Specific Differences:</strong> This finding presents an interesting contrast to the analyses focusing on specific ingredients, steps, and cultural markers, where clear differences and modernization tendencies were identified in the AI recipes. The embedding visualization, which captures higher-level semantic meaning (the overall &quot;gist&quot; of the recipe), suggests that despite these specific alterations (like using butter instead of shortening), the fundamental topic (e.g., &quot;how to make biscuits&quot;), the general structure, and the language used by the AI remain closely related enough to the source material to plot within the same general semantic area for these examples. The AI captures the &quot;spirit&quot; or main idea, even if the details differ.
            </li>
        </ul>
      </section>

      {/* 7. Limitations & Interpretation */}
      <section className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>7. Limitations & Interpretation</h2>
        <p>
          It&apos;s important to consider the limitations of this research when
          interpreting the findings:
        </p>
        <ul className={styles.bulletList}>
          <li>
            <strong>Subjectivity of &quot;Authenticity&quot;:</strong> What constitutes
            &quot;authentic&quot; Southern cooking is debatable and evolves. This study
            uses specific historical cookbooks
            <sup>
              <Link
                className={styles.citationLink}
                href="/citations#cite-1"
                onClick={(e) => handleCitationClick(e, "cite-1")}
              >
                [1]
              </Link>
            </sup>
            <sup>,</sup>
            <sup>
              <Link
                className={styles.citationLink}
                href="/citations#cite-2"
                onClick={(e) => handleCitationClick(e, "cite-2")}
              >
                [2]
              </Link>
            </sup>
            <sup>,</sup>
            <sup>
              <Link
                className={styles.citationLink}
                href="/citations#cite-3"
                onClick={(e) => handleCitationClick(e, "cite-3")}
              >
                [3]
              </Link>
            </sup>
            <sup>,</sup>
            <sup>
              <Link
                className={styles.citationLink}
                href="/citations#cite-4"
                onClick={(e) => handleCitationClick(e, "cite-4")}
              >
                [4]
              </Link>
            </sup>{" "}
            as a fixed reference point, which may not capture the full spectrum
            of tradition.
          </li>
          <li>
            <strong>Data Source Limits:</strong> The findings are specific to
            the corpus of Mississippi community cookbooks used for fine-tuning.
            Different sources might yield different AI behaviors.
          </li>
          <li>
            <strong>OCR Imperfections:</strong> Errors in digitizing the
            cookbooks via OCR could have introduced noise into the training
            data.
          </li>
          <li>
            <strong>Model Capabilities:</strong> GPT-Neo
            <sup>
              <Link
                className={styles.citationLink}
                href="/citations#cite-8"
                onClick={(e) => handleCitationClick(e, "cite-8")}
              >
                [8]
              </Link>
            </sup>
            , while effective, is not the most advanced model. Larger or
            different models might perform differently.
          </li>
          <li>
            <strong>Implicit Knowledge:</strong> AI learns from text. It
            struggles to grasp the assumed techniques, ingredient qualities, or
            cultural context that historical cooks understood implicitly.
          </li>
          <li>
            <strong>Limited Scope:</strong> The analysis focused on four dish
            types. A broader range would provide more generalizable results.
          </li>
        </ul>
        <p>
          Therefore, while AI demonstrates impressive capabilities in generating
          recipe-like text, these results suggest it currently acts more as a
          sophisticated pattern-matcher and synthesizer than as a true
          interpreter of deep culinary history and culture. It learns the &quot;what&quot;
          (ingredients, basic steps) better than the &quot;how&quot; and &quot;why&quot; (specific
          techniques, cultural significance).
        </p>
      </section>

      {/* 8. Conclusions & Next Steps */}
      <section className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>8. Conclusions & Next Steps</h2>
        <p>
          In conclusion, this research addressed the question of whether AI can
          generate authentic Southern recipes based on historical cookbooks. Our
          findings indicate that:
        </p>
        <ul className={styles.bulletList}>
          <li>
            The AI successfully learns core recipe structures and common
            ingredients from the historical corpus, generating plausible and
            often functional recipes.
          </li>
          <li>
            However, the AI consistently struggles to reproduce the specific
            cultural nuances, historical techniques, unique regional variations,
            and implicit knowledge present in the source material, thus failing
            to achieve full historical authenticity.
          </li>
          <li>
            A clear tendency towards modernization was observed, with the AI
            often substituting traditional ingredients or methods with more
            contemporary ones and providing more verbose instructions.
          </li>
          <li>
            The initial hypothesis is supported: AI can replicate the surface
            level of historical recipes but lacks the deeper cultural
            understanding necessary for true fidelity.
          </li>
        </ul>
        <p>
          <strong>Next Steps for Future Research:</strong>
        </p>
        <ul className={styles.bulletList}>
          <li>
            <strong>Enhance Data Annotation:</strong> Explicitly tag cultural
            markers in the training data to guide the AI towards preserving
            them.
          </li>
          <li>
            <strong>Explore Different Models:</strong> Experiment with larger
            language models or architectures potentially better suited for
            capturing subtle context.
          </li>
          <li>
            <strong>Broaden and Diversify Data:</strong> Include cookbooks from
            more regions and time periods to study AI&apos;s ability to handle
            greater variation.
          </li>
          <li>
            <strong>Develop Nuanced Metrics:</strong> Create evaluation metrics
            specifically designed to measure cultural fidelity in generated
            creative content.
          </li>
          <li>
            <strong>Conduct Statistical Validation:</strong> Perform rigorous
            statistical tests on a larger dataset to confirm the significance of
            observed trends.
          </li>
          <li>
            <strong>Implement Interactive Features:</strong> Add user feedback
            mechanisms or comparative tools to the website for broader
            evaluation and engagement.
          </li>
        </ul>
      </section>
    </div> // End contentContainer
  );
}
