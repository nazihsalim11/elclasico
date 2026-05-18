// Razorpay Key ID — override via VITE_RAZORPAY_KEY_ID env var, otherwise falls back to placeholder
export const RAZORPAY_KEY_ID: string =
  (import.meta.env.VITE_RAZORPAY_KEY_ID as string | undefined) ?? ''

// Slot pricing in paise (1 INR = 100 paise)
export const SLOT_PRICES: Record<string, number> = {
  day:   70000,  // ₹700  — 6 AM to 6 PM
  night: 90000,  // ₹900  — 6 PM to 6 AM
}

export function priceForSlot(slot: string): number {
  const hour = parseInt(slot.split(':')[0], 10)
  return hour >= 6 && hour < 18 ? SLOT_PRICES.day : SLOT_PRICES.night
}

export function formatINR(paise: number): string {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(paise / 100)
}

// Dynamically load the Razorpay checkout script once
let scriptPromise: Promise<void> | null = null

export function loadRazorpayScript(): Promise<void> {
  if (scriptPromise) return scriptPromise
  scriptPromise = new Promise((resolve, reject) => {
    if (window.Razorpay) { resolve(); return }
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload  = () => resolve()
    script.onerror = () => reject(new Error('Failed to load Razorpay SDK'))
    document.head.appendChild(script)
  })
  return scriptPromise
}

// Minimal type shim so TypeScript is happy
export interface RazorpayOptions {
  key:         string
  amount:      number
  currency:    string
  name:        string
  description: string
  order_id:    string
  prefill:     { name: string; contact: string }
  theme:       { color: string }
  handler:     (response: RazorpayResponse) => void
  modal?:      { ondismiss?: () => void }
  config?:     {
    display?: {
      blocks?: Record<string, { name: string; instruments: { method: string }[] }>
      sequence?: string[]
      preferences?: { show_default_blocks?: boolean }
    }
  }
}

export interface RazorpayResponse {
  razorpay_payment_id: string
  razorpay_order_id:   string
  razorpay_signature:  string
}

export interface RazorpayWindow extends Window {
  Razorpay: new (options: RazorpayOptions) => { open(): void }
}

declare global {
  interface Window {
    Razorpay?: RazorpayWindow['Razorpay']
  }
}
