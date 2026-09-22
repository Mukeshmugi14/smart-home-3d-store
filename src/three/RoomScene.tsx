import DeviceModel from "./DeviceModel"
import type { Has3DCategory } from "./DeviceModel"

interface RoomSceneProps {
  category: Has3DCategory
  color: string
  spinning: boolean
}

const WALL = "#efe6d6"
const FLOOR = "#c9a876"
const WOOD = "#8a6b4a"

// Where the device sits within the room, and how it's scaled, per category.
const PLACEMENT: Record<Has3DCategory, { position: [number, number, number]; scale: number }> = {
  plug: { position: [-1.1, -0.72, -1.55], scale: 0.55 },
  bulb: { position: [0.9, 0.15, -0.9], scale: 0.6 },
  camera: { position: [-1.3, 1.1, -1.7], scale: 0.55 },
  speaker: { position: [0.9, 0.02, -0.9], scale: 0.55 },
  doorbell: { position: [1.7, 0.3, -1.85], scale: 0.6 },
  lock: { position: [1.7, -0.1, -1.85], scale: 0.6 },
}

function Desk() {
  return (
    <group position={[0.9, -0.85, -0.9]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.7, 0.08, 0.9]} />
        <meshStandardMaterial color={WOOD} roughness={0.6} />
      </mesh>
      {[
        [-0.75, -0.4],
        [0.75, -0.4],
        [-0.75, 0.4],
        [0.75, 0.4],
      ].map(([x, z]) => (
        <mesh key={`${x}-${z}`} position={[x, -0.45, z]}>
          <boxGeometry args={[0.06, 0.82, 0.06]} />
          <meshStandardMaterial color={WOOD} roughness={0.6} />
        </mesh>
      ))}
    </group>
  )
}

export default function RoomScene({ category, color, spinning }: RoomSceneProps) {
  const placement = PLACEMENT[category]

  return (
    <group>
      {/* Floor */}
      <mesh receiveShadow rotation-x={-Math.PI / 2} position={[0, -1.3, -0.8]}>
        <planeGeometry args={[6, 5]} />
        <meshStandardMaterial color={FLOOR} roughness={0.8} />
      </mesh>
      {/* Back wall */}
      <mesh receiveShadow position={[0, 0.9, -2]}>
        <planeGeometry args={[6, 4.4]} />
        <meshStandardMaterial color={WALL} roughness={0.95} />
      </mesh>
      {/* Side wall */}
      <mesh receiveShadow rotation-y={Math.PI / 2} position={[-3, 0.9, -0.8]}>
        <planeGeometry args={[4, 4.4]} />
        <meshStandardMaterial color="#e6dcc8" roughness={0.95} />
      </mesh>
      {/* Window glow, purely decorative */}
      <mesh position={[-1.6, 1.1, -1.98]}>
        <planeGeometry args={[1, 1.3]} />
        <meshStandardMaterial color="#fff8e8" emissive="#fff3d6" emissiveIntensity={0.5} />
      </mesh>

      <Desk />

      <group position={placement.position} scale={placement.scale}>
        <DeviceModel category={category} color={color} spinning={spinning} />
      </group>
    </group>
  )
}
