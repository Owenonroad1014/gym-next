'use client'

import gymfriendcss from './_styles/breadcrumb.module.css'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Breadcrumb({ breadcrumb = [] }) {
  const pathname = usePathname()
  const [activeIndex, setActiveIndex] = useState(null)
  useEffect(() => {
    if (pathname.includes('/products')) {
      setActiveIndex(2)
    } else {
      if (pathname.includes('/')) {
        setActiveIndex(1)
      } else {
        setActiveIndex(null)
      }
    }
  }, [pathname])
  const breadcrumbLinks = ['/', '/products']

  return (
    <>
      <div className={gymfriendcss.breadcrumbContainer}>
        <nav className={gymfriendcss.breadcrumb}>
          {breadcrumb.map((v, index) => (
            <div
              key={index}
              className={`${gymfriendcss.breadcrumbItem} ${
                index === activeIndex ? gymfriendcss.active : ''
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