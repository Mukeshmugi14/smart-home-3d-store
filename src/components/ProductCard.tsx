import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import type { Product } from "../data/products"
import PriceBlock from "./PriceBlock"
import RatingStars from "./RatingStars"
import Badge from "./Badge"
import WishlistButton from "./WishlistButton"

export default function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group relative rounded-card border border-line bg-panel p-4 transition-colors hover:border-clay/50 hover:shadow-lg hover:shadow-ink/5"
    >
      <WishlistButton slug={product.slug} className="absolute right-3 top-3 z-10" />
      <Link to={`/product/${product.slug}`} className="block">
        <div className="flex flex-wrap gap-1.5 pr-8">
          {product.has3D && <Badge tone="clay">3D preview</Badge>}
          {product.inHostelKit && <Badge>Hostel kit pick</Badge>}
        </div>
        <div className="my-3 aspect-square overflow-hidden rounded-md bg-paper-dim">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <h3 className="font-display text-lg text-ink">{product.name}</h3>
        <p className="mt-0.5 text-sm text-ink-soft">{product.tagline}</p>
        <div className="mt-2">
          <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
        </div>
        <div className="mt-3">
          <PriceBlock product={product} />
        </div>
      </Link>
    </motion.div>
  )
}
