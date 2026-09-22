import { useWishlist } from "../store/wishlist"

interface WishlistButtonProps {
  slug: string
  className?: string
}

export default function WishlistButton({ slug, className = "" }: WishlistButtonProps) {
  const active = useWishlist((s) => s.has(slug))
  const toggle = useWishlist((s) => s.toggle)

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggle(slug)
      }}
      aria-pressed={active}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      className={`flex h-8 w-8 items-center justify-center rounded-full bg-panel/90 backdrop-blur-sm transition-colors hover:bg-panel ${className}`}
    >
      <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true">
        <path
          d="M10 17.5s-6.5-4.1-8.6-8.1C.2 6.9 1.3 3.8 4.2 3.1c1.8-.4 3.6.4 4.6 1.9l1.2 1.8 1.2-1.8c1-1.5 2.8-2.3 4.6-1.9 2.9.7 4 3.8 2.8 6.3-2.1 4-8.6 8.1-8.6 8.1z"
          fill={active ? "#b8532f" : "none"}
          stroke={active ? "#b8532f" : "#55504a"}
          strokeWidth="1.4"
        />
      </svg>
    </button>
  )
}
