import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react'

// Google Maps embed for SRM Nagar, Potheri, Kattankulathur area
const MAP_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.3780648869485!2d80.04366031482143!3d12.82336299091!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52f7f6c21e9e7b%3A0x6f3e5a3b3d1e5a5a!2sSRM%20Nagar%2C%20Potheri%2C%20Kattankulathur%2C%20Tamil%20Nadu%20603203!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin'

const contacts = [
  {
    icon: Phone,
    label: 'Call / WhatsApp',
    value: '+91 94999 61063',
    href: 'tel:+919499961063',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@elclasicopotheri.in',
    href: 'mailto:hello@elclasicopotheri.in',
  },
  {
    icon: MapPin,
    label: 'Address',
    value: 'SRM Nagar, Potheri, Kattankulathur, Chengalpattu – 603203',
    href: 'https://maps.google.com/?q=SRM+Nagar,Potheri,Kattankulathur',
  },
  {
    icon: Clock,
    label: 'Hours',
    value: 'Open 24 hours, 7 days a week',
    href: null,
  },
]

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-4 bg-[#061824]">
      <div className="max-w-6xl mx-auto">
        {/* Label */}
        <p className="text-[#c5f135] text-xs font-bold tracking-[0.2em] uppercase mb-4 text-center">
          FIND US
        </p>

        {/* Heading */}
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-4 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
          Walk in.{' '}
          <span className="text-[#c5f135] italic">Play hard.</span>
        </h2>
        <p className="text-white/50 text-center text-lg max-w-lg mx-auto mb-14">
          Right next to SRM University main gate — easy to find, easier to book.
        </p>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Contact details */}
          <div className="space-y-4">
            {contacts.map((c) => {
              const Icon = c.icon
              const content = (
                <div
                  key={c.label}
                  className="flex items-start gap-4 bg-[#0a2535] border border-white/8 rounded-2xl p-5 hover:border-[#c5f135]/20 transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-[#c5f135]/15 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={18} className="text-[#c5f135]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white/40 text-xs tracking-widest uppercase mb-1">{c.label}</p>
                    <p className="text-white font-medium text-sm leading-relaxed">{c.value}</p>
                  </div>
                  {c.href && (
                    <ExternalLink size={14} className="text-white/30 flex-shrink-0 mt-1" />
                  )}
                </div>
              )
              return c.href ? (
                <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" className="block">
                  {content}
                </a>
              ) : (
                <div key={c.label}>{content}</div>
              )
            })}

            {/* Social links */}
            <div className="flex gap-3 pt-2">
              <a
                href="https://www.instagram.com/elclasico_potheri_srm/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#0a2535] border border-white/8 rounded-xl px-4 py-3 text-white/60 hover:text-white hover:border-white/20 text-sm transition-all duration-200"
              >
                {/* Instagram icon */}
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
                Instagram
              </a>
              <a
                href="https://www.facebook.com/elclasico.srm/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#0a2535] border border-white/8 rounded-xl px-4 py-3 text-white/60 hover:text-white hover:border-white/20 text-sm transition-all duration-200"
              >
                {/* Facebook icon */}
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-2xl overflow-hidden border border-white/10 h-[400px] relative">
            <iframe
              title="El Clasico Turf Location"
              src={MAP_EMBED_URL}
              className="w-full h-full"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              href="https://maps.google.com/?q=SRM+Nagar,Potheri,Kattankulathur,Chengalpattu"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 bg-[#c5f135] text-[#061824] text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1.5 hover:bg-[#d4ff40] transition-colors"
            >
              Get Directions
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
