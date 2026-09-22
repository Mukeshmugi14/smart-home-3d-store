import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product } from "../data/products"

export interface CartLine {
  product: Product
  colorName: string
  quantity: number
}

interface CartState {
  lines: CartLine[]
  addItem: (product: Product, colorName: string) => void
  removeItem: (slug: string, colorName: string) => void
  setQuantity: (slug: string, colorName: string, quantity: number) => void
  clear: () => void
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      addItem: (product, colorName) =>
        set((state) => {
          const existing = state.lines.find(
            (l) => l.product.slug === product.slug && l.colorName === colorName,
          )
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                l === existing ? { ...l, quantity: l.quantity + 1 } : l,
              ),
            }
          }
          return { lines: [...state.lines, { product, colorName, quantity: 1 }] }
        }),
      removeItem: (slug, colorName) =>
        set((state) => ({
          lines: state.lines.filter(
            (l) => !(l.product.slug === slug && l.colorName === colorName),
          ),
        })),
      setQuantity: (slug, colorName, quantity) =>
        set((state) => ({
          lines: state.lines
            .map((l) =>
              l.product.slug === slug && l.colorName === colorName
                ? { ...l, quantity }
                : l,
            )
            .filter((l) => l.quantity > 0),
        })),
      clear: () => set({ lines: [] }),
    }),
    { name: "basera-cart" },
  ),
)

export function cartTotal(lines: CartLine[]): number {
  return lines.reduce((sum, l) => sum + l.product.price * l.quantity, 0)
}

export function cartCount(lines: CartLine[]): number {
  return lines.reduce((sum, l) => sum + l.quantity, 0)
}
