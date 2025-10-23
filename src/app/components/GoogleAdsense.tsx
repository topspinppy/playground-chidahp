'use client'

import { useEffect } from 'react'

interface GoogleAdsenseProps {
  adSlot: string
  adFormat?: 'auto' | 'rectangle' | 'horizontal' | 'vertical'
  fullWidthResponsive?: boolean
  style?: React.CSSProperties
  className?: string
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    adsbygoogle: any[]
  }
}

export default function GoogleAdsense({
  adSlot,
  adFormat = 'auto',
  fullWidthResponsive = true,
  style,
  className = ''
}: GoogleAdsenseProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        if (typeof window !== 'undefined' && window.adsbygoogle) {
          window.adsbygoogle.push({})
        }
      } catch (error) {
        console.error('AdSense error:', error)
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [adSlot])

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', minHeight: '250px' }}
        data-ad-client="ca-pub-8360416910031647"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  )
}