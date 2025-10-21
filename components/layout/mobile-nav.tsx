'use client'

import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

const links = [
  { href: '/products', label: 'کاتالوگ' },
  { href: '/looks', label: 'استایل‌ها' },
  { href: '/products?category=هودی', label: 'هودی' },
  { href: '/about', label: 'درباره ما' },
  { href: '/cart', label: 'سبد خرید' },
]

export default function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="منو">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[80vw]">
        <div className="mt-6 grid gap-3">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="rounded-md px-3 py-2 hover:bg-muted">
              {l.label}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
