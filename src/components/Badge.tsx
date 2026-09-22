interface BadgeProps {
  tone?: "clay" | "moss"
  children: React.ReactNode
}

export default function Badge({ tone = "moss", children }: BadgeProps) {
  const toneClasses =
    tone === "clay"
      ? "bg-clay-tint text-clay-dark"
      : "bg-moss-tint text-moss"
  return (
    <span
      className={`inline-flex items-center rounded-pill px-2.5 py-1 text-xs font-medium ${toneClasses}`}
    >
      {children}
    </span>
  )
}
