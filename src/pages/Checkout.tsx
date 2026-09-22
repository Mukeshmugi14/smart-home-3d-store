import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { useCart, cartTotal } from "../store/cart"
import { useOrders, type PaymentMethod } from "../store/orders"
import { formatINR } from "../data/products"

const PAYMENT_OPTIONS: { key: PaymentMethod; label: string; hint: string }[] = [
  { key: "upi", label: "UPI", hint: "Pay via Google Pay, PhonePe, Paytm, or any UPI app" },
  { key: "card", label: "Credit / Debit card", hint: "Visa, Mastercard, RuPay" },
  { key: "netbanking", label: "Net banking", hint: "Redirects to your bank (simulated)" },
  { key: "cod", label: "Cash on delivery", hint: "Pay in cash when your order arrives" },
]

export default function Checkout() {
  const lines = useCart((s) => s.lines)
  const clearCart = useCart((s) => s.clear)
  const placeOrder = useOrders((s) => s.placeOrder)
  const navigate = useNavigate()
  const total = cartTotal(lines)

  const [fullName, setFullName] = useState("")
  const [line1, setLine1] = useState("")
  const [city, setCity] = useState("")
  const [stateName, setStateName] = useState("")
  const [pincode, setPincode] = useState("")
  const [phone, setPhone] = useState("")
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi")
  const [upiId, setUpiId] = useState("")
  const [placing, setPlacing] = useState(false)

  if (lines.length === 0 && !placing) {
    return <Navigate to="/cart" replace />
  }

  const addressValid =
    fullName.trim() && line1.trim() && city.trim() && stateName.trim() && /^\d{6}$/.test(pincode) && /^\d{10}$/.test(phone)

  function handlePlaceOrder(e: React.FormEvent) {
    e.preventDefault()
    if (!addressValid) return
    setPlacing(true)
    const order = placeOrder({
      lines,
      total,
      address: { fullName, line1, city, state: stateName, pincode, phone },
      paymentMethod,
    })
    clearCart()
    navigate(`/order-confirmation/${order.id}`)
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      <h1 className="font-display text-3xl text-ink">Checkout</h1>
      <p className="mt-2 text-sm text-ink-soft">
        This is a concept storefront — this form simulates the full flow and
        does not transmit or store any real payment details.
      </p>

      <form onSubmit={handlePlaceOrder} className="mt-8 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-8">
          <section>
            <h2 className="font-display text-xl text-ink">Delivery address</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="sm:col-span-2 text-sm text-ink-soft">
                Full name
                <input
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-1 w-full rounded-md border border-line bg-panel px-3 py-2 text-ink"
                  placeholder="As on your ID"
                />
              </label>
              <label className="sm:col-span-2 text-sm text-ink-soft">
                Address line
                <input
                  required
                  value={line1}
                  onChange={(e) => setLine1(e.target.value)}
                  className="mt-1 w-full rounded-md border border-line bg-panel px-3 py-2 text-ink"
                  placeholder="Hostel / flat, street, area"
                />
              </label>
              <label className="text-sm text-ink-soft">
                City
                <input
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="mt-1 w-full rounded-md border border-line bg-panel px-3 py-2 text-ink"
                />
              </label>
              <label className="text-sm text-ink-soft">
                State
                <input
                  required
                  value={stateName}
                  onChange={(e) => setStateName(e.target.value)}
                  className="mt-1 w-full rounded-md border border-line bg-panel px-3 py-2 text-ink"
                />
              </label>
              <label className="text-sm text-ink-soft">
                PIN code
                <input
                  required
                  inputMode="numeric"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  className="mt-1 w-full rounded-md border border-line bg-panel px-3 py-2 text-ink"
                  placeholder="6 digits"
                />
              </label>
              <label className="text-sm text-ink-soft">
                Phone
                <input
                  required
                  inputMode="numeric"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  className="mt-1 w-full rounded-md border border-line bg-panel px-3 py-2 text-ink"
                  placeholder="10 digits"
                />
              </label>
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink">Payment method</h2>
            <div className="mt-4 space-y-2">
              {PAYMENT_OPTIONS.map((opt) => (
                <label
                  key={opt.key}
                  className={`flex cursor-pointer items-start gap-3 rounded-card border p-3 transition-colors ${
                    paymentMethod === opt.key ? "border-clay bg-clay-tint/40" : "border-line"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === opt.key}
                    onChange={() => setPaymentMethod(opt.key)}
                    className="mt-1"
                  />
                  <span>
                    <span className="block text-sm font-medium text-ink">{opt.label}</span>
                    <span className="block text-xs text-ink-soft">{opt.hint}</span>
                  </span>
                </label>
              ))}
            </div>

            {paymentMethod === "upi" && (
              <label className="mt-3 block text-sm text-ink-soft">
                UPI ID (optional for this demo)
                <input
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="yourname@upi"
                  className="mt-1 w-full rounded-md border border-line bg-panel px-3 py-2 text-ink"
                />
              </label>
            )}
            {paymentMethod === "card" && (
              <p className="mt-3 text-xs text-ink-soft">
                Card entry is skipped in this demo — no real card details are
                collected anywhere on this site.
              </p>
            )}
          </section>
        </div>

        <aside className="h-fit rounded-card border border-line bg-panel p-5">
          <h2 className="font-display text-lg text-ink">Order summary</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {lines.map((l) => (
              <li key={`${l.product.slug}-${l.colorName}`} className="flex justify-between text-ink-soft">
                <span>
                  {l.product.name} &times; {l.quantity}
                </span>
                <span className="text-ink">&#8377;{formatINR(l.product.price * l.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-line pt-4 text-sm font-semibold text-ink">
            <span>Total</span>
            <span>&#8377;{formatINR(total)}</span>
          </div>
          <button
            type="submit"
            disabled={!addressValid || placing}
            className="mt-5 w-full rounded-pill bg-ink px-6 py-3 text-sm font-semibold text-paper transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            Place order
          </button>
        </aside>
      </form>
    </div>
  )
}
