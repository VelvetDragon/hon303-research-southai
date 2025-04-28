// pages/about.js
import Image from 'next/image';
import styles from '../styles/Content.module.css';
import authorStyles from '../styles/About.module.css';

export default function About() {
  return (
    <div className={styles.contentContainer}>
      <h1 className={styles.pageTitle}>About the Project</h1>
      <div className={styles.sectionDivider}></div>

      <section className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>Research Background</h2>
        <div className={`${styles.subsection} ${styles.spacedSection}`}>
          <p>
            Southern cooking is more than just recipes—it reflects the people, history, and culture 
            of the American South. For generations, community church cookbooks and handwritten family 
            recipe cards have preserved dishes like biscuits, fried chicken, and jambalaya.
          </p>
          <p className={styles.contentSpacing}>
            These recipes carry not only ingredients and instructions but also small cultural 
            details—for example, using buttermilk in biscuits as a nod to Southern dairy traditions, 
            or adding cayenne pepper to honor Cajun influences in Louisiana. This project investigates 
            whether a machine learning model can capture these nuances when generating new Southern recipes.
          </p>
        </div>
      </section>

      <section className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>Project Objectives</h2>
        <div className={`${styles.subsection} ${styles.spacedSection}`}>
          <div className={styles.contentSpacing}>
            <h4>Data Collection & Preparation</h4>
            <p>
              Gather over 1,200 OCR‑transcribed recipes from Mississippi community cookbooks, 
              then normalize formatting and correct transcription errors to create a clean, 
              structured dataset.
            </p>
          </div>

          <div className={styles.contentSpacing}>
            <h4>Model Development</h4>
            <p>
              Adapt GPT‑Neo on our cleaned dataset so it learns the language, style, and 
              structure of authentic Southern recipes, with special attention to regional 
              variations and cooking traditions.
            </p>
          </div>

          <div className={styles.contentSpacing}>
            <h4>Technical Implementation</h4>
            <p>
              Create a Flask service with endpoints for exact‑match historical recipes and 
              model‑generated recipes, hosted on Render with CORS enabled for seamless 
              integration with our frontend application.
            </p>
          </div>

          <div className={styles.contentSpacing}>
            <h4>Quality Assessment</h4>
            <p>
              Use quantitative metrics (ingredient overlap, step‑count analysis) to assess how closely AI recipes mirror traditional Southern cooking 
              methods and flavors.
            </p>
          </div>

          <div className={styles.contentSpacing}>
            <h4>User Interface Design</h4>
            <p>
              Develop a Next.js frontend where users can search by dish name or ingredients, 
              experience smooth loading animations, and compare AI-generated recipes with 
              historical originals.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>About the Author</h2>
        <div className={`${styles.subsection} ${styles.spacedSection}`}>
          <div className={authorStyles.authorSection}>
            <Image 
              src="/images/me.jpg" 
              alt="Suwan Hon" 
              width={200} 
              height={200} 
              className={authorStyles.authorImage}
            />
            <div className={authorStyles.authorInfo}>
              <h3 className={authorStyles.authorName}>Suwan Aryal</h3>
              <div className={styles.contentSpacing}>
                <p>
                  I am a sophomore student from Nepal majoring in Computer Science at the 
                  University of Southern Mississippi Honors College. My academic interests 
                  center around data science, data analysis, design, and development.
                </p>
                <p className={styles.contentSpacing}>
                  Throughout my studies, I have engaged in various projects that allow me to 
                  apply my skills in these areas. In addition to my academic work, I work on 
                  personal projects to further develop my abilities in software development 
                  and design.
                </p>
                <p className={styles.contentSpacing}>
                  You can view my personal portfolio at{' '}
                  <a 
                    href="https://suone.vercel.app" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.link}
                  >
                    https://suone.vercel.app
                  </a>
                  , where I showcase my projects and skills.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}