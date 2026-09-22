import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper-dim">
      <div className="mx-auto max-w-6xl px-5 py-6 text-center text-sm text-ink-soft sm:text-left">
        Free delivery on orders above &#8377;499 &middot; 7-day easy returns &middot; Pay via UPI,
        cards, net banking, or cash on delivery
      </div>
      <div className="mx-auto grid max-w-6xl gap-8 border-t border-line px-5 py-12 sm:grid-cols-3">
        <div>
          <p className="font-display text-xl text-ink">Basera</p>
          <p className="mt-2 max-w-xs text-sm text-ink-soft">
            Smart home and hostel essentials priced for a first apartment or
            PG, not a luxury build. Real specs, real product photos, no
            subscriptions required to use the basics.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">Shop</p>
          <ul className="mt-3 space-y-2 text-sm text-ink-soft">
            <li>
              <Link to="/shop" className="hover:text-clay">
                All products
              </Link>
            </li>
            <li>
              <Link to="/shop?type=smart" className="hover:text-clay">
                Smart home
              </Link>
            </li>
            <li>
              <Link to="/shop?type=home" className="hover:text-clay">
                Home essentials
              </Link>
            </li>
            <li>
              <Link to="/shop?type=furniture" className="hover:text-clay">
                Furniture
              </Link>
            </li>
            <li>
              <Link to="/room-preview" className="hover:text-clay">
                Room preview
              </Link>
            </li>
            <li>
              <Link to="/bundles" className="hover:text-clay">
                Hostel &amp; PG Starter Kit
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">Account</p>
          <ul className="mt-3 space-y-2 text-sm text-ink-soft">
            <li>
              <Link to="/cart" className="hover:text-clay">
                Cart
              </Link>
            </li>
            <li>
              <Link to="/orders" className="hover:text-clay">
                Your orders
              </Link>
            </li>
            <li>
              <Link to="/wishlist" className="hover:text-clay">
                Wishlist
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-clay">
                About Basera
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line px-5 py-5 text-center text-xs text-ink-soft">
        A concept storefront built to demonstrate a 3D-first, Amazon-style
        shopping experience. Not a real store — checkout and tracking are
        simulated. Product photography via Unsplash, video via Pexels.
      </div>
    </footer>
  )
}
