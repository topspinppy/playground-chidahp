'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function ConditionalAdSense() {
  const pathname = usePathname()
  
  useEffect(() => {
    // ไม่โหลด AdSense script สำหรับหน้า /happy-birthday-p-yaa
    if (pathname === '/happy-birthday-p-yaa') {
      return
    }

    // ตรวจสอบว่า script ยังไม่ได้ถูกโหลด
    if (document.querySelector('script[src*="adsbygoogle.js"]')) {
      return
    }

    // โหลด AdSense script
    const script = document.createElement('script')
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8360416910031647'
    script.async = true
    script.crossOrigin = 'anonymous'
    document.head.appendChild(script)

    return () => {
      // Cleanup: ลบ script เมื่อ component unmount (ถ้าจำเป็น)
      // แต่ปกติไม่จำเป็นเพราะ script ควรอยู่ตลอด
    }
  }, [pathname])

  return null
}

