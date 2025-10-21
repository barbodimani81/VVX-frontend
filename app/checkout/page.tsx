'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/hooks/use-cart'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import AddressForm, { Address } from '@/components/checkout/address-form'
import ShippingMethods, { ShippingOption } from '@/components/checkout/shipping-methods'
import PaymentForm, { Payment } from '@/components/checkout/payment-form'
import { toman } from '@/lib/commerce'

type Step = 1 | 2 | 3

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal, clear } = useCart()
  const [step, setStep] = useState<Step>(1)
  const [address, setAddress] = useState<Address | null>(null)
  const [shipping, setShipping] = useState<ShippingOption | null>(null)
  const [payment, setPayment] = useState<Payment | null>(null)
  const [loading, setLoading] = useState(false)

  const total = subtotal() + (shipping?.price || 0)

  const progress = step === 1 ? 33 : step === 2 ? 66 : 100

  function nextDisabled() {
    if (step === 1) return !address
    if (step === 2) return !shipping
    if (step === 3) return !payment
    return false
  }

  async function handleNext() {
    if (step < 3) {
      setStep((s) => (s + 1) as Step)
      return
    }
    // Step 3: "پرداخت"
    setLoading(true)
    // simulate payment
    setTimeout(() => {
      const order = {
        id: 'ORD-' + Math.floor(100000 + Math.random() * 899999),
        address,
        shipping,
        items,
        subtotal: subtotal(),
        total: subtotal() + (shipping?.price || 0),
        createdAt: new Date().toISOString(),
      }
      try {
        sessionStorage.setItem('lastOrder', JSON.stringify(order))
      } catch {}
      clear()
      router.push('/order/success')
    }, 1200)
  }

  if (!items.length) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-2xl font-bold mb-4">تسویه حساب</h1>
        <div className="rounded-lg border p-8 text-center text-muted-foreground">
          سبد شما خالی است. لطفاً ابتدا محصولی را به سبد اضافه کنید.
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-bold">تسویه حساب</h1>

      <div className="mt-3">
        <Progress value={progress} />
        <div className="mt-2 text-xs text-muted-foreground">
          مرحله {step} از 3 — {step === 1 ? 'آدرس' : step === 2 ? 'روش ارسال' : 'پرداخت'}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* left: steps */}
        <section className="lg:col-span-8 space-y-6">
          {step === 1 && <AddressForm defaultValue={address ?? undefined} onSubmit={(a) => setAddress(a)} />}
          {step === 2 && <ShippingMethods selected={shipping ?? undefined} onSelect={setShipping} />}
          {step === 3 && <PaymentForm onSubmit={(p) => setPayment(p)} loading={loading} />}

          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => setStep((s) => (s > 1 ? ((s - 1) as Step) : s))} disabled={step === 1 || loading}>
              بازگشت
            </Button>
            <Button onClick={handleNext} disabled={nextDisabled() || loading}>
              {step < 3 ? 'ادامه' : loading ? 'در حال پرداخت…' : 'پرداخت و ثبت سفارش'}
            </Button>
          </div>
        </section>

        {/* right: summary */}
        <aside className="lg:col-span-4">
          <div className="rounded-lg border p-4 space-y-3">
            <h2 className="font-semibold">خلاصه سفارش</h2>
            <Separator />
            <div className="space-y-2 max-h-[280px] overflow-auto pr-2">
              {items.map((it) => (
                <div key={it.id} className="flex items-center justify-between gap-2 text-sm">
                  <div className="truncate">
                    {it.title}{' '}
                    <span className="text-muted-foreground">
                      {it.color ? `، ${it.color}` : ''}{it.size ? `، ${it.size}` : ''}
                    </span>
                    <span className="mx-1 text-muted-foreground">×</span>
                    {it.qty}
                  </div>
                  <div className="shrink-0">{toman(it.price * it.qty)}</div>
                </div>
              ))}
            </div>
            <Separator />
            <Row label="جمع جزء" value={toman(subtotal())} />
            <Row label="هزینه ارسال" value={toman(shipping?.price || 0)} />
            <Separator />
            <Row label="مبلغ قابل پرداخت" value={toman(total)} bold />
          </div>
        </aside>
      </div>
    </main>
  )
}

function Row({ label, value, bold = false }: { label: string; value: string | number; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={bold ? 'font-bold' : 'text-sm text-muted-foreground'}>{label}</span>
      <span className={bold ? 'text-lg font-extrabold' : 'text-sm'}>{value}</span>
    </div>
  )
}
