export default function About() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-16">
      <h1 className="font-display text-3xl text-ink sm:text-4xl">
        Why we built Nestly
      </h1>
      <div className="mt-6 space-y-4 text-ink-soft">
        <p>
          Most smart-home sites are built for someone furnishing a whole
          house. Nestly is built for the smaller, more common case: one room,
          one outlet, one budget — a dorm, a first apartment, a shared house.
        </p>
        <p>
          We picked six devices instead of sixty. Each one has a real spec
          sheet on its product page and a 3D model you can rotate and
          recolor before you buy, because a studio photo from one angle
          doesn't tell you what something looks like on your desk.
        </p>
        <p>
          Every price on this site splits into four installments at
          checkout, shown up front — not buried until the last step. No
          device here requires a subscription to use its core function.
        </p>
        <p className="text-sm">
          Nestly is a concept storefront built to demonstrate a 3D-first
          product browsing experience. It is not a real store, and checkout
          is not connected to payment processing.
        </p>
      </div>
    </div>
  )
}
