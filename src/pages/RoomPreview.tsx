import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import LazyProductViewer from "../three/LazyProductViewer"
import type { Has3DCategory } from "../three/DeviceModel"
import { products, getProductBySlug } from "../data/products"

const room3DProducts = products.filter((p) => p.has3D)

export default function RoomPreview() {
  const [params, setParams] = useSearchParams()
  const initialSlug = params.get("product") || room3DProducts[0].slug
  const [productSlug, setProductSlug] = useState(
    getProductBySlug(initialSlug)?.has3D ? initialSlug : room3DProducts[0].slug,
  )
  const product = getProductBySlug(productSlug) ?? room3DProducts[0]
  const [colorIndex, setColorIndex] = useState(0)
  const color = product.colors[colorIndex] ?? product.colors[0]

  function handleProductChange(slug: string) {
    setProductSlug(slug)
    setColorIndex(0)
    const next = new URLSearchParams(params)
    next.set("product", slug)
    setParams(next, { replace: true })
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <nav className="text-sm text-ink-soft" aria-label="Breadcrumb">
        <Link to={`/product/${product.slug}`} className="hover:text-clay">
          {product.name}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">Room preview</span>
      </nav>

      <h1 className="font-display mt-3 text-3xl text-ink">See it in a room</h1>
      <p className="mt-2 max-w-xl text-ink-soft">
        A real 3D model of {product.name}, placed in a stylized room — drag to
        orbit, scroll to zoom, recolor live, and download a still of the
        result. This is a rendered 3D scene, not a flat photo cutout.
      </p>

      <div className="mt-6 flex flex-wrap items-end gap-4">
        <label className="text-sm text-ink-soft">
          Product
          <select
            value={productSlug}
            onChange={(e) => handleProductChange(e.target.value)}
            className="mt-1 block rounded-md border border-line bg-panel px-3 py-2 text-sm text-ink"
          >
            {room3DProducts.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name}
              </option>
            ))}
          </select>
        </label>

        {product.colors.length > 1 && (
          <div>
            <p className="text-sm text-ink-soft">Color</p>
            <div className="mt-1 flex gap-2">
              {product.colors.map((c, i) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setColorIndex(i)}
                  aria-label={c.name}
                  aria-pressed={i === colorIndex}
                  className={`h-8 w-8 rounded-full border-2 transition-transform ${
                    i === colorIndex ? "scale-110 border-clay" : "border-line"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 h-96 rounded-card border border-line bg-panel sm:h-[28rem]">
        <LazyProductViewer
          category={product.category as Has3DCategory}
          color={color.hex}
          productName={product.name}
          defaultMode="room"
        />
      </div>

      <p className="mt-4 text-xs text-ink-soft">
        Every device and furniture piece here is built as a real, rotatable
        3D model — none of this page is a photo composite.
      </p>
    </div>
  )
}
