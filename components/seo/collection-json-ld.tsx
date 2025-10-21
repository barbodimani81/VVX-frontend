// components/seo/collection-json-ld.tsx
export default function CollectionJsonLd({
  items,
  baseUrl = 'https://example.com',
}: {
  items: { name: string; url: string; image?: string }[]
  baseUrl?: string
}) {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: it.url.startsWith('http') ? it.url : baseUrl + it.url,
      name: it.name,
      image: it.image,
    })),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  )
}
