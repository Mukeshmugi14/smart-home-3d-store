import { Link } from "react-router-dom"
import { useOrders, currentStage } from "../store/orders"
import { formatINR } from "../data/products"

export default function Orders() {
  const orders = useOrders((s) => s.orders)

  if (orders.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-5 py-20 text-center">
        <h1 className="font-display text-2xl text-ink">No orders yet</h1>
        <p className="mt-2 text-ink-soft">Orders you place will show up here.</p>
        <Link
          to="/shop"
          className="mt-6 inline-block rounded-pill bg-ink px-6 py-3 text-sm font-semibold text-paper hover:opacity-90"
        >
          Shop products
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-12">
      <h1 className="font-display text-3xl text-ink">Your orders</h1>
      <ul className="mt-8 space-y-4">
        {orders.map((order) => {
          const { label } = currentStage(order)
          return (
            <li key={order.id}>
              <Link
                to={`/track/${order.id}`}
                className="block rounded-card border border-line bg-panel p-5 transition-colors hover:border-clay/50"
              >
                <div className="flex items-center justify-between">
                  <p className="font-medium text-ink">{order.id}</p>
                  <span className="rounded-pill bg-moss-tint px-2.5 py-1 text-xs font-medium text-moss">
                    {label}
                  </span>
                </div>
                <p className="mt-1 text-sm text-ink-soft">
                  {order.lines.length} item{order.lines.length === 1 ? "" : "s"} &middot; &#8377;
                  {formatINR(order.total)} &middot;{" "}
                  {new Date(order.placedAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                  })}
                </p>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
