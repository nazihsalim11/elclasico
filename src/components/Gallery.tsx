// Gallery section — uses high-quality Unsplash football/turf images as placeholders.
// Replace these URLs with actual El Clasico photos when available.
const images = [
  {
    src: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=900&q=80&fit=crop',
    alt: 'The Pitch · Floodlit',
    label: 'THE PITCH · FLOODLIT',
    span: 'lg:col-span-2 lg:row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?w=700&q=80&fit=crop',
    alt: 'Goal-post End View',
    label: 'GOAL-POST END',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?w=700&q=80&fit=crop',
    alt: 'Action Shot',
    label: 'GAME IN PROGRESS',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1464983308776-3c7215084895?w=700&q=80&fit=crop',
    alt: 'Pitch side view',
    label: 'SIDE VIEW',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=700&q=80&fit=crop',
    alt: 'Players celebrating',
    label: 'AFTER THE WIN',
    span: '',
  },
]

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 px-4 bg-[#071e2e]">
      <div className="max-w-6xl mx-auto">
        {/* Label */}
        <p className="text-[#c5f135] text-xs font-bold tracking-[0.2em] uppercase mb-4 text-center">
          THE VENUE, IN FRAME
        </p>

        {/* Heading */}
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-4 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
          Step inside{' '}
          <span className="text-[#c5f135]">El Clasico.</span>
        </h2>
        <p className="text-white/50 text-center text-lg max-w-xl mx-auto mb-12">
          Floodlit nights, premium turf, and a ground you'll want to play on every week.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 auto-rows-[240px]">
          {images.map((img, idx) => (
            <div
              key={idx}
              className={`relative overflow-hidden rounded-2xl group cursor-pointer ${img.span}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061824]/80 via-[#061824]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4">
                <span className="text-white/70 text-[10px] font-bold tracking-widest uppercase bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                  {img.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
