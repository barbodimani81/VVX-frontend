'use client'

import { toast } from 'sonner'

export const notify = {
  addedToCart(title: string) {
    toast.success(`${title} به سبد اضافه شد`, {
      action: { label: 'مشاهده سبد', onClick: () => (window.location.href = '/cart') },
      duration: 2500,
    })
  },
  wishlistAdded(title: string) {
    toast.success(`به علاقه‌مندی‌ها اضافه شد: ${title}`, {
      action: { label: 'نمایش', onClick: () => (window.location.href = '/wishlist') },
      duration: 2500,
    })
  },
  wishlistRemoved(title: string) {
    toast(`از علاقه‌مندی‌ها حذف شد: ${title}`, { duration: 2000 })
  },
  compareAdded() {
    toast.info('به مقایسه اضافه شد (حداکثر ۳ کالا)', { duration: 2000 })
  },
  compareLimit() {
    toast('حداکثر ۳ کالا برای مقایسه', {
      description: 'برای افزودن کالای جدید، یکی را حذف کنید.',
      duration: 2500,
    })
  },
  error(msg: string) {
    toast.error(msg, { duration: 3000 })
  },
}
