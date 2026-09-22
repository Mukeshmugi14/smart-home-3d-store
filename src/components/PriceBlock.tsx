import type { Product } from "../data/products"
import { discountPercent, formatINR, installmentPrice } from "../data/products"

export default function PriceBlock({ product }: { product: Product }) {
  const discount = discountPercent(product)
  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-2">
        <span className="text-xl font-semibold text-ink">
          &#8377;{formatINR(product.price)}
        </span>
        {discount > 0 && (
          <>
            <span className="text-sm text-ink-soft line-through">
              &#8377;{formatINR(product.mrp)}
            </span>
            <span className="text-sm font-medium text-moss">{discount}% off</span>
          </>
        )}
      </div>
      <p className="mt-0.5 text-sm text-ink-soft">
        or {product.installments} EMIs of &#8377;{installmentPrice(product)}
      </p>
    </div>
  )
}
