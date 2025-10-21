// components/seo/json-ld.tsx
import React from 'react'

function Script({ json }: { json: any }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  )
}

export function ProductJsonLd({
  name,
  description,
  images,
  sku,
  price,
  currency = 'IRR',
  availability = 'https://schema.org/InStock',
  url,
  brand = 'برند',
  aggregateRating,
}: {
  name: string
  description?: string
  images: string[]
  sku: string
  price: number
  currency?: string
  availability?: string
  url: string
  brand?: string
  aggregateRating?: { ratingValue: number; reviewCount: number }
}) {
  const json: any = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    image: images,
    description,
    sku,
    brand: { '@type': 'Brand', name: brand },
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: currency,
      price: String(price),
      itemCondition: 'https://schema.org/NewCondition',
      availability,
    },
  }
  if (aggregateRating) {
    json.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: aggregateRating.ratingValue,
      reviewCount: aggregateRating.reviewCount,
    }
  }
  return <Script json={json} />
}

export function BreadcrumbJsonLd(items: { name: string; item?: string }[]) {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.item,
    })),
  }
  return <Script json={json} />
}
