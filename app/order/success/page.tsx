'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { toman } from '@/lib/commerce'

type Order = {
  id: string
  subtotal: number
  total: number
  createdAt: string
  items: { id: string; title: string; qty: number; price: number }[]
}

export default function OrderSuccess() {
  const [order, setOrder] = useState<Order | null>(null)

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('lastOrder')
      if (raw) setOrder(JSON.parse(raw))
    } catch {}
  }, [])

  return (
    <main className="mx-auto max-w-3xl px-4 py-14 text-center">
      <div className="mx-auto h-16 w-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-3xl">✓</div>
      <h1 className="mt-4 text-2xl font-bold">سفارش شما ثبت شد!</h1>
      <p className="mt-2 text-sm text-muted-foreground">جزئیات سفارش در زیر آمده است. رسید آن نیز برای شما ایمیل خواهد شد.</p>

      <div className="mx-auto mt-8 max-w-2xl rounded-lg border p-5 text-right">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">شماره سفارش</span>
          <span className="font-bold">{order?.id || '—'}</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">تاریخ</span>
          <span className="text-sm">{order ? new Date(order.createdAt).toLocaleString('fa-IR') : '—'}</span>
        </div>
        <Separator className="my-4" />
        <div className="space-y-2">
          {order?.items?.map((it) => (
            <div key={it.id} className="flex items-center justify-between text-sm">
              <div className="truncate">
                {it.title} <span className="text-muted-foreground">× {it.qty}</span>
              </div>
              <div className="shrink-0">{toman(it.price * it.qty)}</div>
            </div>
          )) || <div className="text-sm text-muted-foreground">—</div>}
        </div>
        <Separator className="my-4" />
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">جمع جزء</span>
          <span className="text-sm">{order ? toman(order.subtotal) : '—'}</span>
        </div>
        <div className="mt-1 flex items-center justify-between">
          <span className="font-bold">مبلغ کل</span>
          <span className="text-lg font-extrabold">{order ? toman(order.total) : '—'}</span>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
        <Button asChild>
          <Link href="/account">پیگیری سفارش</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/products">ادامه خرید</Link>
        </Button>
      </div>
    </main>
  )
}
