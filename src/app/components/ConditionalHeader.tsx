"use client"

import { usePathname } from 'next/navigation'
import Header from './header'
import { Category } from '@/types/types'

interface ConditionalHeaderProps {
  categories: Category[]
}

export default function ConditionalHeader({ categories }: ConditionalHeaderProps) {
  const pathname = usePathname()
  const shouldHideHeader = pathname === '/southdakota' || pathname === '/tellme' || pathname === '/countdown' || pathname.includes('/admin/')
  
  if (shouldHideHeader) {
    return null
  }
  
  return <Header categories={categories} />
}