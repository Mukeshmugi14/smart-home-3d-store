import { Suspense, useCallback, useRef, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, ContactShadows } from "@react-three/drei"
import * as THREE from "three"
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib"
import DeviceModel from "./DeviceModel"
import type { Category } from "../data/products"

interface ProductViewer3DProps {
  category: Category
  color: string
  productName: string
}

const IDLE_RESUME_MS = 2200

export default function ProductViewer3D({
  category,
  color,
  productName,
}: ProductViewer3DProps) {
  const [spinning, setSpinning] = useState(true)
  const controlsRef = useRef<OrbitControlsImpl | null>(null)
  const resumeTimer = useRef<number | undefined>(undefined)

  const pauseThenResume = useCallback(() => {
    setSpinning(false)
    window.clearTimeout(resumeTimer.current)
    resumeTimer.current = window.setTimeout(() => setSpinning(true), IDLE_RESUME_MS)
  }, [])

  const rotateCamera = useCallback((azimuthDelta: number, polarDelta: number) => {
    const controls = controlsRef.current
    if (!controls) return
    const camera = controls.object
    const target = controls.target
    const offset = new THREE.Vector3().copy(camera.position).sub(target)
    const spherical = new THREE.Spherical().setFromVector3(offset)
    spherical.theta += azimuthDelta
    spherical.phi = THREE.MathUtils.clamp(spherical.phi + polarDelta, 0.35, Math.PI - 0.35)
    offset.setFromSpherical(spherical)
    camera.position.copy(target).add(offset)
    camera.lookAt(target)
    controls.update()
  }, [])

  const zoomCamera = useCallback((factor: number) => {
    const controls = controlsRef.current
    if (!controls) return
    const camera = controls.object
    const target = controls.target
    const offset = new THREE.Vector3().copy(camera.position).sub(target)
    const distance = THREE.MathUtils.clamp(
      offset.length() * factor,
      controls.minDistance,
      controls.maxDistance,
    )
    offset.setLength(distance)
    camera.position.copy(target).add(offset)
    controls.update()
  }, [])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault()
          pauseThenResume()
          rotateCamera(-0.15, 0)
          break
        case "ArrowRight":
          event.preventDefault()
          pauseThenResume()
          rotateCamera(0.15, 0)
          break
        case "ArrowUp":
          event.preventDefault()
          pauseThenResume()
          rotateCamera(0, -0.1)
          break
        case "ArrowDown":
          event.preventDefault()
          pauseThenResume()
          rotateCamera(0, 0.1)
          break
        case "+":
        case "=":
          event.preventDefault()
          pauseThenResume()
          zoomCamera(0.9)
          break
        case "-":
        case "_":
          event.preventDefault()
          pauseThenResume()
          zoomCamera(1.1)
          break
      }
    },
    [pauseThenResume, rotateCamera, zoomCamera],
  )

  return (
    <div
      role="img"
      aria-label={`Rotatable 3D preview of ${productName} in the selected color. Use arrow keys to rotate, plus and minus to zoom.`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="relative h-full w-full outline-none focus-visible:ring-2 focus-visible:ring-clay/60 rounded-card"
    >
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.6, 4.2], fov: 38 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={["#f6f1e9"]} />
        <ambientLight intensity={0.65} />
        <directionalLight
          position={[3, 4, 3]}
          intensity={1.3}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-3, 2, -2]} intensity={0.35} />
        <Suspense fallback={null}>
          <DeviceModel category={category} color={color} spinning={spinning} />
          <ContactShadows
            position={[0, -1.15, 0]}
            opacity={0.35}
            scale={6}
            blur={2.4}
            far={2}
          />
        </Suspense>
        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          enableZoom
          minDistance={2.6}
          maxDistance={6.5}
          minPolarAngle={0.35}
          maxPolarAngle={Math.PI - 0.35}
          enableDamping
          dampingFactor={0.12}
          onStart={pauseThenResume}
        />
      </Canvas>
      <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-ink-soft/70 font-body">
        Drag to rotate &middot; scroll to zoom
      </p>
    </div>
  )
}
