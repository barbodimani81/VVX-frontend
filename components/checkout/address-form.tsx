'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export type Address = {
  fullName: string
  phone: string
  email: string
  city: string
  postal: string
  address1: string
}

export default function AddressForm({
  defaultValue,
  onSubmit,
}: {
  defaultValue?: Address
  onSubmit: (a: Address) => void
}) {
  const [form, setForm] = useState<Address>(
    defaultValue || { fullName: '', phone: '', email: '', city: '', postal: '', address1: '' }
  )

  useEffect(() => {
    onSubmit(form) // optimistic (enables "ادامه" when valid)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form])

  const valid =
    form.fullName.trim().length > 2 &&
    /^\d{10,15}$/.test(form.phone.replace(/\D/g, '')) &&
    /\S+@\S+\.\S+/.test(form.email) &&
    form.city.trim().length > 1 &&
    form.postal.trim().length >= 5 &&
    form.address1.trim().length > 5

  return (
    <div className="rounded-lg border p-4 space-y-4">
      <h2 className="font-semibold">آدرس</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName">نام و نام خانوادگی</Label>
          <Input id="fullName" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} placeholder="علی علوی" />
        </div>
        <div>
          <Label htmlFor="phone">شماره موبایل</Label>
          <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} inputMode="tel" placeholder="0912xxxxxxx" />
        </div>
        <div>
          <Label htmlFor="email">ایمیل</Label>
          <Input id="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} inputMode="email" placeholder="ali@example.com" />
        </div>
        <div>
          <Label htmlFor="city">شهر</Label>
          <Input id="city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="تهران" />
        </div>
        <div>
          <Label htmlFor="postal">کد پستی</Label>
          <Input id="postal" value={form.postal} onChange={(e) => setForm({ ...form, postal: e.target.value })} inputMode="numeric" placeholder="1234567890" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="address1">نشانی پستی</Label>
          <Input id="address1" value={form.address1} onChange={(e) => setForm({ ...form, address1: e.target.value })} placeholder="خیابان ... کوچه ... پلاک ..." />
        </div>
      </div>
      {!valid && <p className="text-xs text-muted-foreground">لطفاً همه فیلدها را به‌درستی کامل کنید.</p>}
    </div>
  )
}

