// components/feedback/empty-state.tsx
import Link from 'next/link'

export default function EmptyState({
  title = 'موردی یافت نشد',
  description,
  cta,
}: {
  title?: string
  description?: string
  cta?: { href: string; label: string }
}) {
  return (
    <div className="rounded-lg border p-10 text-center">
      <div className="text-base font-medium">{title}</div>
      {description && <div className="mt-2 text-sm text-muted-foreground">{description}</div>}
      {cta && (
        <div className="mt-4">
          <Link href={cta.href} className="inline-flex rounded-md border px-3 py-2 text-sm hover:bg-muted">
            {cta.label}
          </Link>
        </div>
      )}
    </div>
  )
}
