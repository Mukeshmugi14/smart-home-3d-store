import { Suspense, useCallback, useEffect, useRef, useState } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import { OrbitControls, ContactShadows } from "@react-three/drei"
import * as THREE from "three"
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib"
import DeviceModel from "./DeviceModel"
import type { Has3DCategory } from "./DeviceModel"
import RoomScene from "./RoomScene"

type ViewMode = "object" | "room"

interface ProductViewer3DProps {
  category: Has3DCategory
  color: string
  productName: string
}

const IDLE_RESUME_MS = 2200

const CAMERA_BY_MODE: Record<ViewMode, { position: [number, number, number]; target: [number, number, number] }> = {
  object: { position: [0, 0.6, 4.2], target: [0, 0, 0] },
  room: { position: [2.6, 0.9, 3.4], target: [0.2, -0.2, -0.8] },
}

function CameraRig({ mode, controlsRef }: { mode: ViewMode; controlsRef: React.RefObject<OrbitControlsImpl | null> }) {
  const { camera } = useThree()
  useEffect(() => {
    const controls = controlsRef.current
    const { position, target } = CAMERA_BY_MODE[mode]
    camera.position.set(...position)
    if (controls) {
      controls.target.set(...target)
      controls.update()
    }
  }, [mode, camera, controlsRef])
  return null
}

export default function ProductViewer3D({
  category,
  color,
  productName,
}: ProductViewer3DProps) {
  const [spinning, setSpinning] = useState(true)
  const [mode, setMode] = useState<ViewMode>("object")
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
      aria-label={`${mode === "room" ? "Room preview" : "Rotatable 3D preview"} of ${productName} in the selected color. Use arrow keys to rotate, plus and minus to zoom.`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="relative h-full w-full outline-none focus-visible:ring-2 focus-visible:ring-clay/60 rounded-card"
    >
      <div className="absolute left-3 top-3 z-10 flex gap-1 rounded-pill bg-panel/90 p-1 backdrop-blur-sm">
        {(["object", "room"] as ViewMode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            aria-pressed={mode === m}
            className={`rounded-pill px-3 py-1 text-xs font-medium transition-colors ${
              mode === m ? "bg-ink text-paper" : "text-ink-soft hover:text-ink"
            }`}
          >
            {m === "object" ? "Product" : "In a room"}
          </button>
        ))}
      </div>
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ position: CAMERA_BY_MODE.object.position, fov: 38 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={[mode === "room" ? "#efe6d6" : "#f6f1e9"]} />
        <ambientLight intensity={0.65} />
        <directionalLight
          position={[3, 4, 3]}
          intensity={1.3}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-3, 2, -2]} intensity={0.35} />
        <Suspense fallback={null}>
          {mode === "room" ? (
            <RoomScene category={category} color={color} spinning={spinning} />
          ) : (
            <>
              <DeviceModel category={category} color={color} spinning={spinning} />
              <ContactShadows
                position={[0, -1.15, 0]}
                opacity={0.35}
                scale={6}
                blur={2.4}
                far={2}
              />
            </>
          )}
        </Suspense>
        <CameraRig mode={mode} controlsRef={controlsRef} />
        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          enableZoom
          minDistance={mode === "room" ? 2.5 : 2.6}
          maxDistance={mode === "room" ? 8 : 6.5}
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
