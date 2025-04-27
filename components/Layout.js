// components/Layout.js
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../styles/Layout.module.css'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/methodology', label: 'Methodology' },
  { href: '/findings', label: 'Findings' },
  { href: '/recipes', label: 'Recipe Finder' },
  { href: '/citations', label: 'Citations' },
]

export default function Layout({ children }) {
  const router = useRouter();
  
  return (
    <div className={styles.layoutContainer}>
      <header className={styles.header}>
        <Link href="/" className={styles.brandContainer}>
          <h2 className={styles.brandName}>Honors Research</h2>
          <p className={styles.tagline}>Exploring Southern Culinary Traditions</p>
        </Link>
        <nav className={styles.navigation}>
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`${styles.navLink} ${router.pathname === href ? styles.activeLink : ''}`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </header>
      <main className={styles.mainContent}>
        {children}
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p className={styles.copyright}>© 2025 Honors Research — AI-Generated Southern Recipes Research</p>
          <div className={styles.socialLinks}>
            <a href="#" aria-label="Twitter">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" aria-label="Facebook">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
