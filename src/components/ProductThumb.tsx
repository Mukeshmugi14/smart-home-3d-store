import type { Category } from "../data/products"

interface ProductThumbProps {
  category: Category
  color: string
  className?: string
}

/**
 * Flat line-art silhouettes echoing each product's 3D model shape.
 * Used on grid views where a live Three.js canvas per card would be wasteful.
 */
export default function ProductThumb({ category, color, className }: ProductThumbProps) {
  const stroke = "#2b2723"
  const shapes: Record<Category, React.ReactNode> = {
    plug: (
      <g>
        <rect x="34" y="18" width="52" height="68" rx="8" fill={color} stroke={stroke} strokeWidth="2" />
        <rect x="45" y="34" width="6" height="16" rx="2" fill={stroke} />
        <rect x="69" y="34" width="6" height="16" rx="2" fill={stroke} />
        <circle cx="60" cy="66" r="4" fill={stroke} />
      </g>
    ),
    bulb: (
      <g>
        <circle cx="60" cy="46" r="26" fill={color} stroke={stroke} strokeWidth="2" />
        <rect x="49" y="70" width="22" height="12" fill={color} stroke={stroke} strokeWidth="2" />
        <rect x="51" y="82" width="18" height="10" rx="2" fill="#8a8378" stroke={stroke} strokeWidth="2" />
      </g>
    ),
    camera: (
      <g>
        <rect x="28" y="30" width="64" height="46" rx="10" fill={color} stroke={stroke} strokeWidth="2" />
        <circle cx="72" cy="53" r="16" fill="#0f0e0c" />
        <circle cx="72" cy="53" r="9" fill="#2b2723" />
        <rect x="54" y="82" width="12" height="14" fill="#8a8378" stroke={stroke} strokeWidth="2" />
      </g>
    ),
    speaker: (
      <g>
        <rect x="38" y="14" width="44" height="80" rx="20" fill={color} stroke={stroke} strokeWidth="2" />
        <circle cx="60" cy="34" r="9" fill="none" stroke="#8a8378" strokeWidth="3" />
        <line x1="46" y1="60" x2="74" y2="60" stroke={stroke} strokeWidth="1.5" />
        <line x1="46" y1="70" x2="74" y2="70" stroke={stroke} strokeWidth="1.5" />
      </g>
    ),
    doorbell: (
      <g>
        <rect x="42" y="12" width="36" height="72" rx="9" fill={color} stroke={stroke} strokeWidth="2" />
        <circle cx="60" cy="34" r="7" fill="#0f0e0c" />
        <circle cx="60" cy="58" r="12" fill="none" stroke="#8a8378" strokeWidth="3" />
        <circle cx="60" cy="58" r="4" fill="#c1502e" />
      </g>
    ),
    lock: (
      <g>
        <rect x="30" y="26" width="60" height="58" rx="10" fill={color} stroke={stroke} strokeWidth="2" />
        <circle cx="63" cy="42" r="13" fill="none" stroke="#8a8378" strokeWidth="3" />
        <rect x="40" y="62" width="10" height="10" fill={stroke} />
        <rect x="55" y="62" width="10" height="10" fill={stroke} />
        <rect x="70" y="62" width="10" height="10" fill={stroke} />
      </g>
    ),
  }

  return (
    <svg viewBox="0 0 120 110" className={className} role="presentation" aria-hidden="true">
      {shapes[category]}
    </svg>
  )
}
