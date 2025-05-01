// pages/citations.js
import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Content.module.css'; // Use the same styles

const citationsList = [
  { id: 'cite-1', text: 'Davis, Edward H., and John (John T. ). Morgan. Collards : A Southern Tradition from Seed to Table. The University Alabama Press, 2015.' },
  { id: 'cite-2', text: 'Out of the Skillet: Old Southern Recipes; 1947. 1947. McCain Library Archives, The University of Southern Mississippi, 1947.' },
  { id: 'cite-3', text: 'Lintonia Garden Club (Yazoo City, Miss. ). Treasure of Personal Recipes; 1965. 1965, McCain Library Archives, The University of Southern Mississippi, 1965.' },
  { id: 'cite-4', text: '"GPT Neo." Hugging Face, huggingface.co/docs/transformers/en/model_doc/gpt_neo.' },
  
];

export default function Citations() {
  const router = useRouter();
  const highlightedRef = useRef(null); 

  useEffect(() => {
    // Function to handle highlighting
    const highlightCitation = () => {
      const hash = router.asPath.split('#')[1]; // Get the hash (e.g., 'cite-1')
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          // Remove highlight from previous element if any
          if (highlightedRef.current) {
            highlightedRef.current.classList.remove(styles.highlight);
          }

          
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.classList.add(styles.highlight);
          highlightedRef.current = element; // Store reference to the highlighted element

          // Remove highlight after a delay
          const timer = setTimeout(() => {
            element.classList.remove(styles.highlight);
            highlightedRef.current = null; // Clear the reference
          }, 2000); // Highlight for 2 seconds

          // Cleanup timer on component unmount or hash change
          return () => clearTimeout(timer);
        }
      } else {
        // If no hash, remove any existing highlight
         if (highlightedRef.current) {
            highlightedRef.current.classList.remove(styles.highlight);
            highlightedRef.current = null;
        }
      }
    };

    // Run highlight on initial load and whenever the hash changes
    highlightCitation();

    // Listen for hash changes specifically
    window.addEventListener('hashchange', highlightCitation);

    // Cleanup listener
    return () => {
      window.removeEventListener('hashchange', highlightCitation);
      // Ensure highlight is removed on unmount
      if (highlightedRef.current) {
         highlightedRef.current.classList.remove(styles.highlight);
      }
    };

  }, [router.asPath]); // Re-run effect when the URL path (including hash) changes


  const goBack = () => {
    // Check if we can go back in history AND if the previous page was likely findings
    // This is imperfect but better than always pushing '/findings'
    if (window.history.length > 1 /*&& document.referrer.includes('/findings')*/) {
       router.back(); // Use browser back if possible
    } else {
       router.push('/findings'); // Fallback to navigating directly
    }
    // The scroll restoration logic is now in findings.js's useEffect
  };

  return (
    <div className={styles.contentContainer}>
      <h1 className={styles.pageTitle}>Citations</h1>
      <div className={styles.sectionDivider}></div>

      <button onClick={goBack} className={styles.button} style={{ marginBottom: '2rem' }}>
         ← Go Back
      </button>

      <ol className={styles.numberedList} style={{ paddingLeft: '1.5rem' }}>
        {citationsList.map(citation => (
          <li key={citation.id} id={citation.id} style={{ margin: '1rem 0', padding: '0.5rem', transition: 'background-color 0.5s ease' }}>
            {citation.text}
          </li>
        ))}
      </ol>
    </div>
  );
}