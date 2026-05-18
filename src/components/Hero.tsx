import { ArrowUpRight, ChevronDown } from 'lucide-react'

interface HeroProps {
  onBookClick: () => void
}

// Unsplash football/turf hero image — high quality indoor 5-a-side
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1800&q=85&fit=crop'

const stats = [
  { value: '24/7', label: 'Open Always' },
  { value: '5v5', label: '& 6v6 Format' },
  { value: '1', label: 'Premium Pitch' },
  { value: '100%', label: 'Barefoot Safe' },
]

export default function Hero({ onBookClick }: HeroProps) {
  return (
    <section id="home" className="relative min-h-screen flex flex-col">
      {/* Background image with overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="El Clasico Turf - Premium Football Ground Potheri"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#061824]/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#061824]/40 via-transparent to-[#061824]" />
      </div>

      {/* Content */}
      <div className="relative flex-1 flex flex-col items-center justify-center text-center px-4 pt-28 pb-16">
        {/* Rating badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
          <span className="text-[#c5f135] text-sm">★</span>
          <span className="text-white text-sm font-medium">4.8 / 5 Excellent</span>
          <span className="text-white/50 text-sm">·</span>
          <span className="text-white/70 text-sm">Potheri's #1 Turf</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 max-w-5xl" style={{ fontFamily: 'Georgia, serif' }}>
          Welcome to{' '}
          <span className="text-[#c5f135]">El Clasico</span>
          <br />
          <span className="text-white/60">Potheri's Premium</span>
          <br />
          <span className="text-white">Football Turf.</span>
        </h1>

        {/* Sub-headline */}
        <p className="text-white/70 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          Play Football under floodlights on premium artificial grass.{' '}
          <strong className="text-white">Open 24/7</strong>, rain or shine,
          right next to SRM University.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <button
            onClick={onBookClick}
            className="flex items-center gap-2 bg-[#c5f135] text-[#061824] font-bold text-base px-8 py-4 rounded-full hover:bg-[#d4ff40] active:scale-95 transition-all duration-200 shadow-lg shadow-[#c5f135]/20"
          >
            Book a Game
            <ArrowUpRight size={18} />
          </button>
          <a
            href="#gallery"
            className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white font-medium text-base px-8 py-4 rounded-full border border-white/20 hover:bg-white/15 transition-all duration-200"
          >
            Explore the Venue
          </a>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative bg-[#061824]/80 backdrop-blur-md border-t border-white/10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
          {stats.map((s) => (
            <div key={s.value} className="flex flex-col items-center py-5 px-4">
              <span className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>
                {s.value}
              </span>
              <span className="text-white/50 text-sm mt-1">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        className="absolute bottom-28 left-1/2 -translate-x-1/2 text-white/30 hover:text-white/60 transition-colors animate-bounce hidden md:block"
      >
        <ChevronDown size={24} />
      </a>
    </section>
  )
}
