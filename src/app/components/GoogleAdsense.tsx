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
  const [isVisible, setIsVisible] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const maxRetries = 3

  // Intersection Observer to load ad only when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true)
          }
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    )

    if (adRef.current) {
      observer.observe(adRef.current)
    }

    return () => {
      if (adRef.current) {
        observer.unobserve(adRef.current)
      }
    }
  }, [isVisible])

  // Load AdSense ad with retry mechanism
  useEffect(() => {
    if (!isVisible || !adRef.current) return

    const loadAd = () => {
      try {
        if (typeof window !== 'undefined' && window.adsbygoogle) {
          // Ensure the container has dimensions before loading
          const container = adRef.current
          if (container && container.offsetWidth > 0) {
            window.adsbygoogle.push({})
          } else if (retryCount < maxRetries) {
            // Retry if container doesn't have dimensions yet
            setTimeout(() => {
              setRetryCount(prev => prev + 1)
            }, 500)
          }
        }
      } catch (error) {
        console.error('AdSense error:', error)
        // Retry on error
        if (retryCount < maxRetries) {
          setTimeout(() => {
            setRetryCount(prev => prev + 1)
          }, 1000)
        }
      }
    }

    // Delay to ensure DOM is ready
    const timer = setTimeout(loadAd, 200)
    return () => clearTimeout(timer)
  }, [isVisible, retryCount])

  // Default styles with explicit dimensions
  const defaultStyle: React.CSSProperties = {
    display: 'block',
    width: '100%',
    minHeight: '250px',
    minWidth: '300px', // Ensure minimum width
    ...style
  }

  return (
    <div ref={adRef} className={className}>
      <ins
        className="adsbygoogle"
        style={defaultStyle}
        data-ad-client="ca-pub-8360416910031647"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  )
}