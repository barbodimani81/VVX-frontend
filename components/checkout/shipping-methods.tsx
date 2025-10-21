'use client'

import { useEffect } from 'react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { toman } from '@/lib/commerce'

export type ShippingOption = {
  id: 'standard' | 'express'
  title: string
  eta: string
  price: number
}

const OPTIONS: ShippingOption[] = [
  { id: 'standard', title: 'ارسال عادی', eta: '۲–۴ روز کاری', price: 20000 },
  { id: 'express', title: 'ارسال سریع', eta: '۱–۲ روز کاری', price: 45000 },
]

export default function ShippingMethods({
  selected,
  onSelect,
}: {
  selected?: ShippingOption
  onSelect: (s: ShippingOption) => void
}) {
  useEffect(() => {
    if (!selected) onSelect(OPTIONS[0])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="rounded-lg border p-4 space-y-3">
      <h2 className="font-semibold">روش ارسال</h2>
      <RadioGroup
        className="space-y-3"
        value={selected?.id || 'standard'}
        onValueChange={(v) => onSelect(OPTIONS.find((o) => o.id === v) || OPTIONS[0])}
      >
        {OPTIONS.map((o) => (
          <div key={o.id} className="flex items-center justify-between rounded-md border p-3">
            <div className="flex items-center gap-3">
              <RadioGroupItem id={o.id} value={o.id} />
              <Label htmlFor={o.id} className="cursor-pointer">
                <div className="font-medium">{o.title}</div>
                <div className="text-xs text-muted-foreground">{o.eta}</div>
              </Label>
            </div>
            <div className="text-sm font-semibold">{toman(o.price)}</div>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}
