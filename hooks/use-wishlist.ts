'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type WishState = {
  ids: string[]
  has: (id: string) => boolean
  toggle: (id: string) => void
  clear: () => void
}

export const useWishlist = create<WishState>()(
  persist(
    (set, get) => ({
      ids: [],
      has: (id) => get().ids.includes(id),
      toggle: (id) =>
        set((state) => {
          const exists = state.ids.includes(id)
          return { ids: exists ? state.ids.filter((x) => x !== id) : [id, ...state.ids] }
        }),
      clear: () => set({ ids: [] }),
    }),
    { name: 'wish.v1' }
  )
)
