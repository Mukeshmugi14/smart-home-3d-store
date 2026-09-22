export interface Room {
  id: string
  name: string
  image: string
  width: number
  height: number
}

export const rooms: Room[] = [
  {
    id: "minimal-living-room",
    name: "Minimal Living Room",
    image: "/rooms/minimal-living-room.png",
    width: 495,
    height: 619,
  },
  {
    id: "modern-tv-room",
    name: "Modern TV Room",
    image: "/rooms/modern-tv-room.webp",
    width: 1699,
    height: 957,
  },
]

export function getRoomById(id: string): Room | undefined {
  return rooms.find((r) => r.id === id)
}
