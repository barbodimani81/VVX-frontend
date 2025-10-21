'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [progress, setProgress] = useState(0)
  const timer = useRef<number | null>(null)

  // start progress on path change
  useEffect(() => {
    setProgress(10)
    // ramp up a bit
    timer.current = window.setInterval(() => {
      setProgress((p) => (p < 90 ? p + 5 : p))
    }, 120)
    // finish shortly after mount paint
    const done = window.setTimeout(() => {
      setProgress(100)
      window.setTimeout(() => setProgress(0), 250)
      if (timer.current) window.clearInterval(timer.current)
    }, 600)
    return () => {
      if (timer.current) window.clearInterval(timer.current)
      window.clearTimeout(done)
    }
  }, [pathname])

  return (
    <>
      {/* top progress bar */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          insetInlineStart: 0,
          top: 0,
          height: progress ? 2 : 0,
          width: `${progress}%`,
          background:
            'linear-gradient(90deg, var(--primary), rgba(0,0,0,0))',
          boxShadow: progress ? '0 0 8px rgba(0,0,0,.2)' : 'none',
          zIndex: 60,
          transition: 'width .2s ease, height .15s ease',
        }}
      />
      {children}
    </>
  )
}
