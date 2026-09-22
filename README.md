# Basera

A concept ecommerce storefront for smart-home and hostel/PG essentials,
built for Indian students and young professionals furnishing a first room.
Fourteen products, real product photography, honest specs, and a rotatable
(and room-placeable) 3D preview on the six flagship smart-home devices.

## Why it's different

Big smart-home brands (Apple, Google Nest, Philips Hue, Wyze) sell with
static studio photography and color swatches. None of them ship a true
360° product viewer, let alone one that drops the device into a room.
Basera's flagship product pages render each device as a lightweight,
procedurally-built Three.js model you can drag to rotate, scroll to zoom,
recolor live, and place inside a stylized room — with full keyboard support.

The rest of the catalog (new smart-home add-ons and general hostel
essentials) uses real product photography sourced from Unsplash, matching
an Amazon-style browsing experience: ratings, reviews, wishlist, sort/filter,
"customers also bought," and a full checkout → payment → order-tracking flow.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4 (custom design tokens, no default palette)
- React Three Fiber + drei for the 3D product viewer and room scene
- Zustand (with localStorage persistence) for cart, wishlist, and orders
- React Router for navigation

## Local development

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

```bash
npm run build    # type-checks and builds to dist/
npm run preview  # serves the production build locally
```

## Deployment

The app is a static SPA (`dist/`) and deploys with no extra configuration
on either platform:

**Vercel**
```bash
npm i -g vercel
vercel
```
`vercel.json` includes the SPA rewrite so client-side routes don't 404 on
refresh.

**Netlify**
```bash
npm i -g netlify-cli
netlify deploy --build
```
`netlify.toml` sets the build command, publish directory, and SPA redirect.

Both platforms also support connecting the GitHub repo directly for
auto-deploy on push — no CLI required.

## Project structure

```
src/
  components/   shared UI (header w/ search, footer, product card, ratings, price, wishlist)
  three/        the 3D viewer, room scene, and procedural device models
  pages/        Home, Shop, Product, Bundles, Cart, Checkout, Order
                 confirmation/tracking, Orders, Wishlist, About
  data/         product catalog (typed, static, INR pricing + reviews)
  store/        cart, wishlist, and orders state (Zustand)
```

## Notes

This is a concept storefront demonstrating a 3D-first, Amazon-style
shopping experience for the Indian market. Checkout, payment, and order
tracking are fully simulated client-side — no real payment processing,
and no real data leaves the browser (everything persists to
`localStorage`). Product photography is sourced from Unsplash.
