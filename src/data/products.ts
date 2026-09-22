export type ProductType = "smart" | "home" | "furniture"

export type Category =
  | "plug"
  | "bulb"
  | "camera"
  | "speaker"
  | "doorbell"
  | "lock"
  | "remote"
  | "heater"
  | "powerstrip"
  | "regulator"
  | "lamp"
  | "organizer"
  | "extension"
  | "bedding"
  | "sofa"
  | "table"
  | "tvunit"
  | "floorlamp"
  | "rug"
  | "cushion"

export interface ColorOption {
  name: string
  hex: string
}

export interface Spec {
  label: string
  value: string
}

export interface Review {
  name: string
  location: string
  rating: number
  text: string
  date: string
}

export interface Product {
  slug: string
  name: string
  type: ProductType
  category: Category
  has3D: boolean
  tagline: string
  description: string
  price: number
  mrp: number
  installments: number
  rating: number
  reviewCount: number
  colors: ColorOption[]
  image: string
  specs: Spec[]
  compatibility: string[]
  inHostelKit: boolean
  reviews: Review[]
}

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=900&q=80&auto=format&fit=crop`

export const products: Product[] = [
  {
    slug: "loop-plug",
    name: "Loop Plug",
    type: "smart",
    category: "plug",
    has3D: true,
    tagline: "Turns any outlet into a scheduled one.",
    description:
      "Loop Plug sits between your lamp, fan, or study light and the wall, and gives you a schedule and an off switch from your phone. No hub, no subscription — it joins your existing Wi-Fi directly.",
    price: 499,
    mrp: 799,
    installments: 3,
    rating: 4.3,
    reviewCount: 612,
    colors: [
      { name: "Chalk", hex: "#e9e2d3" },
      { name: "Ink", hex: "#2b2723" },
    ],
    image: img("1565049981953-379c9c2a5d48"),
    specs: [
      { label: "Max load", value: "10A / 2200W" },
      { label: "Connectivity", value: "2.4GHz Wi-Fi, no hub required" },
      { label: "Works with", value: "Alexa, Google Home, Matter" },
      { label: "Standby draw", value: "< 0.5W" },
    ],
    compatibility: ["Alexa", "Google Home", "Matter"],
    inHostelKit: true,
    reviews: [
      {
        name: "Priya S.",
        location: "Bengaluru",
        rating: 5,
        text: "Set a schedule for my study lamp so it switches off by 1am automatically. Setup took under 5 minutes on hostel wifi.",
        date: "3 weeks ago",
      },
      {
        name: "Arjun M.",
        location: "Pune",
        rating: 4,
        text: "Works well with Google Home. Wish the app remembered my last schedule after a power cut, but otherwise solid.",
        date: "1 month ago",
      },
    ],
  },
  {
    slug: "glow-a19",
    name: "Glow A19",
    type: "smart",
    category: "bulb",
    has3D: true,
    tagline: "800 lumens, 16 million colors, sold as a pair.",
    description:
      "A standard B22 bulb that replaces the one already in your lamp. Dims, shifts from warm 2700K to daylight 6500K, or runs full color — set from the app or a voice command, no bridge required.",
    price: 649,
    mrp: 999,
    installments: 3,
    rating: 4.5,
    reviewCount: 1204,
    colors: [
      { name: "Warm Glass", hex: "#f2e2b8" },
      { name: "Smoked Glass", hex: "#4a463f" },
    ],
    image: img("1532007271951-c487760934ae"),
    specs: [
      { label: "Output", value: "800 lumens / 9W" },
      { label: "Base", value: "B22 (standard Indian fitting)" },
      { label: "Color range", value: "2700K–6500K + 16M RGB" },
      { label: "Lifespan", value: "~25,000 hours" },
    ],
    compatibility: ["Alexa", "Google Home", "Apple Home"],
    inHostelKit: true,
    reviews: [
      {
        name: "Neha R.",
        location: "Hyderabad",
        rating: 5,
        text: "Bought this for my PG room, changes the whole mood of the room. Warm white for studying, RGB for weekends.",
        date: "2 weeks ago",
      },
      {
        name: "Karthik V.",
        location: "Chennai",
        rating: 4,
        text: "Good brightness for the price. App had one update hiccup but support fixed it over chat.",
        date: "6 weeks ago",
      },
    ],
  },
  {
    slug: "watch-cam-mini",
    name: "Watch Cam Mini",
    type: "smart",
    category: "camera",
    has3D: true,
    tagline: "1080p indoor camera with a physical privacy shutter.",
    description:
      "A palm-sized indoor camera with a physical shutter you slide closed by hand — not a software toggle. Records locally to a microSD card, so there's no subscription required to see footage.",
    price: 1399,
    mrp: 1999,
    installments: 3,
    rating: 4.2,
    reviewCount: 388,
    colors: [
      { name: "Chalk", hex: "#e9e2d3" },
      { name: "Ink", hex: "#2b2723" },
    ],
    image: img("1549109926-58f039549485"),
    specs: [
      { label: "Video", value: "1080p @ 30fps" },
      { label: "Field of view", value: "130° diagonal" },
      { label: "Night vision", value: "Up to 25ft" },
      { label: "Storage", value: "microSD up to 128GB, local only" },
    ],
    compatibility: ["Alexa", "Google Home"],
    inHostelKit: true,
    reviews: [
      {
        name: "Sanjana K.",
        location: "Mumbai",
        rating: 4,
        text: "Keeps an eye on my room when I'm at class. Night vision is genuinely usable, not just a marketing line.",
        date: "1 month ago",
      },
      {
        name: "Rohit D.",
        location: "Delhi",
        rating: 4,
        text: "Local storage only is exactly why I bought it — no monthly cloud fee. Wish app had a widget.",
        date: "2 months ago",
      },
    ],
  },
  {
    slug: "hearth-speaker",
    name: "Hearth Speaker",
    type: "smart",
    category: "speaker",
    has3D: true,
    tagline: "A 15W speaker with voice control, not a subscription.",
    description:
      "Hearth plays music over Bluetooth or Wi-Fi and answers to a wake word for timers, weather, and your smart devices. A physical mute switch cuts the mic power at the hardware level.",
    price: 1799,
    mrp: 2499,
    installments: 3,
    rating: 4.4,
    reviewCount: 940,
    colors: [
      { name: "Chalk", hex: "#e9e2d3" },
      { name: "Clay", hex: "#b8532f" },
      { name: "Ink", hex: "#2b2723" },
    ],
    image: img("1529359744902-86b2ab9edaea"),
    specs: [
      { label: "Driver", value: "15W full-range" },
      { label: "Mic array", value: "4-mic far-field" },
      { label: "Connectivity", value: "Bluetooth 5.2 + 2.4GHz Wi-Fi" },
      { label: "Aux input", value: "3.5mm jack" },
    ],
    compatibility: ["Alexa built-in", "Bluetooth"],
    inHostelKit: false,
    reviews: [
      {
        name: "Ishaan P.",
        location: "Bengaluru",
        rating: 5,
        text: "Loud enough to fill a small room without distorting. The physical mute switch is a nice touch for privacy.",
        date: "3 weeks ago",
      },
      {
        name: "Meera J.",
        location: "Kolkata",
        rating: 4,
        text: "Great sound for the price. Bluetooth pairing with two phones at once would be a nice add.",
        date: "5 weeks ago",
      },
    ],
  },
  {
    slug: "porch-bell",
    name: "Porch Bell",
    type: "smart",
    category: "doorbell",
    has3D: true,
    tagline: "Battery doorbell that lasts 6 months on a charge.",
    description:
      "Porch Bell mounts with the included bracket and screws — no wiring required. Get a phone alert with live video when someone's at the door, and talk back through two-way audio.",
    price: 2199,
    mrp: 2999,
    installments: 3,
    rating: 4.1,
    reviewCount: 276,
    colors: [
      { name: "Chalk", hex: "#e9e2d3" },
      { name: "Ink", hex: "#2b2723" },
    ],
    image: img("1641853256879-bd786e77d852"),
    specs: [
      { label: "Video", value: "1080p HD" },
      { label: "Field of view", value: "162° vertical" },
      { label: "Battery", value: "Rechargeable, ~180 days" },
      { label: "Audio", value: "Two-way, with noise cancellation" },
    ],
    compatibility: ["Alexa", "Google Home", "Existing chime"],
    inHostelKit: false,
    reviews: [
      {
        name: "Farhan A.",
        location: "Lucknow",
        rating: 4,
        text: "Installed on our PG's main door with the landlord's okay. Alerts are quick, video is clear even at night.",
        date: "1 month ago",
      },
      {
        name: "Divya T.",
        location: "Ahmedabad",
        rating: 4,
        text: "Battery easily lasts the 6 months claimed. Talk-back audio is a little quiet outdoors.",
        date: "2 months ago",
      },
    ],
  },
  {
    slug: "latch-pro",
    name: "Latch Pro",
    type: "smart",
    category: "lock",
    has3D: true,
    tagline: "Keypad and app entry for your existing deadbolt.",
    description:
      "Latch Pro replaces the interior half of a standard deadbolt in about fifteen minutes — no drilling. Unlock with a code, the app, or the backup physical key that ships in the box.",
    price: 2999,
    mrp: 3999,
    installments: 3,
    rating: 4.0,
    reviewCount: 164,
    colors: [
      { name: "Chalk", hex: "#e9e2d3" },
      { name: "Ink", hex: "#2b2723" },
      { name: "Brass", hex: "#b08d57" },
    ],
    image: img("1558002038-1055907df827"),
    specs: [
      { label: "Fit", value: "Standard deadbolt prep" },
      { label: "Power", value: "4x AA, ~6 months" },
      { label: "Backup entry", value: "Physical key included" },
      { label: "Auto-lock", value: "30 seconds after closing" },
    ],
    compatibility: ["Alexa", "Google Home", "Apple Home"],
    inHostelKit: false,
    reviews: [
      {
        name: "Vikram S.",
        location: "Gurugram",
        rating: 4,
        text: "Fit our existing deadbolt exactly as described. Auto-lock gives real peace of mind in a shared flat.",
        date: "1 month ago",
      },
      {
        name: "Ananya B.",
        location: "Chandigarh",
        rating: 4,
        text: "Setup video was clear. Only issue is the keypad backlight is a bit dim at night.",
        date: "3 months ago",
      },
    ],
  },
  {
    slug: "command-hub",
    name: "Command Hub",
    type: "smart",
    category: "remote",
    has3D: false,
    tagline: "One app to control your fan, AC, and TV.",
    description:
      "Most hostel and PG rooms already have a fan, AC, and TV that aren't 'smart' — Command Hub sits on a shelf and relays infrared signals to all three from a single app, so you don't need three remotes or a landlord's permission to rewire anything.",
    price: 999,
    mrp: 1499,
    installments: 3,
    rating: 4.2,
    reviewCount: 521,
    colors: [
      { name: "Chalk", hex: "#e9e2d3" },
      { name: "Ink", hex: "#2b2723" },
    ],
    image: img("1727542908413-58ecbe34cdae"),
    specs: [
      { label: "Range", value: "360° IR, up to 8m" },
      { label: "Devices", value: "Fan, AC, TV, set-top box" },
      { label: "Connectivity", value: "2.4GHz Wi-Fi" },
      { label: "Power", value: "USB-powered (cable included)" },
    ],
    compatibility: ["Alexa", "Google Home"],
    inHostelKit: false,
    reviews: [
      {
        name: "Abhishek N.",
        location: "Indore",
        rating: 4,
        text: "Learned our old ceiling fan remote's codes in seconds. Now I can turn the AC off from bed without hunting for the remote.",
        date: "3 weeks ago",
      },
      {
        name: "Fatima Z.",
        location: "Hyderabad",
        rating: 5,
        text: "Three remotes replaced with one app. Wish I'd bought this in my first year of hostel, not my last.",
        date: "7 weeks ago",
      },
    ],
  },
  {
    slug: "geyser-guard",
    name: "Geyser Guard",
    type: "smart",
    category: "heater",
    has3D: false,
    tagline: "Schedule your water heater, stop paying to heat an empty tank.",
    description:
      "Geyser Guard is a smart switch built for the high load of an Indian water heater. Set it to warm up 20 minutes before your usual bath time and shut off automatically — safer than leaving a geyser on all evening.",
    price: 899,
    mrp: 1299,
    installments: 3,
    rating: 4.3,
    reviewCount: 302,
    colors: [
      { name: "Chalk", hex: "#e9e2d3" },
    ],
    image: img("1662460149588-a5048ec502a3"),
    specs: [
      { label: "Max load", value: "16A / 3500W" },
      { label: "Connectivity", value: "2.4GHz Wi-Fi" },
      { label: "Safety", value: "Auto shut-off timer, overload protection" },
      { label: "Install", value: "Fits standard geyser switchboard point" },
    ],
    compatibility: ["Alexa", "Google Home"],
    inHostelKit: false,
    reviews: [
      {
        name: "Lakshmi P.",
        location: "Coimbatore",
        rating: 5,
        text: "Electricity bill actually dropped once I stopped forgetting to switch the geyser off. Scheduling from the app is simple.",
        date: "1 month ago",
      },
      {
        name: "Rahul G.",
        location: "Nagpur",
        rating: 4,
        text: "Handles our 3kW geyser without tripping anything. Installation needs a bit of basic wiring knowledge.",
        date: "2 months ago",
      },
    ],
  },
  {
    slug: "multi-plug-guard",
    name: "Multi Plug Guard",
    type: "smart",
    category: "powerstrip",
    has3D: false,
    tagline: "4 app-controlled sockets with surge protection.",
    description:
      "A power strip built for a desk with too few sockets: four individually app-controlled outlets plus two USB ports, with surge protection rated for Indian voltage fluctuations.",
    price: 1199,
    mrp: 1599,
    installments: 3,
    rating: 4.4,
    reviewCount: 447,
    colors: [
      { name: "Ink", hex: "#2b2723" },
    ],
    image: img("1650501386688-41f6d0251875"),
    specs: [
      { label: "Sockets", value: "4x AC + 2x USB-A" },
      { label: "Max load", value: "10A / 2500W total" },
      { label: "Protection", value: "Surge + overload protected" },
      { label: "Control", value: "Per-socket via app or voice" },
    ],
    compatibility: ["Alexa", "Google Home", "Matter"],
    inHostelKit: false,
    reviews: [
      {
        name: "Sameer K.",
        location: "Pune",
        rating: 5,
        text: "Finally can turn off my desk setup entirely from one app instead of reaching behind the table every night.",
        date: "4 weeks ago",
      },
      {
        name: "Ritika S.",
        location: "Jaipur",
        rating: 4,
        text: "Survived two voltage spikes during storms without any issue. USB ports charge fast enough for a tablet.",
        date: "2 months ago",
      },
    ],
  },
  {
    slug: "breeze-control",
    name: "Breeze Control",
    type: "smart",
    category: "regulator",
    has3D: false,
    tagline: "Turns your ceiling fan's regulator into an app and voice control.",
    description:
      "Replaces a standard mechanical fan regulator with a smart one that fits the same wall plate — control fan speed from the app, a schedule, or 'Hey Google, set the fan to medium.'",
    price: 749,
    mrp: 999,
    installments: 3,
    rating: 4.1,
    reviewCount: 233,
    colors: [
      { name: "Chalk", hex: "#e9e2d3" },
    ],
    image: img("1705938298629-5e474cf76245"),
    specs: [
      { label: "Compatibility", value: "Standard ceiling fan regulators" },
      { label: "Speeds", value: "5-step + smooth ramp" },
      { label: "Connectivity", value: "2.4GHz Wi-Fi" },
      { label: "Install", value: "Fits standard Indian wall plate" },
    ],
    compatibility: ["Alexa", "Google Home"],
    inHostelKit: false,
    reviews: [
      {
        name: "Yash T.",
        location: "Bhopal",
        rating: 4,
        text: "Fits our old fan's wall plate perfectly, no new wiring. Voice control on the fan feels unreasonably satisfying.",
        date: "5 weeks ago",
      },
      {
        name: "Pooja M.",
        location: "Surat",
        rating: 4,
        text: "Works as advertised. Electrician friend installed it in 10 minutes.",
        date: "3 months ago",
      },
    ],
  },
  {
    slug: "study-glow-lamp",
    name: "Study Glow Lamp",
    type: "home",
    category: "lamp",
    has3D: false,
    tagline: "A study lamp with a USB port, for the desk you actually have.",
    description:
      "An adjustable-arm desk lamp with three brightness levels and a built-in USB-A port, so your phone charges while you study without hunting for another socket.",
    price: 499,
    mrp: 699,
    installments: 3,
    rating: 4.5,
    reviewCount: 890,
    colors: [
      { name: "Ink", hex: "#2b2723" },
      { name: "Chalk", hex: "#e9e2d3" },
    ],
    image: img("1519219788971-8d9797e0928e"),
    specs: [
      { label: "Brightness", value: "3 levels, flicker-free LED" },
      { label: "USB port", value: "5V/1A output" },
      { label: "Arm", value: "Adjustable, folds flat" },
      { label: "Power", value: "USB or included adapter" },
    ],
    compatibility: [],
    inHostelKit: false,
    reviews: [
      {
        name: "Simran K.",
        location: "Delhi",
        rating: 5,
        text: "Exactly what a hostel desk needs — good light and one less charger cable to manage.",
        date: "2 weeks ago",
      },
      {
        name: "Aditya R.",
        location: "Kanpur",
        rating: 4,
        text: "Sturdy arm, doesn't droop over time like my last lamp. Light enough to pack for the semester.",
        date: "6 weeks ago",
      },
    ],
  },
  {
    slug: "stack-store-organizer",
    name: "Stack & Store Organizer",
    type: "home",
    category: "organizer",
    has3D: false,
    tagline: "Foldable storage cubes that fit under a hostel bed.",
    description:
      "Three foldable fabric storage cubes sized to slide under a standard hostel or PG bed, for the clothes and books that don't fit in a small wardrobe.",
    price: 649,
    mrp: 899,
    installments: 3,
    rating: 4.4,
    reviewCount: 356,
    colors: [
      { name: "Chalk", hex: "#e9e2d3" },
    ],
    image: img("1650229068182-6931ccb389c2"),
    specs: [
      { label: "Set", value: "3 cubes, 30L each" },
      { label: "Material", value: "Reinforced fabric, foldable frame" },
      { label: "Fits", value: "Under standard single beds" },
      { label: "Care", value: "Wipe clean, machine washable liner" },
    ],
    compatibility: [],
    inHostelKit: false,
    reviews: [
      {
        name: "Tanvi J.",
        location: "Mumbai",
        rating: 5,
        text: "Fit perfectly under my hostel cot. Folds flat when I go home for break, doesn't take up cupboard space.",
        date: "1 month ago",
      },
      {
        name: "Devansh P.",
        location: "Jodhpur",
        rating: 4,
        text: "Good build quality for the price. Wish it came in a fourth cube option.",
        date: "2 months ago",
      },
    ],
  },
  {
    slug: "powerstrip-classic",
    name: "PowerStrip Classic",
    type: "home",
    category: "extension",
    has3D: false,
    tagline: "6-socket extension board with surge protection, no app needed.",
    description:
      "Sometimes you just need more sockets. Six AC outlets and a 2m cable rated for Indian mains, with a physical master switch and built-in surge protection.",
    price: 399,
    mrp: 599,
    installments: 3,
    rating: 4.3,
    reviewCount: 1120,
    colors: [
      { name: "Ink", hex: "#2b2723" },
    ],
    image: img("1621717731333-7f7fa49fc86d"),
    specs: [
      { label: "Sockets", value: "6x AC (5A/6A combi)" },
      { label: "Cable", value: "2m, rated 10A" },
      { label: "Protection", value: "Surge protector + master switch" },
      { label: "Mount", value: "Wall-mountable" },
    ],
    compatibility: [],
    inHostelKit: false,
    reviews: [
      {
        name: "Harsh V.",
        location: "Lucknow",
        rating: 5,
        text: "Every hostel room needs one of these. Cable is long enough to reach across the room from one socket.",
        date: "3 weeks ago",
      },
      {
        name: "Nikita D.",
        location: "Bhubaneswar",
        rating: 4,
        text: "Solid build, master switch is handy. Wouldn't mind a longer cable but no real complaints.",
        date: "2 months ago",
      },
    ],
  },
  {
    slug: "basera-comfort-bedsheet-set",
    name: "Basera Comfort Bedsheet Set",
    type: "home",
    category: "bedding",
    has3D: false,
    tagline: "Cotton bedsheet and pillow cover set, sized for a single bed.",
    description:
      "A breathable 180-thread-count cotton bedsheet with two pillow covers, cut for a standard single hostel bed and machine washable between semesters.",
    price: 899,
    mrp: 1299,
    installments: 3,
    rating: 4.2,
    reviewCount: 214,
    colors: [
      { name: "Warm Glass", hex: "#f2e2b8" },
      { name: "Smoked Glass", hex: "#4a463f" },
    ],
    image: img("1728614669329-29e10a0698ea"),
    specs: [
      { label: "Fabric", value: "180 TC cotton" },
      { label: "Set", value: "1 bedsheet + 2 pillow covers" },
      { label: "Size", value: "Single bed (90 x 60 in)" },
      { label: "Care", value: "Machine washable" },
    ],
    compatibility: [],
    inHostelKit: false,
    reviews: [
      {
        name: "Alia F.",
        location: "Kolkata",
        rating: 4,
        text: "Soft and held up well after a few hostel-laundry washes. Color didn't fade.",
        date: "1 month ago",
      },
      {
        name: "Manav S.",
        location: "Ranchi",
        rating: 4,
        text: "Good value, fits the standard hostel cot size exactly as described.",
        date: "3 months ago",
      },
    ],
  },
  {
    slug: "haven-modular-sofa",
    name: "Haven Modular Sofa",
    type: "furniture",
    category: "sofa",
    has3D: false,
    tagline: "A 3-seater that splits into pieces for narrow stairwells.",
    description:
      "Haven ships as three connected modules, so it fits through a standard hostel or apartment stairwell that a one-piece sofa never would, then bolts back together in your room. Removable, washable covers over a hardwood frame.",
    price: 22999,
    mrp: 31999,
    installments: 3,
    rating: 4.3,
    reviewCount: 187,
    colors: [
      { name: "Chalk", hex: "#e9e2d3" },
      { name: "Charcoal", hex: "#4a4640" },
    ],
    image: img("1651764126724-5af9b63ec825"),
    specs: [
      { label: "Seating", value: "3-seater, modular" },
      { label: "Frame", value: "Solid hardwood" },
      { label: "Cover", value: "Removable, machine washable" },
      { label: "Delivery", value: "Assembled on-site" },
    ],
    compatibility: [],
    inHostelKit: false,
    reviews: [
      {
        name: "Ritesh K.",
        location: "Bengaluru",
        rating: 5,
        text: "Moved this into a 3rd-floor flat with a tiny staircase — the modular pieces were the only reason it fit at all.",
        date: "1 month ago",
      },
      {
        name: "Sneha P.",
        location: "Pune",
        rating: 4,
        text: "Comfortable and the cover has already survived one coffee spill and a wash. Assembly team was on time.",
        date: "2 months ago",
      },
    ],
  },
  {
    slug: "orbit-coffee-table",
    name: "Orbit Coffee Table",
    type: "furniture",
    category: "table",
    has3D: false,
    tagline: "A round marble-top table that doesn't corner-clip a small room.",
    description:
      "Round tables leave more walking space in a small living room than a rectangular one of the same size. Orbit pairs a marble-finish top with a solid wood base that needs no tools beyond the included hex key.",
    price: 4499,
    mrp: 5999,
    installments: 3,
    rating: 4.4,
    reviewCount: 264,
    colors: [
      { name: "Warm Glass", hex: "#f2e2b8" },
    ],
    image: img("1714926340157-dd3a67e7b2c4"),
    specs: [
      { label: "Top", value: "Marble-finish, 60cm diameter" },
      { label: "Base", value: "Solid wood, tripod" },
      { label: "Assembly", value: "Tool-free, ~10 minutes" },
      { label: "Weight limit", value: "25kg evenly distributed" },
    ],
    compatibility: [],
    inHostelKit: false,
    reviews: [
      {
        name: "Kavya R.",
        location: "Chennai",
        rating: 5,
        text: "Round shape genuinely makes our small living room feel bigger. Assembly took less than 10 minutes.",
        date: "3 weeks ago",
      },
      {
        name: "Om Prakash S.",
        location: "Jaipur",
        rating: 4,
        text: "Looks more expensive than it is. Marble finish shows fingerprints, wipes off easily though.",
        date: "6 weeks ago",
      },
    ],
  },
  {
    slug: "frame-tv-console",
    name: "Frame TV Console",
    type: "furniture",
    category: "tvunit",
    has3D: false,
    tagline: "Closed storage for the cables and consoles a TV wall never shows.",
    description:
      "Frame holds a TV up to 55 inches and hides the router, set-top box, and cable mess behind two soft-close doors, with an open shelf for a plant or speaker on top.",
    price: 6999,
    mrp: 8999,
    installments: 3,
    rating: 4.2,
    reviewCount: 141,
    colors: [
      { name: "Chalk", hex: "#e9e2d3" },
    ],
    image: img("1461151304267-38535e780c79"),
    specs: [
      { label: "Fits TVs up to", value: "55 inch" },
      { label: "Storage", value: "2 soft-close cabinets + open shelf" },
      { label: "Cable routing", value: "Rear cutout" },
      { label: "Assembly", value: "Required, ~30 minutes" },
    ],
    compatibility: [],
    inHostelKit: false,
    reviews: [
      {
        name: "Aakash V.",
        location: "Hyderabad",
        rating: 4,
        text: "Finally hid the set-top box and router mess. Soft-close doors feel sturdier than the price suggests.",
        date: "1 month ago",
      },
      {
        name: "Zoya M.",
        location: "Lucknow",
        rating: 4,
        text: "Fits our 50-inch TV console space exactly. Instructions were clear enough to assemble solo.",
        date: "2 months ago",
      },
    ],
  },
  {
    slug: "arc-floor-lamp",
    name: "Arc Floor Lamp",
    type: "furniture",
    category: "floorlamp",
    has3D: false,
    tagline: "A reading lamp that clamps light exactly over the sofa arm.",
    description:
      "An adjustable-head floor lamp with a weighted base, angled so the light lands on a book or laptop on the sofa instead of the ceiling.",
    price: 1799,
    mrp: 2499,
    installments: 3,
    rating: 4.3,
    reviewCount: 198,
    colors: [
      { name: "Ink", hex: "#2b2723" },
    ],
    image: img("1507473885765-e6ed057f782c"),
    specs: [
      { label: "Head", value: "Adjustable angle + height" },
      { label: "Base", value: "Weighted, non-slip" },
      { label: "Bulb", value: "E27, not included" },
      { label: "Switch", value: "In-line foot switch" },
    ],
    compatibility: [],
    inHostelKit: false,
    reviews: [
      {
        name: "Nitin D.",
        location: "Mumbai",
        rating: 5,
        text: "Exactly what our reading corner needed. Base is heavy enough that it doesn't tip when the cord gets tugged.",
        date: "3 weeks ago",
      },
      {
        name: "Preeti J.",
        location: "Bhopal",
        rating: 4,
        text: "Good light angle over the sofa arm. Wish the cord were a little longer.",
        date: "2 months ago",
      },
    ],
  },
  {
    slug: "meadow-area-rug",
    name: "Meadow Area Rug",
    type: "furniture",
    category: "rug",
    has3D: false,
    tagline: "A 5x7ft rug that anchors a seating area without hiding the floor.",
    description:
      "Low-pile and machine washable, sized to sit under a coffee table with the sofa legs just off the edge — the sizing most living rooms actually need.",
    price: 2999,
    mrp: 3999,
    installments: 3,
    rating: 4.1,
    reviewCount: 176,
    colors: [
      { name: "Warm Glass", hex: "#f2e2b8" },
      { name: "Smoked Glass", hex: "#4a463f" },
    ],
    image: img("1727192807128-0cee790dcc83"),
    specs: [
      { label: "Size", value: "5 x 7 ft" },
      { label: "Pile", value: "Low-pile, 8mm" },
      { label: "Care", value: "Machine washable" },
      { label: "Backing", value: "Non-slip" },
    ],
    compatibility: [],
    inHostelKit: false,
    reviews: [
      {
        name: "Rhea F.",
        location: "Delhi",
        rating: 4,
        text: "Right size to sit under our coffee table without swallowing the whole room. Non-slip backing actually works on tile.",
        date: "1 month ago",
      },
      {
        name: "Suresh N.",
        location: "Coimbatore",
        rating: 4,
        text: "Held up to one full wash after a spill, came out looking new.",
        date: "3 months ago",
      },
    ],
  },
  {
    slug: "knit-cushion-set",
    name: "Knit Cushion Set",
    type: "furniture",
    category: "cushion",
    has3D: false,
    tagline: "Two chunky-knit cushion covers, insert not included.",
    description:
      "A set of two chunky hand-knit-style cushion covers in a 45x45cm fit for standard inserts, machine washable.",
    price: 799,
    mrp: 1199,
    installments: 3,
    rating: 4.5,
    reviewCount: 312,
    colors: [
      { name: "Chalk", hex: "#e9e2d3" },
    ],
    image: img("1595026525047-dfa997df8a4a"),
    specs: [
      { label: "Set", value: "2 covers, 45 x 45cm" },
      { label: "Material", value: "Chunky-knit cotton blend" },
      { label: "Insert", value: "Not included" },
      { label: "Care", value: "Machine washable" },
    ],
    compatibility: [],
    inHostelKit: false,
    reviews: [
      {
        name: "Ira B.",
        location: "Kolkata",
        rating: 5,
        text: "Texture looks exactly like the photos, not a thin printed knit pattern. Fits standard inserts perfectly.",
        date: "2 weeks ago",
      },
      {
        name: "Varun T.",
        location: "Ahmedabad",
        rating: 4,
        text: "Good quality for the price, colour matched what I expected.",
        date: "5 weeks ago",
      },
    ],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function installmentPrice(product: Product): string {
  return Math.round(product.price / product.installments).toLocaleString("en-IN")
}

export function discountPercent(product: Product): number {
  return Math.round(((product.mrp - product.price) / product.mrp) * 100)
}

export function formatINR(amount: number): string {
  return amount.toLocaleString("en-IN")
}

export const hostelKitProducts = products.filter((p) => p.inHostelKit)
export const hostelKitMrp = hostelKitProducts.reduce((sum, p) => sum + p.price, 0)
export const hostelKitPrice = Math.round(hostelKitMrp * 0.85)
