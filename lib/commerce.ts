// lib/commerce.ts
export type Price = { current: number; compareAt?: number; currency: 'تومان' }
export type Variant = { id: string; color: string; size: string; available: boolean; images: string[] }
export type Product = {
  id: string
  slug: string
  title: string
  description: string
  tags: string[]
  price: Price
  rating: number
  totalReviews: number
  variants: Variant[]
  category: 'هودی' | 'تی‌شرت' | 'اکسسوری'
  createdAt: string
}

const img = (q: string) =>
  `https://images.unsplash.com/${q}`

// ---- Mock catalog (feel free to extend) ----
export const CATALOG: Product[] = [
  {
    id: 'p1',
    slug: 'هودی-سفید-محمد',
    title: 'هودی سفید محمد',
    description: 'هودی سفید از پنبه ارگانیک با گرمای ملایم برای روزهای سرد.',
    tags: ['هودی', 'زمستان', 'مینیمال', 'سفید'],
    price: { current: 100000, compareAt: 120000, currency: 'تومان' },
    rating: 4.6,
    totalReviews: 128,
    variants: [
      { id: 'p1v1', color: 'سفید', size: 'M', available: true, images: [img('photo-1520975916090-3105956dac38?q=80&w=1200')] },
      { id: 'p1v2', color: 'سفید', size: 'L', available: false, images: [img('photo-1520975916090-3105956dac38?q=80&w=1200')] },
    ],
    category: 'هودی',
    createdAt: '2025-09-12',
  },
  {
    id: 'p2',
    slug: 'تی-شرت-مینیمال-مشکی',
    title: 'تی‌شرت مینیمال مشکی',
    description: 'تی‌شرت نازک و تنفسی، مناسب لایه‌پوشی پاییزی.',
    tags: ['تی‌شرت', 'پاییز', 'مشکی', 'مینیمال'],
    price: { current: 49000, currency: 'تومان' },
    rating: 4.2,
    totalReviews: 74,
    variants: [
      { id: 'p2v1', color: 'مشکی', size: 'M', available: true, images: [img('photo-1512436991641-6745cdb1723f?q=80&w=1200')] },
      { id: 'p2v2', color: 'مشکی', size: 'XL', available: true, images: [img('photo-1512436991641-6745cdb1723f?q=80&w=1200')] },
    ],
    category: 'تی‌شرت',
    createdAt: '2025-08-10',
  },
  {
    id: 'p3',
    slug: 'کفش-تمام-سفید',
    title: 'کفش سفید تمام‌سفید',
    description: 'کفشی سبک و مینیمال برای استایل روزمره.',
    tags: ['اکسسوری', 'کفش', 'سفید'],
    price: { current: 169000, compareAt: 189000, currency: 'تومان' },
    rating: 4.8,
    totalReviews: 210,
    variants: [
      { id: 'p3v1', color: 'سفید', size: '42', available: true, images: [img('photo-1519741497674-611481863552?q=80&w=1200')] },
    ],
    category: 'اکسسوری',
    createdAt: '2025-09-30',
  },
  {
    id: 'p4',
    slug: 'شلوار-خاکستری-دهه-نود',
    title: 'شلوار خاکستری ۹۰s',
    description: 'فرم راحت با پارچه مقاوم؛ مناسب استایل خیابانی.',
    tags: ['اکسسوری', 'شلوار', 'خاکستری', '۹۰s'],
    price: { current: 129000, currency: 'تومان' },
    rating: 4.1,
    totalReviews: 33,
    variants: [
      { id: 'p4v1', color: 'خاکستری', size: 'L', available: true, images: [img('photo-1520975916090-3105956dac38?q=80&w=1200')] },
    ],
    category: 'اکسسوری',
    createdAt: '2025-07-22',
  },
]

// ---- Helpers ----
export type CatalogQuery = {
  q?: string
  category?: Product['category'] | 'همه'
  color?: string
  size?: string
  inStock?: '1' | '0'
  min?: string // price min
  max?: string // price max
  sort?: 'relevance' | 'new' | 'price_asc' | 'price_desc' | 'rating_desc'
  page?: string
  per?: string
}

export type CatalogResult = {
  items: Product[]
  total: number
  page: number
  pageCount: number
}

export function toman(n: number) {
  return new Intl.NumberFormat('fa-IR').format(n) + ' تومان'
}

export function queryCatalog(params: CatalogQuery): CatalogResult {
  const {
    q,
    category,
    color,
    size,
    inStock,
    min,
    max,
    sort = 'relevance',
    page = '1',
    per = '12',
  } = params

  let data = [...CATALOG]

  // filter: category
  if (category && category !== 'همه') {
    data = data.filter((p) => p.category === category)
  }

  // filter: q
  if (q && q.trim()) {
    const term = q.trim()
    data = data.filter(
      (p) =>
        p.title.includes(term) ||
        p.description.includes(term) ||
        p.tags.some((t) => t.includes(term)),
    )
  }

  // filter: color
  if (color) {
    data = data.filter((p) => p.variants.some((v) => v.color === color))
  }

  // filter: size
  if (size) {
    data = data.filter((p) => p.variants.some((v) => v.size === size))
  }

  // filter: stock
  if (inStock === '1') {
    data = data.filter((p) => p.variants.some((v) => v.available))
  }

  // filter: price range
  const minN = min ? Number(min) : undefined
  const maxN = max ? Number(max) : undefined
  if (typeof minN === 'number' && !Number.isNaN(minN)) {
    data = data.filter((p) => p.price.current >= minN)
  }
  if (typeof maxN === 'number' && !Number.isNaN(maxN)) {
    data = data.filter((p) => p.price.current <= maxN)
  }

  // sorting
  data.sort((a, b) => {
    switch (sort) {
      case 'new':
        return +new Date(b.createdAt) - +new Date(a.createdAt)
      case 'price_asc':
        return a.price.current - b.price.current
      case 'price_desc':
        return b.price.current - a.price.current
      case 'rating_desc':
        return b.rating - a.rating
      default:
        // relevance: prefer q hits in title then newer
        const score = (p: Product) => {
          let s = 0
          if (q) {
            if (p.title.includes(q)) s += 3
            if (p.tags.some((t) => t.includes(q))) s += 2
            if (p.description.includes(q)) s += 1
          }
          // slight boost for newer
          s += Math.min(1, (+new Date(p.createdAt) - 0) / 1e13)
          return s
        }
        return score(b) - score(a)
    }
  })

  // pagination
  const pageN = Math.max(1, parseInt(page, 10) || 1)
  const perN = Math.min(48, Math.max(1, parseInt(per, 10) || 12))
  const total = data.length
  const pageCount = Math.max(1, Math.ceil(total / perN))
  const start = (pageN - 1) * perN
  const items = data.slice(start, start + perN)

  return { items, total, page: pageN, pageCount }
}
