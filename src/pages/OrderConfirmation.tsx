import { Link, Navigate, useParams } from "react-router-dom"
import { useOrders } from "../store/orders"
import { formatINR } from "../data/products"

export default function OrderConfirmation() {
  const { id } = useParams<{ id: string }>()
  const order = useOrders((s) => s.orders.find((o) => o.id === id))

  if (!order) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="mx-auto max-w-xl px-5 py-16 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-moss-tint">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 12.5l4.5 4.5L19 7" stroke="#52693f" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h1 className="font-display mt-5 text-3xl text-ink">Order placed</h1>
      <p className="mt-2 text-ink-soft">
        Thanks, {order.address.fullName.split(" ")[0]} — your order is confirmed.
      </p>

      <div className="mt-8 rounded-card border border-line bg-panel p-6 text-left">
        <div className="flex justify-between text-sm">
          <span className="text-ink-soft">Order ID</span>
          <span className="font-medium text-ink">{order.id}</span>
        </div>
        <div className="mt-2 flex justify-between text-sm">
          <span className="text-ink-soft">Amount</span>
          <span className="font-medium text-ink">&#8377;{formatINR(order.total)}</span>
        </div>
        <div className="mt-2 flex justify-between text-sm">
          <span className="text-ink-soft">Payment</span>
          <span className="font-medium text-ink capitalize">
            {order.paymentMethod === "cod" ? "Cash on delivery" : order.paymentMethod.toUpperCase()}
          </span>
        </div>
        <div className="mt-2 flex justify-between text-sm">
          <span className="text-ink-soft">Delivering to</span>
          <span className="text-right font-medium text-ink">
            {order.address.city}, {order.address.state} {order.address.pincode}
          </span>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          to={`/track/${order.id}`}
          className="rounded-pill bg-ink px-6 py-3 text-sm font-semibold text-paper hover:opacity-90"
        >
          Track this order
        </Link>
        <Link
          to="/shop"
          className="rounded-pill border border-line px-6 py-3 text-sm font-semibold text-ink hover:border-clay/60"
        >
          Continue shopping
        </Link>
      </div>
    </div>
  )
}
