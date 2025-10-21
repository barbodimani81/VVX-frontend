'use client'

import { useEffect, useMemo, useState } from 'react'
import { useCart } from '@/hooks/use-cart'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Trash2, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { toman } from '@/lib/commerce'

export default function MiniCart() {
  const { items, remove, setQty, subtotal, count } = useCart()
  const total = useMemo(() => subtotal(), [items])
  const c = useMemo(() => count(), [items])

  // open drawer automatically when cart changes (small nudge UX)
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  useEffect(() => {
    if (!mounted) return
    if (items.length) setOpen(true)
  }, [items.length, mounted])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          aria-label="سبد خرید"
          className="fixed bottom-5 left-5 z-50 flex items-center gap-2 rounded-full border bg-background px-4 py-2 shadow-lg transition hover:shadow-xl"
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="text-sm">سبد</span>
          {c > 0 && <Badge className="rounded-full">{c}</Badge>}
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[90vw] sm:w-[480px]">
        <SheetHeader>
          <SheetTitle>سبد خرید</SheetTitle>
        </SheetHeader>

        <div className="mt-4 space-y-4">
          {items.length === 0 ? (
            <div className="rounded-lg border p-6 text-center text-muted-foreground">
              سبد شما خالی است.
            </div>
          ) : (
            <>
              <ul className="space-y-4">
                {items.map((it) => (
                  <li key={it.id} className="flex items-center gap-3">
                    <div className="relative h-16 w-16 overflow-hidden rounded border bg-muted">
                      {it.image ? (
                        <Image src={it.image} alt={it.title} fill className="object-cover" />
                      ) : null}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <div className="truncate font-medium">{it.title}</div>
                          <div className="text-xs text-muted-foreground">
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
                      <div className="mt-2 flex items-center justify-between">
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
                        <div className="font-medium">{toman(it.price * it.qty)}</div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">مجموع</span>
                <span className="text-lg font-bold">{toman(total)}</span>
              </div>

              <div className="flex gap-2">
                <Button asChild className="flex-1">
                  <Link href="/checkout">تسویه حساب</Link>
                </Button>
                <Button asChild variant="outline" className="flex-1" onClick={() => setOpen(false)}>
                  <Link href="/cart">مشاهده سبد</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
