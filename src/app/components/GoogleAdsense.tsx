'use client'

import { useEffect, useRef } from 'react'

interface GoogleAdsenseProps {
  adSlot: string
  adFormat?: 'auto' | 'rectangle' | 'horizontal' | 'vertical'
  fullWidthResponsive?: boolean
  style?: React.CSSProperties
  className?: string
  onAdLoad?: () => void
  onAdFail?: () => void
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    adsbygoogle: any[]
  }
}

const AD_LOAD_TIMEOUT_MS = 5000

export default function GoogleAdsense({
  adSlot,
  adFormat = 'auto',
  fullWidthResponsive = true,
  className = '',
  onAdLoad,
  onAdFail
}: GoogleAdsenseProps) {
  const insRef = useRef<HTMLModElement>(null)
  const reportedRef = useRef(false)

  useEffect(() => {
    reportedRef.current = false
    const ins = insRef.current
    if (!ins) return

    const timer = setTimeout(() => {
      try {
        if (typeof window !== 'undefined' && window.adsbygoogle) {
          window.adsbygoogle.push({})
        }
      } catch (error) {
        console.error('AdSense error:', error)
        if (!reportedRef.current && onAdFail) {
          reportedRef.current = true
          onAdFail()
        }
      }
    }, 100)

    const timeoutId = setTimeout(() => {
      if (reportedRef.current) return
      const height = ins.offsetHeight
      if (height < 50) {
        reportedRef.current = true
        onAdFail?.()
      } else {
        reportedRef.current = true
        onAdLoad?.()
      }
    }, AD_LOAD_TIMEOUT_MS)

    const observer = new ResizeObserver(() => {
      if (reportedRef.current) return
      const height = ins.offsetHeight
      if (height >= 50) {
        reportedRef.current = true
        onAdLoad?.()
      }
    })
    observer.observe(ins)

    return () => {
      clearTimeout(timer)
      clearTimeout(timeoutId)
      observer.disconnect()
    }
  }, [adSlot, onAdLoad, onAdFail])

  return (
    <div className={className}>
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-8360416910031647"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  )
}