'use client'

import articleStyle from '../_styles/member.module.css'
import { useState, useEffect } from 'react'
import {useAuth} from '@/context/auth-context'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Breadcrumb({ breadcrumb = [], }) {
  const pathname = usePathname()
  const [activeIndex, setActiveIndex] = useState(null)
  useEffect(() => {
    if (pathname.includes(`/member`)) {
      setActiveIndex(1)
    // } else {
    //   if (pathname.includes('/articles')) {
    //     setActiveIndex(1)
    //   } else {
    //     setActiveIndex(null)
    //   }
    }
  }, [pathname])
  const breadcrumbLinks = ['/', '/member', ]
  // const breadcrumbLinks = ['/', '/articles', `/articles/${articleid}`]
  
  const hideBreadcrumbPages = [
    '/member/login',
    '/member/register',
    '/member/register/add-profile',
  ]
  if (hideBreadcrumbPages.includes(pathname)) {
    return null // 這些頁面不顯示 Header
  }
  
  return (
    <>
      <div className={articleStyle.breadcrumbContainer}>
        <nav className={articleStyle.breadcrumb}>
          {breadcrumb.map((v, index) => (
            <div
              key={index}
              className={`${articleStyle.breadcrumbItem} ${
                index === activeIndex ? articleStyle.active : ''
              }`}
            >
              <Link href={breadcrumbLinks[index]}>{v}</Link>
            </div>
          ))}
        </nav>
      </div>
    </>
  )
}
