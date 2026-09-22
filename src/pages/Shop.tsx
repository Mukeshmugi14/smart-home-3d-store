import { useMemo, useState } from "react"
import ProductCard from "../components/ProductCard"
import { products, type Category } from "../data/products"

const CATEGORY_LABELS: Record<Category, string> = {
  plug: "Plugs",
  bulb: "Bulbs",
  camera: "Cameras",
  speaker: "Speakers",
  doorbell: "Doorbells",
  lock: "Locks",
}

type Filter = "all" | "under25" | Category

export default function Shop() {
  const [filter, setFilter] = useState<Filter>("all")

  const filtered = useMemo(() => {
    if (filter === "all") return products
    if (filter === "under25") return products.filter((p) => p.price < 25)
    return products.filter((p) => p.category === filter)
  }, [filter])

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "under25", label: "Under $25" },
    ...(Object.keys(CATEGORY_LABELS) as Category[]).map((c) => ({
      key: c,
      label: CATEGORY_LABELS[c],
    })),
  ]

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="font-display text-3xl text-ink">Shop devices</h1>
      <p className="mt-2 max-w-lg text-ink-soft">
        Six devices. Every product page has a rotatable 3D preview you can
        spin and recolor before you buy.
      </p>

      <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            aria-pressed={filter === f.key}
            className={`rounded-pill border px-4 py-1.5 text-sm font-medium transition-colors ${
              filter === f.key
                ? "border-ink bg-ink text-paper"
                : "border-line text-ink-soft hover:border-clay/50 hover:text-ink"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-ink-soft">
          No devices match that filter yet.
        </p>
      )}
    </div>
  )
}
