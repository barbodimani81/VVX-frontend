import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import ProductCard from '@/components/ui/product-card'

export default function Home() {
  // Demo data (replace later with real API)
  const products = [
    { id: '1', title: 'هودی سفید محمد', price: 100000, compareAt: 120000, rating: 4.6, image: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200' },
    { id: '2', title: 'تی‌شرت مینیمال', price: 49000, compareAt: 0, rating: 4.2, image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200' },
    { id: '3', title: 'کفش سفید تمام‌سفید', price: 169000, compareAt: 189000, rating: 4.8, image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200' },
    { id: '4', title: 'شلوار خاکستری ۹۰s', price: 129000, compareAt: 0, rating: 4.1, image: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200' },
  ]

  return (
    <main id="main" className="min-h-dvh">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[url('https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=2100')] bg-cover bg-center" aria-hidden />
        <div className="bg-black/40">
          <div className="mx-auto max-w-7xl px-4 py-24 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">کلکسیون زمستانی</h1>
            <p className="mt-4 text-lg md:text-xl opacity-90">استایل‌های جسورانه برای روزهای سرد — هودی، تی‌شرت و اکسسوری با حال‌وهوای مدرن.</p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Link href="/products?category=هودی"><Button size="lg">مشاهده هودی‌ها</Button></Link>
              <Link href="/looks"><Button size="lg" variant="outline" className="bg-white/15 backdrop-blur">استایل‌های آماده</Button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured categories */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <header className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">دسته‌بندی‌های منتخب</h2>
          <Link href="/products" className="text-sm text-muted-foreground hover:text-foreground">مشاهده همه</Link>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'هودی', href: '/products?category=هودی', img: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1400' },
            { title: 'تی‌شرت', href: '/products?category=تی‌شرت', img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1400' },
            { title: 'اکسسوری', href: '/products?category=اکسسوری', img: 'https://images.unsplash.com/photo-1592878904946-b3cd8ae0f6b0?q=80&w=1400' },
          ].map((c) => (
            <Link key={c.title} href={c.href} className="group relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <img src={c.img} alt={c.title} className="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute bottom-3 right-3">
                <Badge className="text-base px-3 py-1">{c.title}</Badge>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <header className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">محصولات محبوب</h2>
          <div className="relative w-72 hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input className="pl-9" placeholder="جستجو در فروشگاه..." />
          </div>
        </header>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </main>
  )
}
