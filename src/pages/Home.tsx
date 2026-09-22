import { useState } from "react"
import { Link } from "react-router-dom"
import LazyProductViewer from "../three/LazyProductViewer"
import ProductCard from "../components/ProductCard"
import Badge from "../components/Badge"
import { products, dormKitPrice, dormKitDiscountedPrice } from "../data/products"

const featured = products.find((p) => p.slug === "hearth-speaker")!

export default function Home() {
  const [color, setColor] = useState(featured.colors[0])

  return (
    <div>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-12 sm:pt-20 lg:grid-cols-[1.1fr_1fr] lg:gap-6">
        <div className="flex flex-col justify-center">
          <Badge tone="clay">Built for first apartments</Badge>
          <h1 className="font-display mt-5 text-4xl leading-[1.05] text-ink sm:text-5xl lg:text-[3.3rem]">
            Smart home, sized for real life —
            <span className="italic text-clay"> not a showroom.</span>
          </h1>
          <p className="mt-5 max-w-md text-ink-soft">
            Six devices, honest specs, and a real 3D preview you can spin
            around before you buy — something the bigger brands still don't
            offer. No hub required, no subscription to use the basics.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/shop"
              className="rounded-pill bg-ink px-6 py-3 text-sm font-semibold text-paper transition-opacity hover:opacity-90"
            >
              Shop devices
            </Link>
            <Link
              to="/bundles"
              className="rounded-pill border border-line px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-clay/60"
            >
              See the Dorm Starter Kit
            </Link>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="h-80 rounded-card border border-line bg-panel sm:h-96">
            <LazyProductViewer
              category={featured.category}
              color={color.hex}
              productName={featured.name}
            />
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-ink">{featured.name}</p>
              <p className="text-xs text-ink-soft">{featured.tagline}</p>
            </div>
            <div className="flex gap-2">
              {featured.colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setColor(c)}
                  aria-label={`View in ${c.name}`}
                  aria-pressed={color.name === c.name}
                  className={`h-7 w-7 rounded-full border-2 transition-transform ${
                    color.name === c.name
                      ? "scale-110 border-clay"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-panel">
        <div className="mx-auto max-w-6xl px-5 py-10">
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <p className="font-display text-2xl text-ink">4 payments</p>
              <p className="mt-1 text-sm text-ink-soft">
                Every device splits into interest-free installments at
                checkout — the price you see is the full price, just spread
                out.
              </p>
            </div>
            <div>
              <p className="font-display text-2xl text-ink">No subscription</p>
              <p className="mt-1 text-sm text-ink-soft">
                The camera and doorbell store locally. Cloud backup is
                optional, never required to use the device.
              </p>
            </div>
            <div>
              <p className="font-display text-2xl text-ink">Fits a rental</p>
              <p className="mt-1 text-sm text-ink-soft">
                Everything installs without drilling or rewiring — plug in,
                stick on, or swap a battery.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-2xl text-ink sm:text-3xl">
            The full lineup
          </h2>
          <Link to="/shop" className="text-sm font-medium text-clay hover:underline">
            View all
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 6).map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="rounded-card bg-moss-tint px-6 py-10 sm:px-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-moss">
                Dorm Starter Kit
              </p>
              <h2 className="font-display mt-2 text-2xl text-ink sm:text-3xl">
                Plug, bulbs, and a camera — one order.
              </h2>
              <p className="mt-2 max-w-md text-sm text-ink-soft">
                The three devices most first-apartment shoppers buy together,
                bundled at 15% off: ${dormKitPrice} becomes ${dormKitDiscountedPrice}.
              </p>
            </div>
            <Link
              to="/bundles"
              className="whitespace-nowrap rounded-pill bg-moss px-6 py-3 text-sm font-semibold text-paper transition-opacity hover:opacity-90"
            >
              See the kit
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
