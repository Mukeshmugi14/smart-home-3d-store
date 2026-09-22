import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export type Has3DCategory = "plug" | "bulb" | "camera" | "speaker" | "doorbell" | "lock"

interface DeviceModelProps {
  category: Has3DCategory
  color: string
  spinning: boolean
}

const INK = "#2b2723"
const METAL = "#8a8378"

function Plug({ color }: { color: string }) {
  return (
    <group>
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[1.4, 1.9, 0.5]} />
        <meshStandardMaterial color={color} roughness={0.45} metalness={0.05} />
      </mesh>
      {[-0.32, 0.32].map((x) => (
        <mesh key={x} position={[x, 0.15, 0.27]}>
          <boxGeometry args={[0.08, 0.4, 0.06]} />
          <meshStandardMaterial color={INK} roughness={0.6} />
        </mesh>
      ))}
      <mesh position={[0, -0.5, 0.27]}>
        <circleGeometry args={[0.12, 24]} />
        <meshStandardMaterial color={INK} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.75, 0.27]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial
          color="#c1502e"
          emissive="#c1502e"
          emissiveIntensity={0.6}
          roughness={0.3}
        />
      </mesh>
      {[-0.4, 0.4].map((z) => (
        <mesh key={z} position={[0, -1.05, z * 0.6]}>
          <boxGeometry args={[1.4, 0.15, 0.1]} />
          <meshStandardMaterial color={color} roughness={0.45} />
        </mesh>
      ))}
    </group>
  )
}

function Bulb({ color }: { color: string }) {
  return (
    <group position={[0, -0.2, 0]}>
      <mesh castShadow position={[0, 0.75, 0]}>
        <sphereGeometry args={[0.85, 32, 32]} />
        <meshStandardMaterial
          color={color}
          roughness={0.15}
          metalness={0}
          transparent
          opacity={0.92}
          emissive={color}
          emissiveIntensity={0.18}
        />
      </mesh>
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.32, 0.42, 0.35, 24]} />
        <meshStandardMaterial color={color} roughness={0.25} />
      </mesh>
      <mesh position={[0, -0.35, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.3, 24]} />
        <meshStandardMaterial color={METAL} roughness={0.4} metalness={0.7} />
      </mesh>
      <mesh position={[0, -0.58, 0]}>
        <cylinderGeometry args={[0.28, 0.26, 0.18, 24]} />
        <meshStandardMaterial color={METAL} roughness={0.5} metalness={0.6} />
      </mesh>
    </group>
  )
}

function Camera({ color }: { color: string }) {
  return (
    <group>
      <mesh castShadow position={[0, 0.1, 0]}>
        <boxGeometry args={[1.3, 1.1, 1.1]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.1, 0.62]} rotation-x={Math.PI / 2}>
        <cylinderGeometry args={[0.38, 0.38, 0.3, 32]} />
        <meshStandardMaterial color={INK} roughness={0.15} metalness={0.5} />
      </mesh>
      <mesh position={[0, 0.1, 0.78]} rotation-x={Math.PI / 2}>
        <cylinderGeometry args={[0.24, 0.24, 0.08, 32]} />
        <meshStandardMaterial color="#0f0e0c" roughness={0.05} metalness={0.8} />
      </mesh>
      <mesh position={[0, -0.55, 0]}>
        <cylinderGeometry args={[0.12, 0.16, 0.35, 16]} />
        <meshStandardMaterial color={METAL} roughness={0.4} metalness={0.6} />
      </mesh>
      <mesh position={[0, -0.78, 0]}>
        <cylinderGeometry args={[0.3, 0.32, 0.12, 24]} />
        <meshStandardMaterial color={METAL} roughness={0.5} metalness={0.5} />
      </mesh>
    </group>
  )
}

function Speaker({ color }: { color: string }) {
  return (
    <group>
      <mesh castShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[0.75, 0.8, 1.9, 32]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.98, 0]} rotation-x={Math.PI / 2}>
        <torusGeometry args={[0.5, 0.06, 16, 48]} />
        <meshStandardMaterial color={METAL} roughness={0.3} metalness={0.6} />
      </mesh>
      <mesh position={[0, 0.98, 0]}>
        <cylinderGeometry args={[0.14, 0.14, 0.06, 24]} />
        <meshStandardMaterial color={INK} roughness={0.4} />
      </mesh>
      {[0.3, 0, -0.3].map((y) => (
        <mesh key={y} position={[0, y, 0.79]} rotation-x={Math.PI / 2}>
          <torusGeometry args={[0.4, 0.015, 8, 32]} />
          <meshStandardMaterial color={INK} roughness={0.6} />
        </mesh>
      ))}
    </group>
  )
}

function Doorbell({ color }: { color: string }) {
  return (
    <group>
      <mesh castShadow position={[0, 0, 0]}>
        <boxGeometry args={[1.05, 2.1, 0.4]} />
        <meshStandardMaterial color={color} roughness={0.45} />
      </mesh>
      <mesh position={[0, 0.6, 0.22]} rotation-x={Math.PI / 2}>
        <cylinderGeometry args={[0.16, 0.16, 0.1, 24]} />
        <meshStandardMaterial color="#0f0e0c" roughness={0.1} metalness={0.7} />
      </mesh>
      <mesh position={[0, 0, 0.22]}>
        <circleGeometry args={[0.28, 32]} />
        <meshStandardMaterial color={METAL} roughness={0.3} metalness={0.6} />
      </mesh>
      <mesh position={[0, 0, 0.24]}>
        <circleGeometry args={[0.1, 24]} />
        <meshStandardMaterial
          color="#c1502e"
          emissive="#c1502e"
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh position={[0, -0.75, 0.22]}>
        <boxGeometry args={[0.6, 0.35, 0.02]} />
        <meshStandardMaterial color={INK} roughness={0.7} />
      </mesh>
    </group>
  )
}

function Lock({ color }: { color: string }) {
  return (
    <group>
      <mesh castShadow position={[0, 0, 0]}>
        <boxGeometry args={[1.3, 1.3, 0.55]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0, 0.3]} rotation-x={Math.PI / 2}>
        <cylinderGeometry args={[0.32, 0.32, 0.1, 32]} />
        <meshStandardMaterial color={METAL} roughness={0.25} metalness={0.7} />
      </mesh>
      <mesh position={[0.06, 0, 0.36]}>
        <boxGeometry args={[0.32, 0.09, 0.08]} />
        <meshStandardMaterial color={INK} roughness={0.5} />
      </mesh>
      {[0.35, 0, -0.35].map((y) =>
        [0.2, 0, -0.2].map((x) => (
          <mesh key={`${x}-${y}`} position={[x, y - 0.5, 0.28]}>
            <boxGeometry args={[0.12, 0.12, 0.04]} />
            <meshStandardMaterial color={INK} roughness={0.6} />
          </mesh>
        )),
      )}
    </group>
  )
}

const MODEL_BY_CATEGORY: Record<Has3DCategory, React.FC<{ color: string }>> = {
  plug: Plug,
  bulb: Bulb,
  camera: Camera,
  speaker: Speaker,
  doorbell: Doorbell,
  lock: Lock,
}

export default function DeviceModel({ category, color, spinning }: DeviceModelProps) {
  const groupRef = useRef<THREE.Group>(null)
  const Model = MODEL_BY_CATEGORY[category]

  useFrame((_, delta) => {
    if (groupRef.current && spinning) {
      groupRef.current.rotation.y += delta * 0.25
    }
  })

  return (
    <group ref={groupRef}>
      <Model color={color} />
    </group>
  )
}
