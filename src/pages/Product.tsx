import { useState } from "react"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import LazyProductViewer from "../three/LazyProductViewer"
import type { Has3DCategory } from "../three/DeviceModel"
import PriceBlock from "../components/PriceBlock"
import RatingStars from "../components/RatingStars"
import Badge from "../components/Badge"
import WishlistButton from "../components/WishlistButton"
import ProductCard from "../components/ProductCard"
import { getProductBySlug, products } from "../data/products"
import { useCart } from "../store/cart"

type MediaMode = "view3d" | "photo"

export default function Product() {
  const { slug } = useParams<{ slug: string }>()
  const product = slug ? getProductBySlug(slug) : undefined
  const addItem = useCart((s) => s.addItem)
  const navigate = useNavigate()
  const [colorIndex, setColorIndex] = useState(0)
  const [justAdded, setJustAdded] = useState(false)
  const [mediaMode, setMediaMode] = useState<MediaMode>(
    product?.has3D ? "view3d" : "photo",
  )

  if (!product) {
    return <Navigate to="/shop" replace />
  }

  const color = product.colors[colorIndex]
  const related = products
    .filter((p) => p.slug !== product.slug && p.type === product.type)
    .slice(0, 3)

  function handleAddToCart() {
    addItem(product!, color.name)
    setJustAdded(true)
    window.setTimeout(() => setJustAdded(false), 1800)
  }

  function handleBuyNow() {
    addItem(product!, color.name)
    navigate("/checkout")
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <nav className="text-sm text-ink-soft" aria-label="Breadcrumb">
        <Link to="/shop" className="hover:text-clay">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <Link to={`/shop?type=${product.type}`} className="hover:text-clay">
          {product.type === "smart" ? "Smart home" : "Home essentials"}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.05fr_1fr]">
        <div>
          {product.has3D && (
            <div className="mb-3 flex gap-2">
              <button
                type="button"
                onClick={() => setMediaMode("view3d")}
                aria-pressed={mediaMode === "view3d"}
                className={`rounded-pill border px-4 py-1.5 text-sm font-medium transition-colors ${
                  mediaMode === "view3d"
                    ? "border-ink bg-ink text-paper"
                    : "border-line text-ink-soft hover:text-ink"
                }`}
              >
                3D preview
              </button>
              <button
                type="button"
                onClick={() => setMediaMode("photo")}
                aria-pressed={mediaMode === "photo"}
                className={`rounded-pill border px-4 py-1.5 text-sm font-medium transition-colors ${
                  mediaMode === "photo"
                    ? "border-ink bg-ink text-paper"
                    : "border-line text-ink-soft hover:text-ink"
                }`}
              >
                Photo
              </button>
            </div>
          )}
          <div className="h-80 rounded-card border border-line bg-panel sm:h-[26rem]">
            {mediaMode === "view3d" && product.has3D ? (
              <LazyProductViewer
                category={product.category as Has3DCategory}
                color={color.hex}
                productName={product.name}
              />
            ) : (
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full rounded-card object-cover"
              />
            )}
          </div>
        </div>

        <div>
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {product.has3D && <Badge tone="clay">3D preview</Badge>}
              {product.inHostelKit && <Badge>Hostel kit pick</Badge>}
            </div>
            <WishlistButton slug={product.slug} className="border border-line" />
          </div>
          <h1 className="font-display mt-3 text-3xl text-ink">{product.name}</h1>
          <p className="mt-2 text-ink-soft">{product.tagline}</p>
          <div className="mt-2">
            <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="md" />
          </div>

          <div className="mt-5">
            <PriceBlock product={product} />
          </div>

          {product.colors.length > 1 && (
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
          )}

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 rounded-pill border border-ink px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              {justAdded ? "Added to cart" : "Add to cart"}
            </button>
            <button
              type="button"
              onClick={handleBuyNow}
              className="flex-1 rounded-pill bg-clay px-6 py-3.5 text-sm font-semibold text-paper transition-opacity hover:opacity-90"
            >
              Buy now
            </button>
          </div>

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

          {product.compatibility.length > 0 && (
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
          )}
        </div>
      </div>

      <div className="mt-14 border-t border-line pt-10">
        <h2 className="font-display text-2xl text-ink">Customer reviews</h2>
        <div className="mt-2 flex items-center gap-2">
          <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="md" />
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {product.reviews.map((r) => (
            <div key={`${r.name}-${r.date}`} className="rounded-card border border-line bg-panel p-4">
              <RatingStars rating={r.rating} />
              <p className="mt-2 text-sm text-ink">{r.text}</p>
              <p className="mt-3 text-xs text-ink-soft">
                {r.name} &middot; {r.location} &middot; {r.date}
              </p>
            </div>
          ))}
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-14 border-t border-line pt-10">
          <h2 className="font-display text-2xl text-ink">Customers also bought</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
