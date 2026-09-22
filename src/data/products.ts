export type Category = "plug" | "bulb" | "camera" | "speaker" | "doorbell" | "lock"

export interface ColorOption {
  name: string
  hex: string
}

export interface Spec {
  label: string
  value: string
}

export interface Product {
  slug: string
  name: string
  category: Category
  tagline: string
  description: string
  price: number
  installments: number
  colors: ColorOption[]
  specs: Spec[]
  compatibility: string[]
  inDormKit: boolean
}

export const products: Product[] = [
  {
    slug: "loop-plug",
    name: "Loop Plug",
    category: "plug",
    tagline: "Turns any outlet into a scheduled one.",
    description:
      "Loop Plug sits between your lamp, fan, or space heater and the wall, and gives you a schedule and an off switch from your phone. No hub, no subscription — it joins your existing Wi-Fi directly.",
    price: 19,
    installments: 4,
    colors: [
      { name: "Chalk", hex: "#e9e2d3" },
      { name: "Ink", hex: "#2b2723" },
    ],
    specs: [
      { label: "Max load", value: "15A / 1800W" },
      { label: "Connectivity", value: "2.4GHz Wi-Fi, no hub required" },
      { label: "Works with", value: "Alexa, Google Home, Matter" },
      { label: "Standby draw", value: "< 0.5W" },
    ],
    compatibility: ["Alexa", "Google Home", "Matter"],
    inDormKit: true,
  },
  {
    slug: "glow-a19",
    name: "Glow A19",
    category: "bulb",
    tagline: "800 lumens, 16 million colors, sold as a pair.",
    description:
      "A standard E26 bulb that replaces the one already in your lamp. Dims, shifts from warm 2700K to daylight 6500K, or runs full color — set from the app or a voice command, no bridge required.",
    price: 24,
    installments: 4,
    colors: [
      { name: "Warm Glass", hex: "#f2e2b8" },
      { name: "Smoked Glass", hex: "#4a463f" },
    ],
    specs: [
      { label: "Output", value: "800 lumens / 9W" },
      { label: "Base", value: "E26 (standard)" },
      { label: "Color range", value: "2700K–6500K + 16M RGB" },
      { label: "Lifespan", value: "~25,000 hours" },
    ],
    compatibility: ["Alexa", "Google Home", "Apple Home"],
    inDormKit: true,
  },
  {
    slug: "watch-cam-mini",
    name: "Watch Cam Mini",
    category: "camera",
    tagline: "1080p indoor camera with a physical privacy shutter.",
    description:
      "A palm-sized indoor camera with a physical shutter you slide closed by hand — not a software toggle. Records locally to a microSD card, so there's no subscription required to see footage.",
    price: 34,
    installments: 4,
    colors: [
      { name: "Chalk", hex: "#e9e2d3" },
      { name: "Ink", hex: "#2b2723" },
    ],
    specs: [
      { label: "Video", value: "1080p @ 30fps" },
      { label: "Field of view", value: "130° diagonal" },
      { label: "Night vision", value: "Up to 25ft" },
      { label: "Storage", value: "microSD up to 128GB, local only" },
    ],
    compatibility: ["Alexa", "Google Home"],
    inDormKit: true,
  },
  {
    slug: "hearth-speaker",
    name: "Hearth Speaker",
    category: "speaker",
    tagline: "A 15W speaker with voice control, not a subscription.",
    description:
      "Hearth plays music over Bluetooth or Wi-Fi and answers to a wake word for timers, weather, and your smart devices. A physical mute switch cuts the mic power at the hardware level.",
    price: 45,
    installments: 4,
    colors: [
      { name: "Chalk", hex: "#e9e2d3" },
      { name: "Clay", hex: "#b8532f" },
      { name: "Ink", hex: "#2b2723" },
    ],
    specs: [
      { label: "Driver", value: "15W full-range" },
      { label: "Mic array", value: "4-mic far-field" },
      { label: "Connectivity", value: "Bluetooth 5.2 + 2.4GHz Wi-Fi" },
      { label: "Aux input", value: "3.5mm jack" },
    ],
    compatibility: ["Alexa built-in", "Bluetooth"],
    inDormKit: false,
  },
  {
    slug: "porch-bell",
    name: "Porch Bell",
    category: "doorbell",
    tagline: "Battery doorbell that lasts 6 months on a charge.",
    description:
      "Porch Bell mounts with the included bracket and screws — no wiring required. Get a phone alert with live video when someone's at the door, and talk back through two-way audio.",
    price: 39,
    installments: 4,
    colors: [
      { name: "Chalk", hex: "#e9e2d3" },
      { name: "Ink", hex: "#2b2723" },
    ],
    specs: [
      { label: "Video", value: "1080p HD" },
      { label: "Field of view", value: "162° vertical" },
      { label: "Battery", value: "Rechargeable, ~180 days" },
      { label: "Audio", value: "Two-way, with noise cancellation" },
    ],
    compatibility: ["Alexa", "Google Home", "Existing chime"],
    inDormKit: false,
  },
  {
    slug: "latch-pro",
    name: "Latch Pro",
    category: "lock",
    tagline: "Keypad and app entry for your existing deadbolt.",
    description:
      "Latch Pro replaces the interior half of a standard US deadbolt in about fifteen minutes — no drilling. Unlock with a code, the app, or the backup physical key that ships in the box.",
    price: 59,
    installments: 4,
    colors: [
      { name: "Chalk", hex: "#e9e2d3" },
      { name: "Ink", hex: "#2b2723" },
      { name: "Brass", hex: "#b08d57" },
    ],
    specs: [
      { label: "Fit", value: "Standard US deadbolt prep" },
      { label: "Power", value: "4x AA, ~6 months" },
      { label: "Backup entry", value: "Physical key included" },
      { label: "Auto-lock", value: "30 seconds after closing" },
    ],
    compatibility: ["Alexa", "Google Home", "Apple Home"],
    inDormKit: false,
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function installmentPrice(product: Product): string {
  return (product.price / product.installments).toFixed(2)
}

export const dormKitProducts = products.filter((p) => p.inDormKit)
export const dormKitPrice = dormKitProducts.reduce((sum, p) => sum + p.price, 0)
export const dormKitDiscountedPrice = Math.round(dormKitPrice * 0.85)
