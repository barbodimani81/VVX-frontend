'use client'

import { Toaster } from '@/components/ui/sonner'

export default function AppToaster() {
  return (
    <Toaster
      position="top-left"
      dir="rtl"
      richColors
      toastOptions={{
        className: 'font-sans',
        duration: 2500,
      }}
    />
  )
}
