'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type CompareState = {
  open: boolean
  ids: string[]          // product ids (max 3)
  count: () => number
  has: (id: string) => boolean
  toggle: (id: string) => void
  remove: (id: string) => void
  clear: () => void
  setOpen: (v: boolean) => void
}

export const useCompare = create<CompareState>()(
  persist(
    (set, get) => ({
      open: false,
      ids: [],
      count: () => get().ids.length,
      has: (id) => get().ids.includes(id),
      toggle: (id) =>
        set((state) => {
          const exists = state.ids.includes(id)
          if (exists) return { ids: state.ids.filter((x) => x !== id) }
          if (state.ids.length >= 3) return { ids: [id, ...state.ids.slice(0, 2)], open: true }
          return { ids: [id, ...state.ids] }
        }),
      remove: (id) => set((s) => ({ ids: s.ids.filter((x) => x !== id) })),
      clear: () => set({ ids: [] }),
      setOpen: (v) => set({ open: v }),
    }),
    { name: 'compare.v1', partialize: (s) => ({ ids: s.ids }) }
  )
)
