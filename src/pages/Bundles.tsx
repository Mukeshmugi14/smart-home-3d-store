import { Link } from "react-router-dom"
import { hostelKitProducts, hostelKitMrp, hostelKitPrice, formatINR } from "../data/products"
import { useCart } from "../store/cart"

export default function Bundles() {
  const addItem = useCart((s) => s.addItem)

  function addKitToCart() {
    hostelKitProducts.forEach((p) => addItem(p, p.colors[0].name))
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      <p className="text-sm font-semibold uppercase tracking-wide text-moss">
        Bundle
      </p>
      <h1 className="font-display mt-2 text-3xl text-ink sm:text-4xl">
        The Hostel &amp; PG Starter Kit
      </h1>
      <p className="mt-3 max-w-lg text-ink-soft">
        The three devices most first-year students buy in their first month: a
        scheduled outlet, a pair of color bulbs, and an indoor camera.
        Bundled at 15% off — no bundle you don't already need.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {hostelKitProducts.map((p) => (
          <div key={p.slug} className="rounded-card border border-line bg-panel p-4">
            <div className="aspect-square overflow-hidden rounded-md bg-paper-dim">
              <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
            </div>
            <p className="mt-3 text-center font-display text-lg text-ink">{p.name}</p>
            <p className="text-center text-sm text-ink-soft">&#8377;{formatINR(p.price)}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-card bg-moss-tint px-6 py-6 sm:flex-row">
        <div>
          <p className="text-sm text-ink-soft">
            <span className="line-through">&#8377;{formatINR(hostelKitMrp)}</span> bundled price
          </p>
          <p className="font-display text-2xl text-ink">&#8377;{formatINR(hostelKitPrice)}</p>
        </div>
        <button
          type="button"
          onClick={addKitToCart}
          className="rounded-pill bg-moss px-6 py-3 text-sm font-semibold text-paper transition-opacity hover:opacity-90"
        >
          Add kit to cart
        </button>
      </div>

      <p className="mt-6 text-center text-sm text-ink-soft">
        Prefer to pick products one at a time?{" "}
        <Link to="/shop" className="text-clay hover:underline">
          Browse the full shop
        </Link>
        .
      </p>
    </div>
  )
}
