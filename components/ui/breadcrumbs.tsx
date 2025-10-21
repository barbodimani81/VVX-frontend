// components/breadcrumbs.tsx
import Link from 'next/link'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

type Crumb = { href?: string; label: string }

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  if (!items?.length) return null
  const last = items[items.length - 1]
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((c, i) => {
          const isLast = i === items.length - 1
          return (
            <span key={i} className="flex items-center">
              <BreadcrumbItem>
                {isLast || !c.href ? (
                  <BreadcrumbPage>{c.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={c.href}>{c.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator className="mx-2" />}
            </span>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
