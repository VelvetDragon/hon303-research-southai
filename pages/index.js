import SouthernSlideshow from '../components/SouthernSlideshow';
import styles from '../styles/HomePage.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.homepageContainer}>
      <SouthernSlideshow isBackgroundMode={true} />

      <section className={styles.heroSection}>
        <h1 className={styles.title}>AI-Generated Southern Recipes</h1>
        <div className={styles.divider}></div>

        
        <div className={styles.welcomeMessage}>
          Welcome to my research project where I investigate whether AI can capture the essence of Southern cooking. 
          This study analyzes AI-generated recipes against traditional Southern recipes, examining ingredient patterns, 
          cooking techniques, and cultural narratives to understand the authenticity gap between human and machine-created 
          Southern cuisine.
        </div>
        
        <Link href="/methodology" className={styles.exploreButton}>
          Start Exploring
        </Link>
      </section>
    </div>
  );
}
