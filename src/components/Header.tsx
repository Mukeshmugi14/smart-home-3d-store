import { useEffect, useState } from "react"
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
import { useCart, cartCount } from "../store/cart"
import { useWishlist } from "../store/wishlist"

const NAV_LINKS = [
  { to: "/shop", label: "Shop" },
  { to: "/bundles", label: "Bundles" },
  { to: "/orders", label: "Orders" },
  { to: "/about", label: "About" },
]

export default function Header() {
  const lines = useCart((s) => s.lines)
  const count = cartCount(lines)
  const wishlistCount = useWishlist((s) => s.slugs.length)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const q = searchValue.trim()
    navigate(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop")
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-4">
        <Link to="/" className="font-display shrink-0 text-2xl tracking-tight text-ink">
          Basera
        </Link>

        <form onSubmit={handleSearch} className="hidden flex-1 sm:block" role="search">
          <label className="sr-only" htmlFor="site-search">
            Search products
          </label>
          <input
            id="site-search"
            type="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search smart plugs, bulbs, lamps..."
            className="w-full rounded-pill border border-line bg-panel px-4 py-2 text-sm text-ink placeholder:text-ink-soft/70 focus:border-clay/60 focus:outline-none"
          />
        </form>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `whitespace-nowrap text-sm font-medium transition-colors ${
                  isActive ? "text-clay" : "text-ink-soft hover:text-ink"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            to="/wishlist"
            aria-label={`Wishlist${wishlistCount > 0 ? `, ${wishlistCount} items` : ""}`}
            className="relative hidden h-9 w-9 items-center justify-center rounded-full border border-line sm:flex"
          >
            <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true">
              <path
                d="M10 17.5s-6.5-4.1-8.6-8.1C.2 6.9 1.3 3.8 4.2 3.1c1.8-.4 3.6.4 4.6 1.9l1.2 1.8 1.2-1.8c1-1.5 2.8-2.3 4.6-1.9 2.9.7 4 3.8 2.8 6.3-2.1 4-8.6 8.1-8.6 8.1z"
                fill="none"
                stroke="#55504a"
                strokeWidth="1.4"
              />
            </svg>
            {wishlistCount > 0 && (
              <span className="absolute -right-1 -top-1 rounded-pill bg-clay px-1.5 py-0.5 text-[10px] font-semibold text-paper">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link
            to="/cart"
            className="relative rounded-pill border border-line px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-clay/60"
          >
            Cart
            {count > 0 && (
              <span className="ml-1.5 rounded-pill bg-clay px-1.5 py-0.5 text-xs font-semibold text-paper">
                {count}
              </span>
            )}
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-md border border-line lg:hidden"
          >
            <span
              className={`h-0.5 w-4 bg-ink transition-transform ${menuOpen ? "translate-y-[3px] rotate-45" : ""}`}
            />
            <span className={`h-0.5 w-4 bg-ink transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <span
              className={`h-0.5 w-4 bg-ink transition-transform ${menuOpen ? "-translate-y-[3px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-nav" aria-label="Primary" className="flex flex-col gap-1 border-t border-line px-5 py-3 lg:hidden">
          <form onSubmit={handleSearch} className="mb-2 sm:hidden" role="search">
            <input
              type="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-pill border border-line bg-panel px-4 py-2 text-sm text-ink"
            />
          </form>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-md px-2 py-2.5 text-sm font-medium ${isActive ? "text-clay" : "text-ink-soft"}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink to="/wishlist" className="rounded-md px-2 py-2.5 text-sm font-medium text-ink-soft">
            Wishlist{wishlistCount > 0 ? ` (${wishlistCount})` : ""}
          </NavLink>
        </nav>
      )}
    </header>
  )
}
