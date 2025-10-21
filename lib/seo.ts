// lib/seo.ts
export function titleForCollection({
  category,
  q,
}: { category?: string; q?: string }) {
  if (q) return `جستجو برای «${q}» | فروشگاه مد`
  if (category && category !== 'همه') return `محصولات ${category} | فروشگاه مد`
  return 'کاتالوگ محصولات | فروشگاه مد'
}

export function descForCollection({
  total, category, q,
}: { total?: number; category?: string; q?: string }) {
  const count = typeof total === 'number' ? `${total} کالا` : 'محصولات منتخب'
  if (q) return `${count} برای عبارت «${q}». خرید آنلاین با ارسال سریع و پرداخت امن.`
  if (category && category !== 'همه') return `${count} در دسته «${category}». خرید آنلاین با ارسال سریع و پرداخت امن.`
  return `${count} در فروشگاه مد. خرید آنلاین با ارسال سریع و پرداخت امن.`
}

export function ogForCollection(path: string) {
  const url = `https://example.com${path}`
  return {
    openGraph: {
      url,
      images: [{ url: `${url}/og.png` }],
    },
  }
}
