'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/hooks/use-cart'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Trash2 } from 'lucide-react'
import { toman } from '@/lib/commerce'

export default function CartPage() {
  const { items, remove, setQty, subtotal, count, clear } = useCart()
  const total = subtotal()
  const c = count()

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">سبد خرید</h1>

      {items.length === 0 ? (
        <div className="rounded-lg border p-10 text-center">
          <div className="text-muted-foreground mb-4">سبد شما خالی است.</div>
          <Button asChild>
            <Link href="/products">شروع خرید</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* lines */}
          <section className="lg:col-span-8 space-y-4">
            {items.map((it) => (
              <div key={it.id} className="flex items-center gap-4 rounded-lg border p-3">
                <div className="relative h-24 w-24 overflow-hidden rounded border bg-muted shrink-0">
                  {it.image ? <Image src={it.image} alt={it.title} fill className="object-cover" /> : null}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate font-medium">{it.title}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {it.color ? `رنگ ${it.color}` : ''}{it.color && it.size ? '، ' : ''}{it.size ? `سایز ${it.size}` : ''}
                      </div>
                    </div>
                    <button
                      className="text-muted-foreground hover:text-destructive"
                      aria-label="حذف"
                      onClick={() => remove(it.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center rounded border">
                      <button
                        className="px-3 py-1"
                        onClick={() => it.qty > 1 && setQty(it.id, it.qty - 1)}
                        aria-label="کاهش تعداد"
                      >
                        −
                      </button>
                      <span className="px-3 text-sm">{it.qty}</span>
                      <button
                        className="px-3 py-1"
                        onClick={() => setQty(it.id, it.qty + 1)}
                        aria-label="افزایش تعداد"
                      >
                        +
                      </button>
                    </div>
                    <div className="font-semibold">{toman(it.price * it.qty)}</div>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-end">
              <Button variant="outline" onClick={clear}>خالی کردن سبد</Button>
            </div>
          </section>

          {/* summary */}
          <aside className="lg:col-span-4">
            <div className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">تعداد اقلام</span>
                <span className="text-sm">{c}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">جمع جزء</span>
                <span className="text-sm">{toman(total)}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="font-bold">مبلغ قابل پرداخت</span>
                <span className="text-lg font-extrabold">{toman(total)}</span>
              </div>
              <Button asChild className="w-full">
                <Link href="/checkout">ادامه فرآیند خرید</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/products">ادامه خرید</Link>
              </Button>
            </div>
          </aside>
        </div>
      )}
    </main>
  )
}
