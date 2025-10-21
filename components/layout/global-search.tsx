'use client'

import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

export default function GlobalSearch({ placeholder = 'جستجو در فروشگاه...' }: { placeholder?: string }) {
  const [q, setQ] = useState('')
  const router = useRouter()
  function onSubmit(e: FormEvent) {
    e.preventDefault()
    router.push(q.trim() ? `/search?q=${encodeURIComponent(q.trim())}` : '/search')
  }
  return (
    <form onSubmit={onSubmit} className="relative w-full md:w-80">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" placeholder={placeholder} />
    </form>
  )
}
