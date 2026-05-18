// About / turf quality section
const TURF_IMAGE =
  'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=900&q=85&fit=crop'

const highlights = [
  { num: '01', title: 'Premium CC Max Grass', body: 'Smooth texture with excellent ball roll — the same fibre used in pro-grade 5-a-side venues.' },
  { num: '02', title: 'Barefoot Friendly', body: 'Soft, non-abrasive surface safe for play without cleats, perfect for casual kickabouts.' },
  { num: '03', title: '5v5 & 6v6 Ready', body: 'Pitch dimensions optimised for quick, high-intensity small-sided football formats.' },
  { num: '04', title: 'Floodlit Night Play', body: 'Full floodlight coverage so the game never stops after sundown.' },
]

export default function About() {
  return (
    <section id="about" className="py-24 px-4 bg-[#061824]">
      <div className="max-w-6xl mx-auto">
        {/* Label */}
        <p className="text-[#c5f135] text-xs font-bold tracking-[0.2em] uppercase mb-4 text-center">
          THE PITCH
        </p>

        {/* Heading */}
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-4 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
          Built for the{' '}
          <span className="text-[#c5f135] italic">game,</span>
          <br />
          <span className="text-white/60">designed for the player.</span>
        </h2>
        <p className="text-white/50 text-center text-lg max-w-xl mx-auto mb-16">
          Everything about El Clasico is engineered to make football better at SRM Nagar, Potheri.
        </p>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
            <img
              src={TURF_IMAGE}
              alt="El Clasico premium artificial turf"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#061824]/60 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 bg-[#c5f135] text-[#061824] text-xs font-bold px-3 py-1.5 rounded-full tracking-widest uppercase">
              The Pitch · Potheri
            </div>
          </div>

          {/* Highlights grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((h) => (
              <div
                key={h.num}
                className="bg-[#0a2535] border border-white/8 rounded-2xl p-5 hover:border-[#c5f135]/30 hover:bg-[#0e2f42] transition-all duration-300"
              >
                <span className="text-[#c5f135] text-xs font-bold tracking-widest">{h.num}</span>
                <h3 className="text-white font-semibold text-base mt-2 mb-1">{h.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{h.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
