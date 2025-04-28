// components/Layout.js
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Layout.module.css";
// Import icons from react-icons
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa6'; // Using Font Awesome 6 icons

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/methodology", label: "Methodology" },
  { href: "/findings", label: "Findings" },
  { href: "/recipes", label: "Recipe Finder" },
  { href: "/citations", label: "Citations" },
];

export default function Layout({ children, isHomepage = false }) {
  const router = useRouter();

  return (
    <div className={styles.layoutContainer}>
      <header className={styles.header}>
        <Link href="/" legacyBehavior passHref>
          <a className={styles.brandContainer}>
            {" "}
            <h2 className={styles.brandName}>Honors Research</h2>
            <p className={styles.tagline}>
              Exploring Southern Culinary Traditions
            </p>
          </a>
        </Link>
        <nav className={styles.navigation}>
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} legacyBehavior passHref>
              <a
                className={`${styles.navLink} ${
                  router.pathname === href ? styles.activeLink : ""
                }`}
              >
                {" "}
                {label}
              </a>
            </Link>
          ))}
        </nav>
      </header>

      <main
        className={`${styles.mainContent} ${
          isHomepage ? styles.mainContentHomepage : ""
        }`}
      >
        {children}
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p className={styles.copyright}>
            © 2025 Honors Research — AI-Generated Southern Recipes Research
          </p>
          <div className={styles.socialLinks}>
            {/* Add actual links and icons as needed */}

            {/* Github Link */}
            <a
              href="YOUR_GITHUB_URL" // << REPLACE with your Github URL
              aria-label="Github"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={20} /> {/* React Icons Github Component */}
            </a>

            {/* LinkedIn Link */}
            <a
              href="YOUR_LINKEDIN_URL" // << REPLACE with your LinkedIn URL
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={20} /> {/* React Icons LinkedIn Component */}
            </a>

            {/* Instagram Link */}
            <a
              href="YOUR_INSTAGRAM_URL" // << REPLACE with your Instagram URL
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={20} /> {/* React Icons Instagram Component */}
            </a>

            {/* Facebook Link */}
            <a
              href="YOUR_FACEBOOK_URL" // << REPLACE with your Facebook URL
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook size={20} /> {/* React Icons Facebook Component */}
            </a>

            {/* Twitter Link */}
            <a
              href="YOUR_TWITTER_URL" // << REPLACE with your Twitter URL
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter size={20} /> {/* React Icons Twitter Component */}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}