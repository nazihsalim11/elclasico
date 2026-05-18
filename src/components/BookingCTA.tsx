interface BookingCTAProps {
  onBookClick: () => void
}

export default function BookingCTA({ onBookClick }: BookingCTAProps) {
  return (
    <section className="py-24 px-4 bg-[#071e2e]">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-[#c5f135] text-xs font-bold tracking-[0.2em] uppercase mb-4">
          BOOK YOUR SLOT
        </p>
        <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
          The pitch is ready.
          <br />
          <span className="text-white/60">Are you?</span>
        </h2>
        <p className="text-white/60 text-lg mb-10 max-w-lg mx-auto">
          El Clasico is open <strong className="text-white">24 hours, 7 days a week</strong>.
          WhatsApp us and we'll confirm your slot within minutes.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={onBookClick}
            className="bg-[#c5f135] text-[#061824] font-bold text-base px-10 py-4 rounded-full hover:bg-[#d4ff40] active:scale-95 transition-all duration-200 shadow-lg shadow-[#c5f135]/20"
          >
            Book a Game Now
          </button>
          <a
            href="https://wa.me/919499961063"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white/10 text-white font-medium text-base px-8 py-4 rounded-full border border-white/20 hover:bg-white/15 transition-all duration-200"
          >
            {/* WhatsApp icon inline */}
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#c5f135]">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp Us
          </a>
        </div>

        {/* Hours callout */}
        <div className="mt-10 inline-flex items-center gap-2 bg-[#c5f135]/10 border border-[#c5f135]/20 rounded-full px-5 py-2.5">
          <span className="w-2 h-2 rounded-full bg-[#c5f135] animate-pulse" />
          <span className="text-[#c5f135] text-sm font-medium">Open right now · 24/7 · No waitlist</span>
        </div>
      </div>
    </section>
  )
}
