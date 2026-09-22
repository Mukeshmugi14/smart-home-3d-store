import { lazy, Suspense } from "react"
import type { Has3DCategory } from "./DeviceModel"

const ProductViewer3D = lazy(() => import("./ProductViewer3D"))

interface LazyProductViewerProps {
  category: Has3DCategory
  color: string
  productName: string
}

function ViewerSkeleton() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-card bg-paper-dim">
      <div className="h-24 w-24 animate-pulse rounded-full bg-line" />
      <p className="text-xs text-ink-soft">Loading 3D preview&hellip;</p>
    </div>
  )
}

export default function LazyProductViewer(props: LazyProductViewerProps) {
  return (
    <Suspense fallback={<ViewerSkeleton />}>
      <ProductViewer3D {...props} />
    </Suspense>
  )
}
