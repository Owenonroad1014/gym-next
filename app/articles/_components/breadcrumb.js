'use client'

import articleStyle from '../styles/articles.module.css'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Breadcrumb({ breadcrumb = [], articleid = 0 }) {
  const pathname = usePathname()
  const [activeIndex, setActiveIndex] = useState(null)
  useEffect(() => {
    if (pathname.includes(`/articles/${articleid}`)) {
      setActiveIndex(2)
    } else {
      if (pathname.includes('/articles')) {
        setActiveIndex(1)
      } else {
        setActiveIndex(null)
      }
    }
  }, [pathname])
  const breadcrumbLinks = ['/', '/articles', `/articles/${articleid}`]

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
