# API Documentation - E-commerce Store

## Overview

This API provides endpoints for managing products in a Persian e-commerce application. The API follows RESTful conventions and returns JSON responses with Persian language support.

**Base URL**: `/api`

## Authentication

Currently, no authentication is required for API endpoints. All endpoints are publicly accessible.

## Data Models

### Product

```typescript
interface Product {
  id: string                    // Unique product identifier
  slug: string                  // URL-friendly identifier
  title: string                 // Product name in Persian
  description: string           // Product description in Persian
  tags: string[]                // Array of tags in Persian
  price: {
    current: number             // Current price in Toman
    compareAt?: number          // Original price (for discounts)
    currency: 'تومان'           // Currency unit
  }
  rating: number                // Average rating (0-5)
  totalReviews: number          // Total number of reviews
  variants: Variant[]           // Available product variants
  category: 'هودی' | 'تی‌شرت' | 'اکسسوری'  // Product category
  createdAt: string            // ISO date string
}
```

### Variant

```typescript
interface Variant {
  id: string                    // Unique variant identifier
  color: string                 // Color name in Persian
  size: string                  // Size (S, M, L, XL, 42, etc.)
  available: boolean            // Stock availability
  images: string[]              // Array of image URLs
}
```

### Catalog Query Parameters

```typescript
interface CatalogQuery {
  q?: string                    // Search query
  category?: 'هودی' | 'تی‌شرت' | 'اکسسوری' | 'همه'  // Product category
  color?: string                // Filter by color
  size?: string                 // Filter by size
  inStock?: '1' | '0'           // Filter by stock availability
  min?: string                  // Minimum price
  max?: string                  // Maximum price
  sort?: 'relevance' | 'new' | 'price_asc' | 'price_desc' | 'rating_desc'  // Sort order
  page?: string                 // Page number (default: 1)
  per?: string                  // Items per page (default: 12, max: 48)
}
```

### Catalog Result

```typescript
interface CatalogResult {
  items: Product[]              // Array of products
  total: number                 // Total number of products
  page: number                  // Current page number
  pageCount: number             // Total number of pages
}
```

## Endpoints

### GET /api/products

Retrieve a paginated list of products with filtering and sorting options.

#### Query Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `q` | string | Search query | `"هودی سفید"` |
| `category` | string | Product category | `"هودی"`, `"تی‌شرت"`, `"اکسسوری"`, `"همه"` |
| `color` | string | Filter by color | `"سفید"`, `"مشکی"`, `"خاکستری"` |
| `size` | string | Filter by size | `"M"`, `"L"`, `"XL"`, `"42"` |
| `inStock` | string | Filter by availability | `"1"` (in stock), `"0"` (out of stock) |
| `min` | string | Minimum price | `"50000"` |
| `max` | string | Maximum price | `"200000"` |
| `sort` | string | Sort order | `"relevance"`, `"new"`, `"price_asc"`, `"price_desc"`, `"rating_desc"` |
| `page` | string | Page number | `"1"`, `"2"`, `"3"` |
| `per` | string | Items per page | `"12"`, `"24"`, `"48"` |

#### Example Request

```bash
GET /api/products?category=هودی&sort=price_asc&page=1&per=12
```

#### Example Response

```json
{
  "items": [
    {
      "id": "p1",
      "slug": "هودی-سفید-محمد",
      "title": "هودی سفید محمد",
      "description": "هودی سفید از پنبه ارگانیک با گرمای ملایم برای روزهای سرد.",
      "tags": ["هودی", "زمستان", "مینیمال", "سفید"],
      "price": {
        "current": 100000,
        "compareAt": 120000,
        "currency": "تومان"
      },
      "rating": 4.6,
      "totalReviews": 128,
      "variants": [
        {
          "id": "p1v1",
          "color": "سفید",
          "size": "M",
          "available": true,
          "images": ["https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200"]
        }
      ],
      "category": "هودی",
      "createdAt": "2025-09-12"
    }
  ],
  "total": 4,
  "page": 1,
  "pageCount": 1
}
```

#### Sorting Options

- `relevance`: Default sorting based on search relevance and recency
- `new`: Sort by creation date (newest first)
- `price_asc`: Sort by price (lowest first)
- `price_desc`: Sort by price (highest first)
- `rating_desc`: Sort by rating (highest first)

#### Filtering Examples

```bash
# Search for products containing "هودی"
GET /api/products?q=هودی

# Filter by category and color
GET /api/products?category=هودی&color=سفید

# Filter by price range
GET /api/products?min=50000&max=150000

# Filter by size and availability
GET /api/products?size=M&inStock=1

# Complex filtering with sorting
GET /api/products?category=اکسسوری&sort=price_asc&page=1&per=24
```

### GET /api/products/[slug]

Retrieve a single product by its slug.

#### Path Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `slug` | string | Product slug (URL-encoded) | `"هودی-سفید-محمد"` |

#### Example Request

```bash
GET /api/products/هودی-سفید-محمد
```

#### Example Response

```json
{
  "id": "p1",
  "slug": "هودی-سفید-محمد",
  "title": "هودی سفید محمد",
  "description": "هودی سفید از پنبه ارگانیک با گرمای ملایم برای روزهای سرد.",
  "tags": ["هودی", "زمستان", "مینیمال", "سفید"],
  "price": {
    "current": 100000,
    "compareAt": 120000,
    "currency": "تومان"
  },
  "rating": 4.6,
  "totalReviews": 128,
  "variants": [
    {
      "id": "p1v1",
      "color": "سفید",
      "size": "M",
      "available": true,
      "images": ["https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200"]
    },
    {
      "id": "p1v2",
      "color": "سفید",
      "size": "L",
      "available": false,
      "images": ["https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200"]
    }
  ],
  "category": "هودی",
  "createdAt": "2025-09-12"
}
```

#### Error Response

```json
{
  "error": "NOT_FOUND"
}
```

**Status Code**: `404 Not Found`

## Error Handling

### HTTP Status Codes

| Code | Description |
|------|-------------|
| `200` | Success |
| `404` | Product not found |
| `500` | Internal server error |

### Error Response Format

```json
{
  "error": "ERROR_CODE",
  "message": "Human readable error message"
}
```

## Rate Limiting

Currently, no rate limiting is implemented. Consider implementing rate limiting for production use.

## CORS

The API supports CORS for cross-origin requests. All origins are currently allowed.

## Examples

### JavaScript/TypeScript

```typescript
// Fetch products with filtering
async function getProducts(filters: CatalogQuery) {
  const params = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, String(value));
    }
  });
  
  const response = await fetch(`/api/products?${params}`);
  return await response.json();
}

// Usage
const products = await getProducts({
  category: 'هودی',
  sort: 'price_asc',
  page: '1',
  per: '12'
});
```

### cURL Examples

```bash
# Get all products
curl "http://localhost:3000/api/products"

# Search for products
curl "http://localhost:3000/api/products?q=هودی"

# Filter by category and sort by price
curl "http://localhost:3000/api/products?category=هودی&sort=price_asc"

# Get a specific product
curl "http://localhost:3000/api/products/هودی-سفید-محمد"
```

## Notes

- All prices are in **Toman** (Iranian currency)
- Product slugs are URL-encoded Persian text
- Image URLs point to Unsplash for demo purposes
- The API currently uses mock data - replace with real database integration for production
- All text content is in Persian (Farsi) language
- The API supports right-to-left (RTL) text content

## Future Enhancements

- User authentication and authorization
- Cart management endpoints
- Order processing endpoints
- User reviews and ratings
- Inventory management
- Payment processing integration
- Admin panel endpoints
- Analytics and reporting endpoints
