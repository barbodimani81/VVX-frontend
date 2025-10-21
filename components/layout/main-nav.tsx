// components/layout/main-nav.tsx
import Link from 'next/link'
import { cn } from '@/lib/utils'

const links = [
  { href: '/products', label: 'کاتالوگ' },
  { href: '/looks', label: 'استایل‌ها' },
  { href: '/products?category=هودی', label: 'هودی' },
  { href: '/about', label: 'درباره ما' },
]

export default function MainNav({ className }: { className?: string }) {
  return (
    <nav className={cn('hidden md:flex items-center gap-5', className)}>
      {links.map((l) => (
        <Link key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-foreground">
          {l.label}
        </Link>
      ))}
    </nav>
  )
}
