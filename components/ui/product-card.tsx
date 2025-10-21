'use client'

import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart, Scale } from 'lucide-react'
import { useCart } from '@/hooks/use-cart'
import { useWishlist } from '@/hooks/use-wishlist'
import { useCompare } from '@/hooks/use-compare'
import { cn } from '@/lib/utils'
import { notify } from '@/lib/notify'

type Product = {
  id: string
  title: string
  price: number
  compareAt?: number
  rating?: number
  image: string
  color?: string
  size?: string
}

function toman(n: number) {
  return new Intl.NumberFormat('fa-IR').format(n) + ' تومان'
}

export default function ProductCard({ product }: { product: Product }) {
  const hasDiscount = !!product.compareAt && product.compareAt > product.price
  const { add } = useCart()
  const wish = useWishlist()
  const cmp = useCompare()
  const wished = wish.has(product.id)
  const compared = cmp.has(product.id)

  function onAdd() {
    add({
      productId: product.id,
      title: product.title,
      price: product.price,
      compareAt: product.compareAt,
      image: product.image,
      color: product.color,
      size: product.size,
      qty: 1,
    })
    notify.addedToCart(product.title)
  }

  function onToggleWish() {
    const wasWished = wish.has(product.id)
    wish.toggle(product.id)
    wasWished ? notify.wishlistRemoved(product.title) : notify.wishlistAdded(product.title)
  }

  function onToggleCompare() {
    const already3 = !cmp.has(product.id) && cmp.count() >= 3
    if (already3) {
      notify.compareLimit()
      return
    }
    cmp.toggle(product.id)
    if (!compared) notify.compareAdded()
  }

  return (
    <Card className="overflow-hidden group">
      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="aspect-[4/5] w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {hasDiscount && (
          <div className="absolute top-2 left-2">
            <span className="rounded-full bg-red-600 text-white text-xs px-2 py-1">تخفیف</span>
          </div>
        )}
        <button
          aria-label={wished ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
          onClick={onToggleWish}
          className={cn(
            'absolute top-2 right-2 rounded-full p-2 shadow transition',
            wished ? 'bg-red-500 text-white' : 'bg-white/90 hover:bg-white'
          )}
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>

      <CardContent className="pt-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="line-clamp-1 font-medium">{product.title}</h3>
          {product.rating ? (
            <span className="text-xs text-muted-foreground">★ {product.rating.toFixed(1)}</span>
          ) : null}
        </div>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-bold">{toman(product.price)}</span>
          {hasDiscount && (
            <span className="text-xs text-muted-foreground line-through">{toman(product.compareAt!)}</span>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button className="flex-1" onClick={onAdd}>
          افزودن به سبد
        </Button>
        <Button
          variant={compared ? 'default' : 'outline'}
          size="icon"
          aria-label="افزودن به مقایسه"
          onClick={onToggleCompare}
          className={cn(compared && 'bg-primary text-primary-foreground')}
        >
          <Scale className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
