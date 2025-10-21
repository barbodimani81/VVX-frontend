export default function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border animate-pulse">
      <div className="aspect-[4/5] w-full bg-muted" />
      <div className="p-3 space-y-2">
        <div className="h-4 w-3/4 bg-muted rounded" />
        <div className="h-4 w-1/3 bg-muted rounded" />
        <div className="mt-3 h-9 w-full bg-muted rounded-md" />
      </div>
    </div>
  )
}
