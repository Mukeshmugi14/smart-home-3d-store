import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { products, getProductBySlug, type Category } from "../data/products"
import { rooms, getRoomById } from "../data/rooms"

const DEFAULT_SCALE: Partial<Record<Category, number>> = {
  sofa: 58,
  table: 24,
  tvunit: 38,
  floorlamp: 15,
  rug: 48,
  cushion: 13,
  camera: 10,
  speaker: 14,
  doorbell: 9,
  lock: 9,
  bulb: 9,
  plug: 9,
}
const FALLBACK_SCALE = 18

interface Placement {
  x: number // percent, center anchor
  y: number
  scale: number // percent of container width
  flipped: boolean
}

function defaultPlacement(category: Category): Placement {
  return { x: 50, y: 62, scale: DEFAULT_SCALE[category] ?? FALLBACK_SCALE, flipped: false }
}

export default function RoomPreview() {
  const [params, setParams] = useSearchParams()
  const initialSlug = params.get("product") || products[0].slug
  const initialRoomId = params.get("room") || rooms[0].id

  const [productSlug, setProductSlug] = useState(initialSlug)
  const [roomId, setRoomId] = useState(initialRoomId)
  const product = getProductBySlug(productSlug) ?? products[0]
  const room = getRoomById(roomId) ?? rooms[0]

  const [placement, setPlacement] = useState<Placement>(() => defaultPlacement(product.category))
  const containerRef = useRef<HTMLDivElement>(null)
  const dragState = useRef<{ pointerId: number } | null>(null)
  const [exportError, setExportError] = useState<string | null>(null)
  const [exporting, setExporting] = useState(false)

  useEffect(() => {
    setPlacement(defaultPlacement(product.category))
  }, [product.slug, product.category])

  useEffect(() => {
    const next = new URLSearchParams(params)
    next.set("product", productSlug)
    next.set("room", roomId)
    setParams(next, { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productSlug, roomId])

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLImageElement>) => {
    e.preventDefault()
    ;(e.target as HTMLImageElement).setPointerCapture(e.pointerId)
    dragState.current = { pointerId: e.pointerId }
  }, [])

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLImageElement>) => {
    if (!dragState.current || dragState.current.pointerId !== e.pointerId) return
    const container = containerRef.current
    if (!container) return
    const rect = container.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setPlacement((p) => ({
      ...p,
      x: Math.min(96, Math.max(4, x)),
      y: Math.min(97, Math.max(3, y)),
    }))
  }, [])

  const handlePointerUp = useCallback((e: React.PointerEvent<HTMLImageElement>) => {
    dragState.current = null
    try {
      ;(e.target as HTMLImageElement).releasePointerCapture(e.pointerId)
    } catch {
      /* pointer already released */
    }
  }, [])

  async function handleDownload() {
    const container = containerRef.current
    if (!container) return
    setExporting(true)
    setExportError(null)
    try {
      const canvas = document.createElement("canvas")
      canvas.width = room.width
      canvas.height = room.height
      const ctx = canvas.getContext("2d")
      if (!ctx) throw new Error("no canvas context")

      const loadImage = (src: string) =>
        new Promise<HTMLImageElement>((resolve, reject) => {
          const image = new Image()
          image.crossOrigin = "anonymous"
          image.onload = () => resolve(image)
          image.onerror = reject
          image.src = src
        })

      const [roomImg, productImg] = await Promise.all([
        loadImage(room.image),
        loadImage(product.image),
      ])

      ctx.drawImage(roomImg, 0, 0, room.width, room.height)

      const pWidth = (placement.scale / 100) * room.width
      const pHeight = pWidth * (productImg.naturalHeight / productImg.naturalWidth)
      const px = (placement.x / 100) * room.width
      const py = (placement.y / 100) * room.height

      ctx.save()
      ctx.translate(px, py)
      ctx.scale(placement.flipped ? -1 : 1, 1)
      ctx.shadowColor = "rgba(30,25,20,0.35)"
      ctx.shadowBlur = room.width * 0.02
      ctx.shadowOffsetY = room.height * 0.01
      ctx.drawImage(productImg, -pWidth / 2, -pHeight / 2, pWidth, pHeight)
      ctx.restore()

      const dataUrl = canvas.toDataURL("image/png")
      const link = document.createElement("a")
      link.href = dataUrl
      link.download = `basera-room-preview-${product.slug}.png`
      link.click()
    } catch {
      setExportError(
        "Couldn't export this combination as an image (likely a browser CORS restriction) — the live preview above still works, try a screenshot instead.",
      )
    } finally {
      setExporting(false)
    }
  }

  const aspectRatio = useMemo(() => `${room.width} / ${room.height}`, [room])

  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <nav className="text-sm text-ink-soft" aria-label="Breadcrumb">
        <Link to={`/product/${product.slug}`} className="hover:text-clay">
          {product.name}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">Room preview</span>
      </nav>

      <h1 className="font-display mt-3 text-3xl text-ink">See it in a real room</h1>
      <p className="mt-2 max-w-xl text-ink-soft">
        Drag {product.name} into place, resize it to match the room's scale, and
        download the result. Both rooms below are real photos, not renders.
      </p>

      <div className="mt-6 flex flex-wrap gap-4">
        <label className="text-sm text-ink-soft">
          Product
          <select
            value={productSlug}
            onChange={(e) => setProductSlug(e.target.value)}
            className="mt-1 block rounded-md border border-line bg-panel px-3 py-2 text-sm text-ink"
          >
            {products.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name}
              </option>
            ))}
          </select>
        </label>

        <div className="text-sm text-ink-soft">
          Room
          <div className="mt-1 flex gap-2">
            {rooms.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRoomId(r.id)}
                aria-pressed={roomId === r.id}
                className={`rounded-pill border px-3 py-2 text-xs font-medium transition-colors ${
                  roomId === r.id
                    ? "border-ink bg-ink text-paper"
                    : "border-line text-ink-soft hover:text-ink"
                }`}
              >
                {r.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative mt-6 w-full select-none overflow-hidden rounded-card border border-line bg-paper-dim"
        style={{ aspectRatio, touchAction: "none" }}
      >
        <img
          src={room.image}
          alt={room.name}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
        <img
          src={product.image}
          alt={`${product.name} placed in room, draggable`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          draggable={false}
          className="absolute cursor-grab touch-none rounded-sm active:cursor-grabbing"
          style={{
            left: `${placement.x}%`,
            top: `${placement.y}%`,
            width: `${placement.scale}%`,
            transform: `translate(-50%, -50%) scaleX(${placement.flipped ? -1 : 1})`,
            filter: "drop-shadow(0 10px 14px rgba(30,25,20,0.35))",
          }}
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 text-sm text-ink-soft">
          Size
          <input
            type="range"
            min={6}
            max={85}
            value={placement.scale}
            onChange={(e) => setPlacement((p) => ({ ...p, scale: Number(e.target.value) }))}
          />
        </label>
        <button
          type="button"
          onClick={() => setPlacement((p) => ({ ...p, flipped: !p.flipped }))}
          className="rounded-pill border border-line px-4 py-1.5 text-sm font-medium text-ink-soft hover:text-ink"
        >
          Flip
        </button>
        <button
          type="button"
          onClick={() => setPlacement(defaultPlacement(product.category))}
          className="rounded-pill border border-line px-4 py-1.5 text-sm font-medium text-ink-soft hover:text-ink"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={handleDownload}
          disabled={exporting}
          className="ml-auto rounded-pill bg-ink px-5 py-2 text-sm font-semibold text-paper transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {exporting ? "Preparing…" : "Download preview"}
        </button>
      </div>
      {exportError && <p className="mt-2 text-sm text-clay-dark">{exportError}</p>}

      <p className="mt-6 text-xs text-ink-soft">
        This is a drag-to-place photo mockup, not a lighting-matched AR render
        — it composites the real product photo onto the real room photo so you
        can judge scale and placement, not simulate physically accurate shadows.
      </p>
    </div>
  )
}
