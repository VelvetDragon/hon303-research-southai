// components/Layout.js
import Link from 'next/link'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/methodology', label: 'Methodology' },
  { href: '/findings', label: 'Findings' },
  { href: '/recipes', label: 'Recipe Finder' },
]

export default function Layout({ children }) {
  return (
    <>
      <header style={headerStyles}>
        <nav style={navStyles}>
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={linkStyles}
            >
              {label}
            </Link>
          ))}
        </nav>
      </header>
      <main style={{ padding: '2rem' }}>
        {children}
      </main>
      <footer style={{ textAlign: 'center', margin: '3rem 0 1rem' }}>
        © 2025 Your Name — AI-Generated Southern Recipes Research
      </footer>
    </>
  )
}

const headerStyles = {
  background: '#faf3e0',
  padding: '1rem 2rem',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
}

const navStyles = {
  display: 'flex',
  gap: '1.5rem',
}

const linkStyles = {
  textDecoration: 'none',
  color: '#333',
  fontWeight: '500',
}
