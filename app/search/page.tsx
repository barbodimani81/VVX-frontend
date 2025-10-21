'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { queryCatalog, Product } from '@/lib/commerce'
import ProductCard from '@/components/ui/product-card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const q = searchParams.get('q') ?? ''
  const res = queryCatalog({ q, sort: 'relevance', page: '1', per: '24' })
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">جستجو</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {q ? <>نتایج برای «{q}»</> : 'عبارت جستجو را وارد کنید'}
          </p>
        </div>
        <form action="/search" className="w-full sm:w-80">
          <Input name="q" defaultValue={q} placeholder="مثلاً: هودی سفید، زمستان..." />
        </form>
      </header>

      {q && (
        <div className="mb-4">
          <Badge variant="secondary">مرتبط‌ترین</Badge>
        </div>
      )}

      {res.items.length ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {res.items.map((p: Product) => (
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
      ) : (
        <div className="rounded-lg border p-10 text-center text-muted-foreground">
          {q ? (
            <>
              چیزی برای «{q}» پیدا نشد.{' '}
              <Link className="underline" href="/products">مشاهده همه محصولات</Link>
            </>
          ) : (
            'برای شروع، عبارتی را جستجو کنید.'
          )}
        </div>
      )}
    </main>
  )
}
