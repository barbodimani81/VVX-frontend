'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import SmartImage from '@/components/ui/smart-image'

export default function Gallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0)

  const safe = Array.isArray(images) && images.length
    ? images
    : ['https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=1200']

  const selected = safe[Math.min(active, safe.length - 1)]

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg border">
        <SmartImage
          src={selected}
          alt={title}
          fill
          index={0}
          className="object-cover"
        />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-5 gap-2">
        {safe.map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={cn(
              'relative aspect-square overflow-hidden rounded-md border',
              i === active && 'ring-2 ring-primary'
            )}
            aria-label={`تصویر ${i + 1}`}
          >
            {/* Using a plain <img> here keeps it super snappy */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}
