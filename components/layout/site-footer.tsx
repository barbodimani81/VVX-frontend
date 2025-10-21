// components/layout/site-footer.tsx
import Link from 'next/link'

export default function SiteFooter() {
  return (
    <footer className="mt-20 border-t">
      <div className="mx-auto max-w-7xl px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
        <div>
          <div className="font-semibold mb-3">دسته‌ها</div>
          <ul className="space-y-2">
            <li><Link className="text-muted-foreground hover:text-foreground" href="/products?category=هودی">هودی</Link></li>
            <li><Link className="text-muted-foreground hover:text-foreground" href="/products?category=تی‌شرت">تی‌شرت</Link></li>
            <li><Link className="text-muted-foreground hover:text-foreground" href="/products?category=اکسسوری">اکسسوری</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">راهنما</div>
          <ul className="space-y-2">
            <li><Link className="text-muted-foreground hover:text-foreground" href="/about">درباره ما</Link></li>
            <li><Link className="text-muted-foreground hover:text-foreground" href="/search">جستجو</Link></li>
            <li><Link className="text-muted-foreground hover:text-foreground" href="/account">حساب کاربری</Link></li>
          </ul>
        </div>
        <div className="col-span-2 md:col-span-2">
          <div className="font-semibold mb-3">خبرنامه</div>
          <p className="text-muted-foreground">با ثبت ایمیل از جدیدترین محصولات و پیشنهادها باخبر شوید.</p>
          <form className="mt-3 flex gap-2">
            <input className="w-full rounded-md border px-3 py-2" placeholder="you@example.com" />
            <button className="rounded-md border px-3 py-2">ثبت</button>
          </form>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} فروشگاه مد — همه حقوق محفوظ است.
      </div>
    </footer>
  )
}
