// components/layout/site-header.tsx
import Link from 'next/link'
import MainNav from './main-nav'
import GlobalSearch from './global-search'
import MobileNav from './mobile-nav'
import { ShoppingCart, Heart } from 'lucide-react'

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4">
        {/* right side (logo + mobile menu) */}
        <div className="flex items-center gap-2">
          <MobileNav />
          <Link href="/" className="text-base font-extrabold">فروشگاه مد</Link>
        </div>

        {/* middle (search) */}
        <div className="flex-1 flex items-center justify-center">
          <GlobalSearch />
        </div>

        {/* left (icons + desktop nav) */}
        <div className="flex items-center gap-4">
          <MainNav className="mr-2" />
          <Link href="/wishlist" aria-label="علاقه‌مندی‌ها" className="hidden md:inline-flex text-muted-foreground hover:text-foreground">
            <Heart className="h-5 w-5" />
          </Link>
          <Link href="/cart" aria-label="سبد خرید" className="text-muted-foreground hover:text-foreground">
            <ShoppingCart className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </header>
  )
}
