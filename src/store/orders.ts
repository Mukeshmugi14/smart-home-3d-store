import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { CartLine } from "./cart"

export type PaymentMethod = "upi" | "card" | "netbanking" | "cod"

export interface Address {
  fullName: string
  line1: string
  city: string
  state: string
  pincode: string
  phone: string
}

export interface Order {
  id: string
  lines: CartLine[]
  total: number
  address: Address
  paymentMethod: PaymentMethod
  placedAt: number
}

export const ORDER_STAGES = [
  "Order placed",
  "Packed",
  "Shipped",
  "Out for delivery",
  "Delivered",
] as const

export type OrderStage = (typeof ORDER_STAGES)[number]

// Short demo offsets (seconds) so the tracking page visibly progresses
// during a normal browsing session, while still reading as a real timeline.
const STAGE_OFFSETS_SECONDS = [0, 40, 110, 190, 280]

export function currentStage(order: Order): { index: number; label: OrderStage } {
  const elapsed = (Date.now() - order.placedAt) / 1000
  let index = 0
  for (let i = 0; i < STAGE_OFFSETS_SECONDS.length; i++) {
    if (elapsed >= STAGE_OFFSETS_SECONDS[i]) index = i
  }
  return { index, label: ORDER_STAGES[index] }
}

export function stageTimestamp(order: Order, stageIndex: number): number {
  return order.placedAt + STAGE_OFFSETS_SECONDS[stageIndex] * 1000
}

interface OrdersState {
  orders: Order[]
  placeOrder: (order: Omit<Order, "id" | "placedAt">) => Order
  getOrder: (id: string) => Order | undefined
}

function generateOrderId(): string {
  const n = Math.floor(1000000 + Math.random() * 9000000)
  return `BSR-${n}`
}

export const useOrders = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [],
      placeOrder: (order) => {
        const fullOrder: Order = {
          ...order,
          id: generateOrderId(),
          placedAt: Date.now(),
        }
        set((state) => ({ orders: [fullOrder, ...state.orders] }))
        return fullOrder
      },
      getOrder: (id) => get().orders.find((o) => o.id === id),
    }),
    { name: "basera-orders" },
  ),
)
