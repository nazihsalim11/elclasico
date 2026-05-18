export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-[#040f18] border-t border-white/8 px-4 py-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="text-white font-bold text-lg" style={{ fontFamily: 'Georgia, serif' }}>
            El Clasico
          </span>
          <span className="text-[#c5f135] text-[9px] font-bold tracking-widest uppercase">TURF</span>
        </div>

        {/* Nav */}
        <div className="flex gap-6 text-sm text-white/40">
          <a href="#home" className="hover:text-white transition-colors">Home</a>
          <a href="#facilities" className="hover:text-white transition-colors">Facilities</a>
          <a href="#gallery" className="hover:text-white transition-colors">Gallery</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>

        {/* Copy */}
        <p className="text-white/30 text-xs">
          © {year} El Clasico Turf, Potheri. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
