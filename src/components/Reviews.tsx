const reviews = [
  {
    name: 'Arjun R.',
    role: 'SRM Student',
    rating: 5,
    text: 'Best turf near SRM campus. Played multiple times, the surface is super smooth and safe for barefoot. Night slots are amazing with full floodlights.',
  },
  {
    name: 'Karthik S.',
    role: 'Weekend Warrior',
    rating: 5,
    text: 'Booked a midnight slot with my crew — the 24/7 availability is a game changer. Ground was clean, changing rooms were maintained. Highly recommend!',
  },
  {
    name: 'Mohammed Faris',
    role: 'Regular Player',
    rating: 5,
    text: 'The CC Max grass is excellent — ball rolls smooth and there\'s no slipping. Parking is easy and the RO water station is a nice touch. 5 stars.',
  },
  {
    name: 'Priya V.',
    role: 'Football Coach',
    rating: 5,
    text: 'I bring my academy kids here every weekend. The pitch dimensions are perfect for 5v5 and 6v6. Reliable, clean, and always available.',
  },
]

export default function Reviews() {
  return (
    <section id="reviews" className="py-24 px-4 bg-[#061824]">
      <div className="max-w-6xl mx-auto">
        {/* Label */}
        <p className="text-[#c5f135] text-xs font-bold tracking-[0.2em] uppercase mb-4 text-center">
          FROM THE PLAYERS
        </p>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4" style={{ fontFamily: 'Georgia, serif' }}>
          What people are{' '}
          <span className="text-[#c5f135] italic">saying.</span>
        </h2>
        <p className="text-white/50 text-center text-lg max-w-lg mx-auto mb-12">
          Over 100 games played every week — here's what regulars think.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="bg-[#0a2535] border border-white/8 rounded-2xl p-6 flex flex-col gap-4 hover:border-[#c5f135]/20 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <span key={i} className="text-[#c5f135] text-sm">★</span>
                ))}
              </div>

              {/* Text */}
              <p className="text-white/70 text-sm leading-relaxed flex-1">"{review.text}"</p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-white/8">
                <div className="w-9 h-9 rounded-full bg-[#c5f135]/20 flex items-center justify-center text-[#c5f135] font-bold text-sm">
                  {review.name[0]}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{review.name}</p>
                  <p className="text-white/40 text-xs">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Aggregate rating */}
        <div className="mt-10 flex items-center justify-center gap-3">
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="text-[#c5f135] text-lg">★</span>
            ))}
          </div>
          <span className="text-white font-bold text-2xl">4.8</span>
          <span className="text-white/50">/ 5 — based on 60+ reviews</span>
        </div>
      </div>
    </section>
  )
}
