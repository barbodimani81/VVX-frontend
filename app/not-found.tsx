// app/not-found.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-center">
      <div className="mx-auto h-16 w-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-3xl">!</div>
      <h1 className="mt-4 text-2xl font-bold">صفحه مورد نظر یافت نشد</h1>
      <p className="mt-2 text-sm text-muted-foreground">ممکن است صفحه حذف شده یا لینک اشتباه باشد.</p>
      <div className="mt-6 flex items-center justify-center gap-3">
        <Button asChild><Link href="/">بازگشت به خانه</Link></Button>
        <Button asChild variant="outline"><Link href="/products">مشاهده محصولات</Link></Button>
        <Button asChild variant="outline"><Link href="/search">جستجو</Link></Button>
      </div>
    </main>
  )
}
