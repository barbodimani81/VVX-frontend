'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { queryCatalog, toman, Product } from '@/lib/commerce'
import ProductCard from '@/components/ui/product-card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { SortSelect, StockFilter } from '@/components/products/filters'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'

export default function ProductsPage() {
  const searchParams = useSearchParams()
  
  const q = searchParams.get('q') ?? undefined
  const category = searchParams.get('category') ?? 'همه'
  const color = searchParams.get('color') ?? undefined
  const size = searchParams.get('size') ?? undefined
  const inStock = searchParams.get('inStock') ?? undefined
  const min = searchParams.get('min') ?? undefined
  const max = searchParams.get('max') ?? undefined
  const sort = (searchParams.get('sort') ?? 'relevance') as 'relevance'|'new'|'price_asc'|'price_desc'|'rating_desc'
  const page = searchParams.get('page') ?? '1'
  const per = searchParams.get('per') ?? '12'

  const { items, total, page: p, pageCount } = queryCatalog({ q, category: category as any, color, size, inStock: inStock as any, min, max, sort, page, per })

  function qp(patch: Record<string, string | undefined>) {
    const u = new URLSearchParams()
    searchParams.forEach((v, k) => {
      u.set(k, v)
    })
    Object.entries(patch).forEach(([k, v]) => {
      if (v === undefined || v === '') u.delete(k)
      else u.set(k, v)
    })
    return `?${u.toString()}`
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">محصولات</h1>
          <p className="text-sm text-muted-foreground mt-1">{total} کالا پیدا شد</p>
        </div>

        {/* sort */}
        <div className="flex items-center gap-3">
          <form action="/products" className="hidden md:block">
            <Input name="q" defaultValue={q} placeholder="جستجو..." />
          </form>
          <SortSelect defaultValue={sort} />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* sidebar */}
        <aside className="md:col-span-3 space-y-6">
          {/* Categories */}
          <section>
            <h2 className="mb-3 font-semibold">دسته‌بندی</h2>
            <div className="flex flex-wrap gap-2">
              {(['همه','هودی','تی‌شرت','اکسسوری'] as const).map((c) => (
                <Link key={c} href={qp({ category: c, page: '1' })}>
                  <Badge variant={c === category ? 'default' : 'secondary'}>{c}</Badge>
                </Link>
              ))}
            </div>
          </section>

          {/* Price */}
          <section>
            <h2 className="mb-3 font-semibold">قیمت</h2>
            <form className="flex items-center gap-2" action="/products">
              <Input name="min" type="number" inputMode="numeric" placeholder="حداقل" defaultValue={min} />
              <span className="text-muted-foreground">تا</span>
              <Input name="max" type="number" inputMode="numeric" placeholder="حداکثر" defaultValue={max} />
              <input type="hidden" name="q" value={q ?? ''} />
              <input type="hidden" name="category" value={category ?? 'همه'} />
              <input type="hidden" name="color" value={color ?? ''} />
              <input type="hidden" name="size" value={size ?? ''} />
              <input type="hidden" name="inStock" value={inStock ?? ''} />
              <input type="hidden" name="sort" value={sort} />
              <button className="rounded-md border px-3 py-2 text-sm">اعمال</button>
            </form>
          </section>

          {/* Color */}
          <section>
            <h2 className="mb-3 font-semibold">رنگ</h2>
            <div className="flex flex-wrap gap-2">
              {['سفید', 'مشکی', 'خاکستری'].map((c) => (
                <Link key={c} href={qp({ color: c, page: '1' })}>
                  <Badge variant={c === color ? 'default' : 'secondary'}>{c}</Badge>
                </Link>
              ))}
              {color && (
                <Link href={qp({ color: undefined, page: '1' })} className="text-xs text-muted-foreground">حذف فیلتر رنگ</Link>
              )}
            </div>
          </section>

          {/* Size + Stock */}
          <section className="space-y-3">
            <div>
              <h2 className="mb-3 font-semibold">سایز</h2>
              <div className="flex flex-wrap gap-2">
                {['S','M','L','XL','42'].map((s) => (
                  <Link key={s} href={qp({ size: s, page: '1' })}>
                    <Badge variant={s === size ? 'default' : 'secondary'}>{s}</Badge>
                  </Link>
                ))}
                {size && (
                  <Link href={qp({ size: undefined, page: '1' })} className="text-xs text-muted-foreground">حذف فیلتر سایز</Link>
                )}
              </div>
            </div>

            <StockFilter checked={inStock === '1'} />
          </section>
        </aside>

        {/* grid */}
        <section className="md:col-span-9">
          {items.length === 0 ? (
            <div className="rounded-lg border p-8 text-center text-muted-foreground">
              چیزی پیدا نشد. <Link className="underline" href="/products">حذف فیلترها</Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((p: Product) => (
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

              {/* pagination */}
              {pageCount > 1 && (
                <div className="mt-8">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href={qp({ page: String(Math.max(1, Number(p) - 1)) })} />
                      </PaginationItem>
                      {Array.from({ length: pageCount }).map((_, i) => {
                        const n = i + 1
                        return (
                          <PaginationItem key={n}>
                            <PaginationLink isActive={n === p} href={qp({ page: String(n) })}>
                              {n}
                            </PaginationLink>
                          </PaginationItem>
                        )
                      })}
                      <PaginationItem>
                        <PaginationNext href={qp({ page: String(Math.min(pageCount, Number(p) + 1)) })} />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  )
}
