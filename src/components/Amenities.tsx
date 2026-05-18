import { Shirt, Droplets, ParkingCircle, Zap, Coffee, Users, Clock, MapPin } from 'lucide-react'

const amenities = [
  {
    icon: Clock,
    title: 'Open 24/7',
    body: 'Book any hour of the day — midnight slots, early morning, always on.',
  },
  {
    icon: Droplets,
    title: 'RO Drinking Water',
    body: 'Pure, cold filtered water on-site — stay hydrated every match.',
  },
  {
    icon: Shirt,
    title: 'Changing Rooms',
    body: 'Dedicated, clean dress changing rooms for both teams.',
  },
  {
    icon: ParkingCircle,
    title: 'Ample Parking',
    body: 'Spacious parking for cars, bikes, and two-wheelers at no charge.',
  },
  {
    icon: Users,
    title: 'Rest Area',
    body: 'Comfortable seating area right beside the pitch to relax between games.',
  },
  {
    icon: Zap,
    title: 'Power Backup',
    body: 'Uninterrupted floodlights with backup power so the game never stops.',
  },
  {
    icon: Coffee,
    title: 'Refreshments',
    body: 'Quick bites and cold drinks available nearby at fair prices.',
  },
  {
    icon: MapPin,
    title: 'Prime Location',
    body: 'Steps from SRM University main gate — easy access for students & locals.',
  },
]

export default function Amenities() {
  return (
    <section id="facilities" className="py-24 px-4" style={{ background: 'linear-gradient(180deg, #061824 0%, #071e2e 100%)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Label */}
        <p className="text-[#c5f135] text-xs font-bold tracking-[0.2em] uppercase mb-4 text-center">
          THE VENUE
        </p>

        {/* Heading */}
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-4 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
          Eight thoughtful touches<br />
          <span className="text-white/60">that make El Clasico</span>{' '}
          <span className="text-[#c5f135] italic">different.</span>
        </h2>
        <p className="text-white/50 text-center text-lg max-w-lg mx-auto mb-16">
          We sweat the details so you can focus on the match.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {amenities.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="bg-[#0a2535] border border-white/8 rounded-2xl p-6 flex flex-col gap-4 hover:border-[#c5f135]/30 hover:bg-[#0e2f42] transition-all duration-300 group"
              >
                <div className="w-11 h-11 bg-[#c5f135]/15 rounded-xl flex items-center justify-center group-hover:bg-[#c5f135]/25 transition-colors duration-300">
                  <Icon size={20} className="text-[#c5f135]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base mb-1">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.body}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
