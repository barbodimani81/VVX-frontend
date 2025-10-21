'use client'

import { useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import type { Product } from '@/lib/commerce'

export default function VariantPicker({
  colors,
  sizes,
  product,
}: {
  colors: string[]
  sizes: string[]
  product: Product
}) {
  const [color, setColor] = useState(colors[0])
  const [size, setSize] = useState(sizes[0])

  const stock = useMemo(() => {
    const v = product.variants.find((v) => v.color === color && v.size === size)
    return v?.available ?? false
  }, [color, size, product.variants])

  return (
    <div className="space-y-4">
      <div>
        <div className="mb-2 text-sm font-medium">رنگ</div>
        <div className="flex flex-wrap gap-2">
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={cn(
                'rounded-full border px-3 py-1 text-sm',
                color === c ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-2 text-sm font-medium">سایز</div>
        <div className="flex flex-wrap gap-2">
          {sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={cn(
                'rounded-md border px-3 py-1 text-sm',
                size === s ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className={cn('text-sm', stock ? 'text-emerald-600' : 'text-red-600')}>
        {stock ? 'موجود در انبار' : 'ناموجود'}
      </div>
    </div>
  )
}
