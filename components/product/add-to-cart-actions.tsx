'use client'

import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/use-cart'
import { notify } from '@/lib/notify'

export default function AddToCartActions({
  productId,
  title,
  price,
  compareAt,
  image,
  color,
  size,
}: {
  productId: string
  title: string
  price: number
  compareAt?: number
  image?: string
  color?: string
  size?: string
}) {
  const { add } = useCart()

  function addLine(qty = 1) {
    add({ productId, title, price, compareAt, image, color, size, qty })
    notify.addedToCart(title)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Button className="flex-1" onClick={() => addLine(1)}>
        افزودن به سبد خرید
      </Button>
      <Button variant="outline" className="flex-1" onClick={() => addLine(1)}>
        خرید فوری
      </Button>
    </div>
  )
}
