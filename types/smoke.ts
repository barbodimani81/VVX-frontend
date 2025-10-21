// types/smoke.ts
import { CATALOG, type Product } from '@/lib/commerce'

// CATALOG must satisfy Product[]
const ensureCatalog: Product[] = CATALOG

// A sample item must satisfy Product shape
const sample: Product = ensureCatalog[0]

// Keep file "type-only": no runtime code, so build stays clean.
void sample
