import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

interface NavbarProps {
  onBookClick: () => void
}

export default function Navbar({ onBookClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Facilities', href: '#facilities' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 transition-all duration-300"
    >
      <div
        className={`max-w-6xl mx-auto flex items-center justify-between px-5 py-3 rounded-full border transition-all duration-300 ${
          scrolled
            ? 'bg-[#061824]/95 border-white/20 backdrop-blur-md shadow-lg shadow-black/30'
            : 'bg-[#061824]/70 border-white/10 backdrop-blur-sm'
        }`}
      >
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 group">
          <span className="text-white font-bold text-xl tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
            El Clasico
          </span>
          <span className="text-[#c5f135] text-[10px] font-semibold tracking-widest uppercase mt-0.5">
            TURF
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-white/70 hover:text-white text-sm font-medium transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={onBookClick}
          className="hidden md:block bg-[#c5f135] text-[#061824] font-bold text-sm px-5 py-2.5 rounded-full hover:bg-[#d4ff40] active:scale-95 transition-all duration-200"
        >
          Book a Game
        </button>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-2 mx-auto max-w-6xl bg-[#061824]/98 border border-white/10 rounded-2xl backdrop-blur-md overflow-hidden">
          <div className="flex flex-col py-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-6 py-3 text-white/70 hover:text-white hover:bg-white/5 text-sm font-medium transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="px-6 py-3">
              <button
                onClick={() => { onBookClick(); setMenuOpen(false) }}
                className="w-full bg-[#c5f135] text-[#061824] font-bold text-sm px-5 py-3 rounded-full hover:bg-[#d4ff40] transition-all duration-200"
              >
                Book a Game
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
