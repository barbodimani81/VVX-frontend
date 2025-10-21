'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useMemo } from 'react'
import { useCompare } from '@/hooks/use-compare'
import { CATALOG, toman } from '@/lib/commerce'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Trash2, Scale } from 'lucide-react'

function ProductsTable() {
  const { ids, remove, clear } = useCompare()
  const items = useMemo(() => ids.map(id => CATALOG.find(p => p.id === id)).filter(Boolean), [ids])

  if (!items.length) {
    return <div className="text-sm text-muted-foreground">محصولی برای مقایسه انتخاب نشده است.</div>
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {items.map((p: any) => (
          <div key={p.id} className="rounded-lg border p-3">
            <div className="relative h-36 w-full overflow-hidden rounded bg-muted">
              {p.variants[0]?.images[0] && (
                <Image src={p.variants[0].images[0]} alt={p.title} fill className="object-cover" />
              )}
            </div>
            <div className="mt-2 font-medium line-clamp-1">{p.title}</div>
            <div className="text-sm">{toman(p.price.current)}</div>
            <div className="mt-1 text-xs text-muted-foreground">
              دسته: {p.category} • امتیاز: {p.rating.toFixed(1)}★
            </div>
            <Button variant="ghost" size="sm" className="mt-2 text-red-600" onClick={() => remove(p.id)}>
              <Trash2 className="h-4 w-4 ml-1" /> حذف
            </Button>
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={clear}>حذف همه</Button>
      </div>
    </div>
  )
}

function InnerSheet() {
  const { open, setOpen, ids } = useCompare()
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          aria-label="مقایسه"
          className="fixed bottom-20 left-5 z-40 flex items-center gap-2 rounded-full border bg-background px-4 py-2 shadow-lg hover:shadow-xl"
        >
          <Scale className="h-5 w-5" />
          <span className="text-sm">مقایسه</span>
          {ids.length > 0 && (
            <span className="rounded-full bg-primary text-primary-foreground text-xs px-2 py-0.5">{ids.length}</span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[92vw] sm:w-[720px]">
        <SheetHeader>
          <SheetTitle>مقایسه محصولات</SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          <ProductsTable />
        </div>
      </SheetContent>
    </Sheet>
  )
}

// export with ssr:false wrapper (we’ll import dynamically in layout)
export default dynamic(() => Promise.resolve(InnerSheet), { ssr: false })
