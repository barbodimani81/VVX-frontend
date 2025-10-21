// Server page (no hooks here)
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CATALOG, toman } from '@/lib/commerce'
import ProductCard from '@/components/ui/product-card'
import Breadcrumbs from '@/components/ui/breadcrumbs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Gallery from '@/components/product/gallery'               // client child
import VariantPicker from '@/components/product/variant-picker' // client child
import { RecentTracker, RecentlyViewedGrid } from '@/components/ui/recently-viewed'
import Reviews from '@/components/reviews/reviews'
import { ProductJsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { track } from '@/lib/analytics'


type PageProps = { params: { slug: string } }

export function generateStaticParams() {
  return CATALOG.map((p) => ({ slug: p.slug }))
}

function unique<T>(arr: T[]) {
  return Array.from(new Set(arr))
}

export default function ProductPage({ params }: PageProps) {
  const product = CATALOG.find((p) => p.slug === decodeURIComponent(params.slug))
  if (!product) return notFound()

  const colors = unique(product.variants.map((v) => v.color))
  const sizes = unique(product.variants.map((v) => v.size))
  const images = product.variants[0]?.images ?? []
  const related = CATALOG.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3)

  return (
    <main id="main" className="mx-auto max-w-7xl px-4 py-8">
      {/* Track recent views (client component, safe to render here) */}
      <RecentTracker productId={product.id} />

      <Breadcrumbs
        items={[
          { href: '/', label: 'خانه' },
          { href: '/products?category=' + product.category, label: product.category },
          { label: product.title },
        ]}
      />

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Gallery */}
        <section className="lg:col-span-6">
          <Gallery images={images} title={product.title} />
        </section>

        {/* Info */}
        <section className="lg:col-span-6 space-y-5">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-2xl font-bold">{product.title}</h1>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">امتیاز {product.rating.toFixed(1)}★</Badge>
              <span className="text-sm text-muted-foreground">({product.totalReviews} نظر)</span>
            </div>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-extrabold">{toman(product.price.current)}</span>
            {product.price.compareAt && product.price.compareAt > product.price.current && (
              <>
                <span className="text-sm text-muted-foreground line-through">
                  {toman(product.price.compareAt)}
                </span>
                <Badge className="rounded-full">تخفیف</Badge>
              </>
            )}
          </div>

          <p className="text-sm leading-7 text-muted-foreground">{product.description}</p>

          {/* Variant pickers (client children) */}
          <VariantPicker colors={colors} sizes={sizes} product={product} />

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="flex-1">افزودن به سبد خرید</Button>
            <Button variant="outline" className="flex-1">خرید فوری</Button>
          </div>

          <Separator />

          {/* Details */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="details">
              <AccordionTrigger>جزئیات محصول</AccordionTrigger>
              <AccordionContent>
                پارچه نخی ارگانیک؛ مناسب پاییز و زمستان؛ تن‌خور ریلکس؛ مناسب لایه‌پوشی.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="care">
              <AccordionTrigger>نحوه شست‌وشو</AccordionTrigger>
              <AccordionContent>
                شست‌وشو با آب سرد، خشک‌شویی توصیه نمی‌شود، اتوکشی با دمای ملایم.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="shipping">
              <AccordionTrigger>ارسال و بازگشت</AccordionTrigger>
              <AccordionContent>
                ارسال استاندارد ۲–۴ روز کاری. بازگشت تا ۷ روز در صورت سالم بودن کالا.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </div>

      {/* Related */}
      <section className="mt-12">
        <header className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">تکمیل استایل شما</h2>
          <Link className="text-sm text-muted-foreground hover:text-foreground" href={`/products?category=${product.category}`}>
            مشاهده بیشتر
          </Link>
        </header>
        {related.length ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {related.map((p) => (
              <ProductCard
                key={p.id}
                product={{
                  id: p.id,
                  title: p.title,
                  price: p.price.current,
                  compareAt: p.price.compareAt,
                  rating: p.rating,
                  image: p.variants[0]?.images[0] || '',
                }}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border p-6 text-center text-muted-foreground">
            مورد مرتبطی یافت نشد.
          </div>
        )}
      </section>

      {/* Recently viewed */}
      <RecentlyViewedGrid />
    </main>
  )
}
