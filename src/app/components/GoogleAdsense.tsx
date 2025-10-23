'use client'

import { useEffect, useRef, useState } from 'react'

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
  const adRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const loadAd = () => {
      try {
        if (typeof window !== 'undefined' && window.adsbygoogle && adRef.current) {
          // ตรวจสอบว่า element มีขนาดแล้ว
          const rect = adRef.current.getBoundingClientRect()
          if (rect.width > 0) {
            window.adsbygoogle.push({})
            setIsLoaded(true)
          } else {
            // ถ้ายังไม่มีขนาด ให้รอสักครู่แล้วลองใหม่
            setTimeout(loadAd, 100)
          }
        }
      } catch (error) {
        console.error('AdSense error:', error)
      }
    }

    // รอให้ component mount เสร็จก่อน
    const timer = setTimeout(loadAd, 100)
    
    return () => clearTimeout(timer)
  }, [adSlot])

  return (
    <div 
      ref={adRef}
      className={className} 
      style={{ 
        minHeight: '250px', // กำหนดความสูงขั้นต่ำ
        minWidth: '300px',  // กำหนดความกว้างขั้นต่ำ
        ...style 
      }}
    >
      {!isLoaded && (
        <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-sm text-gray-500">กำลังโหลดโฆษณา...</p>
          </div>
        </div>
      )}
      <ins
        className="adsbygoogle"
        style={{ 
          display: isLoaded ? 'block' : 'none',
          minHeight: '250px',
          minWidth: '300px'
        }}
        data-ad-client="ca-pub-8360416910031647"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  )
}