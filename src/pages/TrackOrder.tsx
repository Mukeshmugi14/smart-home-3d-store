import { useEffect, useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { useOrders, currentStage, stageTimestamp, ORDER_STAGES } from "../store/orders"
import { formatINR } from "../data/products"

export default function TrackOrder() {
  const { id } = useParams<{ id: string }>()
  const order = useOrders((s) => s.orders.find((o) => o.id === id))
  const [, forceTick] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => forceTick((n) => n + 1), 3000)
    return () => window.clearInterval(interval)
  }, [])

  if (!order) {
    return <Navigate to="/orders" replace />
  }

  const { index: activeIndex } = currentStage(order)
  const delivered = activeIndex === ORDER_STAGES.length - 1

  return (
    <div className="mx-auto max-w-2xl px-5 py-12">
      <nav className="text-sm text-ink-soft" aria-label="Breadcrumb">
        <Link to="/orders" className="hover:text-clay">
          Your orders
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{order.id}</span>
      </nav>

      <h1 className="font-display mt-3 text-3xl text-ink">
        {delivered ? "Delivered" : "On its way"}
      </h1>
      <p className="mt-1 text-ink-soft">
        Order {order.id} &middot; &#8377;{formatINR(order.total)} &middot;{" "}
        {order.address.city}, {order.address.state}
      </p>

      <ol className="mt-10 space-y-0">
        {ORDER_STAGES.map((stage, i) => {
          const done = i <= activeIndex
          const isLast = i === ORDER_STAGES.length - 1
          return (
            <li key={stage} className="relative flex gap-4 pb-8 last:pb-0">
              {!isLast && (
                <span
                  className={`absolute left-[11px] top-6 h-full w-0.5 ${
                    i < activeIndex ? "bg-moss" : "bg-line"
                  }`}
                />
              )}
              <span
                className={`z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                  done ? "border-moss bg-moss" : "border-line bg-panel"
                }`}
              >
                {done && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M5 12.5l4.5 4.5L19 7"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
              <div>
                <p className={`text-sm font-medium ${done ? "text-ink" : "text-ink-soft"}`}>
                  {stage}
                </p>
                {done && (
                  <p className="text-xs text-ink-soft">
                    {new Date(stageTimestamp(order, i)).toLocaleString("en-IN", {
                      day: "numeric",
                      month: "short",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                )}
              </div>
            </li>
          )
        })}
      </ol>

      {!delivered && (
        <p className="mt-2 text-xs text-ink-soft">
          This tracker updates automatically as time passes — a stand-in for real courier tracking.
        </p>
      )}

      <div className="mt-10 rounded-card border border-line bg-panel p-5">
        <p className="text-sm font-semibold text-ink">Items in this order</p>
        <ul className="mt-3 space-y-2">
          {order.lines.map((l) => (
            <li key={`${l.product.slug}-${l.colorName}`} className="flex items-center gap-3">
              <img
                src={l.product.image}
                alt={l.product.name}
                className="h-10 w-10 rounded-md object-cover"
              />
              <span className="text-sm text-ink">
                {l.product.name} ({l.colorName}) &times; {l.quantity}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
