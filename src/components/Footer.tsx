import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper-dim">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-3">
        <div>
          <p className="font-display text-xl text-ink">Nestly</p>
          <p className="mt-2 max-w-xs text-sm text-ink-soft">
            Smart home devices priced and sized for a first apartment, not a
            luxury build. Six devices, real specs, no subscriptions required
            to use the basics.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">Shop</p>
          <ul className="mt-3 space-y-2 text-sm text-ink-soft">
            <li>
              <Link to="/shop" className="hover:text-clay">
                All devices
              </Link>
            </li>
            <li>
              <Link to="/bundles" className="hover:text-clay">
                Dorm Starter Kit
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-clay">
                Cart
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">Company</p>
          <ul className="mt-3 space-y-2 text-sm text-ink-soft">
            <li>
              <Link to="/about" className="hover:text-clay">
                About Nestly
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line px-5 py-5 text-center text-xs text-ink-soft">
        A concept storefront built to demonstrate 3D product previews. Not a
        real store.
      </div>
    </footer>
  )
}
