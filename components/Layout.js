// components/Layout.js
import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '1rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <nav style={{ display: 'flex', gap: '1rem', fontWeight: 'bold' }}>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/methodology">Methodology</Link>
          <Link href="/findings">Findings</Link>
          <Link href="/citations">Citations</Link>
          <Link href="/recipes">Recipe Finder</Link>
        </nav>
      </header>

      <main>{children}</main>

      <footer style={{ marginTop: '4rem', fontSize: '0.8rem', textAlign: 'center' }}>
        © 2025 Your Name — AI-Generated Southern Recipes Research
      </footer>
    </div>
  );
}
