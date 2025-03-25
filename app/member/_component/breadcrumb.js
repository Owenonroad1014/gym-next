'use client'

import { useState, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import breadcrumbStyle from '../_styles/member.module.css'
import { useAuth } from '@/context/auth-context'

export default function Breadcrumb({ breadcrumb = [] }) {
  const { auth } = useAuth
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  const [activeIndex, setActiveIndex] = useState(null)
  useEffect(() => {
    if (category) {
      setActiveIndex(2)
    } else {
      if (pathname.includes('/member')) {
        setActiveIndex(1)
      } else {
        setActiveIndex(null)
      }
    }
  }, [pathname, category])
  const breadcrumbLinks = ['/', '/member', `/member?category=${category}`]

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
      {auth > 0 ? (
        <div className={breadcrumbStyle.breadcrumbContainer}>
          <nav className={breadcrumbStyle.breadcrumb}>
            {breadcrumb.map((v, index) => (
              <div
                key={index}
                className={`${breadcrumbStyle.breadcrumbItem} ${
                  index === activeIndex ? breadcrumbStyle.active : ''
                }`}
              >
                <Link href={breadcrumbLinks[index]}>{v}</Link>
              </div>
            ))}
          </nav>
        </div>
      ) : null}
    </>
  )
}
