import { Link } from "react-router-dom"
import type { Product } from "../data/products"
import ProductThumb from "./ProductThumb"
import InstallmentPrice from "./InstallmentPrice"
import Badge from "./Badge"

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/product/${product.slug}`}
      className="group block rounded-card border border-line bg-panel p-5 transition-colors hover:border-clay/50"
    >
      <div className="flex items-center justify-between">
        {product.price < 25 && <Badge>Under $25</Badge>}
        {product.inDormKit && (
          <Badge tone="clay">Dorm kit pick</Badge>
        )}
      </div>
      <div className="mx-auto my-4 h-32 w-32">
        <ProductThumb
          category={product.category}
          color={product.colors[0].hex}
          className="h-full w-full transition-transform duration-300 group-hover:-translate-y-1"
        />
      </div>
      <h3 className="font-display text-lg text-ink">{product.name}</h3>
      <p className="mt-1 text-sm text-ink-soft">{product.tagline}</p>
      <div className="mt-3">
        <InstallmentPrice product={product} />
      </div>
    </Link>
  )
}
