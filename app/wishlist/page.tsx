'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { CATALOG, Product } from '@/lib/commerce'
import ProductCard from '@/components/ui/product-card'
import { Button } from '@/components/ui/button'

type WishItem = { productId: string, addedAt: number }
const KEY = 'wish.v1'

function readWish(): WishItem[] {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}
function writeWish(items: WishItem[]) {
  try { localStorage.setItem(KEY, JSON.stringify(items)) } catch {}
}

export default function WishlistPage() {
  const [items, setItems] = useState<WishItem[]>([])

  useEffect(() => { setItems(readWish()) }, [])

  function remove(productId: string) {
    const next = items.filter(i => i.productId !== productId)
    setItems(next); writeWish(next)
  }

  const products: Product[] = items
    .map(i => CATALOG.find(p => p.id === i.productId))
    .filter(Boolean) as Product[]

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">علاقه‌مندی‌ها</h1>

      {!products.length ? (
        <div className="rounded-lg border p-10 text-center">
          <div className="text-muted-foreground mb-4">هیچ آیتمی در علاقه‌مندی‌ها نیست.</div>
          <Button asChild><Link href="/products">شروع خرید</Link></Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((p) => (
            <div key={p.id} className="relative">
              <button
                aria-label="حذف از علاقه‌مندی‌ها"
                className="absolute top-2 right-2 z-10 rounded bg-white/90 px-2 py-1 text-xs shadow hover:bg-white"
                onClick={() => remove(p.id)}
              >
                حذف
              </button>
              <ProductCard
                product={{
                  id: p.id,
                  title: p.title,
                  price: p.price.current,
                  compareAt: p.price.compareAt,
                  rating: p.rating,
                  image: p.variants[0]?.images[0] || '',
                }}
              />
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
