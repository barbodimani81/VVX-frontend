'use client'

import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'

export default function AccountPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">حساب کاربری</h1>

      <Tabs defaultValue="orders" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="orders">سفارش‌ها</TabsTrigger>
          <TabsTrigger value="addresses">آدرس‌ها</TabsTrigger>
          <TabsTrigger value="wishlist">علاقه‌مندی‌ها</TabsTrigger>
          <TabsTrigger value="settings">تنظیمات</TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          <div className="rounded-lg border p-6 text-sm text-muted-foreground">
            هنوز سفارشی ثبت نشده است.
          </div>
        </TabsContent>

        <TabsContent value="addresses">
          <div className="rounded-lg border p-6 text-sm text-muted-foreground">
            آدرسی ذخیره نشده است. (آدرس‌ها در مرحله تسویه حساب ثبت می‌شوند)
          </div>
        </TabsContent>

        <TabsContent value="wishlist">
          <div className="rounded-lg border p-6 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">علاقه‌مندی‌هایتان را ببینید و مدیریت کنید.</div>
            <Button asChild variant="outline"><Link href="/wishlist">مشاهده علاقه‌مندی‌ها</Link></Button>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg border p-4">
              <div className="font-medium mb-2">ایمیل</div>
              <div className="text-sm text-muted-foreground">ali@example.com</div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="font-medium mb-2">خبرنامه</div>
              <div className="text-sm text-muted-foreground">برای دریافت پیشنهادها عضو شوید.</div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  )
}
