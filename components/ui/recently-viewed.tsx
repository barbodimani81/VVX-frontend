'use client'

import { useEffect, useMemo } from 'react'
import Link from 'next/link'
import { CATALOG, Product } from '@/lib/commerce'
import ProductCard from '@/components/ui/product-card'

const KEY = 'recent.v1'
const MAX = 12

// Call this on product pages to record a view.
export function RecentTracker({ productId }: { productId: string }) {
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY)
      const ids: string[] = raw ? JSON.parse(raw) : []
      const next = [productId, ...ids.filter((id) => id !== productId)].slice(0, MAX)
      localStorage.setItem(KEY, JSON.stringify(next))
    } catch {}
  }, [productId])
  return null
}

// Drop this where you want the grid to show (e.g., bottom of product page)
export function RecentlyViewedGrid() {
  const ids = useMemo(() => {
    try {
      const raw = localStorage.getItem(KEY)
      return raw ? (JSON.parse(raw) as string[]) : []
    } catch {
      return []
    }
  }, [])

  const products: Product[] = ids
    .map((id) => CATALOG.find((p) => p.id === id))
    .filter(Boolean) as Product[]

  if (!products.length) return null

  return (
    <section className="mt-12">
      <header className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">بازدیدهای اخیر شما</h2>
        <Link className="text-sm text-muted-foreground hover:text-foreground" href="/products">
          مشاهده همه
        </Link>
      </header>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={{
              id: p.id,
              title: p.title,
              price: p.price.current,
              compareAt: p.price.compareAt,
              rating: p.rating,
              image: p.variants[0]?.images[0] || '',
            }}
          />
        ))}
      </div>
    </section>
  )
}
