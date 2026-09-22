import { Link } from "react-router-dom"
import ProductThumb from "../components/ProductThumb"
import { useCart, cartTotal } from "../store/cart"

export default function Cart() {
  const lines = useCart((s) => s.lines)
  const setQuantity = useCart((s) => s.setQuantity)
  const removeItem = useCart((s) => s.removeItem)
  const total = cartTotal(lines)

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-20 text-center">
        <h1 className="font-display text-2xl text-ink">Your cart is empty</h1>
        <p className="mt-2 text-ink-soft">
          Nothing added yet — browse the shop to find your first device.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-block rounded-pill bg-ink px-6 py-3 text-sm font-semibold text-paper hover:opacity-90"
        >
          Shop devices
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <h1 className="font-display text-3xl text-ink">Your cart</h1>

      <ul className="mt-8 divide-y divide-line">
        {lines.map((line) => (
          <li key={`${line.product.slug}-${line.colorName}`} className="flex items-center gap-4 py-5">
            <div className="h-16 w-16 shrink-0">
              <ProductThumb
                category={line.product.category}
                color={
                  line.product.colors.find((c) => c.name === line.colorName)?.hex ??
                  line.product.colors[0].hex
                }
                className="h-full w-full"
              />
            </div>
            <div className="flex-1">
              <p className="font-medium text-ink">{line.product.name}</p>
              <p className="text-sm text-ink-soft">{line.colorName}</p>
            </div>
            <div className="flex items-center gap-2">
              <label className="sr-only" htmlFor={`qty-${line.product.slug}-${line.colorName}`}>
                Quantity for {line.product.name}
              </label>
              <select
                id={`qty-${line.product.slug}-${line.colorName}`}
                value={line.quantity}
                onChange={(e) =>
                  setQuantity(line.product.slug, line.colorName, Number(e.target.value))
                }
                className="rounded-md border border-line bg-panel px-2 py-1.5 text-sm"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
            <p className="w-16 text-right font-medium text-ink">
              ${line.product.price * line.quantity}
            </p>
            <button
              type="button"
              onClick={() => removeItem(line.product.slug, line.colorName)}
              className="text-sm text-ink-soft hover:text-clay"
              aria-label={`Remove ${line.product.name} in ${line.colorName}`}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex items-center justify-between border-t border-line pt-6">
        <p className="text-ink-soft">Total</p>
        <p className="font-display text-2xl text-ink">${total}</p>
      </div>
      <p className="mt-1 text-right text-sm text-ink-soft">
        or 4 interest-free payments of ${(total / 4).toFixed(2)}
      </p>

      <button
        type="button"
        className="mt-6 w-full rounded-pill bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition-opacity hover:opacity-90"
      >
        Checkout
      </button>
      <p className="mt-3 text-center text-xs text-ink-soft">
        This is a concept storefront — checkout is not connected to real payment processing.
      </p>
    </div>
  )
}
