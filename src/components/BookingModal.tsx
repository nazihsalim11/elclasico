import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

interface BookingModalProps {
  open: boolean
  onClose: () => void
}

const SLOTS = [
  '6:00 AM – 7:00 AM', '7:00 AM – 8:00 AM', '8:00 AM – 9:00 AM',
  '9:00 AM – 10:00 AM', '10:00 AM – 11:00 AM', '11:00 AM – 12:00 PM',
  '12:00 PM – 1:00 PM', '1:00 PM – 2:00 PM', '2:00 PM – 3:00 PM',
  '3:00 PM – 4:00 PM', '4:00 PM – 5:00 PM', '5:00 PM – 6:00 PM',
  '6:00 PM – 7:00 PM', '7:00 PM – 8:00 PM', '8:00 PM – 9:00 PM',
  '9:00 PM – 10:00 PM', '10:00 PM – 11:00 PM', '11:00 PM – 12:00 AM',
  '12:00 AM – 1:00 AM', '1:00 AM – 2:00 AM',
]

const today = () => {
  const d = new Date()
  return d.toISOString().split('T')[0]
}

export default function BookingModal({ open, onClose }: BookingModalProps) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    sport: 'Football',
    date: today(),
    slot: SLOTS[12],
    players: '',
    notes: '',
  })
  const [submitted, setSubmitted] = useState(false)

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setSubmitted(false)
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const msg = encodeURIComponent(
      `Hi! I'd like to book a slot at El Clasico Turf.\n\nName: ${form.name}\nPhone: ${form.phone}\nSport: ${form.sport}\nDate: ${form.date}\nSlot: ${form.slot}\nPlayers: ${form.players || 'Not specified'}\nNotes: ${form.notes || 'None'}`
    )
    window.open(`https://wa.me/919499961063?text=${msg}`, '_blank')
    setSubmitted(true)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-[#071e2e] border border-white/15 rounded-2xl shadow-2xl shadow-black/50 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-0">
          <div>
            <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>
              Book your slot
            </h3>
            <p className="text-white/50 text-sm mt-1">
              We'll WhatsApp you to confirm within minutes.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-[#c5f135]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-[#c5f135] text-3xl">✓</span>
            </div>
            <h4 className="text-white font-bold text-xl mb-2">Request Sent!</h4>
            <p className="text-white/60 text-sm mb-6">
              Your booking request was sent via WhatsApp. We'll confirm your slot shortly.
            </p>
            <button
              onClick={onClose}
              className="bg-[#c5f135] text-[#061824] font-bold px-8 py-3 rounded-full hover:bg-[#d4ff40] transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Name + Phone */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white/60 text-xs mb-1.5 tracking-wide">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Karthik"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-[#0a2535] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#c5f135]/60 transition-colors"
                />
              </div>
              <div>
                <label className="block text-white/60 text-xs mb-1.5 tracking-wide">Phone</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 9XXXXXXXXX"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-[#0a2535] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#c5f135]/60 transition-colors"
                />
              </div>
            </div>

            {/* Sport + Date */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white/60 text-xs mb-1.5 tracking-wide">Sport</label>
                <select
                  value={form.sport}
                  onChange={(e) => setForm({ ...form, sport: e.target.value })}
                  className="w-full bg-[#0a2535] border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#c5f135]/60 transition-colors appearance-none"
                >
                  <option>Football (5v5)</option>
                  <option>Football (6v6)</option>
                  <option>Football (Open)</option>
                </select>
              </div>
              <div>
                <label className="block text-white/60 text-xs mb-1.5 tracking-wide">Date</label>
                <input
                  type="date"
                  required
                  min={today()}
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full bg-[#0a2535] border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#c5f135]/60 transition-colors"
                />
              </div>
            </div>

            {/* Slot */}
            <div>
              <label className="block text-white/60 text-xs mb-1.5 tracking-wide">Slot</label>
              <select
                value={form.slot}
                onChange={(e) => setForm({ ...form, slot: e.target.value })}
                className="w-full bg-[#0a2535] border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#c5f135]/60 transition-colors appearance-none"
              >
                {SLOTS.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Players */}
            <div>
              <label className="block text-white/60 text-xs mb-1.5 tracking-wide">Players (optional)</label>
              <input
                type="number"
                min="2"
                max="12"
                placeholder="e.g. 10"
                value={form.players}
                onChange={(e) => setForm({ ...form, players: e.target.value })}
                className="w-full bg-[#0a2535] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#c5f135]/60 transition-colors"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-white/60 text-xs mb-1.5 tracking-wide">Notes (optional)</label>
              <textarea
                rows={3}
                placeholder="Anything we should know?"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="w-full bg-[#0a2535] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#c5f135]/60 transition-colors resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#c5f135] text-[#061824] font-bold text-base py-4 rounded-full hover:bg-[#d4ff40] active:scale-[0.98] transition-all duration-200 mt-2"
            >
              Confirm Booking via WhatsApp
            </button>

            <p className="text-white/30 text-xs text-center">
              Opens WhatsApp with your booking details pre-filled.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
