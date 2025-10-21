'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

function qp(sp: Props['searchParams'], patch: Record<string, string | undefined>) {
  const u = new URLSearchParams()
  Object.entries(sp).forEach(([k, v]) => {
    if (typeof v === 'string') u.set(k, v)
  })
  Object.entries(patch).forEach(([k, v]) => {
    if (v === undefined || v === '') u.delete(k)
    else u.set(k, v)
  })
  return `?${u.toString()}`
}

export function SortSelect({ defaultValue }: { defaultValue: string }) {
  const router = useRouter()
  
  return (
    <Select 
      defaultValue={defaultValue} 
      onValueChange={(v) => {
        const url = new URL(window.location.href)
        url.searchParams.set('sort', v)
        url.searchParams.set('page', '1')
        router.push(url.pathname + url.search)
      }}
    >
      <SelectTrigger className="w-44">
        <SelectValue placeholder="مرتب‌سازی" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="relevance">مرتبط‌ترین</SelectItem>
        <SelectItem value="new">جدیدترین</SelectItem>
        <SelectItem value="price_asc">ارزان‌ترین</SelectItem>
        <SelectItem value="price_desc">گران‌ترین</SelectItem>
        <SelectItem value="rating_desc">بیشترین امتیاز</SelectItem>
      </SelectContent>
    </Select>
  )
}

export function StockFilter({ checked }: { checked: boolean }) {
  const router = useRouter()
  
  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id="instock"
        checked={checked}
        onCheckedChange={(v) => {
          const url = new URL(window.location.href)
          if (v) {
            url.searchParams.set('inStock', '1')
          } else {
            url.searchParams.delete('inStock')
          }
          url.searchParams.set('page', '1')
          router.push(url.pathname + url.search)
        }}
      />
      <label htmlFor="instock" className="text-sm">فقط موجود</label>
    </div>
  )
}
