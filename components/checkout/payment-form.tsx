'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export type Payment = {
  holder: string
  card: string
  exp: string
  cvc: string
}

export default function PaymentForm({
  onSubmit,
  loading,
}: {
  onSubmit: (p: Payment) => void
  loading?: boolean
}) {
  const [form, setForm] = useState<Payment>({ holder: '', card: '', exp: '', cvc: '' })

  useEffect(() => {
    onSubmit(form) // enable CTA when valid
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form])

  const valid =
    form.holder.trim().length > 3 &&
    /^[0-9\s]{12,19}$/.test(form.card.replace(/\s/g, '')) &&
    /^\d{2}\/\d{2}$/.test(form.exp) &&
    /^\d{3,4}$/.test(form.cvc)

  return (
    <div className="rounded-lg border p-4 space-y-4">
      <h2 className="font-semibold">پرداخت</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <Label htmlFor="holder">نام روی کارت</Label>
          <Input id="holder" value={form.holder} onChange={(e) => setForm({ ...form, holder: e.target.value })} placeholder="Ali Alavi" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="card">شماره کارت</Label>
          <Input id="card" value={form.card} onChange={(e) => setForm({ ...form, card: e.target.value })} placeholder="1234 5678 9012 3456" inputMode="numeric" />
        </div>
        <div>
          <Label htmlFor="exp">تاریخ انقضا</Label>
          <Input id="exp" value={form.exp} onChange={(e) => setForm({ ...form, exp: e.target.value })} placeholder="12/29" />
        </div>
        <div>
          <Label htmlFor="cvc">CVC</Label>
          <Input id="cvc" value={form.cvc} onChange={(e) => setForm({ ...form, cvc: e.target.value })} placeholder="123" inputMode="numeric" />
        </div>
      </div>
      {!valid && <p className="text-xs text-muted-foreground">این یک پرداخت نمایشی است؛ اطلاعات را به‌صورت صحیح وارد کنید.</p>}
      {loading && <p className="text-xs text-muted-foreground">در حال پردازش پرداخت…</p>}
    </div>
  )
}
