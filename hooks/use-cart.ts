'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CartLine = {
  id: string            // unique line id
  productId: string
  title: string
  price: number
  compareAt?: number
  image?: string
  color?: string
  size?: string
  qty: number
}

type CartState = {
  items: CartLine[]
  add: (line: Omit<CartLine, 'id'>) => void
  remove: (id: string) => void
  setQty: (id: string, qty: number) => void
  clear: () => void
  count: () => number
  subtotal: () => number
}

function keyOf(line: Omit<CartLine, 'id'>) {
  return `${line.productId}|${line.color ?? ''}|${line.size ?? ''}`
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      add: (line) =>
        set((state) => {
          // merge by product + variant (color/size)
          const k = keyOf(line)
          const idx = state.items.findIndex(
            (it) => keyOf(it) === k
          )
          if (idx >= 0) {
            const copy = [...state.items]
            copy[idx] = { ...copy[idx], qty: copy[idx].qty + (line.qty || 1) }
            return { items: copy }
          }
          const id = crypto?.randomUUID?.() ?? String(Date.now() + Math.random())
          return { items: [{ id, ...line, qty: line.qty || 1 }, ...state.items] }
        }),

      remove: (id) => set((state) => ({ items: state.items.filter((it) => it.id !== id) })),

      setQty: (id, qty) =>
        set((state) => ({
          items: state.items.map((it) => (it.id === id ? { ...it, qty: Math.max(1, qty) } : it)),
        })),

      clear: () => set({ items: [] }),

      count: () => get().items.reduce((s, it) => s + it.qty, 0),

      subtotal: () => get().items.reduce((s, it) => s + it.price * it.qty, 0),
    }),
    {
      name: 'cart.v1', // localStorage key
      partialize: (s) => ({ items: s.items }),
    }
  )
)
