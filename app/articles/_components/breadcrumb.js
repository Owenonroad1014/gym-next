'use client'

import articlecss from '../styles/articles.module.css'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Breadcrumb({ breadcrumb = [] }) {
  const pathname = usePathname()
  const [activeIndex, setActiveIndex] = useState(null)
  useEffect(() => {
    if (pathname.includes('/articles/article')) {
      setActiveIndex(2)
    } else {
      if (pathname.includes('/articles')) {
        setActiveIndex(1)
      } else {
        setActiveIndex(null)
      }
    }
  }, [pathname])
  const breadcrumbLinks = ['/', '/articles', '/articles/article']

  return (
    <>
      <div className={articlecss.breadcrumbContainer}>
        <nav className={articlecss.breadcrumb}>
          {breadcrumb.map((v, index) => (
            <div
              key={index}
              className={`${articlecss.breadcrumbItem} ${
                index === activeIndex ? articlecss.active : ''
              }`}
            >
              <a href={breadcrumbLinks[index]}>{v}</a>
            </div>
          ))}
        </nav>
      </div>
    </>
  )
}
