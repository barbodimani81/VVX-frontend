export default function PDPSkeleton() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <div className="h-5 w-40 bg-muted rounded" />
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 animate-pulse">
        {/* gallery */}
        <section className="lg:col-span-6 space-y-3">
          <div className="aspect-[4/5] w-full rounded-lg border bg-muted" />
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-md border bg-muted" />
            ))}
          </div>
        </section>
        {/* info */}
        <section className="lg:col-span-6 space-y-4">
          <div className="h-7 w-2/3 bg-muted rounded" />
          <div className="h-6 w-1/3 bg-muted rounded" />
          <div className="h-20 w-full bg-muted rounded" />
          <div className="h-10 w-full bg-muted rounded" />
          <div className="h-10 w-full bg-muted rounded" />
          <div className="h-32 w-full bg-muted rounded" />
        </section>
      </div>
    </main>
  )
}
