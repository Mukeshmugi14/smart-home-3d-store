import { useState } from "react"
import { Link } from "react-router-dom"
import LazyProductViewer from "../three/LazyProductViewer"
import type { Has3DCategory } from "../three/DeviceModel"
import ProductCard from "../components/ProductCard"
import Badge from "../components/Badge"
import { products, hostelKitPrice, hostelKitMrp, formatINR } from "../data/products"

const featured = products.find((p) => p.slug === "hearth-speaker")!
const roomPreviewFeatured = products.find((p) => p.slug === "haven-modular-sofa")!
const smartProducts = products.filter((p) => p.type === "smart").slice(0, 6)
const homeProducts = products.filter((p) => p.type === "home")
const furnitureProducts = products.filter((p) => p.type === "furniture")

export default function Home() {
  const [color, setColor] = useState(featured.colors[0])

  return (
    <div>
      <div className="bg-ink py-2 text-center text-xs font-medium text-paper">
        Free delivery on orders above &#8377;499 &middot; Pay via UPI, cards, or Cash on Delivery
      </div>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-10 sm:pt-16 lg:grid-cols-[1.1fr_1fr] lg:gap-6">
        <div className="flex flex-col justify-center">
          <Badge tone="clay">Built for hostels &amp; first apartments</Badge>
          <h1 className="font-display mt-5 text-4xl leading-[1.05] text-ink sm:text-5xl lg:text-[3.3rem]">
            Smart home, sized for real life —
            <span className="italic text-clay"> not a showroom.</span>
          </h1>
          <p className="mt-5 max-w-md text-ink-soft">
            Twenty products across smart home, hostel essentials, and
            furniture — honest specs, real photography, and a room preview
            you can drag any piece into before you buy. No hub required, no
            subscription to use the basics.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/shop"
              className="rounded-pill bg-ink px-6 py-3 text-sm font-semibold text-paper transition-opacity hover:opacity-90"
            >
              Shop all products
            </Link>
            <Link
              to="/bundles"
              className="rounded-pill border border-line px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-clay/60"
            >
              See the Hostel &amp; PG Kit
            </Link>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="h-80 rounded-card border border-line bg-panel sm:h-96">
            <LazyProductViewer
              category={featured.category as Has3DCategory}
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
              <p className="font-display text-2xl text-ink">3 EMIs</p>
              <p className="mt-1 text-sm text-ink-soft">
                Every product splits into interest-free EMIs at checkout — the
                price you see is the full price, just spread out.
              </p>
            </div>
            <div>
              <p className="font-display text-2xl text-ink">UPI, cards or COD</p>
              <p className="mt-1 text-sm text-ink-soft">
                Pay however you trust — UPI, debit/credit card, net banking,
                or cash on delivery.
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
        <div className="grid items-center gap-8 rounded-card border border-line bg-panel p-6 sm:p-8 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Badge>New</Badge>
            <h2 className="font-display mt-3 text-2xl text-ink sm:text-3xl">
              See it in a real room, not a render.
            </h2>
            <p className="mt-3 max-w-md text-ink-soft">
              Drag any product onto a real room photo, resize it to scale, and
              download the result — no toy 3D models, just real photography
              composited the way you'd actually judge fit and look.
            </p>
            <Link
              to={`/room-preview?product=${roomPreviewFeatured.slug}`}
              className="mt-5 inline-block rounded-pill bg-ink px-6 py-3 text-sm font-semibold text-paper transition-opacity hover:opacity-90"
            >
              Try the room preview
            </Link>
          </div>
          <div className="overflow-hidden rounded-card border border-line">
            <img
              src="/rooms/minimal-living-room.png"
              alt="A real living room photo used as a room preview background"
              className="h-64 w-full object-cover sm:h-80"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl text-ink sm:text-3xl">
              Smart home
            </h2>
            <p className="mt-1 text-sm text-ink-soft">
              The originals have a full 3D preview — drag, zoom, and drop into a room.
            </p>
          </div>
          <Link to="/shop?type=smart" className="text-sm font-medium text-clay hover:underline">
            View all
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {smartProducts.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl text-ink sm:text-3xl">
              Home essentials
            </h2>
            <p className="mt-1 text-sm text-ink-soft">
              The non-smart basics every hostel or PG room still needs.
            </p>
          </div>
          <Link to="/shop?type=home" className="text-sm font-medium text-clay hover:underline">
            View all
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {homeProducts.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl text-ink sm:text-3xl">
              Furniture
            </h2>
            <p className="mt-1 text-sm text-ink-soft">
              For the first apartment, not the hostel room — preview any piece in a real room before you buy.
            </p>
          </div>
          <Link to="/shop?type=furniture" className="text-sm font-medium text-clay hover:underline">
            View all
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {furnitureProducts.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="rounded-card bg-moss-tint px-6 py-10 sm:px-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-moss">
                Hostel &amp; PG Starter Kit
              </p>
              <h2 className="font-display mt-2 text-2xl text-ink sm:text-3xl">
                Plug, bulbs, and a camera — one order.
              </h2>
              <p className="mt-2 max-w-md text-sm text-ink-soft">
                The three devices most first-year students buy together,
                bundled at 15% off: &#8377;{formatINR(hostelKitMrp)} becomes &#8377;{formatINR(hostelKitPrice)}.
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
