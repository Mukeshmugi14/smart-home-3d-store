import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import ProductCard from "../components/ProductCard"
import { products, type ProductType } from "../data/products"

type SortKey = "relevance" | "price-asc" | "price-desc" | "rating"

const TYPE_FILTERS: { key: ProductType | "all"; label: string }[] = [
  { key: "all", label: "All products" },
  { key: "smart", label: "Smart home" },
  { key: "home", label: "Home essentials" },
]

const SORTS: { key: SortKey; label: string }[] = [
  { key: "relevance", label: "Relevance" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
  { key: "rating", label: "Customer rating" },
]

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const typeFilter = (params.get("type") as ProductType | "all") || "all"
  const sort = (params.get("sort") as SortKey) || "relevance"
  const query = params.get("q") || ""

  const results = useMemo(() => {
    let list = products
    if (typeFilter !== "all") list = list.filter((p) => p.type === typeFilter)
    if (query.trim()) {
      const q = query.trim().toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      )
    }
    const sorted = [...list]
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price)
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price)
    if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating)
    return sorted
  }, [typeFilter, sort, query])

  function setType(type: ProductType | "all") {
    const next = new URLSearchParams(params)
    if (type === "all") next.delete("type")
    else next.set("type", type)
    setParams(next, { replace: true })
  }

  function setSort(next: SortKey) {
    const p = new URLSearchParams(params)
    if (next === "relevance") p.delete("sort")
    else p.set("sort", next)
    setParams(p, { replace: true })
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="font-display text-3xl text-ink">
        {query ? `Results for "${query}"` : "Shop all products"}
      </h1>
      <p className="mt-2 max-w-lg text-ink-soft">
        {results.length} product{results.length === 1 ? "" : "s"}. Six of our
        smart-home originals have a full 3D preview you can spin and drop into a room.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by type">
          {TYPE_FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setType(f.key)}
              aria-pressed={typeFilter === f.key}
              className={`rounded-pill border px-4 py-1.5 text-sm font-medium transition-colors ${
                typeFilter === f.key
                  ? "border-ink bg-ink text-paper"
                  : "border-line text-ink-soft hover:border-clay/50 hover:text-ink"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 text-sm text-ink-soft">
          Sort by
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-md border border-line bg-panel px-2 py-1.5 text-sm text-ink"
          >
            {SORTS.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>

      {results.length === 0 && (
        <p className="mt-10 text-center text-ink-soft">
          No products match that search yet.
        </p>
      )}
    </div>
  )
}
