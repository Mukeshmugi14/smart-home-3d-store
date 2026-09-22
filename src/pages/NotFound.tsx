import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-5 py-24 text-center">
      <p className="font-display text-6xl text-clay">404</p>
      <h1 className="font-display mt-3 text-2xl text-ink">
        This one's not in the catalog
      </h1>
      <p className="mt-2 text-ink-soft">
        The page you're looking for doesn't exist, or the link's out of date.
      </p>
      <Link
        to="/"
        className="mt-6 rounded-pill bg-ink px-6 py-3 text-sm font-semibold text-paper hover:opacity-90"
      >
        Back to Nestly
      </Link>
    </div>
  )
}
