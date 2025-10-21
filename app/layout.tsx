import './globals.css'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Vazirmatn } from 'next/font/google'

// Fonts (Persian)
const vazir = Vazirmatn({
  subsets: ['arabic'],
  display: 'swap',
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-vazirmatn',
})

// Floating client-only widgets (mounted globally)
const MiniCart = dynamic(() => import('@/components/cart/mini-cart'), { ssr: false })
const CompareSheet = dynamic(() => import('@/components/compare/compare-sheet'), { ssr: false })

export const metadata: Metadata = {
  title: 'فروشگاه مد | کلکسیون زمستانی',
  description: 'یک فروشگاه اینترنتی فارسی با رابط کاربری مدرن و راست‌به‌چپ',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazir.variable} font-sans bg-background text-foreground`}>
        {/* accessibility: skip link */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:right-2 focus:z-50 bg-primary text-primary-foreground rounded px-3 py-1"
        >
          پرش به محتوا
        </a>

        {children}

        {/* Floating global widgets */}
        <MiniCart />
        <CompareSheet />
      </body>
    </html>
  )
}
