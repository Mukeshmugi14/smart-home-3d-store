interface RatingStarsProps {
  rating: number
  reviewCount?: number
  size?: "sm" | "md"
}

export default function RatingStars({ rating, reviewCount, size = "sm" }: RatingStarsProps) {
  const full = Math.round(rating)
  const dim = size === "sm" ? 13 : 16

  return (
    <div className="flex items-center gap-1.5">
      <div
        className="flex items-center gap-0.5"
        role="img"
        aria-label={`Rated ${rating} out of 5`}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            width={dim}
            height={dim}
            viewBox="0 0 20 20"
            aria-hidden="true"
            fill={i < full ? "#b8532f" : "none"}
            stroke="#b8532f"
            strokeWidth="1.2"
          >
            <path d="M10 1.5l2.6 5.6 6 .7-4.5 4.2 1.2 6-5.3-3-5.3 3 1.2-6L1.4 7.8l6-.7z" />
          </svg>
        ))}
      </div>
      <span className="text-xs font-medium text-ink-soft">{rating.toFixed(1)}</span>
      {reviewCount !== undefined && (
        <span className="text-xs text-ink-soft">({reviewCount.toLocaleString("en-IN")})</span>
      )}
    </div>
  )
}
