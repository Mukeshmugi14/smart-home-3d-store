import type { Product } from "../data/products"
import { installmentPrice } from "../data/products"

export default function InstallmentPrice({ product }: { product: Product }) {
  return (
    <p className="text-sm text-ink-soft">
      <span className="font-semibold text-ink">${product.price}</span>{" "}
      <span aria-hidden="true">&middot;</span> or {product.installments}&times;{" "}
      <span className="whitespace-nowrap">${installmentPrice(product)}</span>
    </p>
  )
}
