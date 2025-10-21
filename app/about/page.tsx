// app/about/page.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-3xl font-extrabold">داستان برند ما</h1>
      <p className="mt-4 text-lg leading-8 text-muted-foreground">
        ما با الهام از سادگی و کیفیت، محصولات پوشیدنی مینیمال می‌سازیم؛ مناسب روزهای شلوغ شهر و شب‌های سرد زمستان.
        مأموریت ما ارائه تجربه خرید فارسی، دلنشین و مدرن است.
      </p>
      <div className="mt-8 grid gap-4">
        <div className="rounded-2xl border p-5">
          <h2 className="text-xl font-bold mb-2">کیفیت پایدار</h2>
          <p className="text-sm leading-7 text-muted-foreground">
            از پارچه‌های ارگانیک و فرآیندهای مسئولانه استفاده می‌کنیم تا لباس‌هایی ماندگار بسازیم.
          </p>
        </div>
        <div className="rounded-2xl border p-5">
          <h2 className="text-xl font-bold mb-2">طراحی مینیمال</h2>
          <p className="text-sm leading-7 text-muted-foreground">
            فرم‌های ساده، توجه به جزئیات و تناسبات درست — برای استایلی که همیشه تازه می‌ماند.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <Button asChild><Link href="/products">مشاهده محصولات</Link></Button>
      </div>
    </main>
  )
}
