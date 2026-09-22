import { useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import LazyProductViewer from "../three/LazyProductViewer"
import InstallmentPrice from "../components/InstallmentPrice"
import Badge from "../components/Badge"
import { getProductBySlug } from "../data/products"
import { useCart } from "../store/cart"

export default function Product() {
  const { slug } = useParams<{ slug: string }>()
  const product = slug ? getProductBySlug(slug) : undefined
  const addItem = useCart((s) => s.addItem)
  const [colorIndex, setColorIndex] = useState(0)
  const [justAdded, setJustAdded] = useState(false)

  if (!product) {
    return <Navigate to="/shop" replace />
  }

  const color = product.colors[colorIndex]

  function handleAddToCart() {
    addItem(product!, color.name)
    setJustAdded(true)
    window.setTimeout(() => setJustAdded(false), 1800)
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <nav className="text-sm text-ink-soft" aria-label="Breadcrumb">
        <Link to="/shop" className="hover:text-clay">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.05fr_1fr]">
        <div className="h-80 rounded-card border border-line bg-panel sm:h-[26rem]">
          <LazyProductViewer
            category={product.category}
            color={color.hex}
            productName={product.name}
          />
        </div>

        <div>
          <div className="flex flex-wrap gap-2">
            {product.price < 25 && <Badge>Under $25</Badge>}
            {product.inDormKit && <Badge tone="clay">Dorm kit pick</Badge>}
          </div>
          <h1 className="font-display mt-3 text-3xl text-ink">{product.name}</h1>
          <p className="mt-2 text-ink-soft">{product.tagline}</p>

          <div className="mt-5">
            <InstallmentPrice product={product} />
          </div>

          <div className="mt-6">
            <p className="text-sm font-semibold text-ink">
              Color: <span className="font-normal text-ink-soft">{color.name}</span>
            </p>
            <div className="mt-2 flex gap-2">
              {product.colors.map((c, i) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setColorIndex(i)}
                  aria-label={c.name}
                  aria-pressed={i === colorIndex}
                  className={`h-9 w-9 rounded-full border-2 transition-transform ${
                    i === colorIndex ? "scale-110 border-clay" : "border-line"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className="mt-7 w-full rounded-pill bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition-opacity hover:opacity-90 sm:w-auto sm:px-10"
          >
            {justAdded ? "Added to cart" : "Add to cart"}
          </button>

          <p className="mt-6 max-w-md text-sm text-ink-soft">{product.description}</p>

          <div className="mt-8 border-t border-line pt-6">
            <p className="text-sm font-semibold text-ink">Specs</p>
            <dl className="mt-3 grid grid-cols-1 gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
              {product.specs.map((spec) => (
                <div key={spec.label} className="flex justify-between gap-4 border-b border-line/70 py-1.5 sm:border-none sm:py-0">
                  <dt className="text-ink-soft">{spec.label}</dt>
                  <dd className="text-right font-medium text-ink">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-6">
            <p className="text-sm font-semibold text-ink">Works with</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.compatibility.map((c) => (
                <span
                  key={c}
                  className="rounded-pill border border-line px-3 py-1 text-xs text-ink-soft"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
