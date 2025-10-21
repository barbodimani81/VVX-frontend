'use client'

import Image from 'next/image'
import { useMemo } from 'react'
import Link from 'next/link'
import { CATALOG } from '@/lib/commerce'
import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/use-cart'
import { toman } from '@/lib/commerce'

type Look = {
  id: string
  title: string
  items: { productId: string }[]
  bundlePrice?: number
  cover?: string
  tags?: string[]
}

const LOOKS: Look[] = [
  {
    id: 'l1',
    title: 'استایل زمستانی',
    items: [{ productId: 'p1' }, { productId: 'p4' }, { productId: 'p3' }],
    bundlePrice: 320000,
    cover: 'https://images.unsplash.com/photo-1542367597-8849eb2c0a48?q=80&w=1600',
    tags: ['زمستان', 'مینیمال'],
  },
  {
    id: 'l2',
    title: 'استایل پاییزی',
    items: [{ productId: 'p2' }, { productId: 'p4' }],
    bundlePrice: 178000,
    cover: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1600',
    tags: ['پاییز', 'کژوال'],
  },
]

export default function LooksPage() {
  const { add } = useCart()

  function addWholeLook(look: Look) {
    look.items.forEach(({ productId }) => {
      const p = CATALOG.find((x) => x.id === productId)
      if (!p) return
      const img = p.variants[0]?.images[0] || ''
      add({
        productId: p.id,
        title: p.title,
        price: p.price.current,
        compareAt: p.price.compareAt,
        image: img,
        qty: 1,
      })
    })
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">استایل‌ها</h1>
        <Link href="/products" className="text-sm text-muted-foreground hover:text-foreground">مشاهده همه محصولات</Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {LOOKS.map((look) => {
          const prods = look.items
            .map((it) => CATALOG.find((p) => p.id === it.productId))
            .filter(Boolean) as typeof CATALOG
          const sum = prods.reduce((s, p) => s + p.price.current, 0)
          const save = look.bundlePrice ? Math.max(0, sum - look.bundlePrice) : 0

          return (
            <article key={look.id} className="rounded-2xl border overflow-hidden">
              <div className="relative h-64 w-full">
                {look.cover && <Image src={look.cover} alt={look.title} fill className="object-cover" />}
              </div>
              <div className="p-4 space-y-3">
                <h2 className="text-xl font-bold">{look.title}</h2>
                {look.tags?.length ? (
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    {look.tags.map((t) => <span key={t} className="rounded-full border px-2 py-0.5">{t}</span>)}
                  </div>
                ) : null}

                <ul className="text-sm text-muted-foreground space-y-1">
                  {prods.map((p) => (
                    <li key={p.id}>• {p.title} — {toman(p.price.current)}</li>
                  ))}
                </ul>

                <div className="flex items-baseline gap-3">
                  <div className="font-bold">قیمت مجموعه:</div>
                  <div className="text-lg font-extrabold">
                    {toman(look.bundlePrice ?? sum)}
                  </div>
                  {save > 0 && (
                    <div className="text-xs text-emerald-600">صرفه‌جویی: {toman(save)}</div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button onClick={() => addWholeLook(look)} className="flex-1">افزودن کل استایل</Button>
                  <Button variant="outline" className="flex-1" asChild>
                    <Link href={`/products?tags=${encodeURIComponent(look.title)}`}>مشاهده جزئیات</Link>
                  </Button>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </main>
  )
}
