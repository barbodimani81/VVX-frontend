// app/products/loading.tsx
import ProductGridSkeleton from '@/components/skeletons/product-grid-skeleton'

export default function LoadingProducts() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="h-7 w-32 bg-muted rounded mb-6 animate-pulse" />
      <ProductGridSkeleton count={12} />
    </main>
  )
}
