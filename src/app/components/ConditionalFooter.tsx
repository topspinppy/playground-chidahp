"use client"

import { usePathname } from 'next/navigation'
import Footer from './footer'
import { Category } from '@/types/types'

interface ConditionalFooterProps {
  categories: Category[]
}

export default function ConditionalFooter({ categories }: ConditionalFooterProps) {
  const pathname = usePathname()
  const shouldHideFooter = pathname === '/southdakota' || pathname === '/tellme' || pathname === '/countdown' || pathname.includes('/admin/') || pathname === '/happy-birthday-p-yaa' || pathname === '/merry-christmas' || pathname.includes('/merry-christmas/admin') || pathname === '/pangranger-2026'
  
  if (shouldHideFooter) {
    return null
  }
  
  return <Footer categories={categories} />
}
