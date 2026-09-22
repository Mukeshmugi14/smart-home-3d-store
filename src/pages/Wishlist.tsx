import { Link } from "react-router-dom"
import { useWishlist } from "../store/wishlist"
import { getProductBySlug } from "../data/products"
import ProductCard from "../components/ProductCard"

export default function Wishlist() {
  const slugs = useWishlist((s) => s.slugs)
  const items = slugs.map(getProductBySlug).filter((p): p is NonNullable<typeof p> => Boolean(p))

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-5 py-20 text-center">
        <h1 className="font-display text-2xl text-ink">Your wishlist is empty</h1>
        <p className="mt-2 text-ink-soft">
          Tap the heart on any product to save it here for later.
        </p>
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
    <div className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="font-display text-3xl text-ink">Your wishlist</h1>
      <p className="mt-2 text-ink-soft">
        {items.length} item{items.length === 1 ? "" : "s"} saved.
      </p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  )
}
