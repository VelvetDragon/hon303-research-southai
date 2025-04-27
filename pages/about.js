// pages/about.js
import Image from 'next/image';
import styles from '../styles/Content.module.css';
import authorStyles from '../styles/About.module.css';

export default function About() {
  return (
    <div className={styles.contentContainer}>
      <h1 className={styles.pageTitle}>About</h1>
      <div className={styles.sectionDivider}></div>

      <section className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>Background</h2>
        <p>
          Southern cooking is more than just recipes—it reflects the people, history, and culture of the American South. For generations, community church cookbooks and handwritten family recipe cards have preserved dishes like biscuits, fried chicken, and jambalaya. These recipes carry not only ingredients and instructions but also small cultural details—for example, using buttermilk in biscuits as a nod to Southern dairy traditions, or adding cayenne pepper to honor Cajun influences in Louisiana <sup>[1]</sup>. This project investigates whether a machine learning model can capture these nuances when generating new Southern recipes.
        </p>
      </section>

      <section className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>Objectives</h2>
        <ul className={styles.bulletList}>
          <li><strong>Collect and Clean Data:</strong> Gather over 1,200 OCR‑transcribed recipes from Mississippi community cookbooks, then normalize formatting and correct transcription errors.</li>
          <li><strong>Fine‑Tune a Language Model:</strong> Adapt GPT‑Neo on our cleaned dataset so it learns the language, style, and structure of authentic Southern recipes.</li>
          <li><strong>Build and Deploy an API:</strong> Create a Flask service with endpoints for exact‑match historical recipes and model‑generated recipes, hosted on Render with CORS enabled.</li>
          <li><strong>Evaluate Authenticity:</strong> Use quantitative metrics (ingredient overlap, step‑count analysis) and qualitative expert review to assess how closely AI recipes mirror tradition.</li>
          <li><strong>Design an Interactive Interface:</strong> Develop a Next.js frontend where users search by dish name or ingredients, see loading animations, and compare AI outputs with historical originals.</li>
        </ul>
      </section>

      <section className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>About the Author</h2>
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
            <p className={authorStyles.authorBio}>
              I am a sophomore student from Nepal majoring in Computer Science at the University of Southern Mississippi Honors College. I am interested in data science, data analysis, design, and development.
              <br /><br />
              Throughout my studies, I have engaged in various projects that allow me to apply my skills in these areas. In addition to my academic work, I work on personal projects to further develop my abilities in software development and design. You can view my personal portfolio at <a href="https://suone.vercel.app" target="_blank" rel="noopener noreferrer" style={{ color: '#8B4513', fontWeight: 'bold' }}>https://suone.vercel.app</a>, where I showcase my projects and skills.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}