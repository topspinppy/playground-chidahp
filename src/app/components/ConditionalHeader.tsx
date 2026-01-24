"use client"

import { usePathname } from 'next/navigation'
import Header from './header'
import { Category } from '@/types/types'

interface ConditionalHeaderProps {
  categories: Category[]
}

export default function ConditionalHeader({ categories }: ConditionalHeaderProps) {
  const pathname = usePathname()
  const shouldHideHeader = pathname === '/southdakota' || pathname === '/tellme' || pathname === '/countdown' || pathname.includes('/admin/') || pathname === '/happy-birthday-p-yaa' || pathname === '/merry-christmas' || pathname === '/merry-christmas/admin' || pathname === '/merry-christmas/draw' || pathname === '/pangranger-2026'
  
  if (shouldHideHeader) {
    return null
  }
  
  return <Header categories={categories} />
}