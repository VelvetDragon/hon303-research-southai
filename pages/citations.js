// pages/citations.js
import styles from '../styles/Content.module.css';

export default function Citations() {
  return (
    <div className={styles.contentContainer}>
      <h1 className={styles.pageTitle}>Citations & References</h1>
      
      <div className={styles.sectionDivider}></div>
      
      <section className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>Primary Sources</h2>
        <div className={`${styles.subsection} ${styles.spacedSection}`}>
          <p>
            Our research draws from a rich collection of community cookbooks and historical 
            collections housed in the McCain Library and Archives at the University of Southern 
            Mississippi. These primary sources span from the 1940s through the 1990s, providing 
            a comprehensive view of Southern cooking traditions.
          </p>
          <p className={styles.contentSpacing}>
            Citations for primary sources will be added upon publication.
          </p>
        </div>
      </section>
      
      <section className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>Academic References</h2>
        <div className={`${styles.subsection} ${styles.spacedSection}`}>
          <p>
            Our methodology and theoretical framework are built upon foundational works in 
            Southern foodways, cultural history, and computational linguistics. These scholarly 
            works have shaped our understanding of both traditional Southern cooking and modern 
            AI applications in recipe analysis.
          </p>
          <p className={styles.contentSpacing}>
            Academic citations will be added upon publication.
          </p>
        </div>
      </section>
      
      <section className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>Technical Resources</h2>
        <div className={`${styles.subsection} ${styles.spacedSection}`}>
          <p>
            This research utilizes state-of-the-art natural language processing tools and 
            machine learning frameworks. Our implementation builds upon recent advances in 
            large language models and their applications to structured text generation.
          </p>
          <p className={styles.contentSpacing}>
            Technical citations will be added upon publication.
          </p>
        </div>
      </section>
    </div>
  );
}
  