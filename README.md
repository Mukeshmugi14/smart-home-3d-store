# Nestly

A concept smart-home ecommerce storefront built for students and young
professionals furnishing a first apartment or dorm room. Six devices, honest
specs, and a rotatable 3D preview on every product page — no studio photo
substitute.

## Why it's different

Big smart-home brands (Apple, Google Nest, Philips Hue, Wyze) sell with
static studio photography and color swatches. None of them ship a true
360° product viewer. Nestly's product pages render each device as a
lightweight, procedurally-built Three.js model you can drag to rotate,
scroll to zoom, and recolor live — with full keyboard support.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4 (custom design tokens, no default palette)
- React Three Fiber + drei for the 3D product viewer
- Zustand (with localStorage persistence) for cart state
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
  components/   shared UI (header, footer, product card, badges)
  three/        the 3D viewer and procedural device models
  pages/        route-level views (Home, Shop, Product, Bundles, Cart, About)
  data/         product catalog (typed, static)
  store/        cart state (Zustand)
```

## Notes

This is a concept storefront demonstrating a 3D-first product browsing
experience. Checkout is not connected to real payment processing.
