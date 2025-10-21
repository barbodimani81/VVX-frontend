'use client'

import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { Stars, StarsInput } from './stars'
import { cn } from '@/lib/utils'

type Review = {
  id: string
  productId: string
  author: string
  rating: number
  text: string
  createdAt: string
}

const KEY = 'reviews.v1'

function readReviews(): Review[] {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]') } catch { return [] }
}
function writeReviews(items: Review[]) {
  try { localStorage.setItem(KEY, JSON.stringify(items)) } catch {}
}

export default function Reviews({ productId }: { productId: string }) {
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState<Review[]>([])
  const [name, setName] = useState('')
  const [rating, setRating] = useState(5)
  const [text, setText] = useState('')

  useEffect(() => { setItems(readReviews()) }, [])

  const productReviews = useMemo(
    () => items.filter((r) => r.productId === productId).sort((a,b)=>+new Date(b.createdAt) - +new Date(a.createdAt)),
    [items, productId]
  )

  const avg = useMemo(() => {
    if (!productReviews.length) return 0
    return productReviews.reduce((s, r) => s + r.rating, 0) / productReviews.length
  }, [productReviews])

  function submit() {
    const r: Review = {
      id: crypto?.randomUUID?.() ?? String(Date.now()),
      productId,
      author: name.trim() || 'کاربر مهمان',
      rating,
      text: text.trim(),
      createdAt: new Date().toISOString(),
    }
    const next = [r, ...items]
    setItems(next)
    writeReviews(next)
    setOpen(false)
    setName(''); setText(''); setRating(5)
  }

  return (
    <section className="mt-10">
      <header className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold">نظرات کاربران</h2>
          <span className="text-sm text-muted-foreground">({productReviews.length} نظر)</span>
          {avg > 0 && <div className="flex items-center gap-2 text-sm"><Stars value={avg} /><span>{avg.toFixed(1)}</span></div>}
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">نوشتن نظر</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>ثبت نظر</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div>
                <label className="text-sm">نام</label>
                <Input value={name} onChange={(e)=>setName(e.target.value)} placeholder="علی علوی" />
              </div>
              <div className="space-y-1">
                <label className="text-sm">امتیاز</label>
                <StarsInput value={rating} onChange={setRating} />
              </div>
              <div>
                <label className="text-sm">نظر شما</label>
                <Textarea rows={4} value={text} onChange={(e)=>setText(e.target.value)} placeholder="تجربه‌تان از این محصول را بنویسید..." />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={submit} disabled={text.trim().length < 5}>ارسال نظر</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </header>

      {productReviews.length ? (
        <ul className="divide-y rounded-lg border">
          {productReviews.map((r) => (
            <li key={r.id} className="p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="font-medium">{r.author}</div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Stars value={r.rating} />
                  <span>{new Date(r.createdAt).toLocaleDateString('fa-IR')}</span>
                </div>
              </div>
              <p className="mt-2 text-sm leading-7">{r.text}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-lg border p-6 text-center text-muted-foreground">
          هنوز نظری ثبت نشده است. اولین نفر باشید!
        </div>
      )}
    </section>
  )
}
