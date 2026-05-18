import { useState, useEffect } from 'react'
import { X, Loader2, ShieldCheck } from 'lucide-react'
import { FUNCTIONS_URL } from '../lib/supabase'
import { loadRazorpayScript, priceForSlot, formatINR, type RazorpayResponse } from '../lib/razorpay'

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

const today = () => new Date().toISOString().split('T')[0]

type Step = 'form' | 'paying' | 'success' | 'error'

export default function BookingModal({ open, onClose }: BookingModalProps) {
  const [form, setForm] = useState({
    name: '', phone: '', sport: 'Football (5v5)',
    date: today(), slot: SLOTS[12], players: '', notes: '',
  })
  const [step, setStep]   = useState<Step>('form')
  const [errMsg, setErr]  = useState('')

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) { setStep('form'); setErr('') }
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Pre-load Razorpay script while modal mounts
  useEffect(() => { if (open) loadRazorpayScript().catch(() => null) }, [open])

  if (!open) return null

  const slotHour = parseInt(form.slot.split(':')[0], 10)
  const amountPaise = priceForSlot(`${slotHour}:00`)
  const isNight = slotHour >= 18 || slotHour < 6

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStep('paying')
    setErr('')

    try {
      await loadRazorpayScript()

      // 1. Create order on the server
      const res = await fetch(`${FUNCTIONS_URL}/create-razorpay-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, amount_paise: amountPaise }),
      })
      const data = await res.json() as { order_id?: string; amount?: number; key_id?: string; error?: string }
      if (!res.ok || data.error) throw new Error(data.error ?? 'Order creation failed')

      // 2. Open Razorpay checkout
      const RazorpayConstructor = window.Razorpay!
      const rzp = new RazorpayConstructor({
        key:         data.key_id ?? '',
        amount:      data.amount ?? amountPaise,
        currency:    'INR',
        name:        'El Clasico Turf',
        description: `${form.slot} · ${form.date}`,
        order_id:    data.order_id ?? '',
        prefill:     { name: form.name, contact: form.phone },
        theme:       { color: '#c5f135' },
        handler:     async (response: RazorpayResponse) => {
          // 3. Verify signature on the server
          const vRes = await fetch(`${FUNCTIONS_URL}/verify-razorpay-payment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response),
          })
          const vData = await vRes.json() as { success?: boolean; error?: string }
          if (!vRes.ok || vData.error) throw new Error(vData.error ?? 'Verification failed')
          setStep('success')
        },
        modal: {
          ondismiss: () => setStep('form'),
        },
      })
      rzp.open()
    } catch (err: unknown) {
      setErr(err instanceof Error ? err.message : 'Something went wrong')
      setStep('error')
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative w-full max-w-lg bg-[#071e2e] border border-white/15 rounded-2xl shadow-2xl shadow-black/50 max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4 border-b border-white/8">
          <div>
            <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>
              Book your slot
            </h3>
            <p className="text-white/50 text-sm mt-1">Secure payment · Instant confirmation</p>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* === SUCCESS === */}
        {step === 'success' && (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-[#c5f135]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck size={28} className="text-[#c5f135]" />
            </div>
            <h4 className="text-white font-bold text-xl mb-2">Booking Confirmed!</h4>
            <p className="text-white/60 text-sm mb-1">
              <span className="text-white font-medium">{form.slot}</span> on{' '}
              <span className="text-white font-medium">{form.date}</span>
            </p>
            <p className="text-white/50 text-sm mb-6">
              We'll WhatsApp you at {form.phone} with a confirmation receipt shortly.
            </p>
            <button onClick={onClose} className="bg-[#c5f135] text-[#061824] font-bold px-8 py-3 rounded-full hover:bg-[#d4ff40] transition-colors">
              Done
            </button>
          </div>
        )}

        {/* === ERROR === */}
        {step === 'error' && (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <X size={28} className="text-red-400" />
            </div>
            <h4 className="text-white font-bold text-xl mb-2">Payment Failed</h4>
            <p className="text-white/50 text-sm mb-6">{errMsg || 'Something went wrong. Please try again.'}</p>
            <button onClick={() => setStep('form')} className="bg-white/10 text-white font-medium px-8 py-3 rounded-full border border-white/20 hover:bg-white/15 transition-colors">
              Try Again
            </button>
          </div>
        )}

        {/* === FORM + PAYING === */}
        {(step === 'form' || step === 'paying') && (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Name + Phone */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white/50 text-xs mb-1.5 tracking-wide uppercase">Name</label>
                <input
                  required type="text" placeholder="e.g. Karthik"
                  value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-[#0a2535] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#c5f135]/60 transition-colors"
                />
              </div>
              <div>
                <label className="block text-white/50 text-xs mb-1.5 tracking-wide uppercase">Phone</label>
                <input
                  required type="tel" placeholder="+91 9XXXXXXXXX"
                  value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-[#0a2535] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#c5f135]/60 transition-colors"
                />
              </div>
            </div>

            {/* Sport + Date */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white/50 text-xs mb-1.5 tracking-wide uppercase">Sport</label>
                <select
                  value={form.sport} onChange={(e) => setForm({ ...form, sport: e.target.value })}
                  className="w-full bg-[#0a2535] border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#c5f135]/60 transition-colors appearance-none"
                >
                  <option>Football (5v5)</option>
                  <option>Football (6v6)</option>
                  <option>Football (Open)</option>
                </select>
              </div>
              <div>
                <label className="block text-white/50 text-xs mb-1.5 tracking-wide uppercase">Date</label>
                <input
                  required type="date" min={today()}
                  value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full bg-[#0a2535] border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#c5f135]/60 transition-colors"
                />
              </div>
            </div>

            {/* Slot */}
            <div>
              <label className="block text-white/50 text-xs mb-1.5 tracking-wide uppercase">Slot</label>
              <select
                value={form.slot} onChange={(e) => setForm({ ...form, slot: e.target.value })}
                className="w-full bg-[#0a2535] border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#c5f135]/60 transition-colors appearance-none"
              >
                {SLOTS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>

            {/* Price badge */}
            <div className={`flex items-center justify-between rounded-xl px-4 py-3 ${isNight ? 'bg-[#c5f135]/10 border border-[#c5f135]/20' : 'bg-white/5 border border-white/10'}`}>
              <div>
                <p className="text-white/50 text-xs uppercase tracking-wide">{isNight ? 'Night rate' : 'Day rate'}</p>
                <p className="text-white font-bold text-lg">{formatINR(amountPaise)}<span className="text-white/40 text-sm font-normal"> / hour</span></p>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${isNight ? 'bg-[#c5f135] text-[#061824]' : 'bg-white/10 text-white/70'}`}>
                {isNight ? '🌙 Night' : '☀️ Day'}
              </span>
            </div>

            {/* Players */}
            <div>
              <label className="block text-white/50 text-xs mb-1.5 tracking-wide uppercase">Players (optional)</label>
              <input
                type="number" min="2" max="12" placeholder="e.g. 10"
                value={form.players} onChange={(e) => setForm({ ...form, players: e.target.value })}
                className="w-full bg-[#0a2535] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#c5f135]/60 transition-colors"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-white/50 text-xs mb-1.5 tracking-wide uppercase">Notes (optional)</label>
              <textarea
                rows={2} placeholder="Anything we should know?"
                value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="w-full bg-[#0a2535] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#c5f135]/60 transition-colors resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={step === 'paying'}
              className="w-full bg-[#c5f135] text-[#061824] font-bold text-base py-4 rounded-full hover:bg-[#d4ff40] active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {step === 'paying' ? (
                <><Loader2 size={18} className="animate-spin" /> Opening payment…</>
              ) : (
                `Pay ${formatINR(amountPaise)} & Confirm Slot`
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-white/30 text-xs">
              <ShieldCheck size={13} />
              <span>Secured by Razorpay · UPI · Cards · Wallets</span>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
