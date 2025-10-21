'use client'

import { cn } from '@/lib/utils'

export function Stars({ value = 0, size = 16 }: { value?: number; size?: number }) {
  const full = Math.floor(value)
  const half = value - full >= 0.5
  return (
    <div className="inline-flex items-center gap-0.5" aria-label={`امتیاز ${value.toFixed(1)} از 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < full || (i === full && half)
        return (
          <svg key={i} viewBox="0 0 24 24" className={cn('shrink-0', filled ? 'fill-yellow-500' : 'fill-muted')} style={{ width: size, height: size }}>
            <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.786 1.402 8.168L12 18.896l-7.336 3.868 1.402-8.168L.132 9.21l8.2-1.192L12 .587z"/>
          </svg>
        )
      })}
    </div>
  )
}

export function StarsInput({
  value, onChange, size = 18
}: { value: number; onChange: (v: number) => void; size?: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const idx = i + 1
        return (
          <button
            key={idx}
            type="button"
            aria-label={`${idx} ستاره`}
            className="hover:opacity-80"
            onClick={() => onChange(idx)}
          >
            <Stars value={value >= idx ? 1 : 0} size={size} />
          </button>
        )
      })}
    </div>
  )
}
